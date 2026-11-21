import React, { useState, useRef, useEffect } from 'react';
import { OFFICIAL_EMAIL_DIRECTORY } from '../config/company';
import { X, Send, MessageSquare, Loader2 } from 'lucide-react';

interface AdmissionsAdvisorChatProps {
  onOpenApplication: () => void;
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
    return `Indian universities offer undergraduate and postgraduate degrees across several fields:\n\n- Technology: B.Tech / M.Tech in Computer Science, AI, Cyber Security, Civil, and Mechanical\n- Health Sciences: MBBS, B.Sc Nursing, B.Pharmacy, Medical Lab Tech\n- Business: BBA, MBA, Finance, Business Analytics\n- Computing: BCA, MCA, Data Science\n- Agriculture, Biotechnology, and Law\n\nSelect Start your application if you would like an eligibility review.`;
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

export const AdmissionsAdvisorChat: React.FC<AdmissionsAdvisorChatProps> = ({ onOpenApplication }) => {
  const [isOpen, setIsOpen] = useState(false);
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
      {/* Quiet Desk Trigger (docked bottom-right so left reading margin stays clear) */}
      <div className="fixed bottom-6 right-36 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-3 rounded-[10px] bg-white hover:bg-[#EFECE4] text-[#181A1F] border border-[#181A1F]/[0.14] transition-ui flex items-center gap-2 text-xs font-medium cursor-pointer shadow-[0_2px_8px_rgba(24,26,31,0.06)]"
          title="Admissions desk chat"
        >
          <MessageSquare className="w-4 h-4 text-[#A63A24]" />
          <span>Ask admissions desk</span>
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[400px] rounded-2xl bg-white border border-[#181A1F]/[0.12] shadow-[0_12px_32px_rgba(24,26,31,0.10)] overflow-hidden flex flex-col max-h-[560px] text-left">
          {/* Header */}
          <div className="p-4 bg-[#EFECE4] text-[#181A1F] flex items-center justify-between border-b border-[#181A1F]/[0.08]">
            <div>
              <h4 className="text-sm font-medium text-[#181A1F]">Admissions desk</h4>
              <p className="text-xs text-[#4F535C]">Myers Global Pathways</p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-[#4F535C] hover:text-[#181A1F] bg-white border border-[#181A1F]/[0.10] transition-ui cursor-pointer"
              aria-label="Close admissions desk chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Direct Channels Bar */}
          <div className="px-4 py-2 bg-[#F7F5F0] border-b border-[#181A1F]/[0.08] flex items-center justify-between text-xs text-[#4F535C]">
            <span>Liberia: <span className="font-mono text-[#181A1F]">+231 889425645</span></span>
            <span>India: <span className="font-mono text-[#181A1F]">+91 93478 69324</span></span>
          </div>

          {/* Message History */}
          <div className="p-4 overflow-y-auto flex-1 space-y-3 text-sm bg-[#F7F5F0] min-h-[220px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed whitespace-pre-line text-xs sm:text-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#181A1F] text-white'
                      : 'bg-white text-[#181A1F] border border-[#181A1F]/[0.08]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-[#6E727D] text-xs py-1">
                <Loader2 className="w-4 h-4 animate-spin text-[#A63A24]" />
                <span>Checking admissions information...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Row */}
          <div className="p-3 bg-white border-t border-[#181A1F]/[0.08] overflow-x-auto flex gap-2">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendQuery(q)}
                className="px-3 py-1 rounded-lg bg-[#F7F5F0] hover:bg-[#EFECE4] border border-[#181A1F]/[0.08] text-xs text-[#4F535C] hover:text-[#181A1F] whitespace-nowrap transition-ui cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Direct Application Link */}
          <div className="px-4 py-2 bg-[#EFECE4] border-t border-[#181A1F]/[0.08] flex items-center justify-between text-xs">
            <span className="text-[#4F535C]">Ready to apply?</span>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenApplication();
              }}
              className="text-[#A63A24] font-medium hover:underline cursor-pointer"
            >
              Start your application
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#181A1F]/[0.08] flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about admissions, courses, or visas"
              className="flex-1 px-3 py-2 rounded-lg text-sm bg-[#F7F5F0] border border-[#181A1F]/[0.12] focus:outline-none focus:border-[#A63A24] focus:bg-white text-[#181A1F] transition-ui"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="px-3 py-2 rounded-lg bg-[#A63A24] hover:bg-[#8C2F1C] text-white disabled:opacity-50 transition-ui flex items-center justify-center cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
