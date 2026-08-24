import React, { useState, useRef, useEffect } from 'react';
import { COMPANY } from '../config/company';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

interface AdmissionsAdvisorChatProps {
  onOpenApplication: () => void;
}

export const AdmissionsAdvisorChat: React.FC<AdmissionsAdvisorChatProps> = ({ onOpenApplication }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'model'; text: string }>>([
    {
      sender: 'model',
      text: `Hello! I am the Myers Global Pathways admissions assistant. How can I guide your journey toward studying in India today?`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
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
        setMessages(prev => [...prev, {
          sender: 'model',
          text: `For detailed academic advice or specific program requirements, please reach out to our team at admissions@myersglobalpathways.com.`
        }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        sender: 'model',
        text: `Our admissions team is available to assist you. You can connect with us directly at admissions@myersglobalpathways.com or submit your application online.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button on Left Bottom */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2.5 rounded-full bg-[#0A1128] text-white border border-slate-700 shadow-xl hover:border-amber-400/80 transition-all flex items-center gap-2 text-xs font-semibold cursor-pointer group"
          title="Ask Admissions Advisor"
        >
          <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Ask Admissions Assistant</span>
        </button>
      </div>

      {/* Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 sm:left-6 z-50 w-[calc(100vw-32px)] sm:w-96 rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[500px] text-left animate-fadeIn">
          
          {/* Header */}
          <div className="p-4 bg-[#0A1128] text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Admissions Assistant</h4>
                <p className="text-[10px] text-slate-400">Myers Global Pathways</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message History */}
          <div className="p-4 overflow-y-auto flex-1 space-y-3 text-xs bg-slate-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'model' && (
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-400 text-slate-950 rounded-br-xs font-medium'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                <span>Admissions advisor is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Consultation CTA */}
          <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px]">
            <span className="text-slate-600">Ready to submit your profile?</span>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenApplication();
              }}
              className="text-amber-800 font-bold hover:underline"
            >
              Apply Now →
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about courses, eligibility, visas..."
              className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-900"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-2 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
