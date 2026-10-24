import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Clock,
  Calendar,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { StudentProfile, StudentSkill, SkillProficiency } from '../types';
import { CAREER_KNOWLEDGE_BASE } from '../data/careerKnowledgeBase';
import { DEMO_PROFILES } from '../data/demoProfiles';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSave: (updated: StudentProfile) => void;
}

const COMMON_SKILL_SUGGESTIONS = [
  'Python', 'SQL', 'Excel', 'Power BI', 'Tableau', 'Pandas', 'Basic Statistics',
  'Scikit-Learn', 'FastAPI', 'Docker', 'React', 'TypeScript', 'Node.js',
  'PostgreSQL', 'Git', 'Data Structures & Algorithms', 'Linux', 'Wireshark'
];

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  const [formData, setFormData] = useState<StudentProfile>(profile);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillProficiency>('Intermediate');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Keep form data synchronized when profile or modal state changes
  React.useEffect(() => {
    if (isOpen) {
      setFormData(profile);
    }
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const exists = formData.skills.some(
      s => s.name.toLowerCase() === newSkillName.trim().toLowerCase()
    );
    if (!exists) {
      setFormData({
        ...formData,
        skills: [...formData.skills, { name: newSkillName.trim(), level: newSkillLevel }]
      });
      setNewSkillName('');
    }
  };

  const handleRemoveSkill = (skillName: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s.name !== skillName)
    });
  };

  const handleSkillLevelChange = (skillName: string, newLevel: SkillProficiency) => {
    setFormData({
      ...formData,
      skills: formData.skills.map(s => (s.name === skillName ? { ...s, level: newLevel } : s))
    });
  };

  const handleToggleRole = (roleId: string) => {
    const current = formData.preferredRoles || [];
    if (current.includes(roleId)) {
      setFormData({ ...formData, preferredRoles: current.filter(r => r !== roleId) });
    } else {
      setFormData({ ...formData, preferredRoles: [...current, roleId] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSaveSuccessNotice(true);
    setTimeout(() => {
      setSaveSuccessNotice(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Student Career Profile</h2>
              <p className="text-xs text-slate-300">Personalize your academic background, verified skills, and time budget</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-sm">
          {/* Quick Preset Selector bar */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Quick-Load Evaluation Test Cases:
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {DEMO_PROFILES.slice(0, 3).map((preset, idx) => (
                <button
                  type="button"
                  key={preset.id}
                  onClick={() => setFormData(preset.profile)}
                  className="text-left p-2 rounded-lg bg-white border border-indigo-200 hover:border-indigo-400 hover:shadow-xs transition-all text-xs"
                >
                  <div className="font-semibold text-indigo-950 truncate">Case {idx + 1}: {preset.profile.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{preset.profile.availableStudyHoursPerWeek}h/wk • {preset.profile.skills.map(s => s.name).join(', ')}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Basic Student Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Display Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g. Priya Sharma"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Education Level</label>
              <select
                value={formData.educationLevel}
                onChange={e => setFormData({ ...formData, educationLevel: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-white"
              >
                <option value="Undergraduate (First-Year)">Undergraduate (First-Year / Freshman)</option>
                <option value="Undergraduate (Sophomore)">Undergraduate (Sophomore)</option>
                <option value="Undergraduate (Junior)">Undergraduate (Junior)</option>
                <option value="Undergraduate (Senior)">Undergraduate (Senior / Final Year)</option>
                <option value="Graduate / Master's Student">Graduate / Master's Student</option>
                <option value="Self-Taught / Bootcamp">Self-Taught / Coding Bootcamp</option>
                <option value="Career Switcher">Career Switcher</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Degree / Major</label>
              <input
                type="text"
                value={formData.degree}
                onChange={e => setFormData({ ...formData, degree: e.target.value })}
                placeholder="e.g. B.S. in Computer Science & Statistics"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Time Budget & Timeline Constraints */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
            <div className="flex items-center space-x-2 text-slate-900 font-semibold text-xs uppercase tracking-wider">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Time Budget & Preparation Timeline</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Study Hours Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">Available Study Time</label>
                  <span className="text-xs font-bold text-indigo-600 px-2 py-0.5 rounded-full bg-indigo-100">
                    {formData.availableStudyHoursPerWeek} Hours / Week
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="35"
                  step="1"
                  value={formData.availableStudyHoursPerWeek}
                  onChange={e => setFormData({ ...formData, availableStudyHoursPerWeek: parseInt(e.target.value, 10) })}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  The AI roadmap strictly enforces this limit and will not schedule tasks exceeding your weekly capacity.
                </p>
              </div>

              {/* Target Timeline */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">Target Preparation Timeline</label>
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {formData.targetTimelineWeeks} Weeks
                  </span>
                </div>
                <select
                  value={formData.targetTimelineWeeks}
                  onChange={e => {
                    const weeks = parseInt(e.target.value, 10);
                    setFormData({
                      ...formData,
                      targetTimelineWeeks: weeks,
                      targetTimelineLabel: `${weeks} Weeks`
                    });
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                >
                  <option value={4}>4 Weeks (Accelerated / Urgent Review)</option>
                  <option value={6}>6 Weeks (Mid-Sprint Preparation)</option>
                  <option value={8}>8 Weeks (Standard Internship Prep)</option>
                  <option value={12}>12 Weeks (Full Semester Mastery)</option>
                  <option value={16}>16 Weeks (Comprehensive Career Track)</option>
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  Total study budget: <strong className="text-slate-800">{formData.availableStudyHoursPerWeek * formData.targetTimelineWeeks} total hours</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Skills & Proficiency Rating */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Reported Technical Skills</label>
                <p className="text-[11px] text-slate-500">Skills you have actively used or studied. Unreported skills are marked as "Not yet reported".</p>
              </div>
              <span className="text-xs font-semibold text-slate-500">{formData.skills.length} skills recorded</span>
            </div>

            {/* Quick Suggestions Chips */}
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] font-medium text-slate-400 self-center mr-1">Quick add:</span>
              {COMMON_SKILL_SUGGESTIONS.slice(0, 10).map(suggestion => {
                const alreadyAdded = formData.skills.some(s => s.name.toLowerCase() === suggestion.toLowerCase());
                if (alreadyAdded) return null;
                return (
                  <button
                    type="button"
                    key={suggestion}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        skills: [...formData.skills, { name: suggestion, level: 'Intermediate' }]
                      });
                    }}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-700 border border-slate-200 transition-colors"
                  >
                    + {suggestion}
                  </button>
                );
              })}
            </div>

            {/* Existing Skills List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
              {formData.skills.map(skill => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white transition-colors"
                >
                  <div className="font-medium text-xs text-slate-800 truncate mr-2">{skill.name}</div>
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <select
                      value={skill.level}
                      onChange={e => handleSkillLevelChange(skill.name, e.target.value as SkillProficiency)}
                      className={`text-[11px] font-medium px-2 py-1 rounded border ${
                        skill.level === 'Advanced'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : skill.level === 'Intermediate'
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                          : 'bg-amber-50 text-amber-700 border-amber-300'
                      }`}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill.name)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Remove skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Custom Skill input */}
            <div className="flex space-x-2 pt-1">
              <input
                type="text"
                value={newSkillName}
                onChange={e => setNewSkillName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="Add custom skill (e.g. Scikit-Learn, PyTorch, Go)..."
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select
                value={newSkillLevel}
                onChange={e => setNewSkillLevel(e.target.value as SkillProficiency)}
                className="px-2 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Preferred Roles Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target Roles of Interest</label>
            <p className="text-[11px] text-slate-500 mb-2">Select the career tracks you want to analyze and prepare for:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CAREER_KNOWLEDGE_BASE.map(career => {
                const isSelected = formData.preferredRoles.includes(career.id);
                return (
                  <button
                    type="button"
                    key={career.id}
                    onClick={() => handleToggleRole(career.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-950 ring-1 ring-indigo-600'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-semibold leading-tight line-clamp-1">{career.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{career.category}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Existing Projects & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Existing Projects</label>
              <textarea
                value={formData.existingProjects}
                onChange={e => setFormData({ ...formData, existingProjects: e.target.value })}
                rows={2}
                placeholder="e.g. Built an e-commerce dashboard in Power BI; weather predictor in Python."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Certifications & Coursework</label>
              <textarea
                value={formData.certifications}
                onChange={e => setFormData({ ...formData, certifications: e.target.value })}
                rows={2}
                placeholder="e.g. Google Data Analytics Certificate, CS 101, FreeCodeCamp."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-[11px] text-slate-500">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Profile updates immediately recalibrate skill gap and roadmap calculations.</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center space-x-1.5"
            >
              {saveSuccessNotice ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Profile</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
