import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  BookOpen,
  Code,
  Zap,
  Info,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { StudentProfile, SkillGapAnalysisResult, EvaluatedSkill } from '../types';
import { CAREER_KNOWLEDGE_BASE } from '../data/careerKnowledgeBase';
import { analyzeSkillGap } from '../services/skillGapEngine';

interface SkillGapViewProps {
  profile: StudentProfile;
  activeRoleId: string;
  onSelectRole: (roleId: string) => void;
  onGenerateRoadmap: (roleId: string) => void;
  onOpenProfile: () => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  profile,
  activeRoleId,
  onSelectRole,
  onGenerateRoadmap,
  onOpenProfile
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'demonstrated' | 'partially_developed' | 'not_yet_reported'>('all');

  // Compute deterministic skill gap results
  const result: SkillGapAnalysisResult = analyzeSkillGap(activeRoleId, profile);
  const currentRole = CAREER_KNOWLEDGE_BASE.find(c => c.id === activeRoleId) || CAREER_KNOWLEDGE_BASE[0];

  const filteredSkills = result.evaluatedSkills.filter(s => {
    if (filterCategory === 'all') return true;
    return s.status === filterCategory;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header and Role Switcher Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>Deterministic Skill-Gap Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Skill-Gap Analysis for <span className="text-indigo-600">{currentRole.title}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Comparing your reported profile skills against documented entry-level benchmarks from the Career Knowledge Base.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={activeRoleId}
            onChange={(e) => onSelectRole(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
          >
            {CAREER_KNOWLEDGE_BASE.map(career => (
              <option key={career.id} value={career.id}>
                {career.title}
              </option>
            ))}
          </select>
          <button
            onClick={() => onGenerateRoadmap(activeRoleId)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors"
          >
            <span>Generate Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3 Metric Cards: Demonstrated vs Partial vs Not Yet Reported */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Match Score */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Benchmark Alignment</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{result.matchScore}%</div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-2">
            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${result.matchScore}%` }} />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Weighted for critical core skills</p>
        </div>

        {/* Demonstrated */}
        <div
          onClick={() => setFilterCategory('demonstrated')}
          className={`bg-white rounded-xl p-5 border cursor-pointer transition-all ${
            filterCategory === 'demonstrated' ? 'ring-2 ring-emerald-500 border-transparent bg-emerald-50/20' : 'border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-700">
            <span>Demonstrated</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-900 mt-2">{result.demonstratedCount}</div>
          <p className="text-[11px] text-slate-500 mt-2">Meets or exceeds entry benchmark</p>
        </div>

        {/* Partially Developed */}
        <div
          onClick={() => setFilterCategory('partially_developed')}
          className={`bg-white rounded-xl p-5 border cursor-pointer transition-all ${
            filterCategory === 'partially_developed' ? 'ring-2 ring-amber-500 border-transparent bg-amber-50/20' : 'border-slate-200 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-amber-700">
            <span>Partially Developed</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-amber-900 mt-2">{result.partiallyDevelopedCount}</div>
          <p className="text-[11px] text-slate-500 mt-2">Reported beginner, needs intermediate</p>
        </div>

        {/* Not Yet Reported */}
        <div
          onClick={() => setFilterCategory('not_yet_reported')}
          className={`bg-white rounded-xl p-5 border cursor-pointer transition-all ${
            filterCategory === 'not_yet_reported' ? 'ring-2 ring-slate-700 border-transparent bg-slate-100' : 'border-slate-200 hover:border-slate-400'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Not Yet Reported</span>
            <HelpCircle className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-800 mt-2">{result.notYetReportedCount}</div>
          <p className="text-[11px] text-slate-500 mt-2">Proficiency unknown in profile</p>
        </div>
      </div>

      {/* Filter Tabs & Update Profile CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500 mr-2">Filter View:</span>
          {(['all', 'demonstrated', 'partially_developed', 'not_yet_reported'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterCategory(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterCategory === tab
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab === 'all' && `All Skills (${result.evaluatedSkills.length})`}
              {tab === 'demonstrated' && `Demonstrated (${result.demonstratedCount})`}
              {tab === 'partially_developed' && `Partially Developed (${result.partiallyDevelopedCount})`}
              {tab === 'not_yet_reported' && `Not Yet Reported (${result.notYetReportedCount})`}
            </button>
          ))}
        </div>

        <button
          onClick={onOpenProfile}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Update Your Skills in Profile</span>
        </button>
      </div>

      {/* Evaluated Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map((skill) => {
          const isDemonstrated = skill.status === 'demonstrated';
          const isPartial = skill.status === 'partially_developed';
          const isNotReported = skill.status === 'not_yet_reported';

          return (
            <div
              key={skill.skillName}
              className={`p-5 rounded-2xl border transition-all ${
                isDemonstrated
                  ? 'bg-white border-emerald-200 shadow-2xs'
                  : isPartial
                  ? 'bg-white border-amber-200 shadow-2xs'
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-slate-900">{skill.skillName}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        skill.importance === 'critical'
                          ? 'bg-rose-100 text-rose-800'
                          : skill.importance === 'high'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {skill.importance}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Category: <strong className="capitalize text-slate-700">{skill.category}</strong>
                  </div>
                </div>

                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                    isDemonstrated
                      ? 'bg-emerald-100 text-emerald-800'
                      : isPartial
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {skill.statusBadge}
                </span>
              </div>

              {/* Rationale & Comparison */}
              <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                <div>
                  <span className="font-semibold text-slate-900">Analysis: </span>
                  {skill.rationale}
                </div>
                <div className="text-[11px] text-slate-500">
                  Required Level: <span className="font-semibold text-slate-800">{skill.roleRequirementProficiency}</span> • Reported Level:{' '}
                  <span className="font-semibold text-slate-800">{skill.studentReportedProficiency || 'None reported'}</span>
                </div>
              </div>

              {/* Why This Gap Matters (Crucial requirement from prompt) */}
              <div className="mt-3">
                <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-indigo-500" />
                  Why this skill matters for entry-level hiring:
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {skill.impactExplanation}
                </p>
              </div>

              {/* Interview Topics / Recommended Topics */}
              {skill.recommendedTopics.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-500 mb-1">Key Technical Screening Topics:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.recommendedTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Linked Verified Resource */}
              {skill.matchedResources.length > 0 && (
                <div className="mt-3 pt-2">
                  <a
                    href={skill.matchedResources[0].url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                  >
                    <span>Recommended Guide: {skill.matchedResources[0].title}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Suggested Projects Section for Target Role */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
            <Code className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Recommended Projects to Bridge Gaps</h2>
            <p className="text-xs text-slate-500">
              Building these specific deliverables directly answers hiring managers' technical screening requirements.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentRole.projects.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{proj.title}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                  {proj.difficulty}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{proj.summary}</p>
              <div className="text-[11px] text-slate-500">
                <strong className="text-slate-700">Key Skills Used:</strong> {proj.keySkills.join(', ')}
              </div>
              <div className="text-[11px] text-indigo-700 font-medium">
                Portfolio Value: {proj.portfolioValue}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Notice */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-start space-x-2">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800 font-semibold">Educational Disclaimer:</strong>{' '}
          {result.guidanceDisclaimer}
        </div>
      </div>
    </div>
  );
};
