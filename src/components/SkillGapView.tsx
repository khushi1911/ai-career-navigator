import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Code,
  Info,
  ExternalLink,
  RefreshCw,
  BookOpen,
  Sparkles,
} from 'lucide-react';

import {
  StudentProfile,
  SkillGapAnalysisResult,
} from '../types';

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
  onOpenProfile,
}) => {
  const [filterCategory, setFilterCategory] = useState<
    'all' | 'demonstrated' | 'partially_developed' | 'not_yet_reported'
  >('all');

  const result: SkillGapAnalysisResult = analyzeSkillGap(
    activeRoleId,
    profile
  );

  const currentRole =
    CAREER_KNOWLEDGE_BASE.find((career) => career.id === activeRoleId) ||
    CAREER_KNOWLEDGE_BASE[0];

  const filteredSkills = result.evaluatedSkills.filter((skill) => {
    if (filterCategory === 'all') return true;
    return skill.status === filterCategory;
  });

  const filters = [
    {
      id: 'all' as const,
      label: `All Skills (${result.evaluatedSkills.length})`,
    },
    {
      id: 'demonstrated' as const,
      label: `Demonstrated (${result.demonstratedCount})`,
    },
    {
      id: 'partially_developed' as const,
      label: `Partially Developed (${result.partiallyDevelopedCount})`,
    },
    {
      id: 'not_yet_reported' as const,
      label: `Not Yet Reported (${result.notYetReportedCount})`,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 pb-12">

      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#142D4E] via-[#173D5B] to-[#0F766E] p-6 text-white shadow-lg sm:p-8">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-teal-100">
            <Target size={15} />
            DETERMINISTIC SKILL-GAP ENGINE
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Skill-Gap Analysis
              </h1>

              <p className="mt-2 text-lg font-semibold text-teal-200">
                {currentRole.title}
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-200">
                Compare your reported skills against documented entry-level
                benchmarks. Identify your strengths and discover which skills
                need more attention.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                aria-label="Select target career"
                value={activeRoleId}
                onChange={(event) => onSelectRole(event.target.value)}
                className="min-w-0 rounded-xl border border-white/20 bg-white px-4 py-3 text-sm font-semibold text-[#142D4E] outline-none focus:ring-2 focus:ring-teal-300 sm:min-w-52"
              >
                {CAREER_KNOWLEDGE_BASE.map((career) => (
                  <option key={career.id} value={career.id}>
                    {career.title}
                  </option>
                ))}
              </select>

              <button
                onClick={() => onGenerateRoadmap(activeRoleId)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#142D4E] transition hover:bg-teal-50"
              >
                Generate Roadmap
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      <section>
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
            ANALYSIS OVERVIEW
          </p>
          <h2 className="mt-1 text-xl font-bold text-[#142D4E] sm:text-2xl">
            Your skill readiness
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Select a status card to filter the skills below.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Benchmark Alignment */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-slate-500">
                Benchmark Alignment
              </p>
              <div className="rounded-xl bg-teal-50 p-3 text-teal-700">
                <Target size={21} />
              </div>
            </div>

            <p className="mt-3 text-3xl font-bold text-[#142D4E]">
              {result.matchScore}%
            </p>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-teal-600 transition-all"
                style={{
                  width: `${Math.min(100, Math.max(0, result.matchScore))}%`,
                }}
              />
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Weighted alignment with critical core skills.
            </p>
          </div>

          {/* Demonstrated */}
          <button
            type="button"
            onClick={() =>
              setFilterCategory(
                filterCategory === 'demonstrated' ? 'all' : 'demonstrated'
              )
            }
            aria-pressed={filterCategory === 'demonstrated'}
            className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
              filterCategory === 'demonstrated'
                ? 'border-emerald-400 ring-2 ring-emerald-200'
                : 'border-slate-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-emerald-700">
                Demonstrated
              </p>
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                <CheckCircle2 size={21} />
              </div>
            </div>

            <p className="mt-3 text-3xl font-bold text-emerald-800">
              {result.demonstratedCount}
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Meets or exceeds the entry-level benchmark.
            </p>

            <p className="mt-3 text-xs font-semibold text-emerald-700">
              {filterCategory === 'demonstrated'
                ? 'Filter selected'
                : 'View demonstrated skills →'}
            </p>
          </button>

          {/* Partially Developed */}
          <button
            type="button"
            onClick={() =>
              setFilterCategory(
                filterCategory === 'partially_developed'
                  ? 'all'
                  : 'partially_developed'
              )
            }
            aria-pressed={filterCategory === 'partially_developed'}
            className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
              filterCategory === 'partially_developed'
                ? 'border-amber-400 ring-2 ring-amber-200'
                : 'border-slate-200 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-amber-700">
                Partially Developed
              </p>
              <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                <AlertTriangle size={21} />
              </div>
            </div>

            <p className="mt-3 text-3xl font-bold text-amber-800">
              {result.partiallyDevelopedCount}
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Reported proficiency is below the required level.
            </p>

            <p className="mt-3 text-xs font-semibold text-amber-700">
              {filterCategory === 'partially_developed'
                ? 'Filter selected'
                : 'View skills to develop →'}
            </p>
          </button>

          {/* Not Yet Reported */}
          <button
            type="button"
            onClick={() =>
              setFilterCategory(
                filterCategory === 'not_yet_reported'
                  ? 'all'
                  : 'not_yet_reported'
              )
            }
            aria-pressed={filterCategory === 'not_yet_reported'}
            className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
              filterCategory === 'not_yet_reported'
                ? 'border-slate-400 ring-2 ring-slate-200'
                : 'border-slate-200 hover:border-slate-400'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-600">
                Not Yet Reported
              </p>
              <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
                <HelpCircle size={21} />
              </div>
            </div>

            <p className="mt-3 text-3xl font-bold text-[#142D4E]">
              {result.notYetReportedCount}
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Proficiency has not been reported in your profile.
            </p>

            <p className="mt-3 text-xs font-semibold text-slate-600">
              {filterCategory === 'not_yet_reported'
                ? 'Filter selected'
                : 'Review these skills →'}
            </p>
          </button>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-bold text-[#142D4E]">Evaluated Skills</h2>
            <p className="mt-1 text-xs text-slate-500">
              {filteredSkills.length} of {result.evaluatedSkills.length} skills
              displayed.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenProfile}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-teal-200 px-4 py-2.5 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
          >
            <RefreshCw size={15} />
            Update Profile Skills
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setFilterCategory(filter.id)}
              aria-pressed={filterCategory === filter.id}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                filterCategory === filter.id
                  ? 'bg-[#142D4E] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-800'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Skills Grid */}
      {filteredSkills.length > 0 ? (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredSkills.map((skill) => {
            const isDemonstrated = skill.status === 'demonstrated';
            const isPartial = skill.status === 'partially_developed';

            const statusStyle = isDemonstrated
              ? {
                  card: 'border-emerald-200',
                  badge: 'bg-emerald-50 text-emerald-800',
                  icon: 'text-emerald-600',
                }
              : isPartial
                ? {
                    card: 'border-amber-200',
                    badge: 'bg-amber-50 text-amber-800',
                    icon: 'text-amber-600',
                  }
                : {
                    card: 'border-slate-200',
                    badge: 'bg-slate-100 text-slate-700',
                    icon: 'text-slate-500',
                  };

            return (
              <article
                key={skill.skillName}
                className={`rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${statusStyle.card}`}
              >
                {/* Skill Heading */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-[#142D4E]">
                      {skill.skillName}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Category:{' '}
                      <span className="font-semibold capitalize text-slate-700">
                        {skill.category}
                      </span>
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${statusStyle.badge}`}
                  >
                    {skill.statusBadge}
                  </span>
                </div>

                {/* Importance */}
                <div className="mt-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                      skill.importance === 'critical'
                        ? 'bg-rose-50 text-rose-700'
                        : skill.importance === 'high'
                          ? 'bg-sky-50 text-sky-800'
                          : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {skill.importance} importance
                  </span>
                </div>

                {/* Analysis */}
                <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Skill Analysis
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {skill.rationale}
                  </p>

                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-white p-3">
                      <p className="text-[11px] text-slate-500">
                        Required Level
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#142D4E]">
                        {skill.roleRequirementProficiency}
                      </p>
                    </div>

                    <div className="rounded-lg bg-white p-3">
                      <p className="text-[11px] text-slate-500">
                        Reported Level
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#142D4E]">
                        {skill.studentReportedProficiency || 'None reported'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hiring Relevance */}
                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <Info size={15} className="shrink-0 text-teal-700" />
                    <h4 className="text-xs font-bold text-[#142D4E]">
                      Why This Skill Matters
                    </h4>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {skill.impactExplanation}
                  </p>
                </div>

                {/* Recommended Topics */}
                {skill.recommendedTopics.length > 0 && (
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <h4 className="text-xs font-semibold text-slate-600">
                      Technical Screening Topics
                    </h4>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {skill.recommendedTopics.map((topic, index) => (
                        <span
                          key={`${topic}-${index}`}
                          className="rounded-lg bg-slate-100 px-2.5 py-1.5 font-mono text-[11px] text-slate-700"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Resource */}
                {skill.matchedResources.length > 0 && (
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <a
                      href={skill.matchedResources[0].url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-start gap-2 text-sm font-semibold text-teal-800 transition hover:text-teal-600"
                    >
                      <BookOpen size={16} className="mt-0.5 shrink-0" />
                      <span className="min-w-0 break-words">
                        Recommended Guide:{' '}
                        {skill.matchedResources[0].title}
                      </span>
                      <ExternalLink
                        size={14}
                        className="mt-0.5 shrink-0"
                      />
                    </a>
                  </div>
                )}
              </article>
            );
          })}
        </section>
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
            <Sparkles size={25} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-[#142D4E]">
            No skills match this filter
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try another filter to see your evaluated skills.
          </p>

          <button
            type="button"
            onClick={() => setFilterCategory('all')}
            className="mt-5 rounded-xl bg-[#142D4E] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D4268]"
          >
            Show All Skills
          </button>
        </section>
      )}

      {/* Recommended Projects */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-teal-50 p-3 text-teal-700">
            <Code size={21} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#142D4E]">
              Recommended Projects to Bridge Gaps
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Build practical projects to apply your skills and demonstrate
              your understanding of the target role.
            </p>
          </div>
        </div>

        {currentRole.projects.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {currentRole.projects.map((project) => (
              <article
                key={project.id}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-teal-200 hover:bg-teal-50/20"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="font-bold text-[#142D4E]">
                    {project.title}
                  </h3>

                  <span className="w-fit shrink-0 rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-800">
                    {project.difficulty}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {project.summary}
                </p>

                <div className="mt-4">
                  <p className="text-xs font-bold text-slate-700">
                    Key Skills Used
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.keySkills.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-lg bg-white px-2.5 py-1.5 text-xs text-slate-600 ring-1 ring-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-white p-3">
                  <p className="text-xs font-semibold text-teal-800">
                    Portfolio Value
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {project.portfolioValue}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            No projects are currently listed for this career.
          </p>
        )}

        <button
          type="button"
          onClick={() => onGenerateRoadmap(activeRoleId)}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#142D4E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1D4268]"
        >
          Create My Learning Roadmap
          <ArrowRight size={16} />
        </button>
      </section>

      {/* Educational Disclaimer */}
      <section className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="rounded-lg bg-white p-2 text-slate-600">
          <ShieldAlert size={18} />
        </div>

        <div>
          <h2 className="text-sm font-bold text-[#142D4E]">
            Educational Disclaimer
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            {result.guidanceDisclaimer}
          </p>
        </div>
      </section>
    </div>
  );
};