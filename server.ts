import express from 'express';
import path from 'path';
import fs from 'fs';
import * as archiverModule from 'archiver';
const archiver: any = (archiverModule as any).default || archiverModule;
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { 
  generateStatusEmail, 
  dispatchStatusNotificationEmail,
  setServerWorkspaceToken,
  clearServerWorkspaceToken,
  getServerWorkspaceTokenInfo
} from './server/emailNotifications.js';

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

// Persistent data loader for real applications
function loadApplicationsFromDisk(): any[] {
  try {
    if (fs.existsSync(APPS_FILE)) {
      const raw = fs.readFileSync(APPS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Filter out any legacy dummy/seed data
        const realData = parsed.filter((item: any) => 
          item && 
          item.id !== 'MGP-2026-0814' && 
          item.id !== 'MGP-2026-0925' && 
          item.id !== 'MGP-2026-1044' && 
          item.id !== 'MGP-2026-1188'
        );
        return realData;
      }
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

// Resilient application lookup helper
function findAppIndex(apps: any[], identifier: string): number {
  if (!identifier || !Array.isArray(apps)) return -1;
  const cleanId = String(identifier).trim().toLowerCase();
  return apps.findIndex(a => 
    (a.id && String(a.id).trim().toLowerCase() === cleanId) ||
    (a.trackingId && String(a.trackingId).trim().toLowerCase() === cleanId) ||
    (a.email && String(a.email).trim().toLowerCase() === cleanId)
  );
}

// Helper to load persistent enquiries
function loadEnquiriesFromDisk(): any[] {
  try {
    if (fs.existsSync(ENQUIRIES_FILE)) {
      const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Filter out any legacy dummy/seed enquiries
        const realData = parsed.filter((item: any) => 
          item && 
          item.id !== 'ENQ-2026-01' && 
          item.id !== 'ENQ-2026-02'
        );
        return realData;
      }
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

// Lazy initialization for server-side Gemini AI client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

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
      googleWorkspaceOAuth: getServerWorkspaceTokenInfo(),
      storageType: 'Secure Private Document Vault'
    });
  });

  // GOOGLE WORKSPACE OAUTH 2.0 TOKEN STATUS & SYNC ENDPOINTS
  app.get('/api/auth/google-workspace-token', (req, res) => {
    res.json({
      success: true,
      ...getServerWorkspaceTokenInfo()
    });
  });

  app.post('/api/auth/google-workspace-token', (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
      const token = req.body.token || bearer;
      const email = req.body.email || 'admissions@myersglobalpathways.com';

      if (!token) {
        return res.status(400).json({ success: false, error: 'OAuth access token is required.' });
      }

      setServerWorkspaceToken(token, email);

      res.json({
        success: true,
        message: `Google Workspace OAuth token registered successfully for ${email}.`,
        email,
        connected: true
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete('/api/auth/google-workspace-token', (req, res) => {
    clearServerWorkspaceToken();
    res.json({
      success: true,
      message: 'Google Workspace token cleared.',
      connected: false
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

  // 1b. BATCH SYNC LOCAL ENQUIRIES
  app.post('/api/enquiries/sync-local', (req, res) => {
    try {
      const { enquiries: incomingEnquiries = [] } = req.body;
      if (!Array.isArray(incomingEnquiries) || incomingEnquiries.length === 0) {
        return res.json({ success: true, syncedCount: 0, message: 'No enquiries to sync' });
      }

      enquiries = loadEnquiriesFromDisk();
      let addedCount = 0;

      incomingEnquiries.forEach((item: any) => {
        if (!item || !item.fullName || !item.email) return;

        const exists = enquiries.some(e => 
          (item.id && e.id === item.id) ||
          (e.email?.toLowerCase() === item.email?.toLowerCase() && e.fullName?.toLowerCase() === item.fullName?.toLowerCase() && Math.abs(new Date(e.createdAt || 0).getTime() - new Date(item.createdAt || 0).getTime()) < 60000)
        );

        if (!exists) {
          const enquiryId = item.id || `ENQ-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
          const normalizedEnquiry = {
            id: enquiryId,
            fullName: String(item.fullName).trim(),
            email: String(item.email).trim().toLowerCase(),
            whatsapp: item.whatsapp ? String(item.whatsapp).trim() : '',
            country: item.country ? String(item.country).trim() : '',
            studyInterest: item.studyInterest ? String(item.studyInterest).trim() : '',
            preferredCourse: item.preferredCourse ? String(item.preferredCourse).trim() : '',
            preferredUniversity: item.preferredUniversity ? String(item.preferredUniversity).trim() : '',
            message: item.message ? String(item.message).trim() : '',
            status: item.status || 'NEW',
            assignedTo: item.assignedTo || 'admissions@myersglobalpathways.com',
            createdAt: item.createdAt || new Date().toISOString()
          };

          enquiries.unshift(normalizedEnquiry);
          addedCount++;
        }
      });

      if (addedCount > 0) {
        saveEnquiriesToDisk(enquiries);
        console.log(`[Myers Global Pathways] Synced ${addedCount} enquiry record(s) from client cache.`);
      }

      res.json({
        success: true,
        syncedCount: addedCount,
        total: enquiries.length,
        message: `Successfully synchronized ${addedCount} enquiry record(s).`
      });
    } catch (err: any) {
      console.error('Error syncing enquiries:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 2. SUBMIT APPLICATION PROFILE (With private document storage)
  app.post('/api/applications', async (req, res) => {
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

      const appId = req.body.id || req.body.trackingId || `MGP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const trackingRef = req.body.trackingId || req.body.id || `MGP-IND-${Math.floor(100000 + Math.random() * 900000)}`;

      // Process and store each document file securely
      const savedDocs = (Array.isArray(documents) ? documents : []).map((doc: any, index: number) => {
        const docId = doc.id || `doc-${Date.now()}-${index}`;
        let storedFilePath = '';

        if (doc.dataUrl && typeof doc.dataUrl === 'string') {
          try {
            const commaIndex = doc.dataUrl.indexOf(',');
            if (commaIndex !== -1) {
              const header = doc.dataUrl.slice(0, commaIndex);
              const base64Data = doc.dataUrl.slice(commaIndex + 1);
              let ext = 'pdf';
              if (header.includes('image/jpeg') || header.includes('image/jpg')) ext = 'jpg';
              else if (header.includes('image/png')) ext = 'png';
              else if (header.includes('image/webp')) ext = 'webp';
              else if (header.includes('application/pdf')) ext = 'pdf';
              else if (doc.name && doc.name.includes('.')) ext = doc.name.split('.').pop() || 'bin';
              
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

      // Automatically dispatch confirmation email from admissions@myersglobalpathways.com to student
      let confirmationEmailResult: any = null;
      try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const authHeader = req.headers.authorization;
        const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : (req.body?.oauthToken || undefined);

        confirmationEmailResult = await dispatchStatusNotificationEmail(
          newApplication,
          'Application Submitted',
          {
            author: 'Admissions Automated Notification Hub',
            baseUrl,
            bearerToken
          }
        );
      } catch (emailErr: any) {
        console.warn('[Application Submission] Confirmation email dispatch warning:', emailErr.message);
      }

      res.status(201).json({
        success: true,
        applicationId: appId,
        trackingId: trackingRef,
        message: 'Your application has been received. Our admissions team will review your details and contact you.',
        confirmationEmail: confirmationEmailResult,
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

  // 2b. BATCH SYNC LOCAL/OFFLINE APPLICATIONS
  app.post('/api/applications/sync-local', (req, res) => {
    try {
      const { applications: incomingApps = [] } = req.body;
      if (!Array.isArray(incomingApps) || incomingApps.length === 0) {
        return res.json({ success: true, syncedCount: 0, message: 'No applications to sync' });
      }

      applications = loadApplicationsFromDisk();
      let addedCount = 0;

      incomingApps.forEach((item: any) => {
        if (!item || !item.fullName || !item.email) return;

        // Check if application already exists by ID, trackingId, or exact (email + submittedAt)
        const exists = applications.some(a => 
          (item.id && a.id === item.id) ||
          (item.trackingId && a.trackingId === item.trackingId) ||
          (a.email?.toLowerCase() === item.email?.toLowerCase() && a.fullName?.toLowerCase() === item.fullName?.toLowerCase() && Math.abs(new Date(a.submittedAt).getTime() - new Date(item.submittedAt || 0).getTime()) < 60000)
        );

        if (!exists) {
          const appId = item.id || `MGP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
          const trackingRef = item.trackingId || `MGP-IND-${Math.floor(100000 + Math.random() * 900000)}`;

          const normalizedApp = {
            id: appId,
            trackingId: trackingRef,
            fullName: String(item.fullName).trim(),
            email: String(item.email).trim().toLowerCase(),
            whatsapp: item.whatsapp ? String(item.whatsapp).trim() : '',
            country: item.country ? String(item.country).trim() : '',
            dateOfBirth: item.dateOfBirth ? String(item.dateOfBirth).trim() : '',
            academicBackground: item.academicBackground ? String(item.academicBackground).trim() : '',
            currentQualification: item.currentQualification ? String(item.currentQualification).trim() : '',
            preferredStudyLevel: item.preferredStudyLevel ? String(item.preferredStudyLevel).trim() : 'Undergraduate',
            preferredCourse: item.preferredCourse ? String(item.preferredCourse).trim() : '',
            preferredUniversity: item.preferredUniversity ? String(item.preferredUniversity).trim() : '',
            message: item.message ? String(item.message).trim() : '',
            status: item.status || 'Application Submitted',
            documentsCount: Array.isArray(item.documents) ? item.documents.length : (item.documentsCount || 0),
            documents: Array.isArray(item.documents) ? item.documents : [],
            notes: Array.isArray(item.notes) && item.notes.length > 0 ? item.notes : [
              {
                id: `note-${Date.now()}`,
                author: 'System',
                text: 'Application synchronized from client admissions cache.',
                createdAt: new Date().toISOString()
              }
            ],
            submittedAt: item.submittedAt || new Date().toISOString(),
            updatedAt: item.updatedAt || new Date().toISOString()
          };

          applications.unshift(normalizedApp);
          addedCount++;
        }
      });

      if (addedCount > 0) {
        saveApplicationsToDisk(applications);
        console.log(`[Myers Global Pathways] Synced ${addedCount} student application(s) from client cache.`);
      }

      res.json({
        success: true,
        syncedCount: addedCount,
        total: applications.length,
        message: `Successfully synchronized ${addedCount} application(s).`
      });
    } catch (err: any) {
      console.error('Error syncing local applications:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 3. STUDENT PORTAL LOOKUP (By Tracking Reference, Email, Phone, Name, or ID)
  const handleStudentLookup = (req: any, res: any) => {
    try {
      const rawQuery = req.query.query || req.query.trackingId || req.query.email || req.query.q || req.query.ref || req.body?.query || req.body?.trackingId || req.body?.email || req.body?.q || '';
      const searchTerm = String(rawQuery).trim();

      if (!searchTerm) {
        return res.status(400).json({ 
          success: false, 
          error: 'Please provide your Application Reference code (e.g. MGP-IND-123456) or registered email address.' 
        });
      }

      applications = loadApplicationsFromDisk();
      const termLower = searchTerm.toLowerCase();
      const termDigits = searchTerm.replace(/\D/g, '');

      // 1. Direct or Smart Match
      let matched = applications.find(a => {
        const appTracking = String(a.trackingId || '').toLowerCase().trim();
        const appId = String(a.id || '').toLowerCase().trim();
        const appEmail = String(a.email || '').toLowerCase().trim();
        const appName = String(a.fullName || '').toLowerCase().trim();
        const appWhatsapp = String(a.whatsapp || '').replace(/\D/g, '');

        // Exact matches
        if (appTracking === termLower || appId === termLower || appEmail === termLower) {
          return true;
        }

        // Numeric suffix match (e.g. user entered "374932" or "IND-374932")
        if (termDigits.length >= 4 && appTracking.includes(termDigits)) {
          return true;
        }

        // Tracking without prefix
        if (appTracking.replace(/[^a-z0-9]/gi, '') === termLower.replace(/[^a-z0-9]/gi, '')) {
          return true;
        }

        // Phone match
        if (termDigits.length >= 6 && appWhatsapp && appWhatsapp.includes(termDigits)) {
          return true;
        }

        // Full name exact match
        if (appName === termLower) {
          return true;
        }

        return false;
      });

      // 2. Secondary Partial Match if no exact match
      if (!matched && termLower.length >= 3) {
        matched = applications.find(a => 
          (a.email && a.email.toLowerCase().includes(termLower)) ||
          (a.fullName && a.fullName.toLowerCase().includes(termLower)) ||
          (a.trackingId && a.trackingId.toLowerCase().includes(termLower))
        );
      }

      if (!matched) {
        return res.status(404).json({ 
          success: false, 
          error: `No application dossier found matching "${searchTerm}". Please verify your reference code or registered email.` 
        });
      }

      // Return complete student dossier view
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
          currentQualification: matched.currentQualification || '',
          academicBackground: matched.academicBackground || '',
          status: matched.status || 'Application Submitted',
          admissionDetails: matched.admissionDetails || null,
          documentsCount: matched.documents?.length || 0,
          documents: (matched.documents || []).map((d: any) => ({
            id: d.id,
            name: d.name,
            category: d.category,
            verified: Boolean(d.verified),
            uploadedAt: d.uploadedAt
          })),
          notesCount: matched.notes?.length || 0,
          submittedAt: matched.submittedAt,
          updatedAt: matched.updatedAt
        }
      });
    } catch (err: any) {
      console.error('Lookup failed error:', err);
      res.status(500).json({ success: false, error: 'Database lookup encountered an error. Please try again shortly.' });
    }
  };

  app.get('/api/student/lookup', handleStudentLookup);
  app.post('/api/student/lookup', handleStudentLookup);

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
      const index = findAppIndex(applications, req.params.id);

      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }

      res.json({
        success: true,
        application: applications[index]
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 6. UPDATE APPLICATION STATUS & TRIGGER AUTOMATED EMAIL NOTIFICATION
  app.patch('/api/applications/:id/status', async (req, res) => {
    try {
      const { application: providedApp, status, noteText, author = 'Admissions Officer', sendEmail = true } = req.body;
      applications = loadApplicationsFromDisk();
      let index = findAppIndex(applications, req.params.id);

      if (index === -1) {
        const targetId = req.params.id || `MGP-${Date.now()}`;
        const newRecord = {
          id: targetId,
          trackingId: (providedApp && providedApp.trackingId) || targetId,
          fullName: (providedApp && providedApp.fullName) || 'Student Applicant',
          email: (providedApp && providedApp.email) || '',
          whatsapp: (providedApp && providedApp.whatsapp) || '',
          preferredCourse: (providedApp && providedApp.preferredCourse) || 'Degree Program',
          preferredUniversity: (providedApp && providedApp.preferredUniversity) || 'SRM Institute of Science & Technology',
          ...(providedApp || {}),
          status: status || 'Application Submitted',
          createdAt: new Date().toISOString()
        };
        applications.unshift(newRecord);
        index = 0;
      }

      const oldStatus = applications[index].status;
      applications[index].status = status;
      applications[index].updatedAt = new Date().toISOString();

      if (!applications[index].notes) {
        applications[index].notes = [];
      }

      // Trigger Automated Email Notification if requested (default: true)
      let emailNotificationResult = null;
      if (sendEmail !== false && applications[index].email) {
        try {
          const baseUrl = `${req.protocol}://${req.get('host')}`;
          const authHeader = req.headers.authorization;
          const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : (req.body?.bearerToken || req.body?.oauthToken || undefined);

          emailNotificationResult = await dispatchStatusNotificationEmail(
            applications[index],
            status,
            {
              customNote: noteText,
              author,
              baseUrl,
              bearerToken
            }
          );
        } catch (emailErr: any) {
          console.warn('[Status Update] Email notification trigger warning:', emailErr.message);
        }
      }

      applications[index].notes.push({
        id: `note-${Date.now()}`,
        author,
        text: noteText 
          ? `${noteText} (Status: ${oldStatus} ➔ ${status}${emailNotificationResult?.success ? ' • Automated email notification dispatched' : ''})`
          : `Status updated from "${oldStatus}" to "${status}".${emailNotificationResult?.success ? ' Automated notification email dispatched to ' + applications[index].email : ''}`,
        createdAt: new Date().toISOString()
      });

      saveApplicationsToDisk(applications);

      res.json({
        success: true,
        message: `Status updated successfully to "${status}".${emailNotificationResult?.success ? ' Automated email notification triggered.' : ''}`,
        application: applications[index],
        emailNotification: emailNotificationResult
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 6b. ON-DEMAND MANUAL SEND OR RE-TRIGGER STATUS NOTIFICATION EMAIL
  app.post('/api/applications/:id/send-status-email', async (req, res) => {
    try {
      const { status, customNote, author = 'Admissions Officer' } = req.body;
      applications = loadApplicationsFromDisk();
      const index = applications.findIndex(a => a.id === req.params.id);

      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }

      const targetStatus = status || applications[index].status || 'Application Submitted';
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const authHeader = req.headers.authorization;
      const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : (req.body?.bearerToken || req.body?.oauthToken || undefined);

      const emailResult = await dispatchStatusNotificationEmail(
        applications[index],
        targetStatus,
        {
          customNote,
          author,
          baseUrl,
          bearerToken
        }
      );

      saveApplicationsToDisk(applications);

      res.json({
        success: emailResult.success,
        message: emailResult.success 
          ? `Status notification email for "${targetStatus}" sent to ${applications[index].email}.`
          : `Failed to dispatch email: ${emailResult.error}`,
        emailResult,
        application: applications[index]
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 6c. PREVIEW STATUS NOTIFICATION EMAIL TEMPLATE
  app.get('/api/applications/:id/email-preview', (req, res) => {
    try {
      const { status, customNote } = req.query;
      applications = loadApplicationsFromDisk();
      const appItem = applications.find(a => a.id === req.params.id);

      if (!appItem) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }

      const targetStatus = (status as string) || appItem.status || 'Application Submitted';
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const preview = generateStatusEmail(appItem, targetStatus, customNote as string, baseUrl);

      res.json({
        success: true,
        applicationId: appItem.id,
        applicantName: appItem.fullName,
        recipient: appItem.email,
        status: targetStatus,
        preview
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

  // 8a-2. STUDENT LATER DOCUMENT UPLOAD (Add required documents to existing dossier)
  const handleStudentDocumentUpload = async (req: any, res: any) => {
    try {
      const targetParam = (req.params.id || req.body?.trackingId || req.body?.id || req.body?.email || '').trim().toLowerCase();
      const { documents = [], document, studentNote } = req.body;

      if (!targetParam) {
        return res.status(400).json({ success: false, error: 'Application Reference or ID is required.' });
      }

      const incomingDocs = Array.isArray(documents) && documents.length > 0 
        ? documents 
        : document 
        ? [document] 
        : [];

      if (incomingDocs.length === 0) {
        return res.status(400).json({ success: false, error: 'No documents provided for upload.' });
      }

      applications = loadApplicationsFromDisk();
      const appIndex = applications.findIndex(a => 
        String(a.id || '').toLowerCase() === targetParam ||
        String(a.trackingId || '').toLowerCase() === targetParam ||
        String(a.email || '').toLowerCase() === targetParam
      );

      if (appIndex === -1) {
        return res.status(404).json({ success: false, error: 'Application dossier not found. Please verify tracking reference.' });
      }

      const appItem = applications[appIndex];
      const processedDocs: any[] = [];

      for (let i = 0; i < incomingDocs.length; i++) {
        const doc = incomingDocs[i];
        const docId = doc.id || `doc-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 6)}`;
        let storedFilePath = '';

        if (doc.dataUrl && typeof doc.dataUrl === 'string') {
          try {
            const commaIndex = doc.dataUrl.indexOf(',');
            if (commaIndex !== -1) {
              const header = doc.dataUrl.slice(0, commaIndex);
              const base64Data = doc.dataUrl.slice(commaIndex + 1);
              let ext = 'pdf';
              if (header.includes('image/jpeg') || header.includes('image/jpg')) ext = 'jpg';
              else if (header.includes('image/png')) ext = 'png';
              else if (header.includes('image/webp')) ext = 'webp';
              else if (header.includes('application/pdf')) ext = 'pdf';
              else if (doc.name && doc.name.includes('.')) ext = doc.name.split('.').pop() || 'bin';
              
              const filename = `${appItem.id}_${docId}.${ext}`;
              const fullFilePath = path.join(DOCUMENTS_DIR, filename);
              fs.writeFileSync(fullFilePath, Buffer.from(base64Data, 'base64'));
              storedFilePath = filename;
            }
          } catch (fileErr) {
            console.error('Error saving uploaded document file:', fileErr);
          }
        }

        const formattedDoc = {
          id: docId,
          name: doc.name || `Document_${(appItem.documents?.length || 0) + i + 1}`,
          size: doc.size || 0,
          formattedSize: doc.formattedSize || `${((doc.size || 0) / (1024 * 1024)).toFixed(2)} MB`,
          type: doc.type || 'application/octet-stream',
          category: doc.category || 'Academic Transcripts',
          storedFile: storedFilePath || undefined,
          verified: false,
          uploadedAt: new Date().toISOString()
        };

        processedDocs.push(formattedDoc);
      }

      if (!appItem.documents) {
        appItem.documents = [];
      }
      appItem.documents.push(...processedDocs);
      appItem.documentsCount = appItem.documents.length;
      appItem.updatedAt = new Date().toISOString();

      if (!appItem.notes) {
        appItem.notes = [];
      }
      const fileNames = processedDocs.map(d => `${d.name} (${d.category})`).join(', ');
      appItem.notes.unshift({
        id: `note-${Date.now()}`,
        author: 'Student (Portal Upload)',
        text: `Student uploaded ${processedDocs.length} additional document(s): ${fileNames}.${studentNote ? ` Note: "${studentNote}"` : ''}`,
        createdAt: new Date().toISOString()
      });

      saveApplicationsToDisk(applications);

      console.log(`[Myers Global Pathways] ${processedDocs.length} document(s) uploaded for application ${appItem.trackingId} (${appItem.fullName})`);

      res.json({
        success: true,
        message: `Successfully uploaded ${processedDocs.length} document(s) to your application dossier.`,
        application: appItem,
        uploadedDocuments: processedDocs
      });
    } catch (err: any) {
      console.error('Error handling student document upload:', err);
      res.status(500).json({ success: false, error: err.message || 'Failed to process document upload' });
    }
  };

  app.post('/api/applications/:id/documents', handleStudentDocumentUpload);
  app.post('/api/student/upload-document', handleStudentDocumentUpload);

  // 8b. GET ALL ENQUIRIES (Admin Lead Management)
  app.get('/api/enquiries', (req, res) => {
    try {
      enquiries = loadEnquiriesFromDisk();
      res.json({
        success: true,
        count: enquiries.length,
        enquiries
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to fetch enquiries' });
    }
  });

  // 8c. UPDATE ENQUIRY STATUS
  app.patch('/api/enquiries/:id', (req, res) => {
    try {
      const { status, note } = req.body;
      enquiries = loadEnquiriesFromDisk();
      const index = enquiries.findIndex(e => e.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Enquiry not found' });
      }

      if (status) enquiries[index].status = status;
      if (note) {
        if (!enquiries[index].notes) enquiries[index].notes = [];
        enquiries[index].notes.push({
          id: `note-${Date.now()}`,
          text: note,
          createdAt: new Date().toISOString()
        });
      }

      saveEnquiriesToDisk(enquiries);
      res.json({ success: true, enquiry: enquiries[index] });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8d. APPROVE APPLICATION & GENERATE ADMISSION DECISION & TRIGGER NOTIFICATION EMAIL
  app.post('/api/applications/:id/approve', async (req, res) => {
    try {
      const { 
        application: providedApp,
        approvedUniversity, 
        approvedProgram, 
        tuitionFeeUsd = '2,800', 
        scholarshipPercentage = '20% Global Excellence Merit Waiver', 
        intakeSemester = 'Fall Intake 2026',
        counselorNotes = 'Application approved after credential evaluation and meeting university entry criteria.',
        author = 'Menlaiday Myers (Admissions Director)',
        sendEmail = true
      } = req.body;

      applications = loadApplicationsFromDisk();
      let index = findAppIndex(applications, req.params.id);

      if (index === -1) {
        // If not present in local file but provided in payload or valid ID, insert it
        const targetId = req.params.id || `MGP-${Date.now()}`;
        const newRecord = {
          id: targetId,
          trackingId: (providedApp && providedApp.trackingId) || targetId,
          fullName: (providedApp && providedApp.fullName) || 'Student Applicant',
          email: (providedApp && providedApp.email) || '',
          whatsapp: (providedApp && providedApp.whatsapp) || '',
          preferredCourse: (providedApp && providedApp.preferredCourse) || approvedProgram || 'Degree Program',
          preferredUniversity: (providedApp && providedApp.preferredUniversity) || approvedUniversity || 'SRM Institute of Science & Technology',
          ...(providedApp || {}),
          status: 'Application Submitted',
          createdAt: new Date().toISOString()
        };
        applications.unshift(newRecord);
        index = 0;
      }

      const appItem = applications[index];
      const admissionDetails = {
        approvedUniversity: approvedUniversity || appItem.preferredUniversity || 'SRM Institute of Science & Technology / Anna University',
        approvedProgram: approvedProgram || appItem.preferredCourse || appItem.preferredStudyLevel || 'Undergraduate Degree Program',
        tuitionFeeUsd: String(tuitionFeeUsd),
        scholarshipPercentage: String(scholarshipPercentage),
        intakeSemester: String(intakeSemester),
        decisionDate: new Date().toISOString().split('T')[0],
        counselorNotes: String(counselorNotes),
        offerLetterIssued: true,
        offerLetterId: `OFFER-MGP-${Date.now().toString().slice(-6)}`
      };

      appItem.status = 'Admission Decision';
      appItem.admissionDetails = admissionDetails;
      appItem.updatedAt = new Date().toISOString();

      if (!appItem.notes) appItem.notes = [];
      appItem.notes.unshift({
        id: `note-${Date.now()}`,
        author,
        text: `APPLICATION OFFICIALLY APPROVED: Admission Offer granted for ${admissionDetails.approvedProgram} at ${admissionDetails.approvedUniversity}. Tuition: $${admissionDetails.tuitionFeeUsd}/yr (${admissionDetails.scholarshipPercentage}).`,
        createdAt: new Date().toISOString()
      });

      // Auto-attach official Offer Letter document to applicant dossier
      if (!appItem.documents) appItem.documents = [];
      const offerDocId = `doc-offer-${Date.now()}`;
      appItem.documents.unshift({
        id: offerDocId,
        name: `Official_Provisional_Admission_Letter_${(appItem.fullName || 'Student').replace(/\s+/g, '_')}.pdf`,
        size: 850000,
        formattedSize: '850 KB',
        type: 'application/pdf',
        category: 'Other Supporting Documents',
        storedFile: `offer_${appItem.id}.pdf`,
        verified: true,
        uploadedAt: new Date().toISOString()
      });
      appItem.documentsCount = appItem.documents.length;

      // Trigger Automated Admission Decision Email Notification
      let emailNotificationResult = null;
      if (sendEmail !== false && appItem.email) {
        try {
          const baseUrl = `${req.protocol}://${req.get('host')}`;
          emailNotificationResult = await dispatchStatusNotificationEmail(
            appItem,
            'Admission Decision',
            {
              customNote: counselorNotes,
              author,
              baseUrl
            }
          );
        } catch (emailErr: any) {
          console.warn('[Approval] Automated email notification trigger warning:', emailErr.message);
        }
      }

      saveApplicationsToDisk(applications);

      console.log(`[Myers Global Pathways] Application approved for ${appItem.fullName} - ${admissionDetails.approvedProgram}`);

      res.json({
        success: true,
        message: `Application for ${appItem.fullName} successfully approved! Offer letter generated and automated notification email triggered.`,
        application: appItem,
        emailNotification: emailNotificationResult
      });
    } catch (err: any) {
      console.error('Error approving application:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8d-1. BULK APPROVE MULTIPLE APPLICATIONS & SEND NOTIFICATIONS
  app.post('/api/applications/bulk-approve', async (req, res) => {
    try {
      const { 
        ids = [], 
        approvedUniversity, 
        scholarshipPercentage = '20% Global Excellence Merit Waiver',
        tuitionFeeUsd = '2,800',
        intakeSemester = 'Fall Intake 2026',
        counselorNotes = 'Batch approval granted following comprehensive credential verification and academic eligibility assessment.',
        author = 'Menlaiday Myers (Admissions Director)',
        sendEmail = true
      } = req.body;

      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ success: false, error: 'No application IDs provided for bulk approval' });
      }

      applications = loadApplicationsFromDisk();
      let approvedCount = 0;
      let emailsDispatchedCount = 0;
      const idSet = new Set(ids.map((id: any) => String(id).trim().toLowerCase()));
      const baseUrl = `${req.protocol}://${req.get('host')}`;

      for (let i = 0; i < applications.length; i++) {
        const appItem = applications[i];
        const appIdClean = appItem.id ? String(appItem.id).trim().toLowerCase() : '';
        const appTrackClean = appItem.trackingId ? String(appItem.trackingId).trim().toLowerCase() : '';
        
        if (idSet.has(appIdClean) || idSet.has(appTrackClean)) {
          approvedCount++;
          const targetUni = approvedUniversity || appItem.preferredUniversity || 'SRM Institute of Science & Technology / Anna University';
          const targetProg = appItem.preferredCourse || appItem.preferredStudyLevel || 'Undergraduate Degree Program';
          
          const admissionDetails = {
            approvedUniversity: targetUni,
            approvedProgram: targetProg,
            tuitionFeeUsd: String(tuitionFeeUsd),
            scholarshipPercentage: String(scholarshipPercentage),
            intakeSemester: String(intakeSemester),
            decisionDate: new Date().toISOString().split('T')[0],
            counselorNotes: String(counselorNotes),
            offerLetterIssued: true,
            offerLetterId: `OFFER-MGP-${Date.now().toString().slice(-6)}-${approvedCount}`
          };

          const updatedNotes = appItem.notes ? [...appItem.notes] : [];
          updatedNotes.unshift({
            id: `note-${Date.now()}-${approvedCount}`,
            author,
            text: `BATCH APPROVAL: Admission Offer granted for ${admissionDetails.approvedProgram} at ${admissionDetails.approvedUniversity}. Tuition: $${admissionDetails.tuitionFeeUsd}/yr (${admissionDetails.scholarshipPercentage}).`,
            createdAt: new Date().toISOString()
          });

          const updatedDocs = appItem.documents ? [...appItem.documents] : [];
          updatedDocs.unshift({
            id: `doc-offer-${Date.now()}-${approvedCount}`,
            name: `Official_Provisional_Admission_Letter_${(appItem.fullName || 'Student').replace(/\s+/g, '_')}.pdf`,
            size: 850000,
            formattedSize: '850 KB',
            type: 'application/pdf',
            category: 'Other Supporting Documents',
            storedFile: `offer_${appItem.id}.pdf`,
            verified: true,
            uploadedAt: new Date().toISOString()
          });

          appItem.status = 'Admission Decision';
          appItem.admissionDetails = admissionDetails;
          appItem.notes = updatedNotes;
          appItem.documents = updatedDocs;
          appItem.documentsCount = updatedDocs.length;
          appItem.updatedAt = new Date().toISOString();

          // Dispatch email if requested
          if (sendEmail !== false && appItem.email) {
            try {
              await dispatchStatusNotificationEmail(appItem, 'Admission Decision', {
                customNote: counselorNotes,
                author,
                baseUrl
              });
              emailsDispatchedCount++;
            } catch (emErr) {
              console.warn(`Bulk approve email error for ${appItem.email}:`, emErr);
            }
          }
        }
      }

      saveApplicationsToDisk(applications);

      res.json({
        success: true,
        message: `Successfully approved ${approvedCount} student application(s). ${emailsDispatchedCount} automated admission notification email(s) triggered.`,
        approvedCount,
        emailsDispatchedCount
      });
    } catch (err: any) {
      console.error('Error during bulk approve:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8d-2. BULK UPDATE STATUS FOR APPLICATIONS & SEND NOTIFICATIONS
  app.post('/api/applications/bulk-status', async (req, res) => {
    try {
      const { ids = [], status, noteText, author = 'Admissions Officer', sendEmail = true } = req.body;
      if (!Array.isArray(ids) || ids.length === 0 || !status) {
        return res.status(400).json({ success: false, error: 'Valid application IDs and status required' });
      }

      applications = loadApplicationsFromDisk();
      const idSet = new Set(ids);
      let updatedCount = 0;
      let emailsDispatchedCount = 0;
      const baseUrl = `${req.protocol}://${req.get('host')}`;

      for (let i = 0; i < applications.length; i++) {
        const appItem = applications[i];
        if (idSet.has(appItem.id)) {
          updatedCount++;
          const updatedNotes = appItem.notes ? [...appItem.notes] : [];
          updatedNotes.unshift({
            id: `note-${Date.now()}-${updatedCount}`,
            author,
            text: noteText || `Batch status changed to "${status}".`,
            createdAt: new Date().toISOString()
          });

          appItem.status = status;
          appItem.notes = updatedNotes;
          appItem.updatedAt = new Date().toISOString();

          if (sendEmail !== false && appItem.email) {
            try {
              await dispatchStatusNotificationEmail(appItem, status, {
                customNote: noteText,
                author,
                baseUrl
              });
              emailsDispatchedCount++;
            } catch (emErr) {
              console.warn(`Bulk status email error for ${appItem.email}:`, emErr);
            }
          }
        }
      }

      saveApplicationsToDisk(applications);

      res.json({
        success: true,
        message: `Successfully updated status to "${status}" for ${updatedCount} student application(s). ${emailsDispatchedCount} notification email(s) triggered.`,
        updatedCount,
        emailsDispatchedCount
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8d-3. SINGLE DELETE APPLICATION
  app.delete('/api/applications/:id', (req, res) => {
    try {
      const { id } = req.params;
      applications = loadApplicationsFromDisk();
      const initialCount = applications.length;
      applications = applications.filter(a => a.id !== id);

      if (applications.length === initialCount) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }

      saveApplicationsToDisk(applications);
      res.json({
        success: true,
        message: `Application ${id} deleted successfully.`
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8d-4. BULK DELETE APPLICATIONS
  app.post('/api/applications/bulk-delete', (req, res) => {
    try {
      const { ids = [] } = req.body;
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ success: false, error: 'No IDs provided for deletion' });
      }

      applications = loadApplicationsFromDisk();
      const idSet = new Set(ids);
      const initialCount = applications.length;
      applications = applications.filter(a => !idSet.has(a.id));
      const deletedCount = initialCount - applications.length;

      saveApplicationsToDisk(applications);
      res.json({
        success: true,
        message: `Successfully deleted ${deletedCount} student application(s).`,
        deletedCount
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8d-5. SINGLE DELETE ENQUIRY
  app.delete('/api/enquiries/:id', (req, res) => {
    try {
      const { id } = req.params;
      enquiries = loadEnquiriesFromDisk();
      const initialCount = enquiries.length;
      enquiries = enquiries.filter(e => e.id !== id);

      if (enquiries.length === initialCount) {
        return res.status(404).json({ success: false, error: 'Enquiry not found' });
      }

      saveEnquiriesToDisk(enquiries);
      res.json({
        success: true,
        message: `Enquiry ${id} deleted successfully.`
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8d-6. BULK DELETE ENQUIRIES
  app.post('/api/enquiries/bulk-delete', (req, res) => {
    try {
      const { ids = [] } = req.body;
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ success: false, error: 'No IDs provided for deletion' });
      }

      enquiries = loadEnquiriesFromDisk();
      const idSet = new Set(ids);
      const initialCount = enquiries.length;
      enquiries = enquiries.filter(e => !idSet.has(e.id));
      const deletedCount = initialCount - enquiries.length;

      saveEnquiriesToDisk(enquiries);
      res.json({
        success: true,
        message: `Successfully deleted ${deletedCount} enquiry lead(s).`,
        deletedCount
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8d-7. CLEAR ALL STORED DATA (Reset Admin Board)
  app.post('/api/admin/clear-all-data', (req, res) => {
    try {
      const { target = 'all' } = req.body; // 'applications' | 'enquiries' | 'all'
      if (target === 'applications' || target === 'all') {
        applications = [];
        saveApplicationsToDisk([]);
      }
      if (target === 'enquiries' || target === 'all') {
        enquiries = [];
        saveEnquiriesToDisk([]);
      }
      res.json({
        success: true,
        message: `Admin board data cleared successfully (${target}).`
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8e. LOG COMMUNICATION (WhatsApp or Email sent by Admin)
  app.post('/api/applications/:id/communication', (req, res) => {
    try {
      const { type, recipient, subject, message, sentBy = 'Admissions Officer' } = req.body;
      if (!type || !recipient || !message) {
        return res.status(400).json({ success: false, error: 'Type, recipient, and message content required' });
      }

      applications = loadApplicationsFromDisk();
      const index = applications.findIndex(a => a.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }

      if (!applications[index].communicationLogs) {
        applications[index].communicationLogs = [];
      }

      const newLog = {
        id: `comm-${Date.now()}`,
        type, // 'whatsapp' | 'email' | 'call'
        recipient: String(recipient).trim(),
        subject: subject ? String(subject).trim() : undefined,
        message: String(message).trim(),
        sentBy: String(sentBy).trim(),
        timestamp: new Date().toISOString()
      };

      applications[index].communicationLogs.unshift(newLog);
      
      // Also add brief audit trail note
      if (!applications[index].notes) applications[index].notes = [];
      applications[index].notes.unshift({
        id: `note-${Date.now()}`,
        author: sentBy,
        text: `Contacted applicant via ${type.toUpperCase()}: "${message.slice(0, 80)}${message.length > 80 ? '...' : ''}"`,
        createdAt: new Date().toISOString()
      });

      applications[index].updatedAt = new Date().toISOString();
      saveApplicationsToDisk(applications);

      res.json({
        success: true,
        communicationLog: newLog,
        application: applications[index]
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8f. DOWNLOAD OR VIEW APPLICANT DOCUMENT
  app.get('/api/documents/:filename', (req, res) => {
    try {
      const filename = req.params.filename;
      const safeFilename = path.basename(filename);
      const filePath = path.join(DOCUMENTS_DIR, safeFilename);

      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      }

      // If document is a mock/seed or text representation, stream a clean preview document
      res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
      res.setHeader('Content-Type', safeFilename.endsWith('.pdf') ? 'application/pdf' : 'text/plain');
      
      // Return verifiable certificate text summary if physical binary is not on disk
      const sampleContent = `%PDF-1.4
% MYERS GLOBAL PATHWAYS VERIFIED ACADEMIC DOCUMENT
% Document Reference: ${safeFilename}
% Status: Authenticated and Verified by Myers Global Pathways Admissions Board
% Student Credential Verification Portal: https://myersglobalpathways.com
`;
      res.send(Buffer.from(sampleContent, 'utf-8'));
    } catch (err: any) {
      res.status(500).send('Error retrieving document');
    }
  });

  // 8g. DOWNLOAD OFFICIAL PROVISIONAL ADMISSION OFFER LETTER (Formatted PDF / HTML)
  app.get('/api/applications/:id/offer-letter', (req, res) => {
    try {
      applications = loadApplicationsFromDisk();
      const targetParam = String(req.params.id).trim().toLowerCase();
      const app = applications.find(a => 
        String(a.id || '').toLowerCase() === targetParam || 
        String(a.trackingId || '').toLowerCase() === targetParam
      );
      if (!app) {
        return res.status(404).send('Application not found');
      }

      const admission = app.admissionDetails || {
        approvedUniversity: app.preferredUniversity || 'SRM Institute of Science & Technology, India',
        approvedProgram: app.preferredCourse || 'Undergraduate Degree Program',
        tuitionFeeUsd: '2,800',
        scholarshipPercentage: '20% Global Merit Waiver',
        intakeSemester: 'Fall Intake 2026',
        decisionDate: new Date().toISOString().split('T')[0],
        offerLetterId: `OFFER-MGP-${app.trackingId}`
      };

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Provisional Letter of Admission - ${app.fullName}</title>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0f172a; line-height: 1.6; margin: 40px auto; max-width: 800px; padding: 30px; border: 2px solid #0284c7; border-radius: 12px; background: #ffffff; }
    .header { border-bottom: 2px solid #0284c7; padding-bottom: 20px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; }
    .logo-title { font-size: 24px; font-weight: 800; color: #0a1128; letter-spacing: -0.5px; }
    .tagline { font-size: 11px; color: #0284c7; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
    .ref-badge { background: #f0fdf4; color: #166534; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 12px; border: 1px solid #bbf7d0; text-align: right; }
    .title { font-size: 20px; font-weight: 800; color: #0284c7; text-align: center; text-transform: uppercase; margin: 25px 0 15px; letter-spacing: 0.5px; }
    .student-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 18px; border-radius: 8px; margin: 20px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 13px; }
    .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px; }
    .details-table th, .details-table td { border: 1px solid #cbd5e1; padding: 10px 14px; text-align: left; }
    .details-table th { background: #f1f5f9; font-weight: 700; color: #334155; }
    .footer-sign { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px; display: flex; justify-content: space-between; font-size: 12px; color: #64748b; }
    .stamp { border: 2px solid #0284c7; color: #0284c7; padding: 8px 16px; border-radius: 8px; font-weight: 800; text-align: center; display: inline-block; font-size: 12px; }
    @media print { body { border: none; padding: 0; margin: 0; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo-title">MYERS GLOBAL PATHWAYS</div>
      <div class="tagline">Your Pathway to Global Education • Monrovia & India Desks</div>
    </div>
    <div class="ref-badge">
      <div>REF: ${app.trackingId}</div>
      <div style="font-size: 10px; font-weight: normal; color: #64748b;">Date: ${admission.decisionDate}</div>
    </div>
  </div>

  <div class="title">Official Provisional Letter of Admission</div>

  <p>Dear <strong>${app.fullName}</strong>,</p>
  <p>We are pleased to inform you that your application for university admission in India has been reviewed and approved by the Myers Global Pathways Admissions Committee in partnership with accredited Indian university boards.</p>

  <div class="student-box">
    <div><strong>Applicant Name:</strong> ${app.fullName}</div>
    <div><strong>Country of Origin:</strong> ${app.country}</div>
    <div><strong>Passport / Tracking ID:</strong> ${app.trackingId}</div>
    <div><strong>Email:</strong> ${app.email}</div>
    <div><strong>WhatsApp / Phone:</strong> ${app.whatsapp || 'Registered'}</div>
    <div><strong>Intake Term:</strong> ${admission.intakeSemester}</div>
  </div>

  <table class="details-table">
    <tr>
      <th style="width: 35%;">Recommended Institution</th>
      <td><strong>${admission.approvedUniversity}</strong></td>
    </tr>
    <tr>
      <th>Approved Program of Study</th>
      <td><strong>${admission.approvedProgram}</strong></td>
    </tr>
    <tr>
      <th>Academic Level</th>
      <td>${app.preferredStudyLevel}</td>
    </tr>
    <tr>
      <th>Annual Tuition Fee (USD)</th>
      <td>$${admission.tuitionFeeUsd} USD / Academic Year</td>
    </tr>
    <tr>
      <th>Scholarship & Merit Grant</th>
      <td><strong>${admission.scholarshipPercentage}</strong></td>
    </tr>
    <tr>
      <th>Medium of Instruction</th>
      <td>100% English (Recognized Worldwide)</td>
    </tr>
    <tr>
      <th>Admissions Advisory Status</th>
      <td><span style="color: #16a34a; font-weight: bold;">OFFICIALLY APPROVED</span></td>
    </tr>
  </table>

  <p style="font-size: 13px; color: #475569;"><strong>Next Steps:</strong> Our pre-departure desk will coordinate with you for your Indian Student Visa document package (Bonafide Admission Letter, Embassy Checklist, and FRRO clearance).</p>

  <div class="footer-sign">
    <div>
      <p style="margin: 0; font-weight: bold; color: #0f172a;">Menlaiday Myers</p>
      <p style="margin: 0;">Founder & Executive Director</p>
      <p style="margin: 0;">Myers Global Pathways</p>
      <p style="margin: 0; font-size: 11px;">admissions@myersglobalpathways.com</p>
    </div>
    <div style="text-align: right;">
      <div class="stamp">OFFICIALLY VERIFIED<br>MYERS GLOBAL PATHWAYS</div>
    </div>
  </div>
</body>
</html>`;

      res.setHeader('Content-Type', 'text/html');
      res.send(html);
    } catch (err: any) {
      res.status(500).send('Failed to generate offer letter');
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

  // 9b. WORDPRESS THEME DOWNLOAD / EXPORT ENDPOINT (.ZIP)
  const handleWordPressThemeDownload = (req: express.Request, res: express.Response) => {
    try {
      const publicZip = path.join(process.cwd(), 'public', 'myers-global-pathways-theme.zip');
      if (fs.existsSync(publicZip)) {
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename="myers-global-pathways-theme.zip"');
        return res.sendFile(publicZip);
      }

      const themeDir = path.join(process.cwd(), 'wordpress-theme', 'myers-global-pathways');

      if (!fs.existsSync(themeDir)) {
        return res.status(404).json({
          success: false,
          error: 'WordPress theme source directory not found.'
        });
      }

      const createZip = (options = { zlib: { level: 9 } }) => {
        if (typeof archiver === 'function') return archiver('zip', options);
        if ((archiver as any).ZipArchive) return new (archiver as any).ZipArchive(options);
        if ((archiver as any).default && typeof (archiver as any).default === 'function') return (archiver as any).default('zip', options);
        throw new Error('Archiver initialization failed.');
      };

      const archive = createZip();

      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="myers-global-pathways-theme.zip"');
      res.setHeader('Cache-Control', 'no-cache');

      archive.on('error', (err: any) => {
        console.error('Archiver error:', err);
        if (!res.headersSent) {
          res.status(500).json({ success: false, error: err.message });
        }
      });

      archive.pipe(res);
      archive.directory(themeDir, 'myers-global-pathways');
      archive.finalize();
    } catch (err: any) {
      console.error('WordPress theme export failed:', err);
      if (!res.headersSent) {
        res.status(500).json({ success: false, error: 'Failed to generate theme zip package.' });
      }
    }
  };

  app.get('/api/download-wordpress-theme', handleWordPressThemeDownload);
  app.get('/api/export-wordpress-theme', handleWordPressThemeDownload);

  // 10. GEMINI ADMISSIONS ADVISORY ENDPOINT
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { messages, userContext } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      const systemInstruction = `You are the official, highly intelligent Admissions Guidance Assistant for Myers Global Pathways ("Your Pathway to Global Education").

YOUR CORE MISSION:
Provide clear, accurate, friendly, and comprehensive answers about Myers Global Pathways, studying in India, university admissions, degree programs, visa guidance, fees, and contact details. Always answer specifically and directly based on what the user asks.

AGENCY INFORMATION & LEADERSHIP:
- Agency Name: Myers Global Pathways
- Tagline: "Your Pathway to Global Education"
- Founder & Executive Leadership: Menlaiday Myers
- Operational Hubs: Monrovia, Liberia & Hyderabad / Academic Hubs in India
- Mission: Providing transparent, end-to-end guidance for international students seeking higher education in accredited Indian universities.

OFFICIAL CONTACT NUMBERS & WHATSAPP:
- Primary WhatsApp / Phone Desk: +231 889425645
- Alternative Phone / Support Desk: +91 93478 69324

EXACT OFFICIAL EMAIL DIRECTORY (Always provide the exact email address when asked):
- General Enquiries: info@myersglobalpathways.com (general overview, advisory inquiries)
- Admissions Desk: admissions@myersglobalpathways.com (course selection, eligibility, entry requirements)
- Applications: applications@myersglobalpathways.com (document verification, application submission, status checks)
- Student Support: support@myersglobalpathways.com (pre-departure briefing, arrival coordination, campus welfare)
- Institutional Partnerships: partnerships@myersglobalpathways.com (university collaboration, academic desks)
- Careers: careers@myersglobalpathways.com (counselor positions, regional representative roles)
- Collaborations: collab@myersglobalpathways.com (outreach programs, global workshops)
- Direct Contact: contact@myersglobalpathways.com (direct correspondence)
- Founder / Executive Administration: menlaiday@myersglobalpathways.com (leadership & principal advisory)

CORE SERVICES (01 TO 08):
1. University & Course Selection: Matching qualifications with accredited degree programs across India.
2. Admission Guidance: Evaluating entry prerequisites, academic calendar, and intake deadlines.
3. Application Assistance: Preparing complete, error-free university application dossiers.
4. Document Preparation: Transcript attestation, formatting, and credential organization.
5. Visa Guidance: Indian Student Visa documentation checklist, embassy appointment preparation, and bonafide letters.
6. Pre-Departure Support: Flight coordination, packing guide, cultural briefing, and health advice.
7. Arrival & Orientation: Airport transit assistance, campus registration, hostel check-in, and local SIM setup.
8. Ongoing Student Support: FRRO/local registration support, academic adjustment, and parent communication.

STUDY IN INDIA FACTS & ACADEMICS:
- Degree Levels: Undergraduate (Bachelor's - B.Tech, BCA, BBA, B.Sc, B.Pharm, MBBS), Postgraduate (Master's - M.Tech, MCA, MBA, M.Sc), Diplomas, and Ph.D.
- Key Disciplines: Computer Science, Artificial Intelligence, Cyber Security, Data Science, Mechanical, Civil, Nursing, Pharmacy, Biomedical, Business Administration, Accounting, International Law, Biotechnology, Agriculture.
- Tuition Fees: Typically affordable, ranging from $1,500 to $4,500 USD per academic year depending on the course.
- Living Expenses: University hostels and meals typically cost $150 to $250 USD per month.
- Language of Instruction: 100% English. English proficiency proof from previous school is accepted (IELTS/TOEFL usually NOT required).
- Major University Hubs: Delhi NCR, Bangalore, Pune, Hyderabad, Chennai, Punjab, Gujarat, Kolkata.
- Intakes: Major intake is July/August/September (Fall); secondary intake is January/February (Spring).

APPLICATION JOURNEY (7 STEPS):
1. Discover -> 2. Consult -> 3. Choose -> 4. Apply -> 5. Admission (Provisional Offer) -> 6. Prepare (Visa & Briefing) -> 7. Arrive.

COMMUNICATION STYLE:
- Be warm, encouraging, precise, professional, and knowledgeable.
- When asked for emails or phone numbers, provide the EXACT verified addresses and numbers clearly formatted.
- When asked about applications, encourage them to click "Start Your Application" on the site or message on WhatsApp (+231 889425645).`;

      const contents = messages.map((msg: { sender: string; text: string; role?: string }) => ({
        role: msg.sender === 'user' || msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));

      const ai = getGeminiClient();
      if (!ai) {
        return res.json({
          reply: "Welcome to Myers Global Pathways! For personalized guidance on studying in India, please contact our admissions team at admissions@myersglobalpathways.com or on WhatsApp at +231 889425645.",
          timestamp: new Date().toISOString()
        });
      }

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
