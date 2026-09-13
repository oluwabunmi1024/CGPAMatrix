import React, { useState } from 'react';
import {
  X,
  Download,
  Copy,
  Printer,
  FileCode,
  Check,
  Globe,
  Share2,
} from 'lucide-react';
import { PortfolioProfile, PortfolioTheme } from '../types';
import { generateStandaloneHtml } from '../utils/cvParser';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PortfolioProfile;
  theme: PortfolioTheme;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  profile,
  theme,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const htmlContent = generateStandaloneHtml(profile, theme);

  const handleDownloadHtml = () => {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(profile, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.toLowerCase().replace(/\s+/g, '-')}-data.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800 bg-neutral-900/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Export & Publish Portfolio</h2>
              <p className="text-xs text-neutral-400">
                Deploy anywhere: GitHub Pages, Vercel, Netlify, or save as PDF
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="p-6 space-y-4 text-xs">
          {/* Option 1: Standalone HTML */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white font-semibold">
                <FileCode className="w-4 h-4 text-indigo-400" />
                <span>Single-File HTML Website</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 font-mono">
                  Self-Contained
                </span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Complete, zero-dependency HTML file with embedded styling and fonts. Ready to double-click and open in any browser or host for free.
              </p>
            </div>
            <button
              onClick={handleDownloadHtml}
              className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shrink-0 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>

          {/* Option 2: Print / PDF */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Printer className="w-4 h-4 text-emerald-400" />
                <span>Print or Save to PDF</span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Use your browser&apos;s native Print dialog to save a high-resolution PDF resume/portfolio.
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold shrink-0 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>

          {/* Option 3: JSON Data Backup */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>Structured Portfolio Data (JSON)</span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Download your raw structured profile data to keep a backup or sync with other tools.
              </p>
            </div>
            <button
              onClick={handleDownloadJson}
              className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold shrink-0 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save JSON</span>
            </button>
          </div>

          {/* Quick Copy Snippet */}
          <div className="pt-2 flex items-center justify-between text-neutral-400">
            <span>Want to copy the generated HTML directly?</span>
            <button
              onClick={handleCopyHtml}
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy HTML</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-neutral-800 bg-neutral-900/90">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
