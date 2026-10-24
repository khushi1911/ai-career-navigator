import { StudentProfile } from '../types';

export const DEMO_PROFILES: { id: string; label: string; description: string; profile: StudentProfile }[] = [
  {
    id: 'test-case-1',
    label: 'Test Case 1: Data Science Explorer',
    description: 'Python, SQL, Excel, Basic Statistics | 6 hrs/week | Exploring Data Internships',
    profile: {
      name: 'Priya Sharma',
      educationLevel: 'Undergraduate (Junior)',
      degree: 'B.S. in Computer Science & Statistics',
      skills: [
        { name: 'Python', level: 'Intermediate' },
        { name: 'SQL', level: 'Intermediate' },
        { name: 'Excel', level: 'Intermediate' },
        { name: 'Basic Statistics', level: 'Beginner' }
      ],
      areasOfInterest: ['Data Science', 'Data Analytics', 'Predictive Modeling'],
      preferredRoles: ['data-analyst', 'data-scientist'],
      currentExperienceLevel: 'Junior (Third Year)',
      availableStudyHoursPerWeek: 6,
      targetTimelineWeeks: 8,
      targetTimelineLabel: '8 Weeks (Summer Internship Prep)',
      existingProjects: 'Coursework project analyzing city weather patterns with Pandas and Matplotlib',
      certifications: 'Google Data Analytics Certificate (in progress)'
    }
  },
  {
    id: 'test-case-2',
    label: 'Test Case 2: Aspiring Data Analyst (Excel + SQL only)',
    description: 'Excel, Basic SQL, Missing Data Visualization | 5 hrs/week | Target: Data Analyst',
    profile: {
      name: 'Alex Morgan',
      educationLevel: 'Undergraduate (Sophomore)',
      degree: 'B.B.A. in Information Systems',
      skills: [
        { name: 'Excel', level: 'Intermediate' },
        { name: 'SQL', level: 'Beginner' }
        // Notice: Data Visualization (Power BI / Tableau) is purposefully NOT reported here!
      ],
      areasOfInterest: ['Business Intelligence', 'Data Analysis', 'Market Research'],
      preferredRoles: ['data-analyst'],
      currentExperienceLevel: 'Sophomore (Second Year)',
      availableStudyHoursPerWeek: 5,
      targetTimelineWeeks: 4,
      targetTimelineLabel: '4 Weeks (Accelerated Fall Prep)',
      existingProjects: 'Financial budgeting spreadsheet with nested IF statements and pivot charts',
      certifications: 'None yet'
    }
  },
  {
    id: 'test-case-3',
    label: 'Test Case 3: Data Analyst with Excel + Power BI',
    description: 'Excel & Power BI already mastered | 5 hrs/week | 4-week prioritized roadmap',
    profile: {
      name: 'Jordan Kim',
      educationLevel: 'Undergraduate (Senior)',
      degree: 'B.S. in Management Information Systems',
      skills: [
        { name: 'Excel', level: 'Intermediate' },
        { name: 'Power BI', level: 'Intermediate' },
        { name: 'SQL', level: 'Beginner' }
      ],
      areasOfInterest: ['Data Analytics', 'BI Engineering'],
      preferredRoles: ['data-analyst'],
      currentExperienceLevel: 'Senior (Final Year)',
      availableStudyHoursPerWeek: 5,
      targetTimelineWeeks: 4,
      targetTimelineLabel: '4 Weeks (Targeted Skill Boost)',
      existingProjects: 'Interactive HR attrition dashboard built in Power BI with drill-down filters',
      certifications: 'Microsoft PL-300 Power BI Data Analyst Associate'
    }
  },
  {
    id: 'ai-eng-aspirant',
    label: 'AI & Full-Stack Explorer',
    description: 'React, TypeScript, Python, REST APIs | 8 hrs/week | Target: AI Engineer',
    profile: {
      name: 'Devon Vance',
      educationLevel: 'Undergraduate (Junior)',
      degree: 'B.S. in Software Engineering',
      skills: [
        { name: 'TypeScript', level: 'Intermediate' },
        { name: 'React', level: 'Intermediate' },
        { name: 'Python', level: 'Intermediate' },
        { name: 'REST APIs', level: 'Intermediate' },
        { name: 'SQL', level: 'Beginner' }
      ],
      areasOfInterest: ['Generative AI', 'Agentic Systems', 'Full-Stack Development'],
      preferredRoles: ['ai-engineer', 'fullstack-web-developer'],
      currentExperienceLevel: 'Junior (Third Year)',
      availableStudyHoursPerWeek: 8,
      targetTimelineWeeks: 6,
      targetTimelineLabel: '6 Weeks (Capstone & Portfolio Sprint)',
      existingProjects: 'Full-stack note-taking web app using React and Express',
      certifications: 'None yet'
    }
  }
];

export const DEFAULT_INITIAL_PROFILE: StudentProfile = DEMO_PROFILES[0].profile;
