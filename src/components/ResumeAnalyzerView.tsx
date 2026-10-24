import React, { useState } from 'react';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Loader2,
  FileCheck,
  FileCode,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { StudentProfile, ResumeAnalysisResult } from '../types';
import { CAREER_KNOWLEDGE_BASE } from '../data/careerKnowledgeBase';

interface ResumeAnalyzerViewProps {
  profile: StudentProfile;
  activeRoleId: string;
  onSelectRole: (roleId: string) => void;
}

const SAMPLE_STUDENT_RESUME = `
ALEX MORGAN
Email: alex.morgan@example.edu | Phone: (555) 019-2834
LinkedIn: linkedin.com/in/alexmorgan | GitHub: github.com/alexmorgan

EDUCATION
State University — Bachelor of Science in Information Systems (Expected May 2026)
GPA: 3.65 / 4.00
Relevant Coursework: Database Management Systems, Business Statistics, Introduction to Python, Systems Analysis & Design.

TECHNICAL SKILLS
Languages: SQL, Python (Pandas, basic scripting), Excel (VLOOKUP, Pivot Tables), HTML/CSS
Tools: Git, GitHub, Microsoft Office Suite, Google Workspace

PROJECTS
Financial Budgeting & Expense Tracking Model
- Built an Excel workbook to track student monthly spending across 6 categories.
- Used pivot tables and nested IF formulas to calculate average monthly savings.
- Generated charts to display expense trends over time.

Coursework Database Query Project
- Wrote basic SQL queries using SELECT, WHERE, and INNER JOIN on a mock university enrollment database.
- Retrieved course rosters and calculated departmental GPA averages.
- Documented entity relationship diagrams (ERD) for the course database.

CAMPUS LEADERSHIP
Vice President, University Business Technology Club
- Organized weekly meetings and invited 3 guest speakers from local IT companies.
- Managed club social media updates and increased meeting attendance by 20%.
`;

export const ResumeAnalyzerView: React.FC<ResumeAnalyzerViewProps> = ({
  profile,
  activeRoleId,
  onSelectRole
}) => {
  const [resumeText, setResumeText] = useState(SAMPLE_STUDENT_RESUME);
  const [targetRoleId, setTargetRoleId] = useState(activeRoleId);
  const [fileName, setFileName] = useState('Alex_Morgan_Resume.txt');
  const [fileBase64, setFileBase64] = useState<string>('');
  const [mimeType, setMimeType] = useState<string>('text/plain');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const targetRole = CAREER_KNOWLEDGE_BASE.find(c => c.id === targetRoleId) || CAREER_KNOWLEDGE_BASE[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorNotice(null);
    setAnalysisResult(null);
    const allowedTypes = ['application/pdf', 'text/plain', 'text/csv'];
    const extension = file.name.split('.').pop()?.toLowerCase();
    const isAllowed = allowedTypes.includes(file.type) || ['pdf', 'txt', 'csv'].includes(extension || '');
    if (!isAllowed) {
      setErrorNotice('Please upload a PDF, TXT, or CSV file.');
      e.target.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorNotice('Please choose a file smaller than 5 MB.');
      e.target.value = '';
      return;
    }

    setFileName(file.name);
    setFileBase64('');
    const detectedMime = allowedTypes.includes(file.type) ? file.type : (extension === 'pdf' ? 'application/pdf' : extension === 'csv' ? 'text/csv' : 'text/plain');
    setMimeType(detectedMime);

    if (detectedMime === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1] || result;
        setFileBase64(base64);
        setResumeText('');
      };
      reader.onerror = () => setErrorNotice('Could not read this PDF. Please try another file.');
      reader.readAsDataURL(file);
    } else {
      // Plain text or CSV
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        setResumeText(text);
        setFileBase64('');
      };
      reader.onerror = () => setErrorNotice('Could not read this file. Please try another file.');
      reader.readAsText(file);
    }
  };

  const handleRunAnalysis = async () => {
    if (!resumeText.trim() && !fileBase64) return;
    setIsAnalyzing(true);
    setErrorNotice(null);

    try {
      const res = await fetch('/api/agent/resume-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          fileBase64,
          mimeType,
          fileName,
          targetRoleId,
          profile
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${res.status}`);
      }

      const data = await res.json();
      setAnalysisResult(data);
    } catch (err: any) {
      console.error('Resume analysis failed:', err);
      setErrorNotice(err.message || 'Failed to analyze resume. Please check server connectivity.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>AI Resume & Project Reviewer</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Resume & Skill Alignment Analysis
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Upload or paste your student resume to evaluate clarity, extract verified skills, and receive actionable bullet-point transformations without fabricated qualifications.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs font-semibold text-slate-700">Target Role:</label>
          <select
            value={targetRoleId}
            onChange={(e) => {
              setTargetRoleId(e.target.value);
              onSelectRole(e.target.value);
            }}
            className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
          >
            {CAREER_KNOWLEDGE_BASE.map(career => (
              <option key={career.id} value={career.id}>
                {career.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Untrusted Data & Security Notice */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start space-x-2.5">
        <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800 font-semibold">Resume privacy & safe use:</strong>{' '}
          Resume text or PDF content may be sent to the configured Gemini API for analysis. Avoid uploading information you do not need reviewed. The agent is instructed to treat document content as untrusted data, but automated checks cannot guarantee that every embedded instruction will be neutralized.
        </div>
      </div>

      {/* Input Section: Upload or Paste */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
          <div className="flex items-center space-x-2">
            <label className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer flex items-center space-x-1.5 transition-colors">
              <Upload className="w-3.5 h-3.5 text-indigo-600" />
              <span>Upload PDF / TXT / CSV</span>
              <input
                type="file"
                accept=".pdf,.txt,.csv,application/pdf,text/plain,text/csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <span className="text-xs text-slate-500 truncate">{fileName}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setResumeText(SAMPLE_STUDENT_RESUME);
              setFileBase64('');
              setFileName('Alex_Morgan_Resume.txt');
              setMimeType('text/plain');
            }}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Reset to Demo Resume
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Resume Content / Extracted Text
          </label>
          <textarea
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
            rows={8}
            placeholder="Paste raw resume text here, or upload a PDF/TXT document..."
            className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-[11px] text-slate-400">
            Evaluating against: <strong className="text-slate-700">{targetRole.title}</strong> benchmarks
          </div>
          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing || (!resumeText.trim() && !fileBase64)}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold shadow-xs flex items-center space-x-2 transition-all"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing Document...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run Resume Analysis</span>
              </>
            )}
          </button>
        </div>
      </div>

      {errorNotice && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorNotice}</span>
        </div>
      )}

      {/* Analysis Results Display */}
      {analysisResult && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* 2 Score Badges: Clarity & Role Alignment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500">Resume Clarity & Structure</span>
                <div className="text-3xl font-extrabold text-slate-900 mt-1">
                  {analysisResult.overallClarityScore} / 100
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Formatting, readability & brevity</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                {analysisResult.overallClarityScore >= 75 ? 'Strong' : 'Adequate'}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500">
                  Alignment with {analysisResult.roleEvaluatedAgainst}
                </span>
                <div className="text-3xl font-extrabold text-indigo-600 mt-1">
                  {analysisResult.roleAlignmentScore} / 100
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Match with target role requirements</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Extracted Skills & Strengths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Extracted Skills */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Technical Skills Detected in Resume</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {analysisResult.extractedSkills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium"
                  >
                    {sk}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Projects / Experience Identified:
                </h4>
                <ul className="text-xs text-slate-700 list-disc list-inside space-y-0.5">
                  {analysisResult.demonstratedProjects.map((proj, idx) => (
                    <li key={idx}>{proj}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Critical Missing Skills for Role */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Skills Needing Stronger Evidence for {analysisResult.roleEvaluatedAgainst}</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {analysisResult.criticalGapsForRole.map((gap, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-medium"
                  >
                    {gap}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Key Resume Strengths:
                </h4>
                <ul className="text-xs text-slate-700 list-disc list-inside space-y-0.5">
                  {analysisResult.keyStrengths.map((str, idx) => (
                    <li key={idx}>{str}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Actionable Bullet-Point Rewrites (Google XYZ Formula) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <FileCode className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Actionable Bullet-Point Rewrites (Action + Metric + Outcome)
                </h3>
                <p className="text-xs text-slate-500">
                  Recruiters spend 6 seconds skimming bullet points. Replace passive duty descriptions with measurable results.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-1">
              {analysisResult.improvementSuggestions.map((sug, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{sug.section}</span>
                    <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                      Issue: {sug.issue}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{sug.actionableFix}</p>

                  {sug.sampleBulletPointBefore && sug.sampleBulletPointAfter && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 rounded-lg bg-rose-50/70 border border-rose-200 text-xs text-rose-950">
                        <span className="font-bold text-[10px] uppercase tracking-wider block text-rose-800 mb-1">
                          Before (Weak / Passive):
                        </span>
                        "{sug.sampleBulletPointBefore}"
                      </div>
                      <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950">
                        <span className="font-bold text-[10px] uppercase tracking-wider block text-emerald-800 mb-1">
                          After (Strong / Quantified):
                        </span>
                        "{sug.sampleBulletPointAfter}"
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
