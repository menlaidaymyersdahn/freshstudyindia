import React, { useState, useRef, useEffect } from 'react';
import { COMPANY, OFFICIAL_EMAIL_DIRECTORY, getWhatsAppConfig } from '../config/company';
import { X, Send, Bot, Loader2, Sparkles } from 'lucide-react';

interface AdmissionsAdvisorChatProps {
  onOpenApplication: () => void;
}

// Local smart answer generator for instantaneous response and graceful offline fallback
function generateSmartAdmissionsResponse(query: string): string {
  const q = query.toLowerCase();

  // 1. Email queries
  if (q.includes('email') || q.includes('mail') || q.includes('contact email') || q.includes('admissions email') || q.includes('reach you')) {
    const list = OFFICIAL_EMAIL_DIRECTORY.map(d => `• ${d.department}: ${d.email}`).join('\n');
    return `Here are the official verified email addresses for Myers Global Pathways:\n\n${list}\n\nFor university admissions, you can write directly to admissions@myersglobalpathways.com!`;
  }

  // 2. WhatsApp or Phone numbers
  if (q.includes('whatsapp') || q.includes('phone') || q.includes('call') || q.includes('number') || q.includes('contact number')) {
    return `You can reach Myers Global Pathways through our official direct channels:\n\n📱 Primary WhatsApp / Phone: +231 889425645\n📞 Alternative Support Desk: +91 93478 69324\n✉️ Admissions Email: admissions@myersglobalpathways.com\n\nOur advisors are ready to assist you!`;
  }

  // 3. Founder / About Agency
  if (q.includes('who is') || q.includes('founder') || q.includes('owner') || q.includes('menlaiday') || q.includes('about agency') || q.includes('about myers')) {
    return `Myers Global Pathways ("Your Pathway to Global Education") was founded by Menlaiday Myers. We are an international education consultancy dedicated to guiding students through university admissions, documentation, student visas, and campus settlement in top accredited universities across India.`;
  }

  // 4. Courses & Degrees
  if (q.includes('course') || q.includes('degree') || q.includes('bachelor') || q.includes('master') || q.includes('engineering') || q.includes('medicine') || q.includes('nursing') || q.includes('pharmacy') || q.includes('computer') || q.includes('mba') || q.includes('bba')) {
    return `Indian universities offer recognized undergraduate and postgraduate degrees across diverse fields:\n\n• Technology: B.Tech/M.Tech in Computer Science, Artificial Intelligence, Cyber Security, Robotics, Civil & Mechanical\n• Health Sciences: MBBS, B.Sc Nursing, B.Pharmacy, Medical Lab Tech\n• Business: BBA, MBA, Finance, Business Analytics\n• IT & Computing: BCA, MCA, Data Science\n• Agriculture, Biotechnology & Law\n\nWould you like to apply for one of these programs? Click 'Start Application' to begin.`;
  }

  // 5. Fees & Costs
  if (q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('expensive') || q.includes('living') || q.includes('tuition') || q.includes('budget') || q.includes('afford')) {
    return `Studying in India is very affordable compared to Western destinations:\n\n• Annual Tuition: Typically $1,500 – $4,500 USD/year depending on program.\n• Living & Hostel: ~$150 – $250 USD/month including furnished room, Wi-Fi, and meals.\n\nWe assess your budget and recommend accredited universities that suit your financial plan.`;
  }

  // 6. Visa Guidance
  if (q.includes('visa') || q.includes('embassy') || q.includes('passport') || q.includes('immigration')) {
    return `Myers Global Pathways provides complete Indian Student Visa support:\n1. We secure your official Provisional University Admission Letter and Bona Fide Certificate.\n2. We guide your visa application dossier and embassy/VFS appointment.\n3. We prepare you for consular verification.\n4. We provide guidance for FRRO registration upon arrival in India.`;
  }

  // 7. English / IELTS requirements
  if (q.includes('ielts') || q.includes('toefl') || q.includes('english') || q.includes('test') || q.includes('waec') || q.includes('wassce')) {
    return `Good news! For most programs in India, IELTS or TOEFL is NOT mandatory if your previous education was in English. A letter of English Medium of Instruction or your high school certificate (WAEC/WASSCE/O-Level/A-Level) is generally accepted.`;
  }

  // 8. Services
  if (q.includes('service') || q.includes('help') || q.includes('what do you do') || q.includes('process')) {
    return `Myers Global Pathways provides 8 core end-to-end services:\n1. University & Course Selection\n2. Admission Guidance\n3. Application Assistance\n4. Document Preparation & Attestation\n5. Visa Guidance\n6. Pre-Departure Support\n7. Arrival & Orientation in India\n8. Ongoing Student Welfare Support`;
  }

  // Default helpful overview
  return `Thank you for reaching out! Myers Global Pathways guides international students with accredited university admissions, student visas, and campus arrival in India. You can connect with us directly at admissions@myersglobalpathways.com, WhatsApp +231 889425645, or click 'Start Application' to begin.`;
}

export const AdmissionsAdvisorChat: React.FC<AdmissionsAdvisorChatProps> = ({ onOpenApplication }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'model'; text: string }>>([
    {
      sender: 'model',
      text: `Hello! I am your Myers Global Pathways Admissions Assistant. Ask me anything about university admissions in India, available courses, tuition fees, student visas, or contact emails!`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const whatsappConfig = getWhatsAppConfig();

  const quickQuestions = [
    'What are your admissions emails?',
    'What is your WhatsApp number?',
    'Which courses can I study in India?',
    'How much are tuition fees in India?',
    'Do I need IELTS to study in India?',
    'How does the student visa work?'
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMessage = queryText.trim();
    setInputText('');
    
    const updatedMessages = [...messages, { sender: 'user' as const, text: userMessage }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.sender,
            sender: m.sender,
            text: m.text
          }))
        })
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages(prev => [...prev, { sender: 'model', text: data.reply }]);
      } else {
        const smartFallback = generateSmartAdmissionsResponse(userMessage);
        setMessages(prev => [...prev, { sender: 'model', text: smartFallback }]);
      }
    } catch (err) {
      const smartFallback = generateSmartAdmissionsResponse(userMessage);
      setMessages(prev => [...prev, { sender: 'model', text: smartFallback }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(inputText);
  };

  return (
    <>
      {/* Trigger Button on Left Bottom */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-3 rounded-full bg-[#0A1128] text-white border border-slate-700 shadow-2xl hover:border-amber-400/80 transition-all flex items-center gap-2.5 text-xs sm:text-sm font-bold cursor-pointer group"
          title="Ask Admissions Assistant"
        >
          <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Ask Admissions Assistant</span>
        </button>
      </div>

      {/* Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-22 left-4 sm:left-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[580px] text-left animate-fadeIn">
          
          {/* Header */}
          <div className="p-4 bg-[#0A1128] text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Admissions Assistant</h4>
                <p className="text-[11px] text-amber-400 font-medium">Myers Global Pathways AI Desk</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Contact Bar */}
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
            <span>WhatsApp: <strong className="text-emerald-400">+231 889425645</strong></span>
            <span>Alt: <strong className="text-slate-200">+91 93478 69324</strong></span>
          </div>

          {/* Message History */}
          <div className="p-4 overflow-y-auto flex-1 space-y-3.5 text-xs sm:text-sm bg-slate-50 min-h-[220px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'model' && (
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-amber-400 text-slate-950 rounded-br-xs font-semibold'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs font-normal'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs py-1">
                <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                <span>Admissions assistant is answering...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompt Chips */}
          <div className="p-2.5 bg-slate-100/90 border-t border-slate-200 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => sendQuery(q)}
                className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-amber-50 border border-slate-200 text-[11px] font-medium text-slate-700 hover:text-amber-900 whitespace-nowrap transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Quick Consultation CTA */}
          <div className="px-4 py-2.5 bg-amber-50 border-t border-amber-200/60 flex items-center justify-between text-xs">
            <span className="text-amber-950 font-medium">Ready to begin your application?</span>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenApplication();
              }}
              className="text-amber-900 font-bold hover:underline cursor-pointer"
            >
              Start Application →
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about admissions, emails, courses, visas..."
              className="flex-1 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold disabled:opacity-50 transition-colors flex items-center justify-center cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
