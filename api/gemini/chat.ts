import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      messages, 
      role = 'general_advisor', 
      modelType = 'general', 
      userContext 
    } = req.body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    let selectedModel = 'gemini-3.5-flash';
    if (modelType === 'complex') {
      selectedModel = 'gemini-3.1-pro-preview';
    } else if (modelType === 'fast') {
      selectedModel = 'gemini-3.1-flash-lite';
    }

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
   - Warm, welcoming, professional, well-structured with clear bullet points and headings. Always encourage the student to connect with our agency counselors on WhatsApp or apply through the portal.`;

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

    const contents = messages.map((msg: { sender: string; text: string; role?: string }) => ({
      role: msg.sender === 'user' || msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I'm ready to assist you with any questions regarding Fresh Study India's admissions and scholarship services!";

    return res.status(200).json({
      reply: replyText,
      modelUsed: selectedModel,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error in /api/gemini/chat:', error);
    return res.status(500).json({
      error: error.message || 'Failed to process Gemini chat request',
      reply: "Welcome to Fresh Study India! Please let me know which academic program, scholarship, or visa service you'd like to explore, or contact our WhatsApp desk at +231 889425645."
    });
  }
}
