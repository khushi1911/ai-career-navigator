import { CAREER_KNOWLEDGE_BASE, CareerRole, CareerSkill, LearningResource } from '../data/careerKnowledgeBase';
import { StudentProfile, StudentSkill, SkillGapAnalysisResult, EvaluatedSkill, SkillProficiency, SkillGapStatus } from '../types';

// Map of canonical skill aliases to detect student skill inputs cleanly
const SKILL_ALIASES: Record<string, string[]> = {
  'sql': ['sql', 'mysql', 'postgresql', 'postgres', 'sqlite', 't-sql', 'oracle sql', 'relational database'],
  'spreadsheets (excel / google sheets)': ['excel', 'spreadsheets', 'google sheets', 'ms excel', 'advanced excel', 'vba', 'pivot tables'],
  'data visualization & bi (power bi / tableau)': ['power bi', 'powerbi', 'tableau', 'looker', 'data visualization', 'dataviz', 'bi', 'dashboards', 'metabase'],
  'python for data analysis': ['python', 'pandas', 'numpy', 'matplotlib', 'seaborn', 'python programming'],
  'basic statistics & metrics': ['statistics', 'stats', 'basic statistics', 'descriptive statistics', 'a/b testing', 'metrics', 'probability'],
  'python for data science': ['python', 'scipy', 'numpy', 'pandas', 'python for ds'],
  'applied machine learning': ['machine learning', 'ml', 'scikit-learn', 'sklearn', 'supervised learning', 'xgboost', 'random forest'],
  'probability & inferential statistics': ['statistics', 'probability', 'inferential statistics', 'hypothesis testing', 'a/b testing'],
  'sql & data extraction': ['sql', 'mysql', 'postgresql', 'postgres', 'data extraction', 'queries'],
  'scikit-learn & ml tooling': ['scikit-learn', 'sklearn', 'ml pipelines', 'feature engineering'],
  'python software engineering': ['python', 'oop python', 'pytest', 'fastapi', 'backend python'],
  'api development (fastapi / flask)': ['fastapi', 'flask', 'rest api', 'api', 'apis', 'backend api', 'express', 'node'],
  'docker & containerization': ['docker', 'containers', 'docker compose', 'containerization', 'kubernetes'],
  'ml frameworks (pytorch / scikit-learn)': ['pytorch', 'tensorflow', 'keras', 'scikit-learn', 'onnx', 'deep learning'],
  'mlops basics & model tracking': ['mlops', 'mlflow', 'weights & biases', 'wandb', 'dvc', 'model registry'],
  'llm apis & prompt engineering': ['llm', 'gemini', 'openai', 'prompt engineering', 'genai', 'large language models', 'langchain', 'llamaindex'],
  'rag & vector embeddings': ['rag', 'retrieval-augmented generation', 'vector embeddings', 'pinecone', 'chroma', 'pgvector', 'embeddings'],
  'ai agent architecture & tool calling': ['ai agent', 'agents', 'function calling', 'tool use', 'autonomous agents', 'agentic workflows'],
  'full-stack integration (typescript / python)': ['full-stack', 'fullstack', 'typescript', 'react', 'api integration', 'full stack'],
  'ai evaluation & guardrails': ['evals', 'ai evaluation', 'guardrails', 'prompt safety', 'hallucination detection'],
  'data structures & algorithms': ['dsa', 'data structures', 'algorithms', 'leetcode', 'problem solving', 'competitive programming'],
  'core programming (typescript / python / java)': ['python', 'typescript', 'java', 'c++', 'javascript', 'c#', 'golang', 'oop'],
  'git & version control workflows': ['git', 'github', 'version control', 'gitlab'],
  'automated testing (unit & integration)': ['testing', 'unit testing', 'pytest', 'jest', 'integration testing', 'tdd'],
  'system design fundamentals': ['system design', 'architecture', 'scalability', 'microservices', 'caching'],
  'modern react & typescript': ['react', 'react.js', 'typescript', 'reactjs', 'next.js', 'nextjs', 'frontend', 'javascript'],
  'backend api development (node.js / express)': ['node.js', 'node', 'express', 'express.js', 'nest.js', 'rest apis', 'backend'],
  'relational databases (postgresql / sql)': ['sql', 'postgresql', 'postgres', 'mysql', 'database', 'sqlite', 'drizzle', 'prisma'],
  'authentication & security best practices': ['auth', 'jwt', 'oauth', 'authentication', 'security', 'cookies', 'sessions'],
  'tailwind css & responsive ui design': ['tailwind', 'tailwind css', 'css', 'responsive design', 'html/css', 'ui design'],
  'requirements elicitation & documentation': ['requirements gathering', 'user stories', 'brd', 'documentation', 'product requirements', 'prd'],
  'process modeling & flowcharts (bpmn / visio)': ['bpmn', 'process modeling', 'flowcharts', 'visio', 'lucidchart', 'workflow mapping'],
  'advanced excel & business modeling': ['excel', 'advanced excel', 'financial modeling', 'roi modeling', 'pivot tables'],
  'agile & scrum methodologies': ['agile', 'scrum', 'jira', 'sprints', 'kanban', 'confluence'],
  'basic sql for business validation': ['sql', 'database queries', 'sql validation'],
  'networking & protocols (tcp/ip, dns, http)': ['networking', 'tcp/ip', 'dns', 'http', 'osi model', 'wireshark', 'subnets'],
  'siem & log analysis (splunk / elastic)': ['siem', 'splunk', 'elastic', 'elk', 'log analysis', 'sentinel'],
  'linux administration & command line': ['linux', 'bash', 'shell scripting', 'terminal', 'unix', 'cli'],
  'threats, vulnerabilities & mitre att&ck': ['cybersecurity', 'mitre att&ck', 'owasp', 'vulnerabilities', 'malware', 'threats', 'soc'],
  'packet analysis with wireshark': ['wireshark', 'packet analysis', 'pcap', 'network analysis']
};

/**
 * Normalizes a string for fuzzy matching
 */
function normalizeString(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Find matching student skill for a requirement
 */
export function findMatchingStudentSkill(
  requirementName: string,
  studentSkills: StudentSkill[]
): StudentSkill | null {
  const normReq = normalizeString(requirementName);
  const aliases = SKILL_ALIASES[normReq] || [normReq];

  // 1. Direct match on full name
  for (const sk of studentSkills) {
    const normStudent = normalizeString(sk.name);
    if (normStudent === normReq) {
      return sk;
    }
  }

  // 2. Alias match
  for (const sk of studentSkills) {
    const normStudent = normalizeString(sk.name);
    for (const alias of aliases) {
      if (normStudent === alias || normStudent.includes(alias) || alias.includes(normStudent)) {
        return sk;
      }
    }
  }

  return null;
}

const PROFICIENCY_RANK: Record<SkillProficiency, number> = {
  'Beginner': 1,
  'Intermediate': 2,
  'Advanced': 3
};

/**
 * Deterministically evaluate skill gap status
 */
export function evaluateSkill(
  reqSkill: CareerSkill,
  studentSkills: StudentSkill[],
  availableResources: LearningResource[]
): EvaluatedSkill {
  const matchedStudentSkill = findMatchingStudentSkill(reqSkill.name, studentSkills);

  let status: SkillGapStatus = 'not_yet_reported';
  let rationale = '';
  let impactExplanation = '';

  const matchedResources = availableResources.filter(
    r => normalizeString(r.targetSkill) === normalizeString(reqSkill.name) ||
         r.title.toLowerCase().includes(reqSkill.name.toLowerCase().split(' ')[0])
  );

  if (!matchedStudentSkill) {
    status = 'not_yet_reported';
    rationale = `You have not reported proficiency in "${reqSkill.name}". This is a ${reqSkill.importance.toUpperCase()} skill for entry-level roles.`;
    impactExplanation = getImpactExplanation(reqSkill);
  } else {
    const studentRank = PROFICIENCY_RANK[matchedStudentSkill.level];
    const reqRank = PROFICIENCY_RANK[reqSkill.expectedProficiency];

    if (studentRank >= reqRank) {
      status = 'demonstrated';
      rationale = `Demonstrated: Your reported ${matchedStudentSkill.level} proficiency meets or exceeds the expected ${reqSkill.expectedProficiency} level.`;
      impactExplanation = `Strong foundation in ${reqSkill.name}. You can showcase this through complex interview problem discussions and portfolio code.`;
    } else {
      status = 'partially_developed';
      rationale = `Partially Developed: You reported ${matchedStudentSkill.level} level, but entry-level hiring benchmarks require ${reqSkill.expectedProficiency} proficiency.`;
      impactExplanation = getImpactExplanation(reqSkill);
    }
  }

  const badgeMap: Record<SkillGapStatus, string> = {
    'demonstrated': 'Demonstrated',
    'partially_developed': 'Partially Developed',
    'not_yet_reported': 'Not Yet Reported'
  };

  return {
    skillName: reqSkill.name,
    category: reqSkill.category === 'core' ? 'core' : 'supporting',
    importance: reqSkill.importance,
    roleRequirementProficiency: reqSkill.expectedProficiency,
    studentReportedProficiency: matchedStudentSkill ? matchedStudentSkill.level : null,
    status,
    statusBadge: badgeMap[status],
    rationale,
    impactExplanation,
    recommendedTopics: reqSkill.typicalInterviewTopics || [],
    matchedResources
  };
}

function getImpactExplanation(reqSkill: CareerSkill): string {
  if (reqSkill.importance === 'critical') {
    return `Critical Gatekeeper: Evaluated in nearly 100% of technical screening interviews for this role. Lacking demonstrable evidence here frequently leads to early candidate rejection.`;
  } else if (reqSkill.importance === 'high') {
    return `High Value Differentiator: Distinguishes competitive candidates from the median pool and allows taking on autonomous entry-level project work.`;
  }
  return `Supporting Enabler: Speeds up onboarding and workflow collaboration within team environments.`;
}

/**
 * Execute full deterministic skill-gap analysis
 */
export function analyzeSkillGap(
  roleId: string,
  profile: StudentProfile
): SkillGapAnalysisResult {
  const role = CAREER_KNOWLEDGE_BASE.find(r => r.id === roleId) || CAREER_KNOWLEDGE_BASE[0];

  const allReqSkills = [...role.coreSkills, ...role.supportingSkills];
  const evaluatedSkills: EvaluatedSkill[] = allReqSkills.map(skill =>
    evaluateSkill(skill, profile.skills, role.officialResources)
  );

  const coreEvaluations = evaluatedSkills.filter(e => e.category === 'core');
  const demonstratedCount = evaluatedSkills.filter(e => e.status === 'demonstrated').length;
  const partiallyDevelopedCount = evaluatedSkills.filter(e => e.status === 'partially_developed').length;
  const notYetReportedCount = evaluatedSkills.filter(e => e.status === 'not_yet_reported').length;

  // Weighted match score calculation
  // Critical demonstrated = 100%, Partially = 50%, Not reported = 0%
  let totalScore = 0;
  let maxScore = 0;

  for (const s of evaluatedSkills) {
    const weight = s.importance === 'critical' ? 3 : s.importance === 'high' ? 2 : 1;
    maxScore += weight * 100;
    if (s.status === 'demonstrated') {
      totalScore += weight * 100;
    } else if (s.status === 'partially_developed') {
      totalScore += weight * 50;
    }
  }

  const matchScore = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  // Identify priority learning areas:
  // Sort: Critical 'partially_developed' or 'not_yet_reported' first, then High
  const priorityLearningAreas = evaluatedSkills
    .filter(s => s.status !== 'demonstrated')
    .sort((a, b) => {
      const impScore = (s: EvaluatedSkill) => (s.importance === 'critical' ? 3 : s.importance === 'high' ? 2 : 1);
      const statusScore = (s: EvaluatedSkill) => (s.status === 'partially_developed' ? 2 : 1); // partial can be completed faster
      return (impScore(b) * 10 + statusScore(b)) - (impScore(a) * 10 + statusScore(a));
    });

  return {
    roleId: role.id,
    roleTitle: role.title,
    matchScore,
    totalRequiredCoreSkills: coreEvaluations.length,
    demonstratedCount,
    partiallyDevelopedCount,
    notYetReportedCount,
    evaluatedSkills,
    priorityLearningAreas,
    recommendedProjects: role.projects,
    recommendedResources: role.officialResources,
    guidanceDisclaimer: 'This analysis provides educational guidance based on current technology industry entry-level benchmarks. It does not constitute a guaranteed placement, hiring assessment, or formal academic credential.'
  };
}
