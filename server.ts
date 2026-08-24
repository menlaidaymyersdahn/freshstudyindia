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
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

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

// Helper to load persistent enquiries
function loadEnquiriesFromDisk(): any[] {
  try {
    if (fs.existsSync(ENQUIRIES_FILE)) {
      const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading enquiries file:', err);
  }
  return [];
}

// Helper to persist enquiries to disk
function saveEnquiriesToDisk(enquiries: any[]) {
  try {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing enquiries file:', err);
  }
}

// Initialize server-side Gemini AI client
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
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Load persistent application repository
  let applications: any[] = loadApplicationsFromDisk();
  let enquiries: any[] = loadEnquiriesFromDisk();

  // API Health Endpoint
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      service: 'Myers Global Pathways API',
      totalApplications: applications.length,
      totalEnquiries: enquiries.length,
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
      storageType: 'Secure Private Document Vault'
    });
  });

  // 1. SUBMIT STUDENT ENQUIRY
  app.post('/api/enquiries', (req, res) => {
    try {
      const { fullName, email, whatsapp, country, studyInterest, preferredCourse, preferredUniversity, message } = req.body;

      if (!fullName || !email) {
        return res.status(400).json({ success: false, error: 'Full name and email address are required.' });
      }

      const enquiryId = `ENQ-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

      const newEnquiry = {
        id: enquiryId,
        fullName: String(fullName).trim(),
        email: String(email).trim().toLowerCase(),
        whatsapp: whatsapp ? String(whatsapp).trim() : '',
        country: country ? String(country).trim() : '',
        studyInterest: studyInterest ? String(studyInterest).trim() : '',
        preferredCourse: preferredCourse ? String(preferredCourse).trim() : '',
        preferredUniversity: preferredUniversity ? String(preferredUniversity).trim() : '',
        message: message ? String(message).trim() : '',
        status: 'NEW',
        assignedTo: 'admissions@myersglobalpathways.com',
        createdAt: new Date().toISOString()
      };

      enquiries = loadEnquiriesFromDisk();
      enquiries.unshift(newEnquiry);
      saveEnquiriesToDisk(enquiries);

      console.log(`[Myers Global Pathways] New enquiry received: ${fullName} (${email}) - Course: ${preferredCourse || studyInterest || 'General'}`);

      res.status(201).json({
        success: true,
        enquiryId,
        message: 'Thank you. Your enquiry has been received. Our team will get back to you as soon as possible.'
      });
    } catch (err: any) {
      console.error('Error submitting enquiry:', err);
      res.status(500).json({ success: false, error: 'Failed to process enquiry.' });
    }
  });

  // 2. SUBMIT APPLICATION PROFILE (With private document storage)
  app.post('/api/applications', (req, res) => {
    try {
      const { 
        fullName, 
        email, 
        whatsapp, 
        country, 
        dateOfBirth,
        academicBackground,
        currentQualification, 
        preferredStudyLevel,
        preferredCourse, 
        preferredUniversity,
        message,
        documents = [] 
      } = req.body;
      
      if (!fullName || !email) {
        return res.status(400).json({ success: false, error: 'Full name and email address are required.' });
      }

      const appId = `MGP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const trackingRef = `MGP-IND-${Math.floor(100000 + Math.random() * 900000)}`;

      // Process and store each document file securely
      const savedDocs = (Array.isArray(documents) ? documents : []).map((doc: any, index: number) => {
        const docId = doc.id || `doc-${Date.now()}-${index}`;
        let storedFilePath = '';

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
          type: doc.type || 'application/octet-stream',
          category: doc.category || 'Other Supporting Documents',
          storedFile: storedFilePath || undefined,
          verified: false,
          uploadedAt: new Date().toISOString()
        };
      });

      const newApplication = {
        id: appId,
        trackingId: trackingRef,
        fullName: String(fullName).trim(),
        email: String(email).trim().toLowerCase(),
        whatsapp: whatsapp ? String(whatsapp).trim() : '',
        country: country ? String(country).trim() : '',
        dateOfBirth: dateOfBirth ? String(dateOfBirth).trim() : '',
        academicBackground: academicBackground ? String(academicBackground).trim() : '',
        currentQualification: currentQualification ? String(currentQualification).trim() : '',
        preferredStudyLevel: preferredStudyLevel ? String(preferredStudyLevel).trim() : 'Undergraduate',
        preferredCourse: preferredCourse ? String(preferredCourse).trim() : '',
        preferredUniversity: preferredUniversity ? String(preferredUniversity).trim() : '',
        message: message ? String(message).trim() : '',
        status: 'Application Submitted',
        documentsCount: savedDocs.length,
        documents: savedDocs,
        notes: [
          {
            id: `note-${Date.now()}`,
            author: 'System',
            text: `Application dossier created with ${savedDocs.length} initial document(s).`,
            createdAt: new Date().toISOString()
          }
        ],
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      applications = loadApplicationsFromDisk();
      applications.unshift(newApplication);
      saveApplicationsToDisk(applications);

      console.log(`[Myers Global Pathways] Application registered: ${fullName} (${country}), Target: ${preferredCourse || preferredStudyLevel}, Docs: ${savedDocs.length}, Ref: ${trackingRef}`);

      res.status(201).json({
        success: true,
        applicationId: appId,
        trackingId: trackingRef,
        message: 'Your application has been received. Our admissions team will review your details and contact you.',
        record: {
          id: appId,
          trackingId: trackingRef,
          fullName: newApplication.fullName,
          email: newApplication.email,
          status: newApplication.status,
          documentsCount: savedDocs.length
        }
      });
    } catch (error: any) {
      console.error('Error submitting application:', error);
      res.status(500).json({ success: false, error: error.message || 'Failed to submit application' });
    }
  });

  // 3. STUDENT PORTAL LOOKUP (By Tracking Reference or Email)
  app.get('/api/student/lookup', (req, res) => {
    try {
      const { trackingId, email } = req.query;
      if (!trackingId && !email) {
        return res.status(400).json({ success: false, error: 'Tracking reference or email address required.' });
      }

      applications = loadApplicationsFromDisk();
      let matched = applications.find(a => {
        if (trackingId && String(a.trackingId).trim().toUpperCase() === String(trackingId).trim().toUpperCase()) {
          return true;
        }
        if (email && String(a.email).trim().toLowerCase() === String(email).trim().toLowerCase()) {
          return true;
        }
        return false;
      });

      if (!matched) {
        return res.status(404).json({ 
          success: false, 
          error: 'No application found with the provided details. Please check your reference code or contact admissions@myersglobalpathways.com' 
        });
      }

      // Return sanitized student dossier view
      res.json({
        success: true,
        application: {
          id: matched.id,
          trackingId: matched.trackingId,
          fullName: matched.fullName,
          email: matched.email,
          whatsapp: matched.whatsapp,
          country: matched.country,
          preferredStudyLevel: matched.preferredStudyLevel,
          preferredCourse: matched.preferredCourse,
          preferredUniversity: matched.preferredUniversity,
          status: matched.status || 'Application Submitted',
          documentsCount: matched.documents?.length || 0,
          documents: (matched.documents || []).map((d: any) => ({
            id: d.id,
            name: d.name,
            category: d.category,
            verified: Boolean(d.verified),
            uploadedAt: d.uploadedAt
          })),
          submittedAt: matched.submittedAt,
          updatedAt: matched.updatedAt
        }
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Lookup failed' });
    }
  });

  // 4. GET ALL APPLICATIONS (For Admissions Admin Dashboard)
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
          a.whatsapp?.toLowerCase().includes(q) ||
          a.trackingId?.toLowerCase().includes(q) ||
          a.preferredCourse?.toLowerCase().includes(q) ||
          a.country?.toLowerCase().includes(q)
        );
      }

      const summaryList = filtered.map(app => ({
        id: app.id,
        trackingId: app.trackingId || app.id,
        fullName: app.fullName,
        email: app.email,
        whatsapp: app.whatsapp,
        country: app.country,
        preferredStudyLevel: app.preferredStudyLevel,
        preferredCourse: app.preferredCourse,
        preferredUniversity: app.preferredUniversity,
        currentQualification: app.currentQualification,
        status: app.status || 'Application Submitted',
        documentsCount: app.documents?.length || 0,
        documentsSummary: (app.documents || []).map((d: any) => ({
          id: d.id,
          name: d.name,
          category: d.category,
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

  // 5. GET SINGLE APPLICATION DOSSIER (Complete with notes)
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

  // 6. UPDATE APPLICATION STATUS
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
        text: noteText || `Status updated from "${oldStatus}" to "${status}".`,
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

  // 7. ADD COUNSELOR INTERNAL NOTE
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
        text: String(text).trim(),
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

  // 8. TOGGLE DOCUMENT VERIFICATION
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

  // 9. ADMIN DASHBOARD AUTHENTICATION
  app.post('/api/admin/login', (req, res) => {
    try {
      const { passcode } = req.body;
      // Supported admin passkeys
      if (passcode === 'myers2026' || passcode === 'admissions2026') {
        return res.json({
          success: true,
          token: `mgp-auth-${Date.now()}`,
          user: {
            name: 'Myers Global Pathways Admissions Officer',
            role: 'admissions_counselor',
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

  // 10. GEMINI ADMISSIONS ADVISORY ENDPOINT
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { messages, userContext } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      const systemInstruction = `You are the official Admissions Guidance Assistant for Myers Global Pathways ("Your Pathway to Global Education").

ABOUT MYERS GLOBAL PATHWAYS:
- International education consultancy helping international students pursue higher education in India.
- Services: Study in India guidance, University selection, Course selection, Admission guidance, Application assistance, Documentation guidance, Visa guidance, Pre-departure guidance, Arrival support, Student support.
- Core Values: Trust, Professionalism, Global Education, Student Support, Transparency, Modern India, International Opportunities.

OFFICIAL EMAIL DIRECTORY (All verified @myersglobalpathways.com):
- General Enquiries: info@myersglobalpathways.com
- Admissions: admissions@myersglobalpathways.com
- Applications: applications@myersglobalpathways.com
- Student Support: support@myersglobalpathways.com
- Partnerships: partnerships@myersglobalpathways.com
- Careers: careers@myersglobalpathways.com
- Collaborations: collab@myersglobalpathways.com
- Contact: contact@myersglobalpathways.com
- Founder / Administration: menlaiday@myersglobalpathways.com

IMPORTANT POLICIES:
- Do not invent statistics, awards, partnerships, student numbers, success rates, reviews, or office locations.
- Speak in a calm, professional, supportive, and sophisticated editorial tone.
- Guide students toward starting their application or reaching out to the admissions team at admissions@myersglobalpathways.com.`;

      const contents = messages.map((msg: { sender: string; text: string; role?: string }) => ({
        role: msg.sender === 'user' || msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({
        reply: response.text || "Thank you for reaching out to Myers Global Pathways. Please connect with our admissions team at admissions@myersglobalpathways.com for personalized guidance.",
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      console.error('Error in /api/gemini/chat:', error);
      res.status(500).json({ 
        error: error.message || 'Failed to process advisory request',
        reply: "Our admissions advisors are available to help. Please reach out to admissions@myersglobalpathways.com or submit your enquiry through our portal."
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
    console.log(`Myers Global Pathways server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
