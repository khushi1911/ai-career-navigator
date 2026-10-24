# AI Career Navigator

An AI-assisted career guidance application for students. It combines a structured career knowledge base, deterministic skill-gap analysis, personalized study roadmaps, a conversational advisor, and a resume review workflow.

## Features

- Career Explorer covering eight entry-level technology roles.
- Student profile and three evaluation presets.
- Skill-gap analysis that distinguishes demonstrated, partially developed, and not-yet-reported skills.
- Weekly learning roadmaps designed around the student's study-hour budget.
- Gemini-powered career chat with a knowledge-base fallback.
- Resume review for pasted text, TXT/CSV, and PDF when Gemini is configured.
- Resource Finder and progress dashboard.

## Tech stack

- React + TypeScript + Vite
- Node.js + Express + TypeScript (`tsx` for the server start script)
- Google GenAI SDK (`@google/genai`)
- Tailwind CSS and Lucide icons

## Run locally

Requirements: a supported current Node.js LTS release and npm.

1. Extract the project and open a terminal in the project root.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a local environment file by copying `.env.example` to `.env`. On Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

4. Put your own Gemini API key in `.env` if you want model-assisted chat and resume analysis. Do not commit `.env`. Without a key, career chat uses the knowledge-base fallback and text resume analysis uses a basic heuristic reviewer. PDF analysis requires a configured key.
5. Start the app:

   ```bash
   npm run dev
   ```

6. Open `http://localhost:3000`.

## Verification

Run the deterministic logic checks:

```bash
npm run test:logic
```

Run the TypeScript check:

```bash
npm run lint
```

Build the frontend bundle:

```bash
npm run build
```

## Deploy to Render

Create a **Web Service** from the GitHub repository, or use the included `render.yaml` Blueprint. The Blueprint configures the following settings:

- Runtime: Node
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Environment: `NODE_ENV=production`
- Secret environment variable: `GEMINI_API_KEY` set in Render's dashboard (never in source code)

Render supplies `PORT`; the Express server listens on it. Keep the repository private while preparing the deployment if preferred; Render can deploy private repositories when authorized.

## Privacy and safety notes

- Student profile data is saved in the browser's local storage on that device. It is not a user-account or cloud-sync system.
- Chat messages are sent to the configured backend. When Gemini is configured, prompts and relevant profile/context data are sent to Google's Gemini API for generation.
- Resume text or PDF content may be sent to Gemini for analysis. Avoid uploading unnecessary sensitive personal information. The model is instructed to treat resume content as untrusted data, but this is not a guarantee that every embedded instruction will be neutralized.
- The built-in rate limiter is in-memory and applies per server process. For multiple production instances, replace it with a shared store-backed rate limiter.
- Career recommendations are educational guidance, not guarantees of employment, admission, or salary.

## Project structure

```text
server.ts
src/
  App.tsx
  components/
  data/
  services/
  types/
scripts/verify-logic.ts
```
