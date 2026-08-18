import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Ensure durable data storage directories exist
const DATA_DIR = path.join(process.cwd(), 'data');
const DOCUMENTS_DIR = path.join(DATA_DIR, 'documents');
const APPS_FILE = path.join(DATA_DIR, 'applications.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DOCUMENTS_DIR)) {
  fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });
}

// Helper to load persistent applications
function loadApplicationsFromDisk(): any[] {
  try {
    if (fs.existsSync(APPS_FILE)) {
      const raw = fs.readFileSync(APPS_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading applications file:', err);
  }
  return [];
}

// Helper to persist applications to disk
function saveApplicationsToDisk(apps: any[]) {
  try {
    fs.writeFileSync(APPS_FILE, JSON.stringify(apps, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing applications file:', err);
  }
}

// Initialize server-side Gemini AI client with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support JSON payloads including uploaded document attachments
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ limit: '100mb', extended: true }));

  // Load persistent application repository
  let applications: any[] = loadApplicationsFromDisk();

  // API Health Endpoint
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      service: 'Fresh Study India API',
      totalApplications: applications.length,
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
      storageType: 'Persistent File & Document Vault'
    });
  });

  // 1. SUBMIT APPLICATION PROFILE (With full document storage)
  app.post('/api/applications', (req, res) => {
    try {
      const { fullName, phone, email, country, studyField, qualification, documents = [] } = req.body;
      
      if (!fullName || !phone) {
        return res.status(400).json({ success: false, error: 'Full name and phone are required.' });
      }

      const appId = `FSI-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const trackingRef = `IND-2026-${Math.floor(100000 + Math.random() * 900000)}`;

      // Process and store each document file securely
      const savedDocs = (Array.isArray(documents) ? documents : []).map((doc: any, index: number) => {
        const docId = doc.id || `doc-${Date.now()}-${index}`;
        let storedFilePath = '';

        // If file data URL exists, save physical copy to documents vault
        if (doc.dataUrl && typeof doc.dataUrl === 'string') {
          try {
            const matches = doc.dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (matches && matches.length === 3) {
              const mimeType = matches[1];
              const base64Data = matches[2];
              const ext = mimeType.split('/')[1]?.replace('jpeg', 'jpg') || 'bin';
              const filename = `${appId}_${docId}.${ext}`;
              const fullFilePath = path.join(DOCUMENTS_DIR, filename);
              fs.writeFileSync(fullFilePath, Buffer.from(base64Data, 'base64'));
              storedFilePath = filename;
            }
          } catch (fileErr) {
            console.error('Error saving document to vault:', fileErr);
          }
        }

        return {
          id: docId,
          name: doc.name || `Document_${index + 1}`,
          size: doc.size || 0,
          formattedSize: doc.formattedSize || 'N/A',
          type: doc.type || 'FILE',
          category: doc.category || 'Other Supporting Documents',
          dataUrl: doc.dataUrl || undefined, // retained for immediate preview
          storedFile: storedFilePath || undefined,
          verified: false,
          uploadedAt: new Date().toISOString()
        };
      });

      const newApplication = {
        id: appId,
        trackingId: trackingRef,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: (email || '').trim(),
        country: country || 'Liberia',
        studyField: studyField || 'Computer Science',
        qualification: qualification || 'High School Diploma (WAEC / WASSCE)',
        status: 'NEW',
        documentsCount: savedDocs.length,
        documents: savedDocs,
        notes: [
          {
            id: `note-${Date.now()}`,
            author: 'System',
            text: `Application profile created with ${savedDocs.length} attached document(s).`,
            createdAt: new Date().toISOString()
          }
        ],
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      applications.unshift(newApplication);
      saveApplicationsToDisk(applications);

      console.log(`[Admissions Engine] Application registered: ${fullName} (${country}), Target: ${studyField}, Docs: ${savedDocs.length}, Ref: ${trackingRef}`);

      res.status(201).json({
        success: true,
        applicationId: appId,
        trackingId: trackingRef,
        message: 'Application profile and documents permanently recorded.',
        record: {
          id: appId,
          trackingId: trackingRef,
          fullName: newApplication.fullName,
          documentsCount: savedDocs.length
        }
      });
    } catch (error: any) {
      console.error('Error submitting application:', error);
      res.status(500).json({ success: false, error: error.message || 'Failed to submit application' });
    }
  });

  // 2. GET ALL APPLICATIONS (For Admissions Dashboard)
  app.get('/api/applications', (req, res) => {
    try {
      applications = loadApplicationsFromDisk();
      
      const { status, country, search } = req.query;
      let filtered = [...applications];

      if (status && status !== 'ALL') {
        filtered = filtered.filter(a => a.status === status);
      }
      if (country && country !== 'ALL') {
        filtered = filtered.filter(a => a.country === country);
      }
      if (search && typeof search === 'string') {
        const q = search.toLowerCase();
        filtered = filtered.filter(a => 
          a.fullName?.toLowerCase().includes(q) ||
          a.email?.toLowerCase().includes(q) ||
          a.phone?.toLowerCase().includes(q) ||
          a.trackingId?.toLowerCase().includes(q) ||
          a.studyField?.toLowerCase().includes(q)
        );
      }

      // Return summary without heavy base64 strings for fast dashboard loading
      const summaryList = filtered.map(app => ({
        id: app.id,
        trackingId: app.trackingId || app.id,
        fullName: app.fullName,
        phone: app.phone,
        email: app.email,
        country: app.country,
        studyField: app.studyField,
        qualification: app.qualification,
        status: app.status || 'NEW',
        documentsCount: app.documents?.length || 0,
        documentsSummary: (app.documents || []).map((d: any) => ({
          id: d.id,
          name: d.name,
          category: d.category,
          type: d.type,
          size: d.size,
          formattedSize: d.formattedSize,
          verified: Boolean(d.verified)
        })),
        notesCount: app.notes?.length || 0,
        submittedAt: app.submittedAt,
        updatedAt: app.updatedAt
      }));

      res.json({
        success: true,
        count: summaryList.length,
        total: applications.length,
        applications: summaryList
      });
    } catch (err: any) {
      console.error('Error listing applications:', err);
      res.status(500).json({ success: false, error: 'Failed to retrieve applications' });
    }
  });

  // 3. GET SINGLE APPLICATION DOSSIER (Complete with document previews & notes)
  app.get('/api/applications/:id', (req, res) => {
    try {
      applications = loadApplicationsFromDisk();
      const appRecord = applications.find(a => a.id === req.params.id);

      if (!appRecord) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }

      res.json({
        success: true,
        application: appRecord
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4. DOWNLOAD ATTACHED DOCUMENT FILE (Direct binary download stream)
  app.get('/api/applications/:id/documents/:docId/download', (req, res) => {
    try {
      applications = loadApplicationsFromDisk();
      const appRecord = applications.find(a => a.id === req.params.id);

      if (!appRecord) {
        return res.status(404).send('Application not found');
      }

      const docRecord = (appRecord.documents || []).find((d: any) => d.id === req.params.docId);
      if (!docRecord) {
        return res.status(404).send('Document not found');
      }

      // Check physical file on disk first
      if (docRecord.storedFile) {
        const filePath = path.join(DOCUMENTS_DIR, docRecord.storedFile);
        if (fs.existsSync(filePath)) {
          return res.download(filePath, docRecord.name);
        }
      }

      // Fallback: decode base64 dataUrl
      if (docRecord.dataUrl) {
        const matches = docRecord.dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const mimeType = matches[1];
          const buffer = Buffer.from(matches[2], 'base64');
          res.setHeader('Content-Type', mimeType);
          res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(docRecord.name)}"`);
          return res.send(buffer);
        }
      }

      res.status(404).send('Document file content is not available for download.');
    } catch (err: any) {
      console.error('Download error:', err);
      res.status(500).send('Failed to download document');
    }
  });

  // 5. UPDATE APPLICATION STATUS
  app.patch('/api/applications/:id/status', (req, res) => {
    try {
      const { status, noteText, author = 'Admissions Officer' } = req.body;
      applications = loadApplicationsFromDisk();
      const index = applications.findIndex(a => a.id === req.params.id);

      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }

      const oldStatus = applications[index].status;
      applications[index].status = status;
      applications[index].updatedAt = new Date().toISOString();

      if (!applications[index].notes) {
        applications[index].notes = [];
      }

      applications[index].notes.push({
        id: `note-${Date.now()}`,
        author,
        text: noteText || `Status updated from ${oldStatus} to ${status}.`,
        createdAt: new Date().toISOString()
      });

      saveApplicationsToDisk(applications);

      res.json({
        success: true,
        message: 'Status updated successfully',
        application: applications[index]
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 6. ADD COUNSELOR INTERNAL NOTE
  app.post('/api/applications/:id/notes', (req, res) => {
    try {
      const { text, author = 'Admissions Counselor' } = req.body;
      if (!text) {
        return res.status(400).json({ success: false, error: 'Note text is required' });
      }

      applications = loadApplicationsFromDisk();
      const index = applications.findIndex(a => a.id === req.params.id);

      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }

      if (!applications[index].notes) {
        applications[index].notes = [];
      }

      const newNote = {
        id: `note-${Date.now()}`,
        author,
        text,
        createdAt: new Date().toISOString()
      };

      applications[index].notes.unshift(newNote);
      applications[index].updatedAt = new Date().toISOString();

      saveApplicationsToDisk(applications);

      res.json({
        success: true,
        note: newNote,
        notes: applications[index].notes
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 7. TOGGLE DOCUMENT VERIFICATION
  app.patch('/api/applications/:id/documents/:docId/verify', (req, res) => {
    try {
      const { verified } = req.body;
      applications = loadApplicationsFromDisk();
      const appIndex = applications.findIndex(a => a.id === req.params.id);

      if (appIndex === -1) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }

      const docIndex = (applications[appIndex].documents || []).findIndex((d: any) => d.id === req.params.docId);
      if (docIndex === -1) {
        return res.status(404).json({ success: false, error: 'Document not found' });
      }

      applications[appIndex].documents[docIndex].verified = typeof verified === 'boolean' ? verified : !applications[appIndex].documents[docIndex].verified;
      applications[appIndex].updatedAt = new Date().toISOString();

      saveApplicationsToDisk(applications);

      res.json({
        success: true,
        document: applications[appIndex].documents[docIndex]
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8. DELETE APPLICATION
  app.delete('/api/applications/:id', (req, res) => {
    try {
      applications = loadApplicationsFromDisk();
      const initialLength = applications.length;
      applications = applications.filter(a => a.id !== req.params.id);

      if (applications.length === initialLength) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }

      saveApplicationsToDisk(applications);
      res.json({ success: true, message: 'Application deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 9. COUNSELOR / ADMISSIONS PORTAL AUTHENTICATION
  app.post('/api/admin/login', (req, res) => {
    try {
      const { passcode } = req.body;
      // Supported counselor passcodes: 'fresh2026', 'admissions2026', 'myers2026'
      if (passcode === 'fresh2026' || passcode === 'admissions2026' || passcode === 'myers2026') {
        return res.json({
          success: true,
          token: `fsi-auth-${Date.now()}`,
          user: {
            name: 'Admissions Officer',
            role: 'counselor',
            authorized: true
          }
        });
      }

      return res.status(401).json({
        success: false,
        error: 'Invalid admissions portal passkey.'
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // GEMINI CHATBOT ENDPOINT (Multi-turn, role-based, multi-model)
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { 
        messages, 
        role = 'general_advisor', 
        modelType = 'general', // 'fast' | 'general' | 'complex'
        userContext 
      } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      // Map model selection as instructed:
      // complex -> gemini-3.1-pro-preview
      // general -> gemini-3.5-flash
      // fast -> gemini-3.1-flash-lite
      let selectedModel = 'gemini-3.5-flash';
      if (modelType === 'complex') {
        selectedModel = 'gemini-3.1-pro-preview';
      } else if (modelType === 'fast') {
        selectedModel = 'gemini-3.1-flash-lite';
      }

      // Dynamic System Instruction based on specialized role
      let systemInstruction = `You are the official AI Admissions & Counseling Consultant for "Fresh Study India", an international education consultancy and student facilitation agency.

CRITICAL DIRECTIVES:
1. ONLY answer questions about OUR AGENCY ("Fresh Study India"), our services, admission facilitation process, scholarship support, visa coaching, and on-ground student assistance.
2. DO NOT promote, discuss internal proprietary details of, or name-drop specific third-party universities (e.g. do not mention LPU, Lovely Professional University, Chandigarh University, Sharda, Parul, Amity, VIT, SRM, etc.). Instead, refer strictly and professionally to "our partner accredited universities in India (NAAC A++ / A+ rated institutions)".
3. Agency Services Provided by Fresh Study India:
   - Academic Profiling & Program Advising: Engineering (B.Tech/M.Tech, AI & ML, Computer Science), Medicine & Health Sciences (MBBS, Pharmacy, Nursing), Business (BBA, MBA), Computer Applications (BCA, MCA), and Sciences.
   - Institutional Partner Admissions: Direct application processing and official provisional admission letters with no middleman delays.
   - Merit Scholarships: Facilitating 30% to 100% tuition scholarships based on academic records (WASSCE, WAEC, NECO, KCSE, High School Diplomas, Bachelor degrees).
   - Visa & Legal Assistance: Certified bonafide letters, AIU equivalence guidance, Indian Embassy interview coaching, and documentation checks.
   - On-Ground Indian Desk: Airport reception in major Indian international airports (Delhi, Mumbai, Bengaluru, etc.), private campus transfer, on-campus hostel placement, Indian SIM card setup, and on-ground FRRO (Foreigners Regional Registration Office) clearance.
4. Contact & Support Information:
   - Official WhatsApp Desk: +231 889425645
   - Official Email: freshstudyindia@gmail.com
   - Free Consultation: 100% free preliminary profile assessment and scholarship calculation within 24-48 hours.
5. Tone & Structure:
   - Warm, welcoming, professional, well-structured with clear bullet points and headings. Always encourage the student to connect with our agency counselors on WhatsApp (+231 889425645) or apply through the portal.`;

      if (role === 'visa_specialist') {
        systemInstruction += `\n\nActive Mode: VISA & FRRO COMPLIANCE SPECIALIST. Focus on Fresh Study India's visa coaching, documentation requirements, and on-arrival FRRO guidance.`;
      } else if (role === 'scholarship_navigator') {
        systemInstruction += `\n\nActive Mode: SCHOLARSHIP & FINANCIAL NAVIGATOR. Focus on Fresh Study India's scholarship evaluation process, fee transparency, and affordable budget planning.`;
      } else if (role === 'campus_life_guide') {
        systemInstruction += `\n\nActive Mode: STUDENT WELFARE & ON-GROUND SUPPORT GUIDE. Focus on Fresh Study India's airport pickup, hostel placement, safety, dining options, and ongoing student mentorship in India.`;
      }

      if (userContext && typeof userContext === 'object') {
        systemInstruction += `\n\nCurrent Student Context: Name: ${userContext.name || 'Student'}, Target Major: ${userContext.desiredMajor || 'Not specified'}, Country of Origin: ${userContext.country || 'International'}, Academic Level: ${userContext.degreeLevel || 'Undergraduate'}.`;
      }

      // Convert conversation messages into contents format for multi-turn chat
      // Format: { role: 'user' | 'model', parts: [{ text: messageText }] }
      const contents = messages.map((msg: { sender: string; text: string; role?: string }) => ({
        role: msg.sender === 'user' || msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));

      // Generate content with Gemini
      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I'm sorry, I couldn't generate a response. Please try asking again.";

      res.json({
        reply: replyText,
        modelUsed: selectedModel,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      console.error('Error in /api/gemini/chat:', error);
      res.status(500).json({ 
        error: error.message || 'Failed to process Gemini chat request',
        reply: "I encountered an issue connecting to the AI Admissions advisor. Please verify your connection or reach out to our counselors directly."
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fresh Study India server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
