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

  app.use(express.json({ limit: '10mb' }));

  // API Health Endpoint
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      service: 'Fresh Study India API',
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY)
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
      let systemInstruction = `You are the official AI Academic Advisor & University Admissions Consultant for "Fresh Study India" (an education consultancy connecting international students, particularly from Africa, Asia, and the Global South, to leading accredited universities and colleges in India).

Key Knowledge & Fresh Study India Services:
1. Academic Programs: B.Tech, MBBS, BDS, Pharmacy (B.Pharm/Pharm.D), BBA/MBA, Nursing, Computer Science, Data Science, AI & ML, Biotechnology, and Hotel Management.
2. Top Partner Universities in India: Lovely Professional University (LPU), Chandigarh University, Sharda University, Amity University, Parul University, SRM Institute, Vellore Institute of Technology (VIT), Manipal Academy of Higher Education, and GD Goenka University.
3. Admissions & Visa Support: Guidance on qualifying exam marks (WASSCE, WAEC, NECO, KCSE, CBSE, High School Diplomas), Indian Student Visa filing, Provisional Admission Letters, Bonafide certificates, Association of Indian Universities (AIU) equivalence certificate, and FRRO registration upon arrival in India.
4. Comprehensive Logistics: Airport pickup at Delhi (DEL), Mumbai (BOM), Bengaluru (BLR), or Ahmedabad (AMD); campus hostel allocation; Indian SIM card setup; Forex/currency exchange; localized food accommodations.
5. Tuition & Scholarships: Up to 50% - 100% merit-based scholarships for high-achieving international students; affordable annual tuition ranging from $1,500 to $6,500 USD per annum.
6. Tone: Warm, encouraging, expert, polite, structured with bullet points, and actionable.

Role Specifics:
- If role is "general_advisor": Provide comprehensive university recommendations, fee estimates, intake details (Autumn/August intake vs Spring/January intake), and step-by-step guidance.
- If role is "visa_specialist": Focus on Indian Embassy visa interviews, financial solvency, police clearance, yellow fever vaccination, and FRRO clearance steps.
- If role is "scholarship_navigator": Provide eligibility criteria, required percentage scores, scholarship discounts on tuition, and submission deadlines.
- If role is "campus_life_guide": Detail hostel options (AC vs Non-AC, attached washrooms), international student mess, campus security, climate in Punjab/Delhi/Gujarat/Bangalore, and cultural integration.

Always prompt the student warmly and remind them that Fresh Study India counselors provide end-to-end free application processing and support.`;

      if (role === 'visa_specialist') {
        systemInstruction += `\n\nActive Mode: VISA & FRRO COMPLIANCE SPECIALIST. Emphasize documentation precision, visa interview tips, and immigration protocols in India.`;
      } else if (role === 'scholarship_navigator') {
        systemInstruction += `\n\nActive Mode: SCHOLARSHIP & FINANCIAL NAVIGATOR. Focus on tuition fee reduction, merit brackets, and low-cost living budgets.`;
      } else if (role === 'campus_life_guide') {
        systemInstruction += `\n\nActive Mode: CAMPUS LIFE & STUDENT WELFARE GUIDE. Focus on daily life, food, safety, accommodation, student communities, and healthcare in India.`;
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
