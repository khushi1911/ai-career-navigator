/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { ChatView } from './components/ChatView';
import { SkillGapView } from './components/SkillGapView';
import { RoadmapView } from './components/RoadmapView';
import { CareerExplorerView } from './components/CareerExplorerView';
import { ResumeAnalyzerView } from './components/ResumeAnalyzerView';
import { ResourceFinderView } from './components/ResourceFinderView';
import { StudentProfileModal } from './components/StudentProfileModal';
import { AgentCapabilitiesModal } from './components/AgentCapabilitiesModal';
import { DEFAULT_INITIAL_PROFILE, DEMO_PROFILES } from './data/demoProfiles';
import { StudentProfile, LearningRoadmap } from './types';
import { analyzeSkillGap } from './services/skillGapEngine';
import { generatePersonalizedRoadmap } from './services/roadmapEngine';
import { CAREER_KNOWLEDGE_BASE } from './data/careerKnowledgeBase';
import { Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [activeRoleId, setActiveRoleId] = useState<string>('data-analyst');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCapabilitiesModalOpen, setIsCapabilitiesModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Initialize profile with localStorage fallback
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('ai_career_student_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load profile from localStorage', e);
    }
    return DEFAULT_INITIAL_PROFILE;
  });

  // Roadmap state
  const [roadmap, setRoadmap] = useState<LearningRoadmap>(() => {
    return generatePersonalizedRoadmap(activeRoleId, profile);
  });

  // Sync profile changes to localStorage and recalibrate roadmap
  useEffect(() => {
    try {
      localStorage.setItem('ai_career_student_profile', JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage', e);
    }
  }, [profile]);

  // Handle preset selection
  const handleSelectPreset = (presetProfile: StudentProfile) => {
    setProfile(presetProfile);
    const roleToSet = presetProfile.preferredRoles?.[0] || 'data-analyst';
    setActiveRoleId(roleToSet);
    const updatedRoadmap = generatePersonalizedRoadmap(roleToSet, presetProfile);
    setRoadmap(updatedRoadmap);

    showToast(`Loaded ${presetProfile.name}'s profile (${presetProfile.availableStudyHoursPerWeek} hrs/week)`);
  };

  const handleSelectTestCase = (caseId: 'test-case-1' | 'test-case-2' | 'test-case-3') => {
    const found = DEMO_PROFILES.find(p => p.id === caseId);
    if (found) {
      handleSelectPreset(found.profile);
      if (caseId === 'test-case-1') {
        setActiveTab('chat');
      } else if (caseId === 'test-case-2') {
        setActiveTab('skill-gap');
      } else if (caseId === 'test-case-3') {
        setActiveTab('roadmap');
      }
    }
  };

  const handleSaveProfile = (updated: StudentProfile) => {
    setProfile(updated);
    const updatedRoadmap = generatePersonalizedRoadmap(activeRoleId, updated);
    setRoadmap(updatedRoadmap);
    showToast('Profile updated. Skill gap & roadmap recalibrated!');
  };

  const handleUpdateProfileFromChat = (partial: Partial<StudentProfile>) => {
    setProfile(prev => {
      const updated = { ...prev, ...partial };
      const updatedRoadmap = generatePersonalizedRoadmap(activeRoleId, updated);
      setRoadmap(updatedRoadmap);
      return updated;
    });
    if (partial.availableStudyHoursPerWeek) {
      showToast(`Roadmap adapted for ${partial.availableStudyHoursPerWeek} hrs/week!`);
    }
  };

  const handleSelectRole = (roleId: string) => {
    setActiveRoleId(roleId);
    const updatedRoadmap = generatePersonalizedRoadmap(roleId, profile);
    setRoadmap(updatedRoadmap);
  };

  const handleToggleTaskComplete = (weekNumber: number, taskId: string) => {
    setRoadmap(prev => {
      const updatedWeeks = prev.weeks.map(week => {
        if (week.weekNumber !== weekNumber) return week;
        return {
          ...week,
          tasks: week.tasks.map(task => {
            if (task.id !== taskId) return task;
            return { ...task, completed: !task.completed };
          })
        };
      });
      return { ...prev, weeks: updatedWeeks };
    });
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Deterministic skill-gap analysis for active role
  const gapAnalysis = analyzeSkillGap(activeRoleId, profile);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onSelectPreset={handleSelectPreset}
      />

      {/* Floating Demo Toast */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Floating Architecture & Evaluation Guide Pill (Always visible in bottom left) */}
      <div className="fixed bottom-5 left-5 z-40 hidden sm:block">
        <button
          onClick={() => setIsCapabilitiesModalOpen(true)}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200 shadow-md text-xs font-bold transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Agent Capabilities & Eval Guide</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            profile={profile}
            gapAnalysis={gapAnalysis}
            roadmap={roadmap}
            onNavigate={setActiveTab}
            onSelectRole={handleSelectRole}
            onToggleTaskComplete={handleToggleTaskComplete}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {activeTab === 'chat' && (
          <ChatView
            profile={profile}
            activeRoleId={activeRoleId}
            onUpdateProfileFromChat={handleUpdateProfileFromChat}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {activeTab === 'skill-gap' && (
          <SkillGapView
            profile={profile}
            activeRoleId={activeRoleId}
            onSelectRole={handleSelectRole}
            onGenerateRoadmap={(roleId) => {
              handleSelectRole(roleId);
              setActiveTab('roadmap');
            }}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView
            profile={profile}
            activeRoleId={activeRoleId}
            onSelectRole={handleSelectRole}
            roadmap={roadmap}
            onUpdateRoadmap={setRoadmap}
            onToggleTaskComplete={handleToggleTaskComplete}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {activeTab === 'careers' && (
          <CareerExplorerView
            activeRoleId={activeRoleId}
            onSelectRole={handleSelectRole}
            onNavigateToSkillGap={(roleId) => {
              handleSelectRole(roleId);
              setActiveTab('skill-gap');
            }}
          />
        )}

        {activeTab === 'resume' && (
          <ResumeAnalyzerView
            profile={profile}
            activeRoleId={activeRoleId}
            onSelectRole={handleSelectRole}
          />
        )}

        {activeTab === 'resources' && (
          <ResourceFinderView />
        )}
      </main>

      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      {/* Agent Capabilities & Evaluation Guide Modal */}
      <AgentCapabilitiesModal
        isOpen={isCapabilitiesModalOpen}
        onClose={() => setIsCapabilitiesModalOpen(false)}
        onSelectTestCase={handleSelectTestCase}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">AI Career Navigator</span>
            <span>•</span>
            <span>Intelligent Career Guidance & Skill-Gap Analysis Agent</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsCapabilitiesModalOpen(true)}
              className="hover:text-indigo-600 transition-colors"
            >
              Evaluation Architecture
            </button>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="hover:text-indigo-600 transition-colors"
            >
              Student Profile
            </button>
            <span>Educational Guidance Only</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
