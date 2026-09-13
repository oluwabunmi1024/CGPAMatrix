import React from 'react';
import {
  FileText,
  Sparkles,
  Palette,
  Download,
  Eye,
  Sliders,
  Printer,
  ChevronDown,
} from 'lucide-react';
import { PortfolioTheme, AccentColor } from '../types';

interface HeaderProps {
  currentTheme: PortfolioTheme;
  onSelectTheme: (theme: PortfolioTheme) => void;
  currentAccent: AccentColor;
  onSelectAccent: (accent: AccentColor) => void;
  viewMode: 'preview' | 'split' | 'edit';
  onSelectViewMode: (mode: 'preview' | 'split' | 'edit') => void;
  onOpenCvModal: () => void;
  onOpenExportModal: () => void;
  onLoadSample: (sampleKey: 'otitologbon' | 'engineering' | 'design') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTheme,
  onSelectTheme,
  currentAccent,
  onSelectAccent,
  viewMode,
  onSelectViewMode,
  onOpenCvModal,
  onOpenExportModal,
  onLoadSample,
}) => {
  const [samplesOpen, setSamplesOpen] = React.useState(false);
  const [themesOpen, setThemesOpen] = React.useState(false);

  const themeLabels: Record<PortfolioTheme, { name: string; desc: string }> = {
    minimal: { name: 'Modern Minimal', desc: 'Clean slate, crisp typography' },
    editorial: { name: 'Executive Editorial', desc: 'Serif headings, high prestige' },
    terminal: { name: 'Obsidian Tech', desc: 'Dark terminal, monospace accents' },
    studio: { name: 'Warm Studio', desc: 'Warm stone palette, approachable' },
  };

  const accents: { id: AccentColor; bg: string }[] = [
    { id: 'blue', bg: 'bg-blue-500' },
    { id: 'cyan', bg: 'bg-cyan-400' },
    { id: 'emerald', bg: 'bg-emerald-500' },
    { id: 'amber', bg: 'bg-amber-500' },
    { id: 'rose', bg: 'bg-rose-500' },
    { id: 'violet', bg: 'bg-violet-500' },
    { id: 'slate', bg: 'bg-neutral-300' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 text-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">Portfolio Studio</span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                CV to Web
              </span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="hidden md:flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-1 text-xs font-medium">
          <button
            id="view-mode-preview-btn"
            onClick={() => onSelectViewMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              viewMode === 'preview'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Full Preview</span>
          </button>
          <button
            id="view-mode-split-btn"
            onClick={() => onSelectViewMode('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              viewMode === 'split'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Split Editor</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Dropdown - Compact & Reduced */}
          <div className="relative">
            <button
              id="theme-selector-btn"
              onClick={() => {
                setThemesOpen(!themesOpen);
                setSamplesOpen(false);
              }}
              title={`Theme: ${themeLabels[currentTheme].name}`}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 rounded-lg transition-colors"
            >
              <Palette className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden md:inline text-[11px]">{themeLabels[currentTheme].name}</span>
              <span className={`w-2 h-2 rounded-full ${accents.find(a => a.id === currentAccent)?.bg || 'bg-blue-500'}`} />
            </button>

            {themesOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Select Theme
                </div>
                {(Object.keys(themeLabels) as PortfolioTheme[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      onSelectTheme(t);
                      setThemesOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex flex-col ${
                      currentTheme === t
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                        : 'text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    <span className="font-semibold">{themeLabels[t].name}</span>
                    <span className="text-[10px] text-neutral-400">{themeLabels[t].desc}</span>
                  </button>
                ))}

                <div className="pt-2 mt-2 border-t border-neutral-800 px-3">
                  <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Accent Color
                  </div>
                  <div className="flex items-center gap-2">
                    {accents.map((acc) => (
                      <button
                        key={acc.id}
                        onClick={() => onSelectAccent(acc.id)}
                        className={`w-5 h-5 rounded-full ${acc.bg} transition-transform ${
                          currentAccent === acc.id
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-900 scale-110'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                        title={acc.id}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sample CV Profiles */}
          <div className="relative">
            <button
              id="samples-dropdown-btn"
              onClick={() => {
                setSamplesOpen(!samplesOpen);
                setThemesOpen(false);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 rounded-lg transition-colors"
            >
              <span>Sample CVs</span>
              <ChevronDown className="w-3 h-3 text-neutral-500" />
            </button>

            {samplesOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl p-2 z-50">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Select Profile
                </div>
                <button
                  onClick={() => {
                    onLoadSample('otitologbon');
                    setSamplesOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-neutral-200 hover:bg-neutral-800 transition-colors border-b border-neutral-800/80 mb-1"
                >
                  <div className="font-semibold text-indigo-400">Otitologbon Oluwabunmi</div>
                  <div className="text-[10px] text-neutral-400">IT Graduate · Frontend & Mobile · Tech Assistant</div>
                </button>
                <button
                  onClick={() => {
                    onLoadSample('engineering');
                    setSamplesOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-neutral-200 hover:bg-neutral-800 transition-colors"
                >
                  <div className="font-semibold">Software Engineer</div>
                  <div className="text-[10px] text-neutral-400">Distributed systems, cloud, Go & React</div>
                </button>
                <button
                  onClick={() => {
                    onLoadSample('design');
                    setSamplesOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-neutral-200 hover:bg-neutral-800 transition-colors"
                >
                  <div className="font-semibold">Product Designer</div>
                  <div className="text-[10px] text-neutral-400">Design systems, UX research, Figma</div>
                </button>
              </div>
            )}
          </div>

          {/* Upload/Paste CV CTA */}
          <button
            id="import-cv-btn"
            onClick={onOpenCvModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white rounded-lg shadow-sm shadow-indigo-500/20 transition-all active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Analyze CV</span>
          </button>

          {/* Export / Download */}
          <button
            id="export-portfolio-btn"
            onClick={onOpenExportModal}
            className="p-2 text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors"
            title="Export & Download Portfolio"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
