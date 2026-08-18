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
      text: `Hello ${currentUser?.name || 'there'}! 👋 Welcome to **Fresh Study India's AI Admissions Advisor**.\n\nI can help you explore accredited Indian universities, calculate scholarship eligibility (up to 100%), prepare your student visa documentation, and guide you through hostel accommodation and FRRO registration.\n\nHow can I assist your educational journey to India today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.5-flash',
      roleType: 'general_advisor'
    }
  ];

  const [messages, setMessages] = useState<ChatMessageItem[]>(() => {
    try {
      const saved = localStorage.getItem('fresh_study_india_gemini_chat');
      if (saved) {
        return JSON.parse(saved);
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
      desc: 'University matching, intake dates & application procedure',
      icon: GraduationCap,
      color: 'bg-emerald-600'
    },
    {
      id: 'scholarship_navigator' as const,
      name: 'Scholarship AI',
      modelType: 'complex' as const,
      modelName: 'gemini-3.1-pro-preview',
      desc: 'Complex academic grade calculations & merit grant assessments',
      icon: Award,
      color: 'bg-amber-600'
    },
    {
      id: 'visa_specialist' as const,
      name: 'Visa & FRRO Specialist',
      modelType: 'general' as const,
      modelName: 'gemini-3.5-flash',
      desc: 'Embassy interviews, bonafide letters & immigration clearance',
      icon: ShieldCheck,
      color: 'bg-indigo-600'
    },
    {
      id: 'campus_life_guide' as const,
      name: 'Campus Life & Living',
      modelType: 'general' as const,
      modelName: 'gemini-3.5-flash',
      desc: 'Hostels, food, climate, safety & international student communities',
      icon: Compass,
      color: 'bg-teal-600'
    },
    {
      id: 'fast_faq' as const,
      name: 'Fast FAQ Assistant',
      modelType: 'fast' as const,
      modelName: 'gemini-3.1-flash-lite',
      desc: 'Ultra-fast answers for quick fees, deadlines & requirements',
      icon: Zap,
      color: 'bg-purple-600'
    }
  ];

  // Quick prompt suggestions
  const suggestedPrompts = [
    { label: '🏆 Scholarship Eligibility', text: 'What are the scholarship requirements for African students applying to study in India?' },
    { label: '🏛️ Compare Universities', text: 'Compare Computer Science programs at Lovely Professional University vs Chandigarh University vs Sharda University.' },
    { label: '🛂 Indian Student Visa', text: 'What documents and bank statement proofs do I need for the Indian Embassy student visa interview?' },
    { label: '💰 Total Cost in USD', text: 'Can you give an estimated breakdown of total cost per year for tuition, hostel, and food in India in USD?' },
    { label: '🏥 MBBS in India', text: 'What are the eligibility criteria and NMC recognition details for international students taking MBBS or BDS in India?' }
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
      // Prepare payload for backend Express route /api/gemini/chat
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

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to receive response from Gemini AI');
      }

      const botMessage: ChatMessageItem = {
        id: `bot-${Date.now()}`,
        sender: 'model',
        text: data.reply || "I'm ready to assist you. What specific question do you have about studying in India?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || (selectedModelType === 'complex' ? 'gemini-3.1-pro-preview' : selectedModelType === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash'),
        roleType: selectedRole
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Gemini chat error:', err);
      setErrorStatus(err.message || 'Unable to connect to Gemini AI.');

      // Fallback friendly guidance message if offline
      const fallbackMsg: ChatMessageItem = {
        id: `bot-err-${Date.now()}`,
        sender: 'model',
        text: `⚠️ **Advisory Notice**: I encountered a temporary connection glitch. \n\nIn the meantime, you can reach our admission desk directly via WhatsApp at **+91 98765 43210** or submit your inquiry for priority counseling!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'offline-fallback'
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

  // Render formatted markdown text simply
  const renderFormattedMessage = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          // Bullet points
          if (line.startsWith('* ') || line.startsWith('- ') || line.startsWith('• ')) {
            const clean = line.replace(/^[\*\-•]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{formatInlineText(clean)}</span>
              </div>
            );
          }

          // Numbered lists (1. 2. etc)
          if (/^\d+\.\s/.test(line)) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="font-bold text-slate-500">{line.match(/^\d+\./)?.[0]}</span>
                <span>{formatInlineText(line.replace(/^\d+\.\s*/, ''))}</span>
              </div>
            );
          }

          // Heading
          if (line.startsWith('### ')) {
            return <h5 key={idx} className="font-bold text-slate-900 mt-2 text-xs uppercase tracking-wider">{line.replace('### ', '')}</h5>;
          }
          if (line.startsWith('## ')) {
            return <h4 key={idx} className="font-extrabold text-slate-900 mt-2 text-sm">{line.replace('## ', '')}</h4>;
          }

          return <p key={idx}>{formatInlineText(line)}</p>;
        })}
      </div>
    );
  };

  const formatInlineText = (text: string) => {
    // Basic bold **text** parsing
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-extrabold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const currentActiveRole = roles.find((r) => r.id === selectedRole) || roles[0];

  // If floating widget and not opened, render toggle bubble
  if (isFloatingWidget && !isOpenFloating) {
    return null;
  }

  return (
    <div className={`flex flex-col bg-white border border-slate-200/80 shadow-2xl overflow-hidden transition-all duration-300 ${
      isFloatingWidget 
        ? isExpanded 
          ? 'fixed inset-4 sm:inset-10 z-50 rounded-3xl' 
          : 'fixed bottom-5 right-5 z-50 w-[94vw] sm:w-[440px] h-[600px] max-h-[86vh] rounded-3xl'
        : 'w-full h-full min-h-[620px] rounded-3xl'
    }`}>
      
      {/* CHATBOT HEADER */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-1.5">
                Fresh Study India AI Advisor
              </h3>
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800/80 text-[10px] font-bold rounded-full flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Gemini Powered
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-2">
              <span>{currentActiveRole.name}</span>
              <span>•</span>
              <span className="text-emerald-400 font-mono">{currentActiveRole.modelName}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 text-slate-400">
          <button
            type="button"
            onClick={handleClearHistory}
            title="Clear Chat History"
            className="p-2 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {isFloatingWidget && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Minimize Window' : 'Expand Fullscreen'}
              className="p-2 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer hidden sm:block"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}

          {isFloatingWidget && onCloseFloating && (
            <button
              type="button"
              onClick={onCloseFloating}
              title="Close Chat"
              className="p-2 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* ROLE & MODEL SELECTOR TABS */}
      <div className="bg-slate-50 p-2 border-b border-slate-200 overflow-x-auto scrollbar-none flex items-center gap-1.5">
        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider px-2 shrink-0">
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
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{r.name}</span>
              {r.modelType === 'complex' && (
                <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-600 text-[9px] rounded-md font-mono">PRO</span>
              )}
              {r.modelType === 'fast' && (
                <span className="px-1.5 py-0.2 bg-purple-500/20 text-purple-600 text-[9px] rounded-md font-mono">LITE</span>
              )}
            </button>
          );
        })}
      </div>

      {/* ROLE DESCRIPTION BANNER */}
      <div className="px-4 py-2 bg-emerald-50/60 border-b border-emerald-100/80 flex items-center justify-between text-[11px] text-emerald-900">
        <div className="flex items-center gap-2 truncate">
          <currentActiveRole.icon className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <span className="font-semibold truncate">{currentActiveRole.desc}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0 font-mono text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md font-bold">
          <Cpu className="w-3 h-3" /> {currentActiveRole.modelName}
        </div>
      </div>

      {/* SCROLLABLE MESSAGE THREAD */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/40">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm text-xs font-bold ${
                isUser 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-emerald-600 text-white'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm shadow-sm transition-all ${
                isUser 
                  ? 'bg-slate-900 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none'
              }`}>
                
                {/* Content */}
                {isUser ? (
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                ) : (
                  renderFormattedMessage(msg.text)
                )}

                {/* Footer Metadata */}
                <div className={`mt-2.5 pt-2 flex items-center justify-between text-[10px] ${
                  isUser ? 'border-t border-slate-800 text-slate-400' : 'border-t border-slate-100 text-slate-400'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {msg.timestamp}
                    </span>
                    {msg.modelUsed && !isUser && (
                      <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded font-mono font-bold text-[9px]">
                        {msg.modelUsed}
                      </span>
                    )}
                  </div>

                  {!isUser && (
                    <button
                      type="button"
                      onClick={() => handleCopyText(msg.id, msg.text)}
                      className="p-1 hover:text-emerald-600 rounded transition cursor-pointer"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
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
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" />
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Consulting {currentActiveRole.name} ({currentActiveRole.modelName})...
              </span>
            </div>
          </div>
        )}

        {errorStatus && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-2xl">
            {errorStatus}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* QUICK PROMPT SUGGESTIONS (Chips) */}
      <div className="p-2.5 bg-white border-t border-slate-100 overflow-x-auto scrollbar-none flex items-center gap-1.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 pl-1">
          <HelpCircle className="w-3 h-3" /> Quick:
        </span>
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(p.text)}
            disabled={isLoading}
            className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 border border-slate-200/80 rounded-xl text-[11px] font-semibold text-slate-700 transition shrink-0 cursor-pointer disabled:opacity-50"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* CHAT INPUT FORM */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-end gap-2"
        >
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-2.5 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-100 transition shadow-inner">
            <textarea
              ref={inputRef}
              rows={2}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask ${currentActiveRole.name} about universities, fees, or visas...`}
              className="w-full bg-transparent border-0 resize-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-md hover:shadow-lg transition flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>

        {/* Footer shortcuts */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>Press Enter to send, Shift + Enter for newline</span>
          {onOpenApplyModal && (
            <button
              type="button"
              onClick={onOpenApplyModal}
              className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              Ready to Apply? <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
