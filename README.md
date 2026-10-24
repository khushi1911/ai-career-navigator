# AI Career Navigator

An AI-powered career guidance application that helps students understand their skills, explore career opportunities, identify skill gaps, and build personalized learning roadmaps.

AI Career Navigator combines an interactive career assistant with structured career knowledge to provide practical, goal-oriented guidance based on a student's profile, current skills, target role, and available study time.

## Features

### 🤖 AI Career Assistant

* Interactive chat for career-related questions and guidance.
* Context-aware responses based on the student's profile and career goals.
* Career knowledge retrieval to support more relevant recommendations.
* Fallback handling for temporary AI service issues.

### 🎯 Personalized Career Guidance

* Explore career options based on individual interests, skills, and goals.
* Access career information and role-specific guidance.
* Work with a predefined knowledge base covering eight career roles.

### 📊 Skill Gap Analysis

* Compare existing skills against the requirements of a target career.
* Identify demonstrated, partially developed, and unreported skills.
* Highlight priority learning areas.
* Review skill-match information to understand where further development may be useful.

### 🗺️ Personalized Learning Roadmap

* Generate a structured learning plan based on career goals.
* Organize learning activities into weekly milestones.
* Consider available study hours and target timelines.
* Track task completion and monitor learning progress.

### 📄 Resume Analysis

* Analyze supported resume files, including PDF and text-based input.
* Use extracted information to support career and skill-related guidance.

### 🧪 Evaluation and Testing

* Includes predefined test profiles for evaluating different student scenarios.
* Supports testing career recommendations, skill-gap analysis, and personalized guidance.

## Technology Stack

| Layer           | Technologies                 |
| --------------- | ---------------------------- |
| Frontend        | React, TypeScript, Vite      |
| UI Components   | Lucide React                 |
| Backend         | Node.js, Express, TypeScript |
| AI Integration  | Google Gemini API            |
| Build Tool      | Vite                         |
| Deployment      | Render                       |
| Version Control | Git and GitHub               |

## Application Architecture

The application uses a frontend-backend architecture.

1. **Frontend:** Provides the user interface for profile management, career exploration, AI conversations, skill-gap analysis, and learning roadmaps.
2. **Backend:** Handles API requests and coordinates communication with the AI service.
3. **AI Layer:** Uses the Google Gemini API to support conversational career guidance and related features.
4. **Career Knowledge Base:** Provides structured career information to support role-specific guidance.
5. **Fallback Handling:** Helps the application respond more gracefully when the primary AI request encounters an issue.

## Getting Started

### Prerequisites

Install the following before running the project locally:

* Node.js and npm
* Git
* A Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/khushi1911/ai-career-navigator.git
```

Navigate to the project directory:

```bash
cd ai-career-navigator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root directory, following the configuration expected by the backend.

Add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Replace `your_gemini_api_key` with your own API key.

**Security:** Keep your API key private. Do not commit your `.env` file or expose secret keys in frontend code or public repositories.

### 4. Run the Application Locally

Start the development server using:

```bash
npm run dev
```

Use the local URL displayed in the terminal to open the application.

### 5. Build the Application

To verify that the application can be built for production, run:

```bash
npm run build
```

To start the application using its configured production command:

```bash
npm start
```

## Deployment

The application is deployed using Render.

The deployment configuration uses the following settings:

| Setting              | Value                          |
| -------------------- | ------------------------------ |
| Build Command        | `npm install && npm run build` |
| Start Command        | `npm start`                    |
| Deployment Branch    | `main`                         |
| Environment Variable | `GEMINI_API_KEY`               |

Add the required environment variables through the Render dashboard rather than committing secrets to the repository.

When automatic deployment is enabled, changes pushed to the configured GitHub branch can trigger a new deployment.

## Project Goals

AI Career Navigator aims to make career planning more structured and accessible by combining AI-powered assistance with practical learning guidance.

The application focuses on helping students:

* Understand their current skills.
* Explore suitable career paths.
* Identify areas that need improvement.
* Organize learning into manageable milestones.
* Make informed decisions about their career development.

## Future Enhancements

Potential areas for further development include:

* More career paths and detailed skill requirements.
* Improved resume parsing and skill extraction.
* Additional learning resources and project recommendations.
* Enhanced learning progress analytics.
* More comprehensive testing across different student profiles.

## License

No license is specified here. Add a license to the repository if you intend to distribute the project under specific open-source terms.
