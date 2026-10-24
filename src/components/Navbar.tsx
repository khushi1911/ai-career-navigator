import React, { useState } from 'react';
import {
  Compass,
  LayoutDashboard,
  MessageSquareCode,
  Target,
  CalendarCheck,
  Briefcase,
  FileText,
  BookOpen,
  User,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { StudentProfile } from '../types';
import { DEMO_PROFILES } from '../data/demoProfiles';

export type NavTab = 'dashboard' | 'chat' | 'skill-gap' | 'roadmap' | 'careers' | 'resume' | 'resources';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  profile: StudentProfile;
  onOpenProfileModal: () => void;
  onSelectPreset: (presetProfile: StudentProfile) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  onOpenProfileModal,
  onSelectPreset
}) => {
  const [showPresets, setShowPresets] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chat', label: 'AI Advisor', icon: MessageSquareCode },
    { id: 'skill-gap', label: 'Skill Gap', icon: Target },
    { id: 'roadmap', label: 'Roadmap', icon: CalendarCheck },
    { id: 'careers', label: 'Career Explorer', icon: Briefcase },
    { id: 'resume', label: 'Resume Review', icon: FileText },
    { id: 'resources', label: 'Resources', icon: BookOpen }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight text-white">AI CAREER NAVIGATOR</span>
                <span className="hidden md:inline-flex text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Agentic AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Intelligent Career Guidance & Skill-Gap Analysis</p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Presets Dropdown & Profile Badge */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Test Presets Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPresets(!showPresets)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 transition-colors"
                title="Quickly switch between evaluation test cases"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Evaluation Presets</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {showPresets && (
                <div
                  className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 text-xs"
                  onMouseLeave={() => setShowPresets(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    Load Demonstration Case
                  </div>
                  {DEMO_PROFILES.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        onSelectPreset(preset.profile);
                        setShowPresets(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-indigo-950/60 transition-colors group flex flex-col"
                    >
                      <span className="font-semibold text-slate-200 group-hover:text-indigo-300">
                        {preset.label}
                      </span>
                      <span className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {preset.description}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Student Profile Avatar & Edit Trigger */}
            <button
              onClick={onOpenProfileModal}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-600/50 text-indigo-200 flex items-center justify-center text-xs font-semibold">
                {profile.name ? profile.name.charAt(0) : <User className="w-3.5 h-3.5" />}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-semibold leading-none text-slate-200 line-clamp-1">{profile.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{profile.availableStudyHoursPerWeek}h/wk • {profile.skills.length} skills</div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center space-x-1 py-2 overflow-x-auto border-t border-slate-800/80 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
