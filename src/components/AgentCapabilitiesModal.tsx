import React from 'react';
import {
  X,
  MessageSquare,
  Database,
  Brain,
  CalendarCheck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Code
} from 'lucide-react';

interface AgentCapabilitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTestCase: (caseId: 'test-case-1' | 'test-case-2' | 'test-case-3') => void;
}

export const AgentCapabilitiesModal: React.FC<AgentCapabilitiesModalProps> = ({
  isOpen,
  onClose,
  onSelectTestCase
}) => {
  if (!isOpen) return null;

  const capabilities = [
    {
      num: 1,
      title: 'Conversation',
      icon: MessageSquare,
      color: 'indigo',
      description: 'Understands natural student questions, explains why careers suit interests, asks clarifying follow-ups when details are missing, and distinguishes demonstrated vs gap skills.',
      location: 'AI Advisor Tab'
    },
    {
      num: 2,
      title: 'Document & Data Use',
      icon: Database,
      color: 'emerald',
      description: 'Grounds responses in 8 structured Career Knowledge Base records and parses uploaded PDF / TXT resumes within a defensive untrusted data sandbox.',
      location: 'Career Explorer & Resume Review Tabs'
    },
    {
      num: 3,
      title: 'Deterministic Decision-Making',
      icon: Brain,
      color: 'amber',
      description: 'Performs transparent, deterministic skill-gap categorization (Demonstrated vs Partially Developed vs Not Yet Reported) without hallucinations, explaining exact hiring screening impacts.',
      location: 'Skill Gap Tab'
    },
    {
      num: 4,
      title: 'Time-Budgeted Planning',
      icon: CalendarCheck,
      color: 'cyan',
      description: 'Generates multi-week roadmaps strictly budgeted to the student’s stated weekly hours (e.g. 5 or 6 hrs/week). Flags unrealistic timelines with alternative recommendations.',
      location: 'Roadmap Tab'
    },
    {
      num: 5,
      title: 'Memory & Context Adaptation',
      icon: RotateCcw,
      color: 'purple',
      description: 'Maintains active session memory: when the student states "I already know Power BI" or "Modify my roadmap for 5 hours per week", the agent immediately recalibrates without repeating beginner lessons.',
      location: 'AI Advisor & Session State'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">AI Agent Architecture & Capabilities</h2>
              <p className="text-xs text-slate-300">University Project Evaluation & Demonstration Guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm">
          {/* Quick-Test Action Buttons */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Code className="w-4 h-4 text-indigo-600" />
                1-Click Evaluation Scenarios (From Brief):
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onSelectTestCase('test-case-1');
                  onClose();
                }}
                className="p-3 bg-white rounded-xl border border-indigo-200 hover:border-indigo-500 text-left transition-all group shadow-2xs"
              >
                <div className="font-bold text-xs text-indigo-950 group-hover:text-indigo-600">
                  Test Case 1: Career Guidance
                </div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  Python, SQL, Excel, Stats • 6 hrs/week • Explores data-related paths
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectTestCase('test-case-2');
                  onClose();
                }}
                className="p-3 bg-white rounded-xl border border-indigo-200 hover:border-indigo-500 text-left transition-all group shadow-2xs"
              >
                <div className="font-bold text-xs text-indigo-950 group-hover:text-indigo-600">
                  Test Case 2: Skill-Gap Analysis
                </div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  Excel & Basic SQL • Missing Data Visualization • Target: Data Analyst
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectTestCase('test-case-3');
                  onClose();
                }}
                className="p-3 bg-white rounded-xl border border-indigo-200 hover:border-indigo-500 text-left transition-all group shadow-2xs"
              >
                <div className="font-bold text-xs text-indigo-950 group-hover:text-indigo-600">
                  Test Case 3: Contextual Roadmap
                </div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  Excel & Power BI known • 5 hrs/week • 4-week prioritized roadmap
                </div>
              </button>
            </div>
          </div>

          {/* 5 Core Agent Capabilities List */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
              5 Core Agent Capabilities Demonstrated:
            </h3>

            <div className="space-y-3">
              {capabilities.map(cap => {
                const Icon = cap.icon;
                return (
                  <div
                    key={cap.num}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start space-x-3.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {cap.num}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">{cap.title}</span>
                        <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          {cap.location}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{cap.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 7-Stage Agentic Workflow Diagram */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              7-Stage Agentic Processing Pipeline
            </h4>
            <div className="text-[11px] text-slate-300 space-y-1 leading-relaxed">
              <div><strong>1. Input Understanding:</strong> Parses natural language query, intent, and entities.</div>
              <div><strong>2. Context Retrieval:</strong> Pulls applicable records from local 8-role Career Knowledge Base.</div>
              <div><strong>3. Task Selection:</strong> Decides whether to guide, compare skill gaps, budget roadmap, or review resume.</div>
              <div><strong>4. Analysis:</strong> Executes deterministic comparison logic + Gemini 3.8 Flash semantic reasoning.</div>
              <div><strong>5. Action:</strong> Generates time-bounded roadmap, gap matrix, or verified resource citations.</div>
              <div><strong>6. Response:</strong> Presents structured, actionable, and non-hallucinated guidance.</div>
              <div><strong>7. Context Update:</strong> Maintains active session memory to calibrate all future turns.</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
          >
            Got it, Let's Explore
          </button>
        </div>
      </div>
    </div>
  );
};
