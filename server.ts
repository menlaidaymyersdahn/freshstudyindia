import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

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
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // In-memory application profile storage
  const applications: any[] = [];

  // API Health Endpoint
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      service: 'Fresh Study India API',
      totalApplications: applications.length,
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY)
    });
  });

  // STUDENT APPLICATION SUBMISSION ENDPOINT WITH DOCUMENT ATTACHMENTS
  app.post('/api/applications', (req, res) => {
    try {
      const { fullName, phone, email, country, studyField, qualification, documents = [] } = req.body;
      
      if (!fullName || !phone) {
        return res.status(400).json({ success: false, error: 'Full name and phone are required.' });
      }

      const applicationRecord = {
        id: `FSI-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        fullName,
        phone,
        email: email || '',
        country: country || 'Liberia',
        studyField: studyField || 'Computer Science',
        qualification: qualification || 'High School Diploma (WAEC / WASSCE)',
        documents: Array.isArray(documents) ? documents.map((doc: any) => ({
          id: doc.id || Math.random().toString(),
          name: doc.name || 'Document',
          size: doc.size || 0,
          formattedSize: doc.formattedSize || 'N/A',
          type: doc.type || 'file',
          category: doc.category || 'Other Supporting Documents',
          hasData: Boolean(doc.dataUrl)
        })) : [],
        submittedAt: new Date().toISOString()
      };

      applications.unshift(applicationRecord);
      console.log(`[Fresh Study India Admissions] Application received for: ${fullName} (${country}), Target: ${studyField}, Documents: ${applicationRecord.documents.length}`);

      res.status(201).json({
        success: true,
        applicationId: applicationRecord.id,
        message: 'Application profile and documents submitted securely.',
        record: {
          id: applicationRecord.id,
          fullName: applicationRecord.fullName,
          documentsCount: applicationRecord.documents.length
        }
      });
    } catch (error: any) {
      console.error('Error submitting application:', error);
      res.status(500).json({ success: false, error: error.message || 'Failed to submit application' });
    }
  });

  app.get('/api/applications', (req, res) => {
    res.json({
      success: true,
      count: applications.length,
      applications: applications.map(app => ({
        id: app.id,
        fullName: app.fullName,
        country: app.country,
        studyField: app.studyField,
        qualification: app.qualification,
        documentsCount: app.documents?.length || 0,
        submittedAt: app.submittedAt
      }))
    });
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
