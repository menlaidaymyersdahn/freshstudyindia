import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Trash2, 
  RefreshCw, 
  User, 
  Maximize2, 
  Minimize2, 
  X, 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  Zap, 
  Compass, 
  Copy, 
  Check, 
  ArrowRight,
  HelpCircle,
  Clock,
  Cpu
} from 'lucide-react';
import { UserProfile } from '../types';
import { generateAdvisorResponse } from '../lib/geminiAdvisorKnowledge';

export interface ChatMessageItem {
  id: string;
  sender: 'user' | 'model';
  text: string;
  timestamp: string;
  modelUsed?: string;
  roleType?: string;
}

interface GeminiChatbotProps {
  currentUser?: UserProfile | null;
  onOpenApplyModal?: () => void;
  isFloatingWidget?: boolean;
  isOpenFloating?: boolean;
  onCloseFloating?: () => void;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  currentUser,
  onOpenApplyModal,
  isFloatingWidget = false,
  isOpenFloating = false,
  onCloseFloating
}) => {
  // Roles and Models
  const [selectedRole, setSelectedRole] = useState<'general_advisor' | 'visa_specialist' | 'scholarship_navigator' | 'campus_life_guide' | 'fast_faq'>('general_advisor');
  const [selectedModelType, setSelectedModelType] = useState<'general' | 'complex' | 'fast'>('general');
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Initial welcome message
  const initialMessages: ChatMessageItem[] = [
    {
      id: 'welcome-1',
      sender: 'model',
      text: `Hello ${currentUser?.name || 'there'}! 👋 Welcome to **Fresh Study India's AI Admissions Advisor**.\n\nI can help you explore our accredited Indian partner university programs, evaluate your eligibility for up to 100% merit scholarships, prepare your student visa documentation, and organize your on-ground hostel placement and airport reception.\n\nHow can Fresh Study India assist your education journey today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.5-flash',
      roleType: 'general_advisor'
    }
  ];

  const [messages, setMessages] = useState<ChatMessageItem[]>(() => {
    try {
      const saved = localStorage.getItem('fresh_study_india_gemini_chat');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sanitized = parsed.filter(m => !m.text?.includes('Unexpected token') && !m.text?.includes('is not valid JSON'));
          if (sanitized.length > 0) return sanitized;
        }
      }
    } catch {
      // fallback
    }
    return initialMessages;
  });

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Save conversation history to local storage
  useEffect(() => {
    try {
      localStorage.setItem('fresh_study_india_gemini_chat', JSON.stringify(messages));
    } catch (e) {
      console.warn('Failed to persist chat messages:', e);
    }
  }, [messages]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Role details
  const roles = [
    {
      id: 'general_advisor' as const,
      name: 'Admissions Advisor',
      modelType: 'general' as const,
      modelName: 'gemini-3.5-flash',
      desc: 'Agency admissions process, intake dates & eligibility',
      icon: GraduationCap,
      color: 'bg-[#1677FF]'
    },
    {
      id: 'scholarship_navigator' as const,
      name: 'Scholarship AI',
      modelType: 'complex' as const,
      modelName: 'gemini-3.1-pro-preview',
      desc: 'Merit scholarship evaluation & tuition reduction calculation',
      icon: Award,
      color: 'bg-[#0284C7]'
    },
    {
      id: 'visa_specialist' as const,
      name: 'Visa & FRRO Specialist',
      modelType: 'general' as const,
      modelName: 'gemini-3.5-flash',
      desc: 'Embassy interviews, bonafide letters & immigration clearance',
      icon: ShieldCheck,
      color: 'bg-[#0891B2]'
    },
    {
      id: 'campus_life_guide' as const,
      name: 'Student Support & Welfare',
      modelType: 'general' as const,
      modelName: 'gemini-3.5-flash',
      desc: 'Airport pickup, hostels, food, safety & on-ground team',
      icon: Compass,
      color: 'bg-[#0284C7]'
    },
    {
      id: 'fast_faq' as const,
      name: 'Fast FAQ Assistant',
      modelType: 'fast' as const,
      modelName: 'gemini-3.1-flash-lite',
      desc: 'Instant answers for agency fees, deadlines & contact info',
      icon: Zap,
      color: 'bg-[#1677FF]'
    }
  ];

  // Quick prompt suggestions
  const suggestedPrompts = [
    { label: '🏆 Scholarship Evaluation', text: 'How does Fresh Study India evaluate and secure up to 100% scholarships for international students?' },
    { label: '🏢 Agency Services', text: 'What end-to-end services does Fresh Study India provide from application to campus arrival?' },
    { label: '🛂 Indian Student Visa', text: 'How does Fresh Study India assist with the Indian Embassy student visa application and interview preparation?' },
    { label: '💰 Total Study Budget in USD', text: 'What is the estimated total cost per year for tuition, hostel, and meals when studying in India through Fresh Study India?' },
    { label: '🛬 Airport & On-Ground Support', text: 'What on-ground assistance does Fresh Study India provide once I land in India (pickup, hostel, FRRO)?' }
  ];

  const handleRoleSelect = (roleId: typeof selectedRole) => {
    setSelectedRole(roleId);
    const roleObj = roles.find((r) => r.id === roleId);
    if (roleObj) {
      setSelectedModelType(roleObj.modelType);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Clear all conversation history with Gemini AI Advisor?')) {
      setMessages(initialMessages);
      localStorage.removeItem('fresh_study_india_gemini_chat');
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputPrompt).trim();
    if (!messageContent || isLoading) return;

    setErrorStatus(null);
    const userMsgId = `usr-${Date.now()}`;
    const userMessage: ChatMessageItem = {
      id: userMsgId,
      sender: 'user',
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputPrompt('');
    setIsLoading(true);

    try {
      let replyText = '';
      let modelUsed = selectedModelType === 'complex' ? 'gemini-3.1-pro-preview' : selectedModelType === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash';
      let fetchedSuccessfully = false;

      // 1. Try server-side endpoint first
      try {
        const response = await fetch('/api/gemini/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: newHistory.map((m) => ({
              sender: m.sender,
              text: m.text
            })),
            role: selectedRole,
            modelType: selectedModelType,
            userContext: currentUser ? {
              name: currentUser.name,
              email: currentUser.email,
              role: currentUser.role,
              country: currentUser.targetCountry || 'International'
            } : undefined
          })
        });

        const contentType = response.headers.get('content-type') || '';
        if (response.ok && contentType.includes('application/json')) {
          const data = await response.json().catch(() => null);
          if (data && data.reply && typeof data.reply === 'string') {
            replyText = data.reply;
            if (data.modelUsed) modelUsed = data.modelUsed;
            fetchedSuccessfully = true;
          }
        }
      } catch (networkErr) {
        console.info('Server chat API unreachable, activating intelligent agency knowledge base fallback:', networkErr);
      }

      // 2. If server API returned HTML/404 or failed, use Knowledge Engine
      if (!fetchedSuccessfully || !replyText) {
        const fallbackResult = generateAdvisorResponse(
          messageContent,
          selectedRole,
          currentUser ? {
            name: currentUser.name,
            email: currentUser.email,
            role: currentUser.role,
            country: currentUser.targetCountry || 'International'
          } : undefined
        );
        replyText = fallbackResult.reply;
        modelUsed = fallbackResult.modelUsed;
      }

      const botMessage: ChatMessageItem = {
        id: `bot-${Date.now()}`,
        sender: 'model',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: modelUsed,
        roleType: selectedRole
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.warn('Gemini chat handled gracefully:', err);
      const emergencyFallback = generateAdvisorResponse(messageContent, selectedRole, { name: currentUser?.name });
      const fallbackMsg: ChatMessageItem = {
        id: `bot-fallback-${Date.now()}`,
        sender: 'model',
        text: emergencyFallback.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'Fresh Study India Admissions Guide'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render formatted markdown text cleanly
  const renderFormattedMessage = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed text-[#102A43]">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          // Bullet points
          if (line.startsWith('* ') || line.startsWith('- ') || line.startsWith('• ')) {
            const clean = line.replace(/^[\*\-•]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-[#1677FF] font-bold">•</span>
                <span className="text-[#102A43]">{formatInlineText(clean)}</span>
              </div>
            );
          }

          // Numbered lists (1. 2. etc)
          if (/^\d+\.\s/.test(line)) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="font-bold text-[#1677FF]">{line.match(/^\d+\./)?.[0]}</span>
                <span className="text-[#102A43]">{formatInlineText(line.replace(/^\d+\.\s*/, ''))}</span>
              </div>
            );
          }

          // Heading
          if (line.startsWith('### ')) {
            return <h5 key={idx} className="font-extrabold text-[#102A43] mt-2 text-xs uppercase tracking-wider">{line.replace('### ', '')}</h5>;
          }
          if (line.startsWith('## ')) {
            return <h4 key={idx} className="font-black text-[#102A43] mt-2 text-sm">{line.replace('## ', '')}</h4>;
          }

          return <p key={idx} className="text-[#102A43]">{formatInlineText(line)}</p>;
        })}
      </div>
    );
  };

  const formatInlineText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-black text-[#102A43]">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const currentActiveRole = roles.find((r) => r.id === selectedRole) || roles[0];

  if (isFloatingWidget && !isOpenFloating) {
    return null;
  }

  return (
    <div className={`flex flex-col bg-white border border-[#D9EAF7] shadow-2xl overflow-hidden transition-all duration-300 ${
      isFloatingWidget 
        ? isExpanded 
          ? 'fixed inset-4 sm:inset-10 z-50 rounded-3xl' 
          : 'fixed bottom-5 right-5 z-50 w-[94vw] sm:w-[440px] h-[600px] max-h-[86vh] rounded-3xl'
        : 'w-full h-full min-h-[620px] rounded-3xl'
    }`}>
      
      {/* CHATBOT HEADER */}
      <div className="bg-[#102A43] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#102A43]/40">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1677FF] to-[#38BDF8] flex items-center justify-center shadow-md shadow-blue-500/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#38BDF8] border-2 border-[#102A43] rounded-full" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-1.5">
                Fresh Study India AI Advisor
              </h3>
              <span className="px-2 py-0.5 bg-[#1677FF]/20 text-[#38BDF8] border border-[#38BDF8]/40 text-[10px] font-bold rounded-full flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Gemini
              </span>
            </div>
            <p className="text-[11px] text-blue-200 flex items-center gap-2 font-medium">
              <span>{currentActiveRole.name}</span>
              <span>•</span>
              <span className="text-[#38BDF8] font-mono">{currentActiveRole.modelName}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 text-blue-200">
          <button
            type="button"
            onClick={handleClearHistory}
            title="Clear Chat History"
            className="p-2 hover:text-rose-300 hover:bg-white/10 rounded-xl transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {isFloatingWidget && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Minimize Window' : 'Expand Fullscreen'}
              className="p-2 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer hidden sm:block"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}

          {isFloatingWidget && onCloseFloating && (
            <button
              type="button"
              onClick={onCloseFloating}
              title="Close Chat"
              className="p-2 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* ROLE & MODEL SELECTOR TABS */}
      <div className="bg-[#F5FAFF] p-2 border-b border-[#D9EAF7] overflow-x-auto scrollbar-none flex items-center gap-1.5">
        <span className="text-[10px] font-extrabold uppercase text-[#52667A] tracking-wider px-2 shrink-0">
          Specialist:
        </span>
        {roles.map((r) => {
          const Icon = r.icon;
          const isSelected = selectedRole === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => handleRoleSelect(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-[#1677FF] text-white shadow-xs'
                  : 'bg-white text-[#52667A] hover:bg-[#EBF5FE] hover:text-[#102A43] border border-[#D9EAF7]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{r.name}</span>
              {r.modelType === 'complex' && (
                <span className="px-1.5 py-0.2 bg-blue-100 text-[#1677FF] text-[9px] rounded-md font-mono">PRO</span>
              )}
              {r.modelType === 'fast' && (
                <span className="px-1.5 py-0.2 bg-cyan-100 text-[#0891B2] text-[9px] rounded-md font-mono">LITE</span>
              )}
            </button>
          );
        })}
      </div>

      {/* ROLE DESCRIPTION BANNER */}
      <div className="px-4 py-2 bg-[#EBF5FE] border-b border-[#BFDBFE] flex items-center justify-between text-[11px] text-[#1677FF]">
        <div className="flex items-center gap-2 truncate">
          <currentActiveRole.icon className="w-3.5 h-3.5 text-[#1677FF] shrink-0" />
          <span className="font-semibold truncate">{currentActiveRole.desc}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0 font-mono text-[10px] text-[#1677FF] bg-white px-2 py-0.5 rounded-md font-bold border border-[#BFDBFE]">
          <Cpu className="w-3 h-3" /> {currentActiveRole.modelName}
        </div>
      </div>

      {/* SCROLLABLE MESSAGE THREAD */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#F5FAFF]/60">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs text-xs font-bold ${
                isUser 
                  ? 'bg-[#102A43] text-white' 
                  : 'bg-gradient-to-tr from-[#1677FF] to-[#38BDF8] text-white shadow-blue-500/20'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm shadow-xs transition-all ${
                isUser 
                  ? 'bg-gradient-to-r from-[#1677FF] to-[#0284C7] text-white rounded-tr-none' 
                  : 'bg-white text-[#102A43] border border-[#D9EAF7] rounded-tl-none'
              }`}>
                
                {/* Content */}
                {isUser ? (
                  <p className="whitespace-pre-wrap leading-relaxed text-white font-medium">{msg.text}</p>
                ) : (
                  renderFormattedMessage(msg.text)
                )}

                {/* Footer Metadata */}
                <div className={`mt-2.5 pt-2 flex items-center justify-between text-[10px] ${
                  isUser ? 'border-t border-white/20 text-blue-100' : 'border-t border-[#D9EAF7] text-[#52667A]'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-2.5 h-2.5" /> {msg.timestamp}
                    </span>
                    {msg.modelUsed && !isUser && (
                      <span className="px-1.5 py-0.5 bg-[#F5FAFF] text-[#1677FF] rounded font-mono font-bold text-[9px] border border-[#D9EAF7]">
                        {msg.modelUsed}
                      </span>
                    )}
                  </div>

                  {!isUser && (
                    <button
                      type="button"
                      onClick={() => handleCopyText(msg.id, msg.text)}
                      className="p-1 hover:text-[#1677FF] rounded transition cursor-pointer"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-[#1677FF]" /> : <Copy className="w-3 h-3" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1677FF] to-[#38BDF8] text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-[#D9EAF7] rounded-2xl rounded-tl-none p-4 shadow-xs flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-[#1677FF] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-[#1677FF] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-[#1677FF] rounded-full animate-bounce" />
              </div>
              <span className="text-xs font-semibold text-[#52667A]">
                Consulting {currentActiveRole.name} ({currentActiveRole.modelName})...
              </span>
            </div>
          </div>
        )}

        {errorStatus && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl">
            {errorStatus}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* QUICK PROMPT SUGGESTIONS (Chips) */}
      <div className="p-2.5 bg-white border-t border-[#D9EAF7] overflow-x-auto scrollbar-none flex items-center gap-1.5">
        <span className="text-[10px] font-extrabold text-[#52667A] uppercase tracking-wider shrink-0 flex items-center gap-1 pl-1">
          <HelpCircle className="w-3 h-3" /> Quick:
        </span>
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(p.text)}
            disabled={isLoading}
            className="px-2.5 py-1 bg-[#F5FAFF] hover:bg-[#EBF5FE] hover:text-[#1677FF] hover:border-[#BFDBFE] border border-[#D9EAF7] rounded-xl text-[11px] font-semibold text-[#102A43] transition shrink-0 cursor-pointer disabled:opacity-50"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* CHAT INPUT FORM */}
      <div className="p-3 sm:p-4 bg-white border-t border-[#D9EAF7]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-end gap-2"
        >
          <div className="flex-1 bg-[#F5FAFF] border border-[#D9EAF7] rounded-2xl p-2.5 focus-within:border-[#1677FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition shadow-inner">
            <textarea
              ref={inputRef}
              rows={2}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask ${currentActiveRole.name} about universities, fees, or visas...`}
              className="w-full bg-transparent border-0 resize-none text-xs sm:text-sm text-[#102A43] placeholder-[#52667A]/60 font-medium focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="p-3.5 bg-gradient-to-r from-[#1677FF] to-[#38BDF8] hover:from-[#005cd6] hover:to-[#0284c7] text-white rounded-2xl font-bold shadow-md hover:shadow-lg transition flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>

        {/* Footer shortcuts */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-[#52667A]">
          <span>Press Enter to send, Shift + Enter for newline</span>
          {onOpenApplyModal && (
            <button
              type="button"
              onClick={onOpenApplyModal}
              className="text-[#1677FF] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              Ready to Apply? <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
