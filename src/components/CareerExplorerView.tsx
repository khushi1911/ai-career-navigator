import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  BookOpen,
  Code,
  ShieldAlert,
  ExternalLink,
  Target,
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { CAREER_KNOWLEDGE_BASE, CareerRole } from '../data/careerKnowledgeBase';

interface CareerExplorerViewProps {
  activeRoleId: string;
  onSelectRole: (roleId: string) => void;
  onNavigateToSkillGap: (roleId: string) => void;
}

export const CareerExplorerView: React.FC<CareerExplorerViewProps> = ({
  activeRoleId,
  onSelectRole,
  onNavigateToSkillGap
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRoleId, setSelectedRoleId] = useState<string>(activeRoleId);

  const categories = ['All', ...Array.from(new Set(CAREER_KNOWLEDGE_BASE.map(c => c.category)))];

  const filteredCareers = CAREER_KNOWLEDGE_BASE.filter(career => {
    const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
    const matchesSearch =
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.coreSkills.some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activeCareer = CAREER_KNOWLEDGE_BASE.find(c => c.id === selectedRoleId) || CAREER_KNOWLEDGE_BASE[0];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header and Search */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Structured Career Knowledge Base</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Career Roles & Industry Benchmarks
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Curated entry-level specifications, verified competencies, portfolio expectations, and honest reality checks across 8 technology domains.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search roles or skills (e.g. SQL, PyTorch)..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2-Column Layout: Roles Directory (Left) and Detailed Dossier (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Role Cards */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider px-1">
            Available Careers ({filteredCareers.length})
          </div>

          <div className="space-y-2.5">
            {filteredCareers.map(career => {
              const isSelected = career.id === selectedRoleId;
              return (
                <div
                  key={career.id}
                  onClick={() => {
                    setSelectedRoleId(career.id);
                    onSelectRole(career.id);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-600 ring-1 ring-indigo-600'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
                      {career.category}
                    </span>
                    {activeRoleId === career.id && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Target Role
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mt-1">{career.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {career.shortDescription}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {career.coreSkills.slice(0, 3).map(s => (
                      <span key={s.name} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep-Dive Dossier for Active Career */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            {/* Header with Role Title & Action CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  {activeCareer.category}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">{activeCareer.title}</h2>
              </div>
              <button
                onClick={() => onNavigateToSkillGap(activeCareer.id)}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors shrink-0"
              >
                <Target className="w-4 h-4" />
                <span>Analyze Gaps for this Role</span>
              </button>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Role Overview</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeCareer.fullOverview}
              </p>
            </div>

            {/* Entry-Level Responsibilities */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Typical Entry-Level Responsibilities
              </h3>
              <ul className="space-y-1.5">
                {activeCareer.entryLevelResponsibilities.map((resp, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start space-x-2">
                    <span className="text-indigo-600 font-bold shrink-0">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core & Supporting Technical Skills */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Documented Core Technical Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeCareer.coreSkills.map(skill => (
                  <div key={skill.name} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{skill.name}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                          skill.importance === 'critical' ? 'bg-rose-100 text-rose-800' : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {skill.importance}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal">{skill.description}</p>
                    <div className="text-[10px] text-slate-400 font-medium">
                      Expected Benchmark: <strong className="text-slate-700">{skill.expectedProficiency}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Beginner Projects */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Code className="w-4 h-4 text-indigo-600" />
                <span>Suggested Portfolio Projects</span>
              </h3>
              <div className="space-y-3">
                {activeCareer.projects.map(proj => (
                  <div key={proj.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{proj.title}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                        {proj.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{proj.summary}</p>
                    <div className="text-[11px] text-slate-500">
                      <strong className="text-slate-700">Deliverables:</strong> {proj.deliverables.join(' • ')}
                    </div>
                    <div className="text-[11px] text-indigo-700 font-medium">
                      Portfolio Impact: {proj.portfolioValue}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Verified Resources */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Official Documentation & Verified Materials</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeCareer.officialResources.map(res => (
                  <a
                    key={res.id}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {res.title}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0 ml-1" />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{res.description}</p>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="font-medium text-slate-500">{res.provider}</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                        {res.isFree ? 'Free' : 'Official'}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Reality Check & Limitations */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Reality Check & Industry Truths</span>
              </div>
              <ul className="space-y-1">
                {activeCareer.limitationsAndRealityCheck.map((item, idx) => (
                  <li key={idx} className="text-xs text-amber-900 flex items-start space-x-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
