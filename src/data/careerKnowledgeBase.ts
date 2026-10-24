export interface CareerSkill {
  name: string;
  category: 'core' | 'supporting' | 'tool';
  importance: 'critical' | 'high' | 'medium';
  description: string;
  expectedProficiency: 'Beginner' | 'Intermediate' | 'Advanced';
  typicalInterviewTopics: string[];
}

export interface CareerProject {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  keySkills: string[];
  deliverables: string[];
  portfolioValue: string;
}

export interface LearningResource {
  id: string;
  title: string;
  url: string;
  provider: string;
  type: 'Official Documentation' | 'Interactive Course' | 'Public Dataset' | 'Practice Platform' | 'Certification Guide';
  isFree: boolean;
  targetSkill: string;
  description: string;
}

export interface CareerRole {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullOverview: string;
  entryLevelResponsibilities: string[];
  coreSkills: CareerSkill[];
  supportingSkills: CareerSkill[];
  projects: CareerProject[];
  learningTopics: {
    weekRange: string;
    topic: string;
    estimatedHours: number;
    subtopics: string[];
  }[];
  officialResources: LearningResource[];
  prerequisites: string[];
  limitationsAndRealityCheck: string[];
}

export const CAREER_KNOWLEDGE_BASE: CareerRole[] = [
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    shortDescription: 'Transforms raw business data into actionable dashboards, insights, and metrics to guide executive decision-making.',
    fullOverview: 'Data Analysts bridge business problems and data by inspecting, cleaning, transforming, and modeling data. Entry-level analysts focus primarily on querying SQL databases, cleaning tabular data, building interactive BI dashboards, and communicating findings clearly to non-technical stakeholders.',
    entryLevelResponsibilities: [
      'Write structured SQL queries (joins, aggregations, window functions) to extract business data.',
      'Clean, reshape, and validate dirty datasets using Python (Pandas) or advanced Excel/Sheets.',
      'Design, maintain, and publish interactive dashboards in Power BI, Tableau, or Looker.',
      'Calculate key business metrics (retention, churn, conversion, CAC, LTV) and summarize trends.',
      'Prepare slide decks and executive summaries explaining data anomalies and seasonal patterns.'
    ],
    coreSkills: [
      {
        name: 'SQL',
        category: 'core',
        importance: 'critical',
        description: 'Writing complex queries, CTEs, window functions, aggregations, and joins across relational databases.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Window functions (ROW_NUMBER, RANK)', 'Self-joins & Outer joins', 'GROUP BY with HAVING', 'Common Table Expressions (CTEs)']
      },
      {
        name: 'Spreadsheets (Excel / Google Sheets)',
        category: 'core',
        importance: 'critical',
        description: 'VLOOKUP/XLOOKUP, INDEX-MATCH, Pivot Tables, data modeling, nested formulas, and data hygiene.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Pivot tables and slicers', 'XLOOKUP vs INDEX/MATCH', 'Data validation rules', 'Conditional aggregation (SUMIFS, COUNTIFS)']
      },
      {
        name: 'Data Visualization & BI (Power BI / Tableau)',
        category: 'core',
        importance: 'critical',
        description: 'Building interactive reports, DAX/LOD calculations, dashboard UX, and visual storytelling.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Star schema vs Snowflake schema', 'DAX measures vs calculated columns', 'Drill-through filters', 'Visual hierarchy and color accessibility']
      },
      {
        name: 'Python for Data Analysis',
        category: 'core',
        importance: 'high',
        description: 'Using Pandas, NumPy, and Matplotlib/Seaborn for exploratory data analysis (EDA) and automation.',
        expectedProficiency: 'Beginner',
        typicalInterviewTopics: ['Dataframe filtering and merging', 'Handling null and duplicate values', 'GroupBy aggregations', 'Exporting cleaned datasets']
      },
      {
        name: 'Basic Statistics & Metrics',
        category: 'core',
        importance: 'high',
        description: 'Descriptive statistics (mean, median, standard deviation), distributions, percentiles, and A/B test basics.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Mean vs median with skewed data', 'Correlation vs causation', 'Sample size estimation', 'Interpreting confidence intervals']
      }
    ],
    supportingSkills: [
      {
        name: 'Business Communication',
        category: 'supporting',
        importance: 'high',
        description: 'Translating analytical findings into concise takeaways for managers without statistical jargon.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Presenting to executive stakeholders', 'Translating ambiguous requests into SQL specs']
      },
      {
        name: 'Git & Version Control',
        category: 'supporting',
        importance: 'medium',
        description: 'Basic repository management for SQL scripts and Jupyter notebooks.',
        expectedProficiency: 'Beginner',
        typicalInterviewTopics: ['Commit, push, pull, branches']
      },
      {
        name: 'Data Warehousing Basics',
        category: 'supporting',
        importance: 'medium',
        description: 'Understanding cloud warehouses like BigQuery, Snowflake, or PostgreSQL tables.',
        expectedProficiency: 'Beginner',
        typicalInterviewTopics: ['Fact vs dimension tables', 'Partitioning and clustering concepts']
      }
    ],
    projects: [
      {
        id: 'da-proj-1',
        title: 'E-Commerce Sales & Cohort Retention Dashboard',
        difficulty: 'Beginner',
        summary: 'Analyze transactional e-commerce sales dataset. Compute monthly active buyers, repeat customer rate, and cohort retention heatmap.',
        keySkills: ['SQL', 'Spreadsheets (Excel / Google Sheets)', 'Data Visualization & BI (Power BI / Tableau)'],
        deliverables: ['SQL extraction script with CTEs', 'Interactive 3-page Power BI / Tableau dashboard', '1-page Executive Summary PDF'],
        portfolioValue: 'Demonstrates immediate business acumen, metric calculation, and clean dashboard layout.'
      },
      {
        id: 'da-proj-2',
        title: 'Customer Churn Exploratory Data Analysis with Python',
        difficulty: 'Intermediate',
        summary: 'Perform end-to-end EDA on telecom customer churn dataset. Clean missing data, plot distribution graphs, and identify key churn indicators.',
        keySkills: ['Python for Data Analysis', 'Basic Statistics & Metrics', 'SQL'],
        deliverables: ['Documented Jupyter Notebook with narrative markdown', 'Seaborn correlation plots', 'Actionable recommendations for customer retention'],
        portfolioValue: 'Proves Python scripting competence beyond simple spreadsheet analysis.'
      }
    ],
    learningTopics: [
      {
        weekRange: 'Module 1',
        topic: 'Relational Database Fundamentals & SQL Querying',
        estimatedHours: 12,
        subtopics: ['SELECT, WHERE, ORDER BY, LIMIT', 'INNER, LEFT, RIGHT, FULL OUTER joins', 'Aggregate functions & GROUP BY / HAVING', 'Subqueries vs CTEs']
      },
      {
        weekRange: 'Module 2',
        topic: 'Advanced SQL & Data Transformation',
        estimatedHours: 10,
        subtopics: ['Window functions (RANK, DENSE_RANK, LEAD, LAG)', 'CASE WHEN conditional transformations', 'Date & string manipulation functions', 'Data hygiene & duplicate detection']
      },
      {
        weekRange: 'Module 3',
        topic: 'Business Intelligence & Visual Storytelling',
        estimatedHours: 14,
        subtopics: ['Data modeling (Star Schema)', 'Power BI / Tableau interface & data connection', 'Calculated measures & DAX fundamentals', 'Dashboard design principles & accessibility']
      },
      {
        weekRange: 'Module 4',
        topic: 'Python EDA & Business Case Study',
        estimatedHours: 12,
        subtopics: ['Pandas series and dataframe manipulation', 'Handling missing data and type casting', 'Matplotlib & Seaborn visualizations', 'Synthesizing recommendations for stakeholders']
      }
    ],
    officialResources: [
      {
        id: 'res-da-1',
        title: 'PostgreSQL Official Documentation: SQL Tutorial',
        url: 'https://www.postgresql.org/docs/current/tutorial-sql.html',
        provider: 'PostgreSQL Global Development Group',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'SQL',
        description: 'Comprehensive, standard reference guide for SQL syntax, joins, queries, and constraints.'
      },
      {
        id: 'res-da-2',
        title: 'Microsoft Learn: Power BI Guided Learning Modules',
        url: 'https://learn.microsoft.com/en-us/power-bi/guidance/',
        provider: 'Microsoft Learn',
        type: 'Interactive Course',
        isFree: true,
        targetSkill: 'Data Visualization & BI (Power BI / Tableau)',
        description: 'Official free curriculum covering star schema design, DAX best practices, and enterprise reporting.'
      },
      {
        id: 'res-da-3',
        title: 'Pandas Official User Guide: 10 Minutes to pandas',
        url: 'https://pandas.pydata.org/docs/user_guide/10min.html',
        provider: 'Pandas Development Team',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'Python for Data Analysis',
        description: 'The definitive quick start guide for tabular data ingestion, filtering, and aggregation in Python.'
      },
      {
        id: 'res-da-4',
        title: 'Kaggle: Brazilian E-Commerce Public Dataset by Olist',
        url: 'https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce',
        provider: 'Kaggle Datasets',
        type: 'Public Dataset',
        isFree: true,
        targetSkill: 'SQL',
        description: 'Real-world commercial dataset with 100k orders across multiple relational tables, ideal for SQL joins and portfolio projects.'
      }
    ],
    prerequisites: [
      'Comfortable with basic math, percentages, and logical thinking.',
      'Access to a laptop capable of running desktop BI tools (or web versions) and browser-based SQL sandboxes.'
    ],
    limitationsAndRealityCheck: [
      'SQL and Excel alone are sufficient for many entry-level analyst roles, but dashboard portfolio pieces are essential to stand out.',
      'Entry-level analysts spend 60-70% of time cleaning dirty data and clarifying ambiguous requirements rather than making fancy graphics.',
      'Salary ranges vary widely by geographic region and company size; certificates do not guarantee job offers without verifiable project code.'
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data & Analytics',
    shortDescription: 'Applies statistical modeling, experiment design, and machine learning algorithms to uncover patterns and predict business outcomes.',
    fullOverview: 'Data Scientists formulate hypothesis-driven experiments and build predictive models. Unlike pure analysts who describe what happened, data scientists focus on why things happened and what will happen next using inferential statistics, machine learning, and algorithmic feature engineering.',
    entryLevelResponsibilities: [
      'Formulate analytical hypotheses to answer business and product questions.',
      'Extract and preprocess multi-source data from SQL databases and distributed file systems.',
      'Perform exploratory data analysis and build baseline statistical/ML models.',
      'Conduct A/B testing: calculate sample sizes, formulate null hypotheses, and evaluate p-values.',
      'Interpret model coefficients and feature importance for stakeholders.'
    ],
    coreSkills: [
      {
        name: 'Python for Data Science',
        category: 'core',
        importance: 'critical',
        description: 'Advanced Python, NumPy, Pandas, Scipy, and object-oriented programming for reproducible research.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Vectorization in NumPy', 'Pandas apply vs vectorized methods', 'Writing modular functions and pipelines']
      },
      {
        name: 'Applied Machine Learning',
        category: 'core',
        importance: 'critical',
        description: 'Supervised learning (Regression, Trees, Random Forests, XGBoost) and unsupervised learning (K-Means, PCA).',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Bias-variance tradeoff', 'Regularization (L1 Lasso vs L2 Ridge)', 'Evaluation metrics (ROC-AUC, Precision-Recall, F1)', 'Cross-validation strategies']
      },
      {
        name: 'Probability & Inferential Statistics',
        category: 'core',
        importance: 'critical',
        description: 'Hypothesis testing, confidence intervals, p-values, Bayes theorem, central limit theorem, and experiment design.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Type I vs Type II errors', 'A/B test sample sizing', 'Central Limit Theorem assumptions', 'Statistical power calculation']
      },
      {
        name: 'SQL & Data Extraction',
        category: 'core',
        importance: 'high',
        description: 'Querying relational databases, complex joins, subqueries, and window functions to construct ML training sets.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Constructing point-in-time training datasets', 'Aggregating user behavioral features', 'Handling temporal data leakage']
      },
      {
        name: 'Scikit-Learn & ML Tooling',
        category: 'core',
        importance: 'high',
        description: 'Building end-to-end Scikit-Learn Pipelines with ColumnTransformer, StandardScaler, and OneHotEncoder.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Preventing data leakage in preprocessing', 'Custom transformers in Pipeline', 'Hyperparameter tuning with GridSearchCV']
      }
    ],
    supportingSkills: [
      {
        name: 'Data Storytelling & Visualization',
        category: 'supporting',
        importance: 'high',
        description: 'Communicating complex mathematical concepts using clear plots (SHAP, partial dependence, ROC curves).',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Explaining model predictions to non-technical leaders', 'SHAP values interpretation']
      },
      {
        name: 'Git & Reproducible Research',
        category: 'supporting',
        importance: 'medium',
        description: 'Version control, environment management (conda/venv), and clean README documentation.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Environment lockfiles', 'Git branching workflows']
      }
    ],
    projects: [
      {
        id: 'ds-proj-1',
        title: 'Customer Lifetime Value & Churn Prediction System',
        difficulty: 'Intermediate',
        summary: 'Build a Scikit-Learn pipeline to predict subscription churn and estimate customer residual value using historical transactional features.',
        keySkills: ['Python for Data Science', 'Applied Machine Learning', 'Scikit-Learn & ML Tooling', 'SQL & Data Extraction'],
        deliverables: ['Reproducible Python script or notebook', 'Scikit-Learn Pipeline preventing leakage', 'SHAP feature importance plots and business report'],
        portfolioValue: 'Demonstrates end-to-end model development following rigorous scientific best practices.'
      },
      {
        id: 'ds-proj-2',
        title: 'Rigorous A/B Testing Simulator & Analysis Engine',
        difficulty: 'Intermediate',
        summary: 'Simulate a randomized digital product experiment with power analysis, test statistics, p-value calculations, and false positive checks.',
        keySkills: ['Probability & Inferential Statistics', 'Python for Data Science'],
        deliverables: ['Statistical notebook with power curves', 'Z-test / Chi-Square calculations', 'Executive decision framework memo'],
        portfolioValue: 'Proves practical understanding of experiment design which is standard in top tech interviews.'
      }
    ],
    learningTopics: [
      {
        weekRange: 'Module 1',
        topic: 'Mathematical & Statistical Foundations',
        estimatedHours: 16,
        subtopics: ['Probability distributions & expectation', 'Hypothesis testing, p-values & z/t-tests', 'A/B testing methodology & sample sizing', 'Linear regression mechanics & assumptions']
      },
      {
        weekRange: 'Module 2',
        topic: 'Python Data Science Ecosystem & Preprocessing',
        estimatedHours: 14,
        subtopics: ['NumPy vector operations & linear algebra basics', 'Pandas feature engineering', 'Outlier detection & missing value imputation', 'Data leakage prevention techniques']
      },
      {
        weekRange: 'Module 3',
        topic: 'Supervised Machine Learning & Evaluation',
        estimatedHours: 16,
        subtopics: ['Logistic regression & classification metrics', 'Tree models: Decision Trees to XGBoost/LightGBM', 'Bias-variance tradeoff & cross-validation', 'Model explainability with SHAP']
      },
      {
        weekRange: 'Module 4',
        topic: 'Unsupervised Learning & Capstone Project',
        estimatedHours: 14,
        subtopics: ['K-Means clustering & silhouette scores', 'Dimensionality reduction with PCA', 'Packaging models with Scikit-Learn Pipelines', 'Technical writeup and portfolio presentation']
      }
    ],
    officialResources: [
      {
        id: 'res-ds-1',
        title: 'Scikit-Learn Official User Guide',
        url: 'https://scikit-learn.org/stable/user_guide.html',
        provider: 'Scikit-learn Consortium',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'Scikit-Learn & ML Tooling',
        description: 'Industry standard guide on model architectures, pipelines, cross-validation, and metrics.'
      },
      {
        id: 'res-ds-2',
        title: 'StatQuest with Josh Starmer: Machine Learning & Statistics',
        url: 'https://statquest.org/',
        provider: 'StatQuest',
        type: 'Interactive Course',
        isFree: true,
        targetSkill: 'Applied Machine Learning',
        description: 'World-renowned visual explanations of PCA, Trees, Gradient Boosting, and p-values.'
      },
      {
        id: 'res-ds-3',
        title: 'UCI Machine Learning Repository',
        url: 'https://archive.ics.uci.edu/',
        provider: 'UC Irvine',
        type: 'Public Dataset',
        isFree: true,
        targetSkill: 'Applied Machine Learning',
        description: 'Standard benchmark datasets for classification, regression, and clustering algorithms.'
      }
    ],
    prerequisites: [
      'Solid college-level algebra and introductory statistics.',
      'Working programming experience with Python or R.'
    ],
    limitationsAndRealityCheck: [
      'Entry-level Data Scientist roles often prefer master’s degrees or strong demonstrable projects showing applied statistics.',
      'Most time is spent on exploratory analysis, data validation, and stakeholder alignment rather than training cutting-edge deep learning models.'
    ]
  },
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    category: 'AI & Machine Learning',
    shortDescription: 'Builds, containerizes, tests, and deploys production-grade machine learning pipelines and real-time inference services.',
    fullOverview: 'Machine Learning Engineers take prototypes built by data scientists and convert them into scalable, reliable, production-ready software systems. The focus is on MLOps, inference latency, model monitoring, automated retraining pipelines, and containerized deployment.',
    entryLevelResponsibilities: [
      'Package machine learning models into reproducible REST or gRPC inference APIs (FastAPI).',
      'Containerize applications using Docker and write automated integration tests.',
      'Implement feature processing pipelines that run consistently in training and online inference.',
      'Monitor model performance, latency, and data drift in staging and production environments.',
      'Optimize model size and inference speed using quantization, ONNX, or caching.'
    ],
    coreSkills: [
      {
        name: 'Python Software Engineering',
        category: 'core',
        importance: 'critical',
        description: 'Writing modular, typed, unit-tested Python code adhering to PEP8, design patterns, and OOP principles.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Decorators and generators', 'Type annotations & Pydantic', 'Writing pytest unit tests', 'Memory management in Python']
      },
      {
        name: 'API Development (FastAPI / Flask)',
        category: 'core',
        importance: 'critical',
        description: 'Developing high-throughput REST APIs, request validation, async handlers, and serialization.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Asyncio vs multithreading in Python', 'Pydantic schema validation', 'Batch prediction endpoints', 'HTTP status codes and error handling']
      },
      {
        name: 'Docker & Containerization',
        category: 'core',
        importance: 'critical',
        description: 'Writing multi-stage Dockerfiles, managing container layers, caching dependencies, and Docker Compose.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Multi-stage builds to minimize image size', 'Docker volumes vs bind mounts', 'Running containers non-root for security']
      },
      {
        name: 'ML Frameworks (PyTorch / Scikit-Learn)',
        category: 'core',
        importance: 'high',
        description: 'Understanding model weights serialization, tensor operations, inference runtimes (ONNX), and evaluation.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Saving and loading model state_dict', 'ONNX runtime exports', 'Inference batching']
      },
      {
        name: 'MLOps Basics & Model Tracking',
        category: 'core',
        importance: 'high',
        description: 'Experiment tracking (MLflow / Weights & Biases), model registry, and CI/CD pipelines for models.',
        expectedProficiency: 'Beginner',
        typicalInterviewTopics: ['Logging parameters, metrics, and artifacts', 'Model registry versioning', 'CI/CD pipeline stages for ML']
      }
    ],
    supportingSkills: [
      {
        name: 'Linux & Bash Scripting',
        category: 'supporting',
        importance: 'high',
        description: 'Command line proficiency, process inspection, SSH, cron jobs, and basic shell scripting.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['grep, awk, sed', 'Permissions (chmod/chown)', 'Process monitoring (htop, ps)']
      },
      {
        name: 'Cloud Foundations (GCP / AWS)',
        category: 'supporting',
        importance: 'medium',
        description: 'Understanding object storage (S3/GCS), virtual machines, and managed container runtimes.',
        expectedProficiency: 'Beginner',
        typicalInterviewTopics: ['IAM roles and secrets', 'Deploying Docker containers to Cloud Run or ECS']
      }
    ],
    projects: [
      {
        id: 'mle-proj-1',
        title: 'Containerized Real-Time Model Inference Microservice',
        difficulty: 'Intermediate',
        summary: 'Train a sentiment/fraud classification model, package it into a FastAPI microservice with input validation, test it with Pytest, and build a slim Docker container.',
        keySkills: ['Python Software Engineering', 'API Development (FastAPI / Flask)', 'Docker & Containerization', 'ML Frameworks (PyTorch / Scikit-Learn)'],
        deliverables: ['FastAPI application code with typed Pydantic models', 'Dockerfile with multi-stage build (<200MB)', 'Pytest automated test suite', 'Swagger/OpenAPI documentation'],
        portfolioValue: 'Direct proof of production software engineering skills applied to machine learning.'
      },
      {
        id: 'mle-proj-2',
        title: 'End-to-End Experiment Tracking & Drift Detection Pipeline',
        difficulty: 'Intermediate',
        summary: 'Set up local MLflow server to track hyperparameter runs, log artifact models, and write a drift detection script measuring distribution shift on incoming test batches.',
        keySkills: ['MLOps Basics & Model Tracking', 'Python Software Engineering'],
        deliverables: ['MLflow tracking script and artifact store', 'Drift detection logic comparing baseline vs incoming data', 'Automated GitHub Actions CI script'],
        portfolioValue: 'Signals maturity in modern MLOps practices beyond standard notebook models.'
      }
    ],
    learningTopics: [
      {
        weekRange: 'Module 1',
        topic: 'Production Python & Testing for ML',
        estimatedHours: 14,
        subtopics: ['Modern Python typing & Pydantic models', 'Pytest fixtures, mocking, and coverage', 'Code formatting (ruff/black) and linting', 'Model persistence and serialization formats']
      },
      {
        weekRange: 'Module 2',
        topic: 'Inference Service Architecture with FastAPI',
        estimatedHours: 14,
        subtopics: ['FastAPI application lifecycle & dependency injection', 'Asynchronous request handling', 'Payload validation and structured errors', 'Benchmarking latency and throughput']
      },
      {
        weekRange: 'Module 3',
        topic: 'Docker, Containerization & Optimization',
        estimatedHours: 12,
        subtopics: ['Container concepts and architecture', 'Writing efficient multi-stage Dockerfiles', 'ONNX runtime acceleration', 'Container health checks and entrypoints']
      },
      {
        weekRange: 'Module 4',
        topic: 'MLOps, Experiment Tracking & CI/CD',
        estimatedHours: 12,
        subtopics: ['MLflow tracking server setup', 'Model registry and versioning', 'Automating tests with GitHub Actions', 'Basic cloud deployment (Cloud Run / AWS)']
      }
    ],
    officialResources: [
      {
        id: 'res-mle-1',
        title: 'FastAPI Official Documentation & Tutorial',
        url: 'https://fastapi.tiangolo.com/tutorial/',
        provider: 'Tiangolo / FastAPI',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'API Development (FastAPI / Flask)',
        description: 'Complete hands-on documentation for building fast, typed Python web services.'
      },
      {
        id: 'res-mle-2',
        title: 'Docker Documentation: Getting Started Guide',
        url: 'https://docs.docker.com/get-started/',
        provider: 'Docker Inc.',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'Docker & Containerization',
        description: 'Official step-by-step introduction to images, containers, multi-stage builds, and Compose.'
      },
      {
        id: 'res-mle-3',
        title: 'MLflow Official Documentation',
        url: 'https://mlflow.org/docs/latest/index.html',
        provider: 'MLflow Project',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'MLOps Basics & Model Tracking',
        description: 'Standard open-source platform for tracking experiments, packaging code, and deploying models.'
      }
    ],
    prerequisites: [
      'Intermediate Python knowledge (functions, classes, packages).',
      'Basic familiarity with machine learning workflows.'
    ],
    limitationsAndRealityCheck: [
      'Software engineering rigor (clean code, tests, CI/CD, Docker) is tested far more heavily than deep mathematical proofs.',
      'Entry-level roles expect comfort running terminal commands and configuring environments.'
    ]
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    category: 'AI & Machine Learning',
    shortDescription: 'Builds intelligent, production-ready applications powered by Large Language Models, agents, retrieval-augmented generation (RAG), and multimodal APIs.',
    fullOverview: 'AI Engineers specialize in building applied software systems with foundation models (such as Google Gemini, OpenAI, Claude). They architect RAG pipelines, design tool-using agents, write defensive prompts, evaluate model outputs, and integrate AI seamlessly into full-stack web and backend applications.',
    entryLevelResponsibilities: [
      'Integrate LLM APIs (e.g. Google Gemini via @google/genai) into web services and microservices.',
      'Build Retrieval-Augmented Generation (RAG) pipelines using vector search and hybrid retrieval.',
      'Design tool-calling agent loops with structured function definitions and error handling.',
      'Implement prompt evaluation frameworks and guardrails against jailbreaks and hallucinations.',
      'Optimize API costs, token usage, latency (streaming), and caching strategies.'
    ],
    coreSkills: [
      {
        name: 'LLM APIs & Prompt Engineering',
        category: 'core',
        importance: 'critical',
        description: 'Deep understanding of system instructions, temperature, structured JSON schemas, few-shot prompting, and token optimization.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Chain of thought prompting', 'Structured JSON output enforcement', 'Mitigating hallucinations and prompt injections', 'Handling context window limits']
      },
      {
        name: 'RAG & Vector Embeddings',
        category: 'core',
        importance: 'critical',
        description: 'Chunking strategies, dense vector embeddings, cosine similarity, vector databases (Chroma, Pinecone, pgvector), and hybrid search.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Semantic chunking vs fixed-size chunking', 'Cosine similarity vs dot product', 'Reranking retrieval results', 'Handling out-of-context retrieval']
      },
      {
        name: 'AI Agent Architecture & Tool Calling',
        category: 'core',
        importance: 'critical',
        description: 'Function calling schemas, multi-step agent reasoning loops (ReAct), state management, and memory orchestration.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Defining function declarations with JSON schema', 'Agent error recovery and tool timeouts', 'Deterministic vs non-deterministic workflows', 'Active session memory vs persistent storage']
      },
      {
        name: 'Full-Stack Integration (TypeScript / Python)',
        category: 'core',
        importance: 'high',
        description: 'Connecting AI backends with modern frontend clients using streaming (SSE/WebSockets), typed APIs, and responsive UI states.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Streaming tokens via Server-Sent Events', 'Handling partial JSON rendering', 'Optimistic UI updates with AI responses']
      },
      {
        name: 'AI Evaluation & Guardrails',
        category: 'core',
        importance: 'high',
        description: 'Measuring groundedness, context precision, toxicity, and implementing defensive sanitization of user inputs and uploaded files.',
        expectedProficiency: 'Beginner',
        typicalInterviewTopics: ['RAG evaluation metrics (Faithfulness, Answer Relevance)', 'Prompt injection mitigation techniques', 'Input/output content moderation']
      }
    ],
    supportingSkills: [
      {
        name: 'Database Basics (SQL / NoSQL)',
        category: 'supporting',
        importance: 'high',
        description: 'Storing user conversation histories, documents, and application state.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Relational schema design', 'JSONB querying for chat histories']
      },
      {
        name: 'Web Security & Secret Hygiene',
        category: 'supporting',
        importance: 'high',
        description: 'Preventing client-side API key leakage, server proxying, rate limiting, and CORS configuration.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Server-side proxy routes for LLMs', 'Rate-limiting AI endpoints', 'Safe file upload parsing']
      }
    ],
    projects: [
      {
        id: 'aie-proj-1',
        title: 'Autonomous Multi-Tool Research & Analysis Agent',
        difficulty: 'Intermediate',
        summary: 'Build an agent system that takes natural language queries, dynamically invokes structured tools (calculator, document search, database lookup), and synthesizes grounded answers with citations.',
        keySkills: ['AI Agent Architecture & Tool Calling', 'LLM APIs & Prompt Engineering', 'Full-Stack Integration (TypeScript / Python)'],
        deliverables: ['Server-side tool execution pipeline', 'Streaming chat UI with tool execution badges', 'Fallback and error handling test suite'],
        portfolioValue: 'Demonstrates modern AI agent engineering far beyond a simple wrapper chatbot.'
      },
      {
        id: 'aie-proj-2',
        title: 'Enterprise Document RAG Assistant with Hybrid Search',
        difficulty: 'Intermediate',
        summary: 'Ingest PDF/Markdown documents, chunk texts intelligently, generate embeddings, and answer domain-specific questions with clickable source references.',
        keySkills: ['RAG & Vector Embeddings', 'LLM APIs & Prompt Engineering', 'AI Evaluation & Guardrails'],
        deliverables: ['Document processing and chunking script', 'Vector similarity retrieval pipeline', 'Evaluation report assessing hallucination rate'],
        portfolioValue: 'The most requested applied AI use case across modern tech startups and enterprises.'
      }
    ],
    learningTopics: [
      {
        weekRange: 'Module 1',
        topic: 'Foundation Models & Structured Prompt Engineering',
        estimatedHours: 12,
        subtopics: ['Modern LLM architectures & tokenization', 'System prompts and structured JSON outputs', 'Few-shot and Chain-of-Thought prompting', 'Defensive prompting against injection attacks']
      },
      {
        weekRange: 'Module 2',
        topic: 'Retrieval-Augmented Generation (RAG) Architecture',
        estimatedHours: 14,
        subtopics: ['Document extraction and chunking strategies', 'Vector embeddings & distance metrics', 'Integrating vector stores (pgvector/Chroma)', 'Evaluation of retrieval relevance and faithfulness']
      },
      {
        weekRange: 'Module 3',
        topic: 'AI Agent Architecture & Tool Use',
        estimatedHours: 14,
        subtopics: ['Function calling specifications and schemas', 'Agent decision loops (Plan, Act, Observe)', 'Handling multi-turn conversational memory', 'Error handling and human-in-the-loop patterns']
      },
      {
        weekRange: 'Module 4',
        topic: 'Production Deployment & Streaming UX',
        estimatedHours: 12,
        subtopics: ['Streaming tokens via Server-Sent Events', 'Server-side API key protection and proxying', 'Latency optimization and caching strategies', 'Packaging a complete full-stack portfolio app']
      }
    ],
    officialResources: [
      {
        id: 'res-aie-1',
        title: 'Google GenAI TypeScript SDK Documentation',
        url: 'https://github.com/google-gemini/deprecations',
        provider: 'Google AI Studio',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'LLM APIs & Prompt Engineering',
        description: 'Official reference for @google/genai SDK, structured JSON output schemas, and tool calling.'
      },
      {
        id: 'res-aie-2',
        title: 'Anthropic Prompt Engineering Interactive Guide',
        url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
        provider: 'Anthropic Research',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'LLM APIs & Prompt Engineering',
        description: 'Industry-acclaimed curriculum on prompt structure, chain of thought, and XML delimiter formatting.'
      },
      {
        id: 'res-aie-3',
        title: 'Pinecone Learning Center: Vector Embeddings & Similarity',
        url: 'https://www.pinecone.io/learn/vector-database/',
        provider: 'Pinecone Systems',
        type: 'Interactive Course',
        isFree: true,
        targetSkill: 'RAG & Vector Embeddings',
        description: 'Deep dive into dense embeddings, vector search indexes (HNSW), and retrieval metrics.'
      }
    ],
    prerequisites: [
      'Proficiency in JavaScript/TypeScript or Python.',
      'Understanding of client-server HTTP communication and JSON APIs.'
    ],
    limitationsAndRealityCheck: [
      'Building a basic API call is easy; the real value is in deterministic evaluation, error recovery, safety guardrails, and streaming UI performance.',
      'Companies hire for software engineering fundamentals combined with AI skills, not prompt engineering in isolation.'
    ]
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    category: 'Software Engineering',
    shortDescription: 'Designs, codes, tests, and maintains reliable software applications, systems, and backend services.',
    fullOverview: 'Software Developers write clean, modular, and performant code to solve algorithmic and business problems. Entry-level developers demonstrate mastery of data structures, algorithms, object-oriented or functional programming, version control, and writing automated unit and integration tests.',
    entryLevelResponsibilities: [
      'Implement features and bug fixes across core application codebases.',
      'Write comprehensive unit tests with mocking and automated CI runs.',
      'Collaborate on pull requests with code reviews and adherence to team style guides.',
      'Diagnose runtime errors, memory leaks, and performance bottlenecks using debuggers.',
      'Maintain documentation for internal APIs and system architectures.'
    ],
    coreSkills: [
      {
        name: 'Data Structures & Algorithms',
        category: 'core',
        importance: 'critical',
        description: 'Arrays, Hash Maps, Linked Lists, Trees, Graphs, Sorting, Binary Search, and Big-O time/space complexity analysis.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Two pointers / Sliding window', 'BFS & DFS graph traversals', 'Hash Map collision handling', 'Time & space complexity trade-offs']
      },
      {
        name: 'Core Programming (TypeScript / Python / Java)',
        category: 'core',
        importance: 'critical',
        description: 'Strong syntax, OOP, error handling, generics, memory management, and clean modular code design.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Interfaces vs Abstract classes', 'Immutability and side effects', 'Exception handling best practices', 'Concurrency basics']
      },
      {
        name: 'Git & Version Control Workflows',
        category: 'core',
        importance: 'critical',
        description: 'Branching, merging, rebasing, pull requests, resolving merge conflicts, and commit hygiene.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Rebase vs Merge', 'Interactive rebase and squashing', 'Resolving merge conflicts cleanly', 'Git stash and cherry-pick']
      },
      {
        name: 'Automated Testing (Unit & Integration)',
        category: 'core',
        importance: 'high',
        description: 'Writing unit tests with Jest, Pytest, or JUnit, including test-driven development (TDD) and mocking dependencies.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Mocking network calls and databases', 'Edge cases and boundary value testing', 'Code coverage interpretation']
      },
      {
        name: 'System Design Fundamentals',
        category: 'core',
        importance: 'high',
        description: 'Understanding client-server architectures, RESTful APIs, caching, database indexing, and scalability concepts.',
        expectedProficiency: 'Beginner',
        typicalInterviewTopics: ['HTTP methods and idempotent actions', 'Database indexing basics', 'Stateless vs stateful services']
      }
    ],
    supportingSkills: [
      {
        name: 'Relational Database Querying (SQL)',
        category: 'supporting',
        importance: 'high',
        description: 'Writing queries, creating schemas, and understanding foreign key relationships.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Primary vs foreign keys', 'Transactions and ACID properties']
      },
      {
        name: 'CI/CD Pipelines (GitHub Actions)',
        category: 'supporting',
        importance: 'medium',
        description: 'Configuring automated build and test workflows triggered on pull requests.',
        expectedProficiency: 'Beginner',
        typicalInterviewTopics: ['Workflow YAML syntax', 'Failing builds on test regression']
      }
    ],
    projects: [
      {
        id: 'swe-proj-1',
        title: 'Distributed Task Queue & Background Worker System',
        difficulty: 'Intermediate',
        summary: 'Build a concurrent job scheduler that enqueues background computational jobs, handles worker retries, logs failures, and exposes a REST status API.',
        keySkills: ['Core Programming (TypeScript / Python / Java)', 'Automated Testing (Unit & Integration)', 'System Design Fundamentals'],
        deliverables: ['Modular backend engine with concurrency support', 'Comprehensive unit test suite (>85% coverage)', 'Architecture diagram and performance benchmark documentation'],
        portfolioValue: 'Demonstrates deep systems understanding far beyond boilerplate CRUD apps.'
      },
      {
        id: 'swe-proj-2',
        title: 'Interactive CLI Developer Tool with Plugin Architecture',
        difficulty: 'Beginner',
        summary: 'Create a published terminal utility (e.g. code linter, repo analyzer, or scaffolding generator) with argument parsing, colored output, and config files.',
        keySkills: ['Core Programming (TypeScript / Python / Java)', 'Git & Version Control Workflows'],
        deliverables: ['Clean executable binary or npm/pip package', 'Automated GitHub Actions build/release pipeline', 'Helpful documentation and demo GIF'],
        portfolioValue: 'Shows developer tool craftsmanship and packaging proficiency.'
      }
    ],
    learningTopics: [
      {
        weekRange: 'Module 1',
        topic: 'Data Structures & Algorithmic Problem Solving',
        estimatedHours: 16,
        subtopics: ['Arrays, strings & hash maps patterns', 'Two pointers & sliding window techniques', 'Linked lists, stacks & queues', 'Binary search & recursion']
      },
      {
        weekRange: 'Module 2',
        topic: 'Trees, Graphs & Dynamic Programming',
        estimatedHours: 16,
        subtopics: ['Binary trees & BST operations', 'Breadth-First and Depth-First search', 'Greedy algorithms & sorting', 'Big-O time and space complexity analysis']
      },
      {
        weekRange: 'Module 3',
        topic: 'Object-Oriented Design & Clean Architecture',
        estimatedHours: 12,
        subtopics: ['SOLID design principles', 'Design patterns (Factory, Observer, Strategy)', 'Writing testable, decoupled code', 'Unit testing and mocking frameworks']
      },
      {
        weekRange: 'Module 4',
        topic: 'APIs, Databases & Production Systems',
        estimatedHours: 12,
        subtopics: ['RESTful API specifications', 'Database schemas & ACID guarantees', 'Git collaboration & code review etiquette', 'Building and packaging a capstone project']
      }
    ],
    officialResources: [
      {
        id: 'res-swe-1',
        title: 'MDN Web Docs: JavaScript / TypeScript Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
        provider: 'Mozilla Developer Network',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'Core Programming (TypeScript / Python / Java)',
        description: 'The golden standard reference for asynchronous programming, event loop, and modern standards.'
      },
      {
        id: 'res-swe-2',
        title: 'LeetCode Problem Archive',
        url: 'https://leetcode.com/problemset/',
        provider: 'LeetCode',
        type: 'Practice Platform',
        isFree: true,
        targetSkill: 'Data Structures & Algorithms',
        description: 'The primary coding interview preparation platform containing categorized algorithm challenges.'
      },
      {
        id: 'res-swe-3',
        title: 'Git Book: Official Pro Git by Scott Chacon',
        url: 'https://git-scm.com/book/en/v2',
        provider: 'Git SCM Project',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'Git & Version Control Workflows',
        description: 'Free comprehensive guide on Git internal mechanics, branching models, and collaboration.'
      }
    ],
    prerequisites: [
      'Basic familiarity with at least one programming language.',
      'Understanding of basic logic, loops, and conditional structures.'
    ],
    limitationsAndRealityCheck: [
      'Coding interviews universally evaluate data structures and algorithms (LeetCode style); portfolio projects get the interview, but coding rounds require deliberate DSA practice.',
      'Junior engineers spend significant time reading existing codebases and resolving dependencies rather than building greenfield systems.'
    ]
  },
  {
    id: 'fullstack-web-developer',
    title: 'Full-Stack Web Developer',
    category: 'Software Engineering',
    shortDescription: 'Builds end-to-end web applications, encompassing responsive frontends, server-side APIs, database schemas, and authentication flows.',
    fullOverview: 'Full-Stack Web Developers build complete web applications. On the frontend, they craft modern, accessible user interfaces using React/Next.js and Tailwind CSS. On the backend, they engineer RESTful or GraphQL APIs, manage databases (PostgreSQL/MongoDB), handle user authentication, and deploy to modern cloud platforms.',
    entryLevelResponsibilities: [
      'Build responsive, accessible user interfaces using modern React, TypeScript, and styling frameworks.',
      'Design RESTful API endpoints and implement server-side validation and business logic.',
      'Create and migrate relational database schemas and write optimized queries.',
      'Implement secure authentication and session management (JWT / OAuth / session cookies).',
      'Deploy applications to cloud platforms (Vercel, Render, Cloud Run) with environment configuration.'
    ],
    coreSkills: [
      {
        name: 'Modern React & TypeScript',
        category: 'core',
        importance: 'critical',
        description: 'Hooks (useState, useEffect, useMemo, useCallback), component composition, custom hooks, and strict TypeScript types.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['React re-rendering triggers and optimizations', 'Lifting state up vs Context API', 'Custom hooks for data fetching', 'TypeScript generics and unions']
      },
      {
        name: 'Backend API Development (Node.js / Express)',
        category: 'core',
        importance: 'critical',
        description: 'Middleware patterns, routing, error handling, CORS, request validation, and asynchronous handlers.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Express middleware lifecycle', 'Error handling middleware', 'CORS policies and preflight requests', 'Rate limiting and security headers']
      },
      {
        name: 'Relational Databases (PostgreSQL / SQL)',
        category: 'core',
        importance: 'critical',
        description: 'Schema design, normal forms, foreign keys, indexes, transactions, and ORM usage (Drizzle / Prisma).',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['1-to-many and many-to-many relationships', 'Database indexing trade-offs', 'N+1 query problem and prevention', 'ACID transactions']
      },
      {
        name: 'Authentication & Security Best Practices',
        category: 'core',
        importance: 'high',
        description: 'Password hashing (bcrypt), JWT tokens, HTTP-only cookies, OAuth 2.0 flows, and preventing XSS/CSRF.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Storing tokens: LocalStorage vs HTTP-only cookies', 'Password hashing salt rounds', 'Protecting against SQL injection and XSS', 'CSRF protection']
      },
      {
        name: 'Tailwind CSS & Responsive UI Design',
        category: 'core',
        importance: 'high',
        description: 'Mobile-first responsive layouts, Flexbox, CSS Grid, accessible color contrast, and micro-interactions.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Mobile-first breakpoint strategy', 'Flexbox vs Grid use cases', 'Accessibility (ARIA labels, keyboard navigation)']
      }
    ],
    supportingSkills: [
      {
        name: 'Git & GitHub Workflows',
        category: 'supporting',
        importance: 'high',
        description: 'Pull request reviews, semantic commits, and branch management.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Feature branches and pull requests', 'Merge conflict resolution']
      },
      {
        name: 'Deployment & DevOps Basics',
        category: 'supporting',
        importance: 'medium',
        description: 'Environment variables management, Docker basics, and platform deployments.',
        expectedProficiency: 'Beginner',
        typicalInterviewTopics: ['Deploying to cloud runtimes', 'Configuring environment secrets']
      }
    ],
    projects: [
      {
        id: 'fs-proj-1',
        title: 'Full-Stack Collaborative Workspace with Real-Time Updates',
        difficulty: 'Intermediate',
        summary: 'Develop a team kanban/notes app featuring user registration, JWT auth in HTTP-only cookies, PostgreSQL schema with relationships, and optimistic UI updates.',
        keySkills: ['Modern React & TypeScript', 'Backend API Development (Node.js / Express)', 'Relational Databases (PostgreSQL / SQL)', 'Authentication & Security Best Practices'],
        deliverables: ['Live deployed web application', 'Well-structured GitHub repository with separate client/server modules', 'Database migration scripts and seed data'],
        portfolioValue: 'Complete proof that the candidate can architect and ship full-stack web products independently.'
      },
      {
        id: 'fs-proj-2',
        title: 'E-Commerce Storefront with Shopping Cart & Checkout API',
        difficulty: 'Intermediate',
        summary: 'Build a responsive store with catalog search, filtering, persistent cart state, order calculation backend, and webhook simulation.',
        keySkills: ['Modern React & TypeScript', 'Tailwind CSS & Responsive UI Design', 'Backend API Development (Node.js / Express)'],
        deliverables: ['Responsive mobile-friendly storefront', 'Validated REST API endpoints with status codes', 'Integration tests for checkout calculation logic'],
        portfolioValue: 'Demonstrates real-world e-commerce features standard in commercial agencies and startups.'
      }
    ],
    learningTopics: [
      {
        weekRange: 'Module 1',
        topic: 'Frontend Foundations: React & TypeScript',
        estimatedHours: 14,
        subtopics: ['Modern React components & hooks (useState, useEffect)', 'TypeScript interfaces, types, and generic props', 'Tailwind CSS utility classes & mobile-first layouts', 'Client-side routing and state management']
      },
      {
        weekRange: 'Module 2',
        topic: 'Backend Engineering: Express & REST APIs',
        estimatedHours: 14,
        subtopics: ['Node.js runtime & Express app structure', 'Routing, middleware, and request validation', 'REST conventions and HTTP status codes', 'Error handling patterns and asynchronous flows']
      },
      {
        weekRange: 'Module 3',
        topic: 'Databases & Authentication Architecture',
        estimatedHours: 14,
        subtopics: ['PostgreSQL schema design and relations', 'Connecting via node-postgres or Drizzle ORM', 'Password hashing and JWT generation', 'Securing routes and storing auth tokens']
      },
      {
        weekRange: 'Module 4',
        topic: 'Deployment, Polish & Full-Stack Capstone',
        estimatedHours: 12,
        subtopics: ['Connecting client and server with CORS handling', 'Environment variable security', 'Testing API endpoints and UI interactions', 'Deploying to cloud and writing portfolio documentation']
      }
    ],
    officialResources: [
      {
        id: 'res-fs-1',
        title: 'React Official Documentation (react.dev)',
        url: 'https://react.dev/learn',
        provider: 'Meta Open Source',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'Modern React & TypeScript',
        description: 'Modern, comprehensive guide on React components, hooks, state management, and rendering behavior.'
      },
      {
        id: 'res-fs-2',
        title: 'Tailwind CSS Documentation',
        url: 'https://tailwindcss.com/docs',
        provider: 'Tailwind Labs',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'Tailwind CSS & Responsive UI Design',
        description: 'Comprehensive utility class references and design layout tutorials.'
      },
      {
        id: 'res-fs-3',
        title: 'Express.js Official Guides',
        url: 'https://expressjs.com/en/guide/routing.html',
        provider: 'OpenJS Foundation',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'Backend API Development (Node.js / Express)',
        description: 'Core documentation covering routing, middleware chains, error handling, and security.'
      }
    ],
    prerequisites: [
      'Basic HTML, CSS, and JavaScript syntax.',
      'Understanding of how websites and web browsers function.'
    ],
    limitationsAndRealityCheck: [
      'Deploying a live URL for your projects is practically mandatory for full-stack candidate portfolios.',
      'Interviewers care heavily about clean component hierarchy and avoiding state synchronization bugs.'
    ]
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    category: 'Business & Management',
    shortDescription: 'Analyzes business processes, elicits stakeholder requirements, models workflows, and translates business goals into technical specifications.',
    fullOverview: 'Business Analysts act as the vital bridge between corporate business units and technical engineering teams. They document requirements, model operational workflows (BPMN), analyze functional and financial feasibility, build financial models in Excel, and track project milestones.',
    entryLevelResponsibilities: [
      'Conduct stakeholder interviews and document business requirements documents (BRD) and functional specs (FRD).',
      'Create user stories with clear acceptance criteria (Given-When-Then format).',
      'Map current-state (As-Is) and future-state (To-Be) business processes using flowcharts and BPMN.',
      'Perform quantitative analysis on operational metrics using Excel spreadsheets.',
      'Coordinate User Acceptance Testing (UAT) and log defect reports.'
    ],
    coreSkills: [
      {
        name: 'Requirements Elicitation & Documentation',
        category: 'core',
        importance: 'critical',
        description: 'Writing clear User Stories, Acceptance Criteria, BRDs, PRDs, and traceability matrices.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Ambiguous requirement handling', 'Given-When-Then acceptance criteria', 'BRD vs FRD differences', 'Prioritization frameworks (MoSCoW)']
      },
      {
        name: 'Process Modeling & Flowcharts (BPMN / Visio)',
        category: 'core',
        importance: 'critical',
        description: 'Mapping As-Is vs To-Be business workflows, swimlane diagrams, and bottleneck identification.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Swimlane diagram components', 'Identifying process bottlenecks and waste', 'BPMN gateways and events']
      },
      {
        name: 'Advanced Excel & Business Modeling',
        category: 'core',
        importance: 'critical',
        description: 'Financial formulas, sensitivity analysis, Pivot tables, VLOOKUP/XLOOKUP, and business ROI models.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['ROI and payback period modeling', 'Data tables and Goal Seek', 'Scenario manager for forecasts']
      },
      {
        name: 'Agile & Scrum Methodologies',
        category: 'core',
        importance: 'high',
        description: 'Sprint planning, backlog grooming, backlog estimation (story points), and retrospective facilitation.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Role of BA in Scrum sprint ceremonies', 'Story pointing estimation techniques', 'Definition of Ready vs Done']
      },
      {
        name: 'Basic SQL for Business Validation',
        category: 'core',
        importance: 'high',
        description: 'Writing queries to validate assumptions and audit business data without relying on developers.',
        expectedProficiency: 'Beginner',
        typicalInterviewTopics: ['SELECT, WHERE, JOIN queries to verify reports', 'Validating data integrity in staging']
      }
    ],
    supportingSkills: [
      {
        name: 'Stakeholder Management & Negotiation',
        category: 'supporting',
        importance: 'high',
        description: 'Handling competing priorities between executives and engineering teams diplomatically.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Resolving stakeholder conflicts', 'Managing scope creep during mid-sprint']
      },
      {
        name: 'BI Reporting Basics (Power BI / Tableau)',
        category: 'supporting',
        importance: 'medium',
        description: 'Interpreting and modifying executive KPI dashboards.',
        expectedProficiency: 'Beginner',
        typicalInterviewTopics: ['Interpreting conversion and churn dashboards']
      }
    ],
    projects: [
      {
        id: 'ba-proj-1',
        title: 'Comprehensive Digital Onboarding Transformation Case Study',
        difficulty: 'Beginner',
        summary: 'Map the customer onboarding process for a banking app. Document the As-Is swimlane workflow, identify drop-off bottlenecks, create the To-Be process diagram, and write 10 prioritized user stories with acceptance criteria.',
        keySkills: ['Requirements Elicitation & Documentation', 'Process Modeling & Flowcharts (BPMN / Visio)', 'Agile & Scrum Methodologies'],
        deliverables: ['As-Is and To-Be BPMN process diagrams', '10 fully specified Jira-style user stories', 'Cost-benefit and operational ROI spreadsheet'],
        portfolioValue: 'Exemplifies exact day-to-day deliverables produced by corporate business analysts.'
      },
      {
        id: 'ba-proj-2',
        title: 'User Acceptance Testing (UAT) Plan & Defect Audit',
        difficulty: 'Beginner',
        summary: 'Draft a full UAT test strategy for an e-commerce refund portal, including test scenarios, pass/fail thresholds, and stakeholder sign-off templates.',
        keySkills: ['Requirements Elicitation & Documentation', 'Agile & Scrum Methodologies'],
        deliverables: ['UAT Test Matrix spreadsheet with 25 test cases', 'Defect logging and severity ranking protocol', 'Executive sign-off summary report'],
        portfolioValue: 'Shows end-to-end familiarity with enterprise software delivery lifecycles.'
      }
    ],
    learningTopics: [
      {
        weekRange: 'Module 1',
        topic: 'Business Analysis Foundations & Elicitation',
        estimatedHours: 12,
        subtopics: ['BABOK guide core knowledge areas', 'Stakeholder interview techniques & workshop facilitation', 'Writing Business Requirements Documents (BRD)', 'MoSCoW requirement prioritization']
      },
      {
        weekRange: 'Module 2',
        topic: 'Process Modeling & Workflow Optimization',
        estimatedHours: 12,
        subtopics: ['BPMN standard shapes and rules', 'Designing As-Is vs To-Be swimlane diagrams', 'Root cause analysis (5 Whys, Fishbone diagrams)', 'Identifying process waste and friction points']
      },
      {
        weekRange: 'Module 3',
        topic: 'Agile Delivery & Scrum User Stories',
        estimatedHours: 12,
        subtopics: ['User story writing with Given-When-Then criteria', 'Backlog refinement and grooming techniques', 'Definition of Ready (DoR) and Done (DoD)', 'Jira/Confluence workflow management']
      },
      {
        weekRange: 'Module 4',
        topic: 'Quantitative Analysis & UAT Execution',
        estimatedHours: 12,
        subtopics: ['Cost-benefit analysis in Excel', 'Basic SQL queries for requirement verification', 'Writing UAT test plans and managing defect triage', 'Synthesizing capstone documentation']
      }
    ],
    officialResources: [
      {
        id: 'res-ba-1',
        title: 'IIBA (International Institute of Business Analysis) Core Standard',
        url: 'https://www.iiba.org/standards-and-resources/babok/',
        provider: 'IIBA',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'Requirements Elicitation & Documentation',
        description: 'The global standard framework for business analysis body of knowledge (BABOK).'
      },
      {
        id: 'res-ba-2',
        title: 'Scrum Guide: The Definitive Guide to Scrum',
        url: 'https://scrumguides.org/scrum-guide.html',
        provider: 'Ken Schwaber & Jeff Sutherland',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'Agile & Scrum Methodologies',
        description: 'The official 13-page standard defining Scrum roles, events, and artifacts.'
      },
      {
        id: 'res-ba-3',
        title: 'BPMN.org: Business Process Model and Notation Specification',
        url: 'https://www.bpmn.org/',
        provider: 'Object Management Group (OMG)',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'Process Modeling & Flowcharts (BPMN / Visio)',
        description: 'Standard guidelines on correct diagramming syntax for business processes.'
      }
    ],
    prerequisites: [
      'Strong verbal and written English communication.',
      'Organized structured thinking and attention to detail.'
    ],
    limitationsAndRealityCheck: [
      'This role is heavily focused on interpersonal coordination, requirements discovery, and documentation rather than writing production code.',
      'Demonstrating realistic case studies (BRDs, process maps, user stories) is the primary way students land entry-level roles.'
    ]
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Security & Infrastructure',
    shortDescription: 'Monitors, detects, investigates, and responds to security threats, network vulnerabilities, and incident response events.',
    fullOverview: 'Cybersecurity Analysts (often working in a Security Operations Center, or SOC) protect organizations from digital attacks. They analyze network traffic logs, configure security monitoring tools (SIEM), investigate security alerts, perform vulnerability scans, and implement defensive security hardening.',
    entryLevelResponsibilities: [
      'Triage and investigate alerts in a SIEM platform (Splunk, Elastic, Microsoft Sentinel).',
      'Analyze network packet captures (PCAP) with Wireshark to detect malicious traffic.',
      'Perform vulnerability assessments using tools like Nessus or OpenVAS.',
      'Follow incident response playbooks to contain malware and phishing attacks.',
      'Review firewall, endpoint, and server authentication logs for anomalies.'
    ],
    coreSkills: [
      {
        name: 'Networking & Protocols (TCP/IP, DNS, HTTP)',
        category: 'core',
        importance: 'critical',
        description: 'OSI model, packet structure, subnetting, TCP handshake, DNS resolution, and TLS encryption mechanics.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['TCP 3-way handshake sequence', 'DNS poisoning and resolution flow', 'Difference between TCP and UDP', 'Common attack ports (22, 53, 80, 443, 3389)']
      },
      {
        name: 'SIEM & Log Analysis (Splunk / Elastic)',
        category: 'core',
        importance: 'critical',
        description: 'Searching logs, creating correlation queries, triaging false positives, and identifying indicators of compromise (IOCs).',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Splunk Search Processing Language (SPL) basics', 'Parsing Windows Event IDs (4624, 4625, 4688)', 'Investigating abnormal egress traffic']
      },
      {
        name: 'Linux Administration & Command Line',
        category: 'core',
        importance: 'critical',
        description: 'File permissions, inspecting /var/log, netstat/ss, process trees, and bash scripting for automation.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Investigating suspicious running processes', 'File permissions (SUID/SGID)', 'Inspecting authentication logs (/var/log/auth.log)']
      },
      {
        name: 'Threats, Vulnerabilities & MITRE ATT&CK',
        category: 'core',
        importance: 'high',
        description: 'Understanding attack vectors, OWASP Top 10, malware persistence methods, and the MITRE ATT&CK matrix.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['MITRE ATT&CK tactics vs techniques', 'SQL injection & Cross-Site Scripting mechanics', 'Phishing email header analysis']
      },
      {
        name: 'Packet Analysis with Wireshark',
        category: 'core',
        importance: 'high',
        description: 'Capturing, filtering, and inspecting network packets to isolate suspicious command-and-control (C2) activity.',
        expectedProficiency: 'Intermediate',
        typicalInterviewTopics: ['Wireshark display filters', 'Extracting payloads from unencrypted streams', 'Detecting ARP spoofing or port scans']
      }
    ],
    supportingSkills: [
      {
        name: 'Security Scripting (Python / Bash)',
        category: 'supporting',
        importance: 'high',
        description: 'Automating log searches, hash lookups, and API queries against VirusTotal.',
        expectedProficiency: 'Beginner',
        typicalInterviewTopics: ['Writing a Python script to query VirusTotal API', 'Parsing IP addresses with regex']
      },
      {
        name: 'Incident Response Frameworks (NIST / SANS)',
        category: 'supporting',
        importance: 'medium',
        description: 'Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned.',
        expectedProficiency: 'Beginner',
        typicalInterviewTopics: ['6 steps of NIST incident response', 'Chain of custody in digital forensics']
      }
    ],
    projects: [
      {
        id: 'sec-proj-1',
        title: 'Home SOC Lab with Elastic/Splunk & Suricata IDS',
        difficulty: 'Intermediate',
        summary: 'Set up a local virtualized Security Operations Center lab using VirtualBox/Docker. Ingest Sysmon Windows logs and Suricata network alerts into a SIEM dashboard, simulate a simulated attack, and document your investigation.',
        keySkills: ['Networking & Protocols (TCP/IP, DNS, HTTP)', 'SIEM & Log Analysis (Splunk / Elastic)', 'Linux Administration & Command Line'],
        deliverables: ['Lab topology network diagram', 'Screenshots of SIEM queries isolating the simulated intrusion', 'Incident Response Investigation Report with IOC table'],
        portfolioValue: 'The gold-standard portfolio project for aspiring SOC analysts demonstrating genuine operational tooling.'
      },
      {
        id: 'sec-proj-2',
        title: 'Phishing Email Header & Malicious Document Forensics',
        difficulty: 'Beginner',
        summary: 'Dissect real-world phishing samples in a safe sandbox. Analyze email headers (SPF, DKIM, DMARC), extract embedded macros/URLs, calculate SHA-256 hashes, and write an analyst threat report.',
        keySkills: ['Threats, Vulnerabilities & MITRE ATT&CK', 'Incident Response Frameworks (NIST / SANS)'],
        deliverables: ['Detailed Threat Intelligence Report', 'Header dissection breakdown (hop-by-hop)', 'Recommended firewall and email gateway rules'],
        portfolioValue: 'Proves practical defensive security acumen needed immediately on day one in a junior role.'
      }
    ],
    learningTopics: [
      {
        weekRange: 'Module 1',
        topic: 'Network Fundamentals & Traffic Inspection',
        estimatedHours: 14,
        subtopics: ['OSI model layers & TCP/IP protocols', 'Packet analysis with Wireshark & display filters', 'Subnetting, routing & firewall rules', 'DNS, DHCP, ARP and TLS fundamentals']
      },
      {
        weekRange: 'Module 2',
        topic: 'Operating System Security & Log Auditing',
        estimatedHours: 14,
        subtopics: ['Linux security commands & /var/log inspection', 'Windows Event IDs & Sysmon configuration', 'User privileges, permissions & sudo controls', 'Process monitoring and persistence checks']
      },
      {
        weekRange: 'Module 3',
        topic: 'Threat Intelligence, MITRE ATT&CK & SIEM',
        estimatedHours: 14,
        subtopics: ['MITRE ATT&CK framework navigation', 'OWASP Top 10 web vulnerabilities', 'Splunk / Elastic SIEM query language (SPL/KQL)', 'Correlation rules & alert triage methodology']
      },
      {
        weekRange: 'Module 4',
        topic: 'Incident Response & Capstone SOC Investigation',
        estimatedHours: 12,
        subtopics: ['NIST / SANS incident response lifecycle', 'Phishing analysis and artifact extraction', 'Drafting an incident report & IOC table', 'Security interview preparation and certifications (Security+)']
      }
    ],
    officialResources: [
      {
        id: 'res-sec-1',
        title: 'NIST Computer Security Incident Handling Guide (SP 800-61)',
        url: 'https://csrc.nist.gov/pubs/sp/800/61/r2/final',
        provider: 'NIST (National Institute of Standards and Technology)',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'Incident Response Frameworks (NIST / SANS)',
        description: 'The definitive government and industry standard for handling security incidents.'
      },
      {
        id: 'res-sec-2',
        title: 'MITRE ATT&CK Framework Knowledge Base',
        url: 'https://attack.mitre.org/',
        provider: 'MITRE Corporation',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'Threats, Vulnerabilities & MITRE ATT&CK',
        description: 'Globally accessible knowledge base of adversary tactics and techniques based on real-world observations.'
      },
      {
        id: 'res-sec-3',
        title: 'Wireshark User Guide & Packet Capture Samples',
        url: 'https://www.wireshark.org/docs/',
        provider: 'Wireshark Foundation',
        type: 'Official Documentation',
        isFree: true,
        targetSkill: 'Packet Analysis with Wireshark',
        description: 'Official manual on packet sniffing, filters, protocol dissectors, and network diagnostics.'
      }
    ],
    prerequisites: [
      'Basic comfort with operating systems and networking concepts.',
      'Commitment to ethical security practices and defensive mindset.'
    ],
    limitationsAndRealityCheck: [
      'Entry-level cybersecurity jobs are defensive (Blue Team / SOC Analyst), not offensive pen-testing or ethical hacking.',
      'Industry certifications like CompTIA Security+ paired with a documented home lab portfolio carry significant weight in HR screenings.'
    ]
  }
];
