import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  RotateCcw,
  Sparkles,
  Bot,
  User,
  Database,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Clock,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { StudentProfile, ChatMessage } from '../types';

interface ChatViewProps {
  profile: StudentProfile;
  activeRoleId: string;
  onUpdateProfileFromChat?: (partial: Partial<StudentProfile>) => void;
  onOpenProfile: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  profile,
  activeRoleId,
  onUpdateProfileFromChat,
  onOpenProfile
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Hello ${profile.name || 'there'}! I'm your **AI Career Navigator**. I can help you:
- **Discover career paths** matching your current skills & interests.
- **Analyze skill gaps** against entry-level industry benchmarks.
- **Plan structured learning roadmaps** strictly respecting your **${profile.availableStudyHoursPerWeek} hours/week** availability.
- **Review technical projects** for internship readiness.

How can I help you today? You can ask a question or try one of the evaluation test scenarios below.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      retrievedCareerRecords: ['Data Analyst', 'Data Scientist', 'AI Engineer'],
      suggestedQuickReplies: [
        'I know Python, SQL, Excel, and basic statistics. What internships fit my profile?',
        'I want to become a Data Analyst. I know Excel and basic SQL but no data viz.',
        'I already know Excel and Power BI. Create a 4-week roadmap for 5 hours/week.'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for session memory
      const conversationHistory = messages
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => ({
          role: m.role,
          content: m.content
        }));

      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          conversationHistory,
          profile,
          activeRoleId
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${res.status}`);
      }

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'I processed your inquiry against our career knowledge records.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        retrievedCareerRecords: data.retrievedCareerRecords || [],
        actionTaken: data.actionTaken,
        suggestedProfileUpdates: data.suggestedProfileUpdates,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // If profile updates were suggested and callback is provided, automatically notify or sync
      if (data.suggestedProfileUpdates && onUpdateProfileFromChat) {
        onUpdateProfileFromChat(data.suggestedProfileUpdates);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `I encountered an issue processing your request: ${err.message || 'Network error'}. Please try again or verify the server is running.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetConversation = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `Conversation context has been reset. Active session memory cleared. What would you like to explore next, ${profile.name}?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        retrievedCareerRecords: ['Career Knowledge Base Ready'],
        suggestedQuickReplies: [
          'What are the core technical skills needed for an AI Engineer?',
          'How does a Data Analyst role differ from a Data Scientist?',
          'Recommend beginner portfolio projects for Cybersecurity Analyst.'
        ]
      }
    ]);
  };

  // Render a small, safe subset of Markdown using React nodes (never raw HTML).
  const renderInlineMarkdown = (text: string): React.ReactNode[] => {
    const tokenPattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
    const nodes: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = tokenPattern.exec(text)) !== null) {
      if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
      const token = match[0];
      if (token.startsWith('**')) {
        nodes.push(<strong key={`b-${match.index}`} className="font-bold text-slate-900">{token.slice(2, -2)}</strong>);
      } else if (token.startsWith('`')) {
        nodes.push(<code key={`c-${match.index}`} className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono text-[11px]">{token.slice(1, -1)}</code>);
      } else {
        nodes.push(<em key={`i-${match.index}`} className="italic">{token.slice(1, -1)}</em>);
      }
      lastIndex = match.index + token.length;
    }
    if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
    return nodes;
  };

  const renderFormattedMessage = (content: string) => (
    <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
      {content.split('\n\n').map((paragraph, pIdx) => {
        const lines = paragraph.split('\n');
        const isBulletList = lines.every(line => /^\s*(?:[•*-])\s+/.test(line));
        const isNumberedList = lines.every(line => /^\s*\d+\.\s+/.test(line));
        if (isBulletList) {
          return <ul key={pIdx} className="list-disc list-inside space-y-1 my-1.5 pl-1">{lines.map((line, i) => <li key={i}>{renderInlineMarkdown(line.replace(/^\s*(?:[•*-])\s+/, ''))}</li>)}</ul>;
        }
        if (isNumberedList) {
          return <ol key={pIdx} className="list-decimal list-inside space-y-1 my-1.5 pl-1">{lines.map((line, i) => <li key={i}>{renderInlineMarkdown(line.replace(/^\s*\d+\.\s+/, ''))}</li>)}</ol>;
        }
        return <p key={pIdx}>{lines.map((line, i) => <React.Fragment key={i}>{i > 0 && <br />}{renderInlineMarkdown(line)}</React.Fragment>)}</p>;
      })}
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-h-[820px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-200">
      {/* Chat Header */}
      <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center">
            <Bot className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold text-white">AI Career Guidance Agent</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                Active Memory
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Grounded in Career Knowledge Base • Powered by Gemini
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleResetConversation}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors"
            title="Clear conversation history and restart active session"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Session</span>
          </button>
        </div>
      </div>

      {/* Profile Context Banner */}
      <div className="px-6 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 shrink-0">
        <div className="flex items-center space-x-2 truncate">
          <span className="font-semibold text-slate-700">Active Profile Context:</span>
          <span className="text-slate-900 truncate">
            {profile.name} • {profile.availableStudyHoursPerWeek} hrs/wk • {profile.skills.map(s => `${s.name} (${s.level})`).join(', ') || 'No skills added yet'}
          </span>
        </div>
        <button
          onClick={onOpenProfile}
          className="text-indigo-600 hover:text-indigo-800 font-semibold shrink-0 ml-2"
        >
          Edit Profile
        </button>
      </div>

      {/* Messages Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((message) => {
          const isUser = message.role === 'user';
          return (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-900 text-indigo-400 border border-slate-800'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Content Container */}
              <div className={`max-w-[85%] sm:max-w-[75%] space-y-1.5`}>
                <div
                  className={`p-4 rounded-2xl ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none shadow-xs'
                  }`}
                >
                  {isUser ? (
                    <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  ) : (
                    renderFormattedMessage(message.content)
                  )}
                </div>

                {/* Retrieved Records Transparency Badges (if any) */}
                {!isUser && message.retrievedCareerRecords && message.retrievedCareerRecords.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Database className="w-3 h-3 text-indigo-500" />
                      Retrieved records:
                    </span>
                    {message.retrievedCareerRecords.map((rec) => (
                      <span
                        key={rec}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium"
                      >
                        {rec}
                      </span>
                    ))}
                    {message.actionTaken && (
                      <span className="text-[10px] text-slate-400">• {message.actionTaken}</span>
                    )}
                    <span className="text-[10px] text-slate-400">• {message.timestamp}</span>
                  </div>
                )}

                {/* Profile Adjustment Confirmation Badge */}
                {message.suggestedProfileUpdates && (
                  <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 flex items-center justify-between">
                    <span className="font-medium">
                      ✓ Profile Updated:{' '}
                      {[
                        message.suggestedProfileUpdates.availableStudyHoursPerWeek ? `${message.suggestedProfileUpdates.availableStudyHoursPerWeek} hrs/week` : '',
                        message.suggestedProfileUpdates.targetTimelineWeeks ? `${message.suggestedProfileUpdates.targetTimelineWeeks} weeks` : '',
                        message.suggestedProfileUpdates.skills ? `${message.suggestedProfileUpdates.skills.length} reported skills` : ''
                      ].filter(Boolean).join(' • ')}
                    </span>
                    <span className="text-[10px] bg-indigo-200/60 text-indigo-800 font-bold px-2 py-0.5 rounded">
                      Roadmap Updated
                    </span>
                  </div>
                )}

                {/* Quick replies */}
                {message.suggestedQuickReplies && message.suggestedQuickReplies.length > 0 && (
                  <div className="space-y-1 pt-1.5">
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <Lightbulb className="w-3 h-3 text-amber-500" /> Suggested Evaluation Prompts:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {message.suggestedQuickReplies.map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(reply)}
                          className="text-left text-[11px] px-2.5 py-1.5 rounded-lg bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 transition-colors shadow-2xs"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-indigo-400 border border-slate-800 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 rounded-tl-none flex items-center space-x-2 text-xs text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
              <span>Analyzing profile and cross-referencing Career Knowledge Base...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask career guidance, roadmap adjustments, or skill questions...`}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium text-xs sm:text-sm flex items-center space-x-1.5 shadow-xs transition-colors shrink-0"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>
            Strict hour adherence active ({profile.availableStudyHoursPerWeek} hrs/wk). Context is preserved within the active session.
          </span>
          <span className="hidden sm:inline">Press Enter to send</span>
        </div>
      </div>
    </div>
  );
};
