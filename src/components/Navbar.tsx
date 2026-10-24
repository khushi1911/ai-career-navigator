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
  ChevronDown,
  Check,
  GraduationCap,
} from 'lucide-react';

import { StudentProfile } from '../types';
import { DEMO_PROFILES } from '../data/demoProfiles';

export type NavTab =
  | 'dashboard'
  | 'chat'
  | 'skill-gap'
  | 'roadmap'
  | 'careers'
  | 'resume'
  | 'resources';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  profile: StudentProfile;
  onOpenProfileModal: () => void;
  onSelectPreset: (presetProfile: StudentProfile) => void;
}

const navItems: {
  id: NavTab;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'chat', label: 'AI Advisor', icon: MessageSquareCode },
  { id: 'skill-gap', label: 'Skill Gap', icon: Target },
  { id: 'roadmap', label: 'Roadmap', icon: CalendarCheck },
  { id: 'careers', label: 'Career Explorer', icon: Briefcase },
  { id: 'resume', label: 'Resume Review', icon: FileText },
  { id: 'resources', label: 'Resources', icon: BookOpen },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  onOpenProfileModal,
  onSelectPreset,
}) => {
  const [showPresets, setShowPresets] = useState(false);

  const initials = profile.name?.trim()
    ? profile.name.trim().charAt(0).toUpperCase()
    : '';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 text-slate-900 shadow-sm backdrop-blur-xl">

      {/* Top bar */}
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[76px] items-center justify-between gap-4">

          {/* Brand */}
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            aria-label="Go to dashboard"
            className="group flex min-w-0 items-center gap-3 text-left"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-500 text-white shadow-lg shadow-indigo-500/20 transition-transform duration-200 group-hover:scale-105">
              <Compass size={24} strokeWidth={2.1} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-extrabold tracking-tight text-slate-900 sm:text-base">
                  AI Career Navigator
                </span>

                <span className="hidden rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-violet-700 sm:inline-flex">
                  Agentic AI
                </span>
              </div>

              <p className="mt-1 hidden text-xs text-slate-500 sm:block">
                Your personalized career companion
              </p>
            </div>
          </button>

          {/* Right-side actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            {/* Evaluation presets */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPresets((previous) => !previous)}
                aria-expanded={showPresets}
                aria-haspopup="menu"
                className={`inline-flex h-10 items-center gap-2 rounded-xl border px-3 text-xs font-semibold transition-all duration-200 ${
                  showPresets
                    ? 'border-violet-300 bg-violet-50 text-violet-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700'
                }`}
              >
                <Sparkles size={15} className="text-violet-600" />

                <span className="hidden xl:inline">
                  Evaluation Presets
                </span>

                <span className="xl:hidden">
                  Presets
                </span>

                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    showPresets ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showPresets && (
                <>
                  <button
                    type="button"
                    aria-label="Close evaluation presets"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setShowPresets(false)}
                  />

                  <div
                    role="menu"
                    className="absolute right-0 z-50 mt-3 w-[min(320px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10"
                  >
                    <div className="border-b border-slate-100 px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                          <GraduationCap size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            Demo scenarios
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-500">
                            Explore the agent's capabilities
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 py-2">
                      {DEMO_PROFILES.map((preset, index) => (
                        <button
                          key={preset.id}
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            onSelectPreset(preset.profile);
                            setShowPresets(false);
                          }}
                          className="group flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-violet-50"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500 transition-colors group-hover:bg-violet-100 group-hover:text-violet-700">
                            {index + 1}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block text-xs font-bold text-slate-800 group-hover:text-violet-700">
                              {preset.label}
                            </span>

                            <span className="mt-1 block text-[11px] leading-relaxed text-slate-500">
                              {preset.description}
                            </span>
                          </span>

                          <Check
                            size={15}
                            className="mt-1 shrink-0 text-transparent group-hover:text-violet-500"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile */}
            <button
              type="button"
              onClick={onOpenProfileModal}
              className="group flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50 sm:gap-3 sm:px-3"
              aria-label="Edit student profile"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-sm">
                {initials || <User size={16} />}
              </div>

              <div className="hidden max-w-[150px] text-left sm:block">
                <p className="truncate text-xs font-bold text-slate-800">
                  {profile.name || 'Your profile'}
                </p>

                <p className="mt-0.5 text-[10px] text-slate-500">
                  {profile.availableStudyHoursPerWeek} hrs/week
                  {' · '}
                  {profile.skills.length} skills
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-slate-100">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-[1600px] items-center gap-1 overflow-x-auto px-3 py-2 sm:px-6 lg:justify-center lg:px-8"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 sm:px-4 ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon
                  size={16}
                  strokeWidth={isActive ? 2.3 : 1.8}
                  className={isActive ? 'text-indigo-600' : 'text-slate-400'}
                />

                <span>{item.label}</span>

                {isActive && (
                  <span className="absolute inset-x-3 -bottom-2 h-0.5 rounded-full bg-indigo-600" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};