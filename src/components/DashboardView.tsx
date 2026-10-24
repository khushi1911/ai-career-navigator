import React from 'react';
import {
  Compass,
  Target,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Code,
  ShieldCheck,
  Zap,
  ExternalLink
} from 'lucide-react';
import { StudentProfile, SkillGapAnalysisResult, LearningRoadmap } from '../types';
import { CAREER_KNOWLEDGE_BASE } from '../data/careerKnowledgeBase';
import { NavTab } from './Navbar';

interface DashboardViewProps {
  profile: StudentProfile;
  gapAnalysis: SkillGapAnalysisResult;
  roadmap: LearningRoadmap;
  onNavigate: (tab: NavTab) => void;
  onSelectRole: (roleId: string) => void;
  onToggleTaskComplete: (weekNumber: number, taskId: string) => void;
  onOpenProfile: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  gapAnalysis,
  roadmap,
  onNavigate,
  onSelectRole,
  onToggleTaskComplete,
  onOpenProfile
}) => {
  const currentRole = CAREER_KNOWLEDGE_BASE.find(c => c.id === gapAnalysis.roleId) || CAREER_KNOWLEDGE_BASE[0];

  // Calculate overall task completion
  const totalTasks = roadmap.weeks.reduce((acc, w) => acc + w.tasks.length, 0);
  const completedTasks = roadmap.weeks.reduce((acc, w) => acc + w.tasks.filter(t => t.completed).length, 0);
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Welcome & Agent Status Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI Career Navigator • Active Student Session</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, {profile.name}!
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Targeting <strong className="text-white font-semibold">{currentRole.title}</strong> with{' '}
              <span className="text-indigo-300 font-medium">{profile.availableStudyHoursPerWeek} study hours/week</span> across a{' '}
              <span className="text-indigo-300 font-medium">{profile.targetTimelineWeeks}-week roadmap</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('chat')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-1.5"
            >
              <Compass className="w-4 h-4" />
              <span>Ask Career Advisor</span>
            </button>
            <button
              onClick={() => onNavigate('skill-gap')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all flex items-center space-x-1.5"
            >
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Analyze Skill Gaps</span>
            </button>
            <button
              onClick={onOpenProfile}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/80 text-xs font-medium transition-all"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Match Score */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Role Readiness Score</span>
            <span className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{gapAnalysis.matchScore}%</span>
            <span className="text-xs text-slate-500">benchmark match</span>
          </div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${gapAnalysis.matchScore}%` }}
            />
          </div>
        </div>

        {/* Demonstrated Skills */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Demonstrated Skills</span>
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{gapAnalysis.demonstratedCount}</span>
            <span className="text-xs text-slate-500">of {gapAnalysis.evaluatedSkills.length} required</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            {gapAnalysis.partiallyDevelopedCount} partially developed • {gapAnalysis.notYetReportedCount} not reported
          </p>
        </div>

        {/* Weekly Study Hours */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Study Budget</span>
            <span className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{profile.availableStudyHoursPerWeek}h</span>
            <span className="text-xs text-slate-500">/ week</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            {roadmap.totalAvailableHours} total hours across {roadmap.totalWeeks} weeks
          </p>
        </div>

        {/* Roadmap Progress */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Roadmap Progress</span>
            <span className="p-2 rounded-lg bg-cyan-50 text-cyan-600">
              <CalendarCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{completionPercentage}%</span>
            <span className="text-xs text-slate-500">{completedTasks}/{totalTasks} tasks</span>
          </div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Active Target Role & Skill Gap Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Target Role & Skill Gap Highlights */}
        <div className="lg:col-span-2 space-y-6">
          {/* Target Role Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">{currentRole.category}</span>
                <h2 className="text-xl font-bold text-slate-900">{currentRole.title}</h2>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={currentRole.id}
                  onChange={(e) => onSelectRole(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {CAREER_KNOWLEDGE_BASE.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
                <button
                  onClick={() => onNavigate('careers')}
                  className="p-1.5 text-slate-500 hover:text-indigo-600"
                  title="View full career details"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-4 leading-relaxed">
              {currentRole.fullOverview}
            </p>

            {/* Priority Skill Areas */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Priority Learning Areas (Gaps to Bridge First)
                </h3>
                <button
                  onClick={() => onNavigate('skill-gap')}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  View full breakdown →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {gapAnalysis.priorityLearningAreas.slice(0, 4).map((skill) => (
                  <div
                    key={skill.skillName}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-900">{skill.skillName}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          skill.status === 'partially_developed'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {skill.statusBadge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {skill.rationale}
                    </p>
                    <div className="mt-2 text-[10px] text-slate-600 font-medium bg-white px-2 py-1 rounded border border-slate-200 inline-block">
                      Req: {skill.roleRequirementProficiency} level
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Roadmap Checklist (Week 1 / Current Week) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Current Week Learning Tasks</h3>
                  <p className="text-xs text-slate-500">
                    Week 1 • {roadmap.weeks[0]?.theme} ({roadmap.weeks[0]?.allocatedHours} hrs)
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('roadmap')}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1"
              >
                <span>Full {roadmap.totalWeeks}-Week Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Checklist tasks */}
            <div className="mt-4 space-y-2.5">
              {roadmap.weeks[0]?.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onToggleTaskComplete(1, task.id)}
                  className={`flex items-start space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    task.completed
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-500'
                      : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-800'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {}} // Handled by parent div
                    className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {task.title}
                    </p>
                    {task.resourceHint && (
                      <p className="text-[11px] text-slate-500 mt-0.5">Resource: {task.resourceHint}</p>
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 shrink-0">
                    {task.estimatedHours}h
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span className="font-medium text-slate-700">{roadmap.weeks[0]?.checkpoint}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Suggested Projects & Verified Resources */}
        <div className="space-y-6">
          {/* Recommended Capstone Project */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs uppercase tracking-wider mb-3">
              <Code className="w-4 h-4 text-indigo-600" />
              <span>Recommended Portfolio Project</span>
            </div>
            {currentRole.projects[0] && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/60 to-slate-50 border border-indigo-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{currentRole.projects[0].title}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                    {currentRole.projects[0].difficulty}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentRole.projects[0].summary}
                </p>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Key Deliverables:</span>
                  <ul className="text-[11px] text-slate-600 list-disc list-inside space-y-0.5">
                    {currentRole.projects[0].deliverables.slice(0, 2).map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Verified Official Resources */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Verified Resources</span>
              </div>
              <button
                onClick={() => onNavigate('resources')}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                All →
              </button>
            </div>

            <div className="space-y-2.5">
              {currentRole.officialResources.slice(0, 3).map((res) => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {res.title}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0 ml-1 mt-0.5" />
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[10px] font-medium text-slate-500">{res.provider}</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-medium">
                      {res.isFree ? 'Free' : 'Official'}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Educational Guidance Notice */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-[11px] leading-relaxed flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 font-semibold">Educational Guidance Notice:</strong>{' '}
              {gapAnalysis.guidanceDisclaimer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
