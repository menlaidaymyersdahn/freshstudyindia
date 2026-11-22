import React, { useState, useRef, useEffect } from 'react';
import { OFFICIAL_EMAIL_DIRECTORY, getWhatsAppConfig } from '../config/company';
import { X, Send, MessageSquare, MessageCircle, Loader2, Headphones } from 'lucide-react';
import { OfficialLogo } from './OfficialLogo';

interface AdmissionsAdvisorChatProps {
  onOpenApplication: () => void;
  externalOpen?: boolean;
  onExternalOpenChange?: (open: boolean) => void;
}

function generateSmartAdmissionsResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('email') || q.includes('mail') || q.includes('contact email') || q.includes('admissions email') || q.includes('reach you')) {
    const list = OFFICIAL_EMAIL_DIRECTORY.map(d => `- ${d.department}: ${d.email}`).join('\n');
    return `Here are the official email addresses for Myers Global Pathways:\n\n${list}\n\nFor university admissions, write directly to admissions@myersglobalpathways.com.`;
  }

  if (q.includes('whatsapp') || q.includes('phone') || q.includes('call') || q.includes('number') || q.includes('contact number')) {
    return `You can reach Myers Global Pathways through our direct channels:\n\n- Primary WhatsApp / Phone (Liberia): +231 889425645\n- Alternative Desk (India): +91 93478 69324\n- Admissions Email: admissions@myersglobalpathways.com`;
  }

  if (q.includes('who is') || q.includes('founder') || q.includes('owner') || q.includes('menlaiday') || q.includes('about agency') || q.includes('about myers')) {
    return `Myers Global Pathways was founded by Menlaiday Myers Dahn. We are an international education consultancy guiding students through university admissions, documentation, student visas, and campus settlement in India.`;
  }

  if (q.includes('course') || q.includes('degree') || q.includes('bachelor') || q.includes('master') || q.includes('engineering') || q.includes('medicine') || q.includes('nursing') || q.includes('pharmacy') || q.includes('computer') || q.includes('mba') || q.includes('bba')) {
    return `Indian universities offer undergraduate and postgraduate degrees across several fields:\n\n- Technology: B.Tech / M.Tech in Computer Science, AI, Cyber Security, Civil, and Mechanical\n- Health Sciences: MBBS, B.Sc Nursing, B.Pharmacy, Medical Lab Tech\n- Business: BBA, MBA, Finance, Business Analytics\n- Computing: BCA, MCA, Data Science\n- Agriculture, Biotechnology, and Law\n\nSelect Start Your Application if you would like an eligibility review.`;
  }

  if (q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('expensive') || q.includes('living') || q.includes('tuition') || q.includes('budget') || q.includes('afford')) {
    return `Estimated study costs in India:\n\n- Annual tuition: typically $1,500 to $4,500 USD per year depending on the institution and degree.\n- Campus hostel and meals: typically $150 to $250 USD per month.\n\nWe review your budget and recommend accredited options that fit your financial plan.`;
  }

  if (q.includes('visa') || q.includes('embassy') || q.includes('passport') || q.includes('immigration')) {
    return `Our Indian Student Visa process covers four stages:\n1. Securing your official Provisional University Admission Letter and Bona Fide Certificate.\n2. Organizing your visa dossier and embassy or VFS appointment.\n3. Preparing you for consular verification.\n4. Guiding FRRO registration upon arrival in India.`;
  }

  if (q.includes('ielts') || q.includes('toefl') || q.includes('english') || q.includes('test') || q.includes('waec') || q.includes('wassce')) {
    return `For most programs in India, IELTS or TOEFL is not required if your prior education was taught in English. An English Medium of Instruction letter or high school certificate (WAEC, WASSCE, O-Level, or A-Level) is generally accepted.`;
  }

  if (q.includes('service') || q.includes('help') || q.includes('what do you do') || q.includes('process')) {
    return `Myers Global Pathways provides eight core services:\n1. University and Course Selection\n2. Admission Guidance\n3. Application Assistance\n4. Document Preparation\n5. Visa Guidance\n6. Pre-Departure Support\n7. Arrival and Orientation in India\n8. Ongoing Student Support`;
  }

  return `Myers Global Pathways guides international students with university admissions, documentation, Indian student visas, and campus arrival. Reach us at admissions@myersglobalpathways.com or WhatsApp +231 889425645.`;
}

export const AdmissionsAdvisorChat: React.FC<AdmissionsAdvisorChatProps> = ({
  onOpenApplication,
  externalOpen,
  onExternalOpenChange
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [deskMenuOpen, setDeskMenuOpen] = useState(false);
  const whatsappConfig = getWhatsAppConfig();

  const isChatOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setChatOpen = (next: boolean) => {
    setInternalOpen(next);
    if (onExternalOpenChange) {
      onExternalOpenChange(next);
    }
    if (next) {
      setDeskMenuOpen(false);
    }
  };

  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'model'; text: string }>>([
    {
      sender: 'model',
      text: 'Ask about university admissions in India, available courses, tuition estimates, student visas, or official desk contacts.'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'What are your admissions emails?',
    'What is your WhatsApp number?',
    'Which courses can I study in India?',
    'How much are tuition fees in India?',
    'Do I need IELTS to study in India?',
    'How does the student visa work?'
  ];

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

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
    } catch {
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
      {/* Single Compact Desktop-Only Quick-Assist Trigger (Hidden on mobile so no floating button covers content) */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3">
        {deskMenuOpen && !isChatOpen && (
          <div className="p-4 rounded-xl bg-white text-[#0F172A] text-xs border border-slate-200 w-72 text-left space-y-3 shadow-[0_12px_32px_rgba(11,31,58,0.14)]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <p className="font-display font-bold text-sm text-[#0B1F3A]">Admissions Desk</p>
                <p className="text-[11px] text-slate-500">Direct WhatsApp &amp; instant Q&amp;A</p>
              </div>
              <button
                type="button"
                onClick={() => setDeskMenuOpen(false)}
                className="text-slate-400 hover:text-[#0B1F3A] p-1 transition-ui cursor-pointer"
                aria-label="Close admissions desk menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setChatOpen(true)}
                className="w-full p-3 rounded-lg bg-[#0B1F3A] hover:bg-[#132E54] text-white text-left flex items-center justify-between transition-ui cursor-pointer"
              >
                <span className="inline-flex items-center gap-2 font-semibold">
                  <MessageSquare className="w-4 h-4 text-[#F0C86E]" />
                  <span>Ask Admissions Advisor</span>
                </span>
              </button>

              <a
                href={whatsappConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-lg bg-[#F4F6F9] hover:bg-slate-200/70 border border-slate-200 transition-ui"
              >
                <p className="font-semibold text-xs text-[#0B1F3A] inline-flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-[#9A6D17]" />
                  <span>WhatsApp — Liberia Desk</span>
                </p>
                <p className="text-xs font-mono text-slate-600 mt-0.5 tabular-nums">+231 889425645</p>
              </a>

              <a
                href={whatsappConfig.altUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-lg bg-[#F4F6F9] hover:bg-slate-200/70 border border-slate-200 transition-ui"
              >
                <p className="font-semibold text-xs text-[#0B1F3A] inline-flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-[#9A6D17]" />
                  <span>WhatsApp — India Desk</span>
                </p>
                <p className="text-xs font-mono text-slate-600 mt-0.5 tabular-nums">+91 93478 69324</p>
              </a>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            if (isChatOpen) {
              setChatOpen(false);
            } else {
              setDeskMenuOpen((prev) => !prev);
            }
          }}
          className="px-4 py-3 rounded-lg bg-[#0B1F3A] hover:bg-[#132E54] text-white border border-white/15 transition-ui flex items-center gap-2 text-xs font-semibold cursor-pointer shadow-[0_6px_20px_rgba(11,31,58,0.22)]"
          aria-label="Open admissions desk support"
          title="Admissions Desk & WhatsApp Support"
        >
          <Headphones className="w-4 h-4 text-[#F0C86E]" />
          <span>Admissions Desk</span>
        </button>
      </div>

      {/* Chat Drawer (Accessible from Desktop Quick-Assist AND Inline Mobile Buttons) */}
      {isChatOpen && (
        <div className="fixed bottom-4 md:bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[400px] rounded-xl bg-white border border-slate-200 shadow-[0_16px_40px_rgba(11,31,58,0.18)] overflow-hidden flex flex-col max-h-[82vh] md:max-h-[560px] text-left">
          {/* Header */}
          <div className="p-4 bg-[#0B1F3A] text-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <OfficialLogo variant="badge" size="sm" />
              <div className="min-w-0">
                <h4 className="font-display text-sm font-bold text-white truncate">Admissions Advisor</h4>
                <p className="text-xs text-slate-300 truncate">Myers Global Pathways</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setChatOpen(false)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-ui cursor-pointer"
              aria-label="Close admissions advisor chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Direct Channels Bar */}
          <div className="px-4 py-2 bg-[#F4F6F9] border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
            <span>Liberia: <span className="font-mono text-[#0B1F3A] font-medium tabular-nums">+231 889425645</span></span>
            <span>India: <span className="font-mono text-[#0B1F3A] font-medium tabular-nums">+91 93478 69324</span></span>
          </div>

          {/* Message History */}
          <div className="p-4 overflow-y-auto flex-1 space-y-3 text-sm bg-[#F4F6F9] min-h-[220px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed whitespace-pre-line text-xs sm:text-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#0B1F3A] text-white'
                      : 'bg-white text-[#0F172A] border border-slate-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs py-1">
                <Loader2 className="w-4 h-4 animate-spin text-[#C5922E]" />
                <span>Checking admissions information...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Row */}
          <div className="p-3 bg-white border-t border-slate-200 overflow-x-auto flex gap-2">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendQuery(q)}
                className="px-3 py-1.5 rounded-lg bg-[#F4F6F9] hover:bg-slate-200/70 border border-slate-200 text-xs text-slate-700 hover:text-[#0B1F3A] whitespace-nowrap transition-ui cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Direct Application Link */}
          <div className="px-4 py-2.5 bg-[#F4F6F9] border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-600">Ready to apply?</span>
            <button
              type="button"
              onClick={() => {
                setChatOpen(false);
                onOpenApplication();
              }}
              className="text-[#0B1F3A] font-semibold hover:text-[#9A6D17] hover:underline cursor-pointer"
            >
              Start Your Application
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about admissions, courses, or visas"
              className="flex-1 px-3 py-2 rounded-lg text-sm bg-[#F4F6F9] border border-slate-200 focus:outline-none focus:border-[#0B1F3A] focus:bg-white text-[#0F172A] transition-ui"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="px-3.5 py-2 rounded-lg bg-[#0B1F3A] hover:bg-[#132E54] text-white disabled:opacity-50 transition-ui flex items-center justify-center cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-[#F0C86E]" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
