import React, { useState } from 'react';
import {
  CalendarCheck,
  Clock,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Code,
  RotateCcw,
  Target,
  Award,
  Layers,
  ChevronRight,
  Download
} from 'lucide-react';
import { StudentProfile, LearningRoadmap, RoadmapWeek } from '../types';
import { CAREER_KNOWLEDGE_BASE } from '../data/careerKnowledgeBase';
import { generatePersonalizedRoadmap } from '../services/roadmapEngine';

interface RoadmapViewProps {
  profile: StudentProfile;
  activeRoleId: string;
  onSelectRole: (roleId: string) => void;
  roadmap: LearningRoadmap;
  onUpdateRoadmap: (roadmap: LearningRoadmap) => void;
  onToggleTaskComplete: (weekNumber: number, taskId: string) => void;
  onOpenProfile: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  profile,
  activeRoleId,
  onSelectRole,
  roadmap,
  onUpdateRoadmap,
  onToggleTaskComplete,
  onOpenProfile
}) => {
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);
  const currentRole = CAREER_KNOWLEDGE_BASE.find(c => c.id === activeRoleId) || CAREER_KNOWLEDGE_BASE[0];

  const handleRegenerate = () => {
    const updated = generatePersonalizedRoadmap(activeRoleId, profile);
    onUpdateRoadmap(updated);
  };

  const activeWeek = roadmap.weeks.find(w => w.weekNumber === selectedWeekNum) || roadmap.weeks[0];

  const totalTasks = roadmap.weeks.reduce((acc, w) => acc + w.tasks.length, 0);
  const completedTasks = roadmap.weeks.reduce((acc, w) => acc + w.tasks.filter(t => t.completed).length, 0);
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Header & Regeneration Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Time-Budgeted Roadmap Planner</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Personalized Roadmap for <span className="text-indigo-600">{currentRole.title}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Strictly budgeted to your <strong className="text-slate-800">{profile.availableStudyHoursPerWeek} study hours/week</strong> across a{' '}
            <strong className="text-slate-800">{profile.targetTimelineWeeks}-week plan</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={activeRoleId}
            onChange={(e) => {
              onSelectRole(e.target.value);
              const updated = generatePersonalizedRoadmap(e.target.value, profile);
              onUpdateRoadmap(updated);
            }}
            className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
          >
            {CAREER_KNOWLEDGE_BASE.map(career => (
              <option key={career.id} value={career.id}>
                {career.title}
              </option>
            ))}
          </select>

          <button
            onClick={handleRegenerate}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Recalibrate</span>
          </button>
        </div>
      </div>

      {/* Realistic Timeline Assessment Feedback Box */}
      <div
        className={`p-4 rounded-xl border flex items-start space-x-3 ${
          roadmap.isRealisticTimeline
            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
            : 'bg-amber-50/80 border-amber-200 text-amber-950'
        }`}
      >
        {roadmap.isRealisticTimeline ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        )}
        <div className="text-xs space-y-1">
          <div className="font-bold text-sm">
            {roadmap.isRealisticTimeline ? 'Feasible & Realistic Timeline' : 'Timeline Constraint Warning'}
          </div>
          <p className="leading-relaxed">{roadmap.timelineFeedback}</p>
          {roadmap.alternativeTimelineRecommendation && (
            <p className="font-semibold text-amber-900 pt-1">
              Alternative Suggestion: {roadmap.alternativeTimelineRecommendation}
            </p>
          )}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500">Weekly Cap</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{roadmap.hoursPerWeek} hrs</div>
          <span className="text-[10px] text-slate-400">Strict weekly time limit</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500">Total Duration</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{roadmap.totalWeeks} Weeks</div>
          <span className="text-[10px] text-slate-400">{roadmap.totalAvailableHours} total study budget</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500">Planned Study</span>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1">{roadmap.totalPlannedHours} hrs</div>
          <span className="text-[10px] text-slate-400">Sum of all scheduled tasks</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500">Progress</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{completionPercentage}%</div>
          <span className="text-[10px] text-slate-400">{completedTasks} of {totalTasks} tasks done</span>
        </div>
      </div>

      {/* Main Roadmap Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Week Navigator List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900 uppercase tracking-wider px-1">
            <span>Roadmap Weeks</span>
            <span className="text-[11px] font-normal text-slate-500">{roadmap.weeks.length} modules</span>
          </div>

          <div className="space-y-2">
            {roadmap.weeks.map((week) => {
              const isSelected = week.weekNumber === selectedWeekNum;
              const completedInWeek = week.tasks.filter(t => t.completed).length;
              const weekAllDone = completedInWeek === week.tasks.length && week.tasks.length > 0;

              return (
                <div
                  key={week.weekNumber}
                  onClick={() => setSelectedWeekNum(week.weekNumber)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="space-y-1 min-w-0 pr-2">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        Week {week.weekNumber}
                      </span>
                      <span className={`text-[11px] ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                        {week.allocatedHours} hrs
                      </span>
                    </div>
                    <div className={`text-xs font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {week.theme}
                    </div>
                    <div className={`text-[11px] ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                      {completedInWeek}/{week.tasks.length} tasks completed
                    </div>
                  </div>

                  <div className="pt-1">
                    {weekAllDone ? (
                      <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-emerald-600'}`} />
                    ) : (
                      <ChevronRight className={`w-4 h-4 opacity-70 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Week Deep-Dive & Task Checklist */}
        <div className="lg:col-span-2 space-y-6">
          {activeWeek && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
              {/* Week Title & Target Goal */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-600">
                  <span>Week {activeWeek.weekNumber} Focus</span>
                  <span>•</span>
                  <span>{activeWeek.allocatedHours} Study Hours Scheduled</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-1">{activeWeek.theme}</h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  <strong>Target Goal:</strong> {activeWeek.targetGoal}
                </p>
              </div>

              {/* Task Checklist */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Interactive Task Checklist
                  </h3>
                  <span className="text-[11px] text-slate-400">Click to toggle completion</span>
                </div>

                <div className="space-y-2.5">
                  {activeWeek.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => onToggleTaskComplete(activeWeek.weekNumber, task.id)}
                      className={`p-3.5 rounded-xl border flex items-start space-x-3 cursor-pointer transition-all ${
                        task.completed
                          ? 'bg-emerald-50/40 border-emerald-200 text-slate-500'
                          : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-900'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {}}
                        className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-semibold ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {task.title}
                        </div>
                        {task.resourceHint && (
                          <div className="text-[11px] text-slate-500 mt-1 flex items-center space-x-1">
                            <BookOpen className="w-3 h-3 text-slate-400" />
                            <span>Deliverable / Guide: {task.resourceHint}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {task.estimatedHours} hrs
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5 capitalize">{task.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Completion Checkpoint */}
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1">
                <div className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span>Completion Checkpoint</span>
                </div>
                <p className="text-xs text-indigo-900 leading-relaxed">
                  {activeWeek.checkpoint}
                </p>
              </div>

              {/* Expected Learning Outcomes */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Measurable Learning Outcomes
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  {activeWeek.expectedLearningOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start space-x-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-indigo-600 font-bold shrink-0">✓</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
