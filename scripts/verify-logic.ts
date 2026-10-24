import { CAREER_KNOWLEDGE_BASE } from '../src/data/careerKnowledgeBase';
import { analyzeSkillGap } from '../src/services/skillGapEngine';
import { generatePersonalizedRoadmap } from '../src/services/roadmapEngine';
import { DEMO_PROFILES } from '../src/data/demoProfiles';

console.log('=== AI CAREER NAVIGATOR: SYSTEM LOGIC VERIFICATION ===\n');

// 1. Verify Career Knowledge Base
console.log('TEST 1: Career Knowledge Base Integrity');
console.log(`- Total career roles registered: ${CAREER_KNOWLEDGE_BASE.length}`);
const expectedRoles = [
  'data-analyst',
  'data-scientist',
  'ml-engineer',
  'ai-engineer',
  'software-developer',
  'fullstack-web-developer',
  'business-analyst',
  'cybersecurity-analyst'
];

for (const roleId of expectedRoles) {
  const role = CAREER_KNOWLEDGE_BASE.find(c => c.id === roleId);
  if (!role) {
    throw new Error(`Missing expected career role: ${roleId}`);
  }
  console.log(`  ✓ ${role.title} (${role.category}): ${role.coreSkills.length} core skills, ${role.projects.length} projects, ${role.officialResources.length} verified resources`);
}
console.log('Test 1 Passed: All 8 required career categories present.\n');

// 2. Verify Test Case 2: Skill-Gap Analysis for Alex Morgan
console.log('TEST 2: Skill-Gap Analysis (Test Case 2)');
const case2 = DEMO_PROFILES.find(p => p.id === 'test-case-2')!;
console.log(`- Student: ${case2.profile.name}`);
console.log(`- Reported Skills: ${case2.profile.skills.map(s => `${s.name} (${s.level})`).join(', ')}`);
console.log(`- Target: Data Analyst`);

const gap2 = analyzeSkillGap('data-analyst', case2.profile);
console.log(`- Match Score: ${gap2.matchScore}%`);
console.log(`- Demonstrated: ${gap2.demonstratedCount}`);
console.log(`- Partially Developed: ${gap2.partiallyDevelopedCount}`);
console.log(`- Not Yet Reported: ${gap2.notYetReportedCount}`);

// Verify Excel is demonstrated
const excelEval = gap2.evaluatedSkills.find(s => s.skillName.toLowerCase().includes('excel') || s.skillName.toLowerCase().includes('spreadsheets'));
console.log(`  - Excel evaluation: status = "${excelEval?.status}" (${excelEval?.rationale})`);
if (excelEval?.status !== 'demonstrated') {
  throw new Error('Expected Excel to be demonstrated for Alex Morgan!');
}

// Verify Data Visualization is marked as not_yet_reported
const vizEval = gap2.evaluatedSkills.find(s => s.skillName.toLowerCase().includes('visualization') || s.skillName.toLowerCase().includes('power bi'));
console.log(`  - Data Visualization evaluation: status = "${vizEval?.status}" (${vizEval?.rationale})`);
if (vizEval?.status !== 'not_yet_reported') {
  throw new Error('Expected Data Visualization to be categorized as "not_yet_reported" for Alex Morgan!');
}
console.log('Test 2 Passed: Accurate categorization without assuming lack of unreported skills.\n');

// 3. Verify Test Case 3: Time-Budgeted Roadmap Calculation
console.log('TEST 3: Contextual Roadmap Time Budgeting (Test Case 3)');
const case3 = DEMO_PROFILES.find(p => p.id === 'test-case-3')!;
console.log(`- Student: ${case3.profile.name} (Knows Excel & Power BI)`);
console.log(`- Available Time: ${case3.profile.availableStudyHoursPerWeek} hrs/week`);
console.log(`- Timeline: ${case3.profile.targetTimelineWeeks} weeks`);

const roadmap3 = generatePersonalizedRoadmap('data-analyst', case3.profile);
console.log(`- Total weeks: ${roadmap3.totalWeeks}`);
console.log(`- Budgeted weekly hours: ${roadmap3.hoursPerWeek} hrs/week`);
console.log(`- Total available budget: ${roadmap3.totalAvailableHours} hrs`);
console.log(`- Total planned hours across all tasks: ${roadmap3.totalPlannedHours} hrs`);

// Check weekly task sums
for (const week of roadmap3.weeks) {
  const sumTasks = week.tasks.reduce((sum, t) => sum + t.estimatedHours, 0);
  console.log(`  - Week ${week.weekNumber} (${week.theme}): sum of tasks = ${sumTasks.toFixed(1)}h (allocated = ${week.allocatedHours}h)`);
  if (sumTasks > roadmap3.hoursPerWeek + 0.001) {
    throw new Error(`Week ${week.weekNumber} tasks (${sumTasks}h) exceed student weekly availability (${roadmap3.hoursPerWeek}h)!`);
  }
}
console.log('Test 3 Passed: Roadmap strictly respects available study hours per week.\n');

// 4. Boundary check: two-hour weekly budget must never be exceeded.
console.log('TEST 4: Minimum Weekly Budget Boundary');
const lowBudgetProfile = { ...case3.profile, availableStudyHoursPerWeek: 2, targetTimelineWeeks: 4 };
const lowBudgetRoadmap = generatePersonalizedRoadmap('data-analyst', lowBudgetProfile);
for (const week of lowBudgetRoadmap.weeks) {
  const sum = week.tasks.reduce((total, task) => total + task.estimatedHours, 0);
  if (sum > 2.001 || week.allocatedHours > 2.001) {
    throw new Error(`Minimum-budget roadmap exceeds 2 hours in week ${week.weekNumber}: ${sum}`);
  }
}
console.log('Test 4 Passed: Two-hour weekly budget is never exceeded.\n');

console.log('=== ALL LOGICAL VERIFICATION TESTS PASSED SUCCESSFULLY! ===');
