import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Sparkles,
  Database
} from 'lucide-react';
import { CAREER_KNOWLEDGE_BASE, LearningResource } from '../data/careerKnowledgeBase';

export const ResourceFinderView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedRole, setSelectedRole] = useState<string>('All');

  // Collate all verified resources across all 8 roles
  const allResources: (LearningResource & { roleTitle: string })[] = [];
  CAREER_KNOWLEDGE_BASE.forEach(career => {
    career.officialResources.forEach(res => {
      if (!allResources.some(r => r.url === res.url)) {
        allResources.push({ ...res, roleTitle: career.title });
      }
    });
  });

  const resourceTypes = [
    'All',
    'Official Documentation',
    'Interactive Course',
    'Public Dataset',
    'Practice Platform'
  ];

  const filteredResources = allResources.filter(res => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.targetSkill.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'All' || res.type === selectedType;
    const matchesRole = selectedRole === 'All' || res.roleTitle === selectedRole;

    return matchesSearch && matchesType && matchesRole;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Verified Learning Knowledge Hub</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Trustworthy & Official Learning Resources
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Curated official documentation, free interactive courses, and verified real-world datasets from established organizations. No fabricated links or expired listings.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search resources, topics, skills..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>
      </div>

      {/* Filter Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Type:
          </span>
          {resourceTypes.map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedType === t
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <label className="text-xs font-semibold text-slate-500">Domain Role:</label>
          <select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All 8 Career Roles</option>
            {CAREER_KNOWLEDGE_BASE.map(c => (
              <option key={c.id} value={c.title}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map(res => (
          <div
            key={res.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {res.type}
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {res.isFree ? '100% Free' : 'Official'}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 leading-snug">{res.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{res.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>
                  Provider: <strong className="text-slate-700">{res.provider}</strong>
                </span>
                <span className="text-slate-400 text-[11px]">{res.targetSkill}</span>
              </div>

              <a
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-2xs group"
              >
                <span>Visit Official Source</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-start space-x-2">
        <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800 font-semibold">Reliability Standard:</strong> All links point to established domain documentation (PostgreSQL.org, Python.org, MDN, Microsoft Learn, Kaggle, NIST, Scikit-learn). No invented external URLs or promotional affiliate links.
        </div>
      </div>
    </div>
  );
};
