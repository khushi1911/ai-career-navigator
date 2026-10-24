import { CareerRole, CareerSkill, CareerProject, LearningResource } from '../data/careerKnowledgeBase';

export type SkillProficiency = 'Beginner' | 'Intermediate' | 'Advanced';

export interface StudentSkill {
  name: string;
  level: SkillProficiency;
}

export interface StudentProfile {
  name: string;
  educationLevel: string; // e.g. "Undergraduate (Sophomore)", "Junior", etc.
  degree: string; // e.g. "B.S. in Computer Science", "B.Tech Information Technology"
  skills: StudentSkill[];
  areasOfInterest: string[];
  preferredRoles: string[]; // e.g. ["data-analyst", "data-scientist"]
  currentExperienceLevel: string;
  availableStudyHoursPerWeek: number; // e.g. 6
  targetTimelineWeeks: number; // e.g. 4, 8, 12
  targetTimelineLabel: string; // e.g. "4 weeks (Accelerated Internship Prep)"
  existingProjects: string;
  certifications: string;
}

export type SkillGapStatus = 'demonstrated' | 'partially_developed' | 'not_yet_reported';

export interface EvaluatedSkill {
  skillName: string;
  category: 'core' | 'supporting';
  importance: 'critical' | 'high' | 'medium';
  roleRequirementProficiency: SkillProficiency;
  studentReportedProficiency: SkillProficiency | null;
  status: SkillGapStatus;
  statusBadge: string;
  rationale: string;
  impactExplanation: string;
  recommendedTopics: string[];
  matchedResources: LearningResource[];
}

export interface SkillGapAnalysisResult {
  roleId: string;
  roleTitle: string;
  matchScore: number; // 0 - 100
  totalRequiredCoreSkills: number;
  demonstratedCount: number;
  partiallyDevelopedCount: number;
  notYetReportedCount: number;
  evaluatedSkills: EvaluatedSkill[];
  priorityLearningAreas: EvaluatedSkill[];
  recommendedProjects: CareerProject[];
  recommendedResources: LearningResource[];
  guidanceDisclaimer: string;
}

export interface RoadmapTask {
  id: string;
  title: string;
  estimatedHours: number;
  type: 'concept' | 'hands-on' | 'project' | 'checkpoint';
  resourceHint?: string;
  completed: boolean;
}

export interface RoadmapWeek {
  weekNumber: number;
  theme: string;
  allocatedHours: number;
  targetGoal: string;
  tasks: RoadmapTask[];
  checkpoint: string;
  expectedLearningOutcomes: string[];
}

export interface LearningRoadmap {
  id: string;
  roleId: string;
  roleTitle: string;
  totalWeeks: number;
  hoursPerWeek: number;
  totalAvailableHours: number;
  totalPlannedHours: number;
  isRealisticTimeline: boolean;
  timelineFeedback: string;
  alternativeTimelineRecommendation?: string;
  weeks: RoadmapWeek[];
  keyMilestones: string[];
  createdAt: string;
}

export interface ResumeAnalysisResult {
  fileName: string;
  extractedSkills: string[];
  demonstratedProjects: string[];
  educationFound: string[];
  certificationsFound: string[];
  overallClarityScore: number; // 1-100
  roleAlignmentScore: number; // 1-100
  roleEvaluatedAgainst: string;
  keyStrengths: string[];
  criticalGapsForRole: string[];
  improvementSuggestions: {
    section: string;
    issue: string;
    actionableFix: string;
    sampleBulletPointBefore?: string;
    sampleBulletPointAfter?: string;
  }[];
  untrustedDataNotice: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  actionTaken?: string;
  retrievedCareerRecords?: string[];
  suggestedQuickReplies?: string[];
  suggestedProfileUpdates?: Partial<StudentProfile>;
}
