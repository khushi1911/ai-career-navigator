# Final Review Changes

## Security and request handling
- Replaced raw HTML injection in chat messages with safe React-node Markdown formatting.
- Added baseline security response headers and request rate limits for chat and resume-analysis endpoints.
- Added request validation and clearer error responses for chat, profile, roadmap, and resume requests.
- Bounded resume text and PDF upload sizes and restricted uploaded file types in the frontend.
- Corrected the resume privacy notice to accurately explain Gemini processing and the limits of prompt-injection defenses.

## Accuracy and agent behavior
- Removed fabricated fallback resume projects, education, certifications, and unsupported outcome metrics.
- Made the text-only fallback explicitly heuristic and evidence-based; PDF analysis requires Gemini when text extraction is unavailable.
- Added explicit reported-skill detection to chat profile updates.
- Corrected roadmap hour allocation so weekly tasks do not exceed the available study budget, including the two-hour boundary case.

## Deployment and documentation
- Renamed the package to `ai-career-navigator` and set the server runtime dependency correctly.
- Added Node.js engine requirements, `.node-version`, `render.yaml`, local setup instructions, environment-variable guidance, and privacy notes.
- Added `npm run test:logic` and an extra low-budget roadmap test.

## Verification performed
- TypeScript/TSX syntax transpilation: 20 files checked, no syntax errors.
- Logic verification: all four checks passed, including the two-hours-per-week boundary test.
- A full dependency installation, production build, and TypeScript type-check could not be completed in the preparation environment because package installation timed out. Run `npm install`, `npm run lint`, and `npm run build` locally before final deployment.
