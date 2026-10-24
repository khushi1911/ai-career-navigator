import { CAREER_KNOWLEDGE_BASE } from '../data/careerKnowledgeBase';
import { StudentProfile, LearningRoadmap, RoadmapWeek, RoadmapTask } from '../types';
import { analyzeSkillGap } from './skillGapEngine';

/** Split a weekly study budget into rounded tenths without exceeding the budget. */
function splitHours(totalHours: number, fractions: [number, number, number]): [number, number, number] {
  const totalTenths = Math.max(1, Math.round(totalHours * 10));
  const first = Math.round(totalTenths * fractions[0]);
  const second = Math.round(totalTenths * fractions[1]);
  const third = Math.max(0, totalTenths - first - second);
  return [first / 10, second / 10, third / 10];
}

/**
 * Generate a personalized learning roadmap strictly adhering to study time constraints
 */
export function generatePersonalizedRoadmap(
  roleId: string,
  profile: StudentProfile
): LearningRoadmap {
  const role = CAREER_KNOWLEDGE_BASE.find(r => r.id === roleId) || CAREER_KNOWLEDGE_BASE[0];
  const gapAnalysis = analyzeSkillGap(roleId, profile);

  const hoursPerWeek = Math.max(2, Math.min(40, profile.availableStudyHoursPerWeek || 6));
  const totalWeeks = Math.max(1, Math.min(24, profile.targetTimelineWeeks || 4));
  const totalAvailableHours = hoursPerWeek * totalWeeks;

  // Calculate estimated hours needed for un-demonstrated priority skills
  const priorityGaps = gapAnalysis.priorityLearningAreas;
  // Estimate ~10-15 hours per un-reported critical skill, ~6-8 hours per partially developed skill
  let estimatedHoursNeeded = 0;
  for (const gap of priorityGaps) {
    if (gap.status === 'partially_developed') {
      estimatedHoursNeeded += gap.importance === 'critical' ? 8 : 5;
    } else {
      estimatedHoursNeeded += gap.importance === 'critical' ? 14 : 9;
    }
  }

  // If student already has demonstrated all skills, minimum 12 hours for project portfolio polish
  estimatedHoursNeeded = Math.max(12, estimatedHoursNeeded);

  const isRealisticTimeline = totalAvailableHours >= estimatedHoursNeeded * 0.75;
  let timelineFeedback = '';
  let alternativeTimelineRecommendation = '';

  if (!isRealisticTimeline) {
    const recommendedWeeks = Math.ceil(estimatedHoursNeeded / hoursPerWeek);
    const recommendedHoursPerWeek = Math.ceil(estimatedHoursNeeded / totalWeeks);
    timelineFeedback = `Timeline Challenge: You requested a ${totalWeeks}-week timeline at ${hoursPerWeek} hrs/week (${totalAvailableHours} total study hours), but fully addressing your identified skill gaps typically requires ~${estimatedHoursNeeded} hours.`;
    alternativeTimelineRecommendation = `To comfortably master these topics, consider extending your timeline to ${recommendedWeeks} weeks at ${hoursPerWeek} hrs/week, or increasing study time to ${recommendedHoursPerWeek} hrs/week. This roadmap prioritizes the highest-impact gaps first to maximize your progress within your available ${totalAvailableHours} hours.`;
  } else {
    timelineFeedback = `Realistic Plan: Your ${totalWeeks}-week timeline with ${hoursPerWeek} hrs/week provides ${totalAvailableHours} total study hours, which is well-balanced to target your key skill gaps and build a portfolio project.`;
  }

  // Build weeks adhering strictly to available hoursPerWeek
  const weeks: RoadmapWeek[] = [];

  // Group priority topics across weeks
  const topGaps = priorityGaps.slice(0, Math.max(2, totalWeeks * 2));
  const recommendedProject = role.projects[0];

  for (let w = 1; w <= totalWeeks; w++) {
    const isFinalWeek = w === totalWeeks;
    const isSecondHalf = w > Math.floor(totalWeeks / 2);

    let theme = '';
    let targetGoal = '';
    const tasks: RoadmapTask[] = [];

    // Distribute hours per task so their sum strictly equals or is slightly under hoursPerWeek
    // If hoursPerWeek is 5: tasks might be 2h, 1.5h, 1.5h
    const gapForWeek = topGaps[(w - 1) % Math.max(1, topGaps.length)];
    const gapName = gapForWeek ? gapForWeek.skillName : role.coreSkills[0].name;

    if (isFinalWeek) {
      theme = 'Capstone Project Assembly & Portfolio Polish';
      targetGoal = `Synthesize learned concepts into "${recommendedProject.title}" and prepare interview talking points.`;

      const [pTaskHours, docHours, reviewHours] = splitHours(hoursPerWeek, [0.5, 0.3, 0.2]);

      tasks.push({
        id: `w${w}-t1`,
        title: `Complete core deliverables for ${recommendedProject.title}`,
        estimatedHours: pTaskHours,
        type: 'project',
        resourceHint: recommendedProject.deliverables[0] || 'GitHub Repository',
        completed: false
      });
      tasks.push({
        id: `w${w}-t2`,
        title: 'Draft technical writeup, README architecture diagram, and key findings',
        estimatedHours: docHours,
        type: 'hands-on',
        resourceHint: 'Markdown documentation and GitHub project page',
        completed: false
      });
      tasks.push({
        id: `w${w}-t3`,
        title: `Self-audit against entry-level interview questions for ${role.title}`,
        estimatedHours: reviewHours,
        type: 'checkpoint',
        resourceHint: gapForWeek?.recommendedTopics?.[0] || 'Review checklist',
        completed: false
      });
    } else if (isSecondHalf) {
      theme = `Intermediate Application & ${gapName} Integration`;
      targetGoal = `Apply ${gapName} in practical scenarios and start building component artifacts for portfolio.`;

      const [t1Hours, t2Hours, t3Hours] = splitHours(hoursPerWeek, [0.45, 0.35, 0.20]);

      tasks.push({
        id: `w${w}-t1`,
        title: `Practical implementation: ${gapForWeek?.recommendedTopics[0] || 'Core concepts exercise'}`,
        estimatedHours: t1Hours,
        type: 'hands-on',
        resourceHint: gapForWeek?.matchedResources[0]?.title || 'Official Documentation',
        completed: false
      });
      tasks.push({
        id: `w${w}-t2`,
        title: `Hands-on mini-exercise: ${gapForWeek?.recommendedTopics[1] || 'Real-world problem solving'}`,
        estimatedHours: t2Hours,
        type: 'concept',
        resourceHint: 'Guided practice problem',
        completed: false
      });
      tasks.push({
        id: `w${w}-t3`,
        title: `Weekly milestone checkpoint: verify code execution and test cases`,
        estimatedHours: t3Hours,
        type: 'checkpoint',
        resourceHint: 'Verify local environment outputs',
        completed: false
      });
    } else {
      theme = `Targeted Foundations: ${gapName}`;
      targetGoal = `Establish solid working familiarity with ${gapName} to bridge the identified preparation gap.`;

      const [t1Hours, t2Hours, t3Hours] = splitHours(hoursPerWeek, [0.4, 0.4, 0.2]);

      tasks.push({
        id: `w${w}-t1`,
        title: `Core principles & syntax: ${gapForWeek?.recommendedTopics[0] || 'Fundamentals walkthrough'}`,
        estimatedHours: t1Hours,
        type: 'concept',
        resourceHint: gapForWeek?.matchedResources[0]?.title || 'Official documentation tutorial',
        completed: false
      });
      tasks.push({
        id: `w${w}-t2`,
        title: `Interactive coding or sandbox drills on ${gapName}`,
        estimatedHours: t2Hours,
        type: 'hands-on',
        resourceHint: 'Hands-on practice sandbox',
        completed: false
      });
      tasks.push({
        id: `w${w}-t3`,
        title: `Debug and document 2 key edge cases encountered during practice`,
        estimatedHours: t3Hours,
        type: 'checkpoint',
        resourceHint: 'Learning journal notes',
        completed: false
      });
    }

    // Defensive invariant: task estimates must never exceed the student's weekly budget.
    const allocatedHours = Math.min(
      hoursPerWeek,
      Math.round(tasks.reduce((sum, t) => sum + t.estimatedHours, 0) * 10) / 10
    );

    weeks.push({
      weekNumber: w,
      theme,
      allocatedHours: Math.round(allocatedHours * 10) / 10,
      targetGoal,
      tasks,
      checkpoint: `Week ${w} Checkpoint: Can you explain and demonstrate the deliverables for ${theme} without looking at reference solutions?`,
      expectedLearningOutcomes: [
        `Understand industry patterns for ${gapName}.`,
        `Complete executable code or workflow deliverable.`,
        `Comfortable discussing rationale in entry-level screening interviews.`
      ]
    });
  }

  const totalPlannedHours = Math.round(weeks.reduce((acc, w) => acc + w.allocatedHours, 0) * 10) / 10;

  return {
    id: `roadmap-${roleId}-${Date.now()}`,
    roleId: role.id,
    roleTitle: role.title,
    totalWeeks,
    hoursPerWeek,
    totalAvailableHours,
    totalPlannedHours,
    isRealisticTimeline,
    timelineFeedback,
    alternativeTimelineRecommendation,
    weeks,
    keyMilestones: [
      `Week 1: Foundations in ${weeks[0]?.theme || 'Core Skills'}`,
      `Mid-point (Week ${Math.max(1, Math.floor(totalWeeks / 2))}): Independent problem solving without tutorials`,
      `Final Week (Week ${totalWeeks}): Finished portfolio artifact: "${recommendedProject.title}"`
    ],
    createdAt: new Date().toISOString()
  };
}
