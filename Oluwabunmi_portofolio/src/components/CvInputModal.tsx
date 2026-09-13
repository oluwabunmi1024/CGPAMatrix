import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Copy,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { sampleRawCvText } from '../data/sampleProfiles';
import { analyzeCvText } from '../utils/cvParser';
import { PortfolioProfile } from '../types';

interface CvInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileGenerated: (profile: PortfolioProfile, note?: string) => void;
}

export const CvInputModal: React.FC<CvInputModalProps> = ({
  isOpen,
  onClose,
  onProfileGenerated,
}) => {
  const [cvText, setCvText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setCvText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleLoadSample = () => {
    setCvText(sampleRawCvText);
    setErrorMessage(null);
  };

  const handleAnalyze = async () => {
    if (!cvText.trim()) {
      setErrorMessage('Please paste or upload your CV text first.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);
    setAnalysisStep('Connecting to Gemini AI Engine...');

    try {
      // Small visual delay steps for professional feel
      const stepTimer1 = setTimeout(() => {
        setAnalysisStep('Extracting work experience, achievements, and metrics...');
      }, 700);

      const stepTimer2 = setTimeout(() => {
        setAnalysisStep('Categorizing technical capabilities and project highlights...');
      }, 1600);

      const result = await analyzeCvText(cvText);

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      setAnalysisStep('Generating responsive portfolio theme...');
      setTimeout(() => {
        setIsAnalyzing(false);
        onProfileGenerated(result.profile, result.note);
        onClose();
      }, 400);
    } catch (err: any) {
      setIsAnalyzing(false);
      setErrorMessage(err.message || 'Failed to analyze CV.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800 bg-neutral-900/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Analyze CV & Build Portfolio</h2>
              <p className="text-xs text-neutral-400">
                Paste your CV text or drop a file to automatically generate your website
              </p>
            </div>
          </div>
          <button
            id="close-cv-modal-btn"
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-neutral-400">Supported: Text, Markdown, PDF text exports</span>
            <button
              id="load-sample-cv-btn"
              type="button"
              onClick={handleLoadSample}
              className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium hover:underline"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Load Sample Resume Text</span>
            </button>
          </div>

          {/* Textarea Input */}
          <div className="relative">
            <textarea
              id="cv-text-input"
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="Paste your CV or Resume text here (or drag and drop a .txt/.md file below)...

Example:
Jane Doe
Senior Full-Stack Engineer
San Francisco, CA | jane@example.com

EXPERIENCE
Staff Engineer @ TechCorp (2021 - Present)
- Led development of distributed database caching layer
- Reduced page load times by 45%

SKILLS
TypeScript, React, Python, Docker, Kubernetes, AWS..."
              rows={11}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-xs font-mono text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y"
            />
          </div>

          {/* File Upload Drop Zone */}
          <div className="border border-dashed border-neutral-800 hover:border-neutral-700 rounded-xl p-3 bg-neutral-950/50 flex items-center justify-between gap-4 transition-colors">
            <div className="flex items-center gap-2.5">
              <Upload className="w-4 h-4 text-neutral-500" />
              <span className="text-xs text-neutral-400">
                Or upload a plain text file (.txt, .md)
              </span>
            </div>
            <label className="cursor-pointer px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-lg transition-colors">
              <span>Choose File</span>
              <input
                id="cv-file-upload-input"
                type="file"
                accept=".txt,.md"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl flex items-center gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="p-4 bg-indigo-950/30 border border-indigo-800/40 rounded-xl flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-indigo-400 animate-spin shrink-0" />
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-white">Analyzing CV with AI</div>
                <div className="text-[11px] text-indigo-300">{analysisStep}</div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-800 bg-neutral-900/90">
          <button
            type="button"
            onClick={onClose}
            disabled={isAnalyzing}
            className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            id="start-cv-analysis-btn"
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing || !cvText.trim()}
            className="flex items-center gap-2 px-5 py-2 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl shadow-lg shadow-indigo-500/25 transition-all"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Generate Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
