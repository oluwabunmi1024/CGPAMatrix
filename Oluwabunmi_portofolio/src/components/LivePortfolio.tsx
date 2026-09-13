import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Calendar,
  Award,
  BookOpen,
  Send,
  Briefcase,
  Code,
  Check,
  Sparkles,
  Users,
  GraduationCap,
  Palette,
  X,
  Layers,
  MessageSquare,
  Smartphone,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  Compass,
  ChevronDown,
  ChevronUp,
  Rocket,
  Copy,
  Flame,
} from 'lucide-react';
import { PortfolioProfile, PortfolioTheme, AccentColor, SectionVisibility } from '../types';

interface LivePortfolioProps {
  profile: PortfolioProfile;
  theme: PortfolioTheme;
  accent: AccentColor;
  visibility?: SectionVisibility;
  onEditField?: (field: string) => void;
  onSelectTheme?: (theme: PortfolioTheme) => void;
  onSelectAccent?: (accent: AccentColor) => void;
}

export const LivePortfolio: React.FC<LivePortfolioProps> = ({
  profile,
  theme,
  accent,
  visibility = {
    about: true,
    experience: true,
    projects: true,
    skills: true,
    education: true,
    certifications: true,
    training: true,
    volunteering: true,
    awards: true,
    contact: true,
  },
  onSelectTheme,
  onSelectAccent,
}) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [mobileCardStyle, setMobileCardStyle] = useState<'modern' | 'tactile'>('tactile');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedProjectIdx, setExpandedProjectIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMessage) return;
    const subject = encodeURIComponent(`Portfolio Inquiry from ${contactName || 'Visitor'}`);
    const body = encodeURIComponent(`From: ${contactName} (${contactEmail})\n\nMessage:\n${contactMessage}`);
    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, '_blank');
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 4000);
  };

  // Accent styling mappings with glowing ambiance and dot indicators
  const accentClasses: Record<AccentColor, {
    name: string;
    text: string;
    bg: string;
    border: string;
    pill: string;
    button: string;
    glow: string;
    dotBg: string;
  }> = {
    blue: {
      name: 'Electric Blue',
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      pill: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
      button: 'bg-blue-600 hover:bg-blue-500 text-white',
      glow: 'rgba(59, 130, 246, 0.22)',
      dotBg: 'bg-blue-500',
    },
    cyan: {
      name: 'Electric Cyan',
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      pill: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      button: 'bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-semibold',
      glow: 'rgba(6, 182, 212, 0.22)',
      dotBg: 'bg-cyan-400',
    },
    emerald: {
      name: 'Emerald Matrix',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      pill: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      button: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      glow: 'rgba(16, 185, 129, 0.22)',
      dotBg: 'bg-emerald-500',
    },
    amber: {
      name: 'Sunset Amber',
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      pill: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      button: 'bg-amber-600 hover:bg-amber-500 text-white',
      glow: 'rgba(245, 158, 11, 0.22)',
      dotBg: 'bg-amber-500',
    },
    rose: {
      name: 'Cyber Rose',
      text: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      pill: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      button: 'bg-rose-600 hover:bg-rose-500 text-white',
      glow: 'rgba(244, 63, 94, 0.22)',
      dotBg: 'bg-rose-500',
    },
    violet: {
      name: 'Neon Violet',
      text: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/30',
      pill: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
      button: 'bg-violet-600 hover:bg-violet-500 text-white',
      glow: 'rgba(139, 92, 246, 0.22)',
      dotBg: 'bg-violet-500',
    },
    slate: {
      name: 'Minimal Slate',
      text: 'text-neutral-200',
      bg: 'bg-neutral-800',
      border: 'border-neutral-700',
      pill: 'bg-neutral-800 text-neutral-200 border-neutral-700',
      button: 'bg-white hover:bg-neutral-200 text-neutral-900',
      glow: 'rgba(255, 255, 255, 0.12)',
      dotBg: 'bg-neutral-300',
    },
  };

  const curAccent = accentClasses[accent] || accentClasses.blue;

  // Theme layout styling
  const themeStyles = {
    minimal: {
      wrapper: 'bg-neutral-950 text-neutral-100 font-["Plus_Jakarta_Sans",sans-serif]',
      card: 'bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700',
      titleFont: 'font-["Plus_Jakarta_Sans",sans-serif] tracking-tight',
      navBg: 'bg-neutral-950/80 border-b border-neutral-800/80 backdrop-blur-md',
    },
    editorial: {
      wrapper: 'bg-[#0e0e11] text-[#e8e6e3] font-["Plus_Jakarta_Sans",sans-serif]',
      card: 'bg-[#15151a] border border-[#26262e] hover:border-[#383842]',
      titleFont: 'font-["Newsreader",serif] italic tracking-normal',
      navBg: 'bg-[#0e0e11]/85 border-b border-[#26262e] backdrop-blur-md',
    },
    terminal: {
      wrapper: 'bg-[#0a0d10] text-[#c9d1d9] font-["JetBrains_Mono",monospace]',
      card: 'bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff]/50',
      titleFont: 'font-["JetBrains_Mono",monospace] tracking-tight uppercase',
      navBg: 'bg-[#0a0d10]/90 border-b border-[#30363d] backdrop-blur-md',
    },
    studio: {
      wrapper: 'bg-stone-950 text-stone-100 font-["Plus_Jakarta_Sans",sans-serif]',
      card: 'bg-stone-900/70 border border-stone-800 hover:border-stone-700',
      titleFont: 'font-["Plus_Jakarta_Sans",sans-serif] font-extrabold tracking-tight',
      navBg: 'bg-stone-950/85 border-b border-stone-800 backdrop-blur-md',
    },
  }[theme];

  const themeList: { id: PortfolioTheme; label: string }[] = [
    { id: 'minimal', label: 'Minimal' },
    { id: 'editorial', label: 'Editorial' },
    { id: 'terminal', label: 'Obsidian' },
    { id: 'studio', label: 'Studio' },
  ];

  const accentKeyList = Object.keys(accentClasses) as AccentColor[];

  return (
    <div id="portfolio-root" className={`min-h-screen relative overflow-hidden ${themeStyles.wrapper} transition-colors duration-500 pb-20 sm:pb-6`}>
      {/* Interactive Scroll Progress Indicator at the top */}
      <div
        className="fixed top-0 left-0 h-[2.5px] z-50 transition-all duration-100 ease-out"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(90deg, ${curAccent.glow ? curAccent.text.replace('text-', '') : '#38bdf8'}, #38bdf8, #a855f7)`,
          backgroundColor: '#3b82f6',
          boxShadow: `0 0 10px ${curAccent.glow}`,
        }}
      />

      {/* Dynamic Animated Ambient Glow reacting to selected accent color */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[520px] pointer-events-none -z-0 blur-3xl opacity-35 transition-all duration-700 animate-pulse"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 10%, ${curAccent.glow}, transparent 70%)`,
          animationDuration: '6s',
        }}
      />

      {/* Dynamic Navigation */}
      <nav className={`sticky top-0 z-30 ${themeStyles.navBg} transition-colors duration-300`}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 text-white font-bold text-base tracking-tight group">
            <span
              className={`w-2.5 h-2.5 rounded-full ${curAccent.bg} border ${curAccent.border} group-hover:scale-125 transition-transform duration-300`}
            />
            <span>{profile.name}</span>
          </a>

          <div className="hidden sm:flex items-center gap-5 text-xs font-medium text-neutral-400">
            {visibility.about && <a href="#hero" className="hover:text-white transition-colors">About</a>}
            {visibility.projects && <a href="#projects" className="hover:text-white transition-colors">Projects</a>}
            {visibility.experience && <a href="#experience" className="hover:text-white transition-colors">Experience</a>}
            {visibility.skills && <a href="#skills" className="hover:text-white transition-colors">Skills</a>}
            {visibility.education && <a href="#education" className="hover:text-white transition-colors">Education</a>}
            {visibility.training && profile.training && profile.training.length > 0 && (
              <a href="#training" className="hover:text-white transition-colors">Training</a>
            )}
            {visibility.volunteering && profile.volunteering && profile.volunteering.length > 0 && (
              <a href="#leadership" className="hover:text-white transition-colors">Leadership</a>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Minimalist Theme & Color Palette Trigger in Nav */}
            <div className="relative">
              <button
                onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                title="Customize Theme & Palette"
                className="p-2 text-xs rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-400 hover:text-white transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Palette className="w-3.5 h-3.5" />
                <span className={`w-2 h-2 rounded-full ${curAccent.dotBg}`} />
              </button>

              {/* Clean Nav Dropdown (No Floating Obstruction) */}
              <AnimatePresence>
                {isPaletteOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-72 p-3.5 rounded-2xl bg-neutral-950/95 border border-neutral-800 shadow-2xl backdrop-blur-2xl text-neutral-200 z-50 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-1 border-b border-neutral-800">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                        <Palette className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Theme & Color Studio</span>
                      </div>
                      <button
                        onClick={() => setIsPaletteOpen(false)}
                        className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Accent Color Swatches */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-neutral-400">
                        <span>Accent Color</span>
                        <span className={`font-semibold ${curAccent.text}`}>{curAccent.name}</span>
                      </div>
                      <div className="flex items-center justify-between gap-1.5 pt-0.5">
                        {accentKeyList.map((accKey) => {
                          const accObj = accentClasses[accKey];
                          const isSelected = accent === accKey;
                          return (
                            <button
                              key={accKey}
                              onClick={() => {
                                onSelectAccent?.(accKey);
                              }}
                              className={`w-6 h-6 rounded-full ${accObj.dotBg} transition-all duration-200 flex items-center justify-center ${
                                isSelected
                                  ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-900 scale-110 shadow-lg'
                                  : 'opacity-70 hover:opacity-100 hover:scale-105'
                              }`}
                              title={accObj.name}
                            >
                              {isSelected && <Check className="w-3 h-3 text-neutral-950 font-bold" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Theme Mode Selector */}
                    {onSelectTheme && (
                      <div className="space-y-1.5 pt-1 border-t border-neutral-800/80">
                        <div className="text-[11px] text-neutral-400">Style Mode</div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {themeList.map((t) => (
                            <button
                              key={t.id}
                              onClick={() => {
                                onSelectTheme(t.id);
                              }}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left flex items-center justify-between ${
                                theme === t.id
                                  ? 'bg-neutral-800 text-white border border-neutral-700 font-semibold'
                                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                              }`}
                            >
                              <span>{t.label}</span>
                              {theme === t.id && (
                                <span className={`w-1.5 h-1.5 rounded-full ${curAccent.bg} ${curAccent.text} bg-current`} />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mobile Display Style Mode */}
                    <div className="space-y-1.5 pt-1.5 border-t border-neutral-800/80">
                      <div className="flex items-center justify-between text-[11px] text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Smartphone className="w-3 h-3 text-neutral-400" />
                          <span>Mobile Cards Style</span>
                        </span>
                        <span className="text-[10px] text-neutral-500 capitalize">{mobileCardStyle}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => setMobileCardStyle('tactile')}
                          className={`px-2 py-1 rounded-lg text-xs font-medium transition-all text-center ${
                            mobileCardStyle === 'tactile'
                              ? 'bg-neutral-800 text-white border border-neutral-700 font-semibold'
                              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
                          }`}
                        >
                          Tactile Cards
                        </button>
                        <button
                          onClick={() => setMobileCardStyle('modern')}
                          className={`px-2 py-1 rounded-lg text-xs font-medium transition-all text-center ${
                            mobileCardStyle === 'modern'
                              ? 'bg-neutral-800 text-white border border-neutral-700 font-semibold'
                              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
                          }`}
                        >
                          Minimal Flow
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick WhatsApp connect */}
            <a
              href="https://wa.me/2348121423316?text=Hello%20Otitologbon,%20I%20came%20across%20your%20software%20developer%20portfolio!"
              target="_blank"
              rel="noreferrer"
              title="Chat on WhatsApp"
              className="p-2 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            <a
              href="#contact"
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold rounded-full transition-all duration-300 ${curAccent.button}`}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content Area with Motion Animations */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 py-10 sm:py-16 space-y-20 sm:space-y-24 relative z-10">
        {/* Hero Section */}
        {visibility.about && (
          <motion.section
            id="hero"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 pt-2 sm:pt-4"
          >
            <div className="flex flex-wrap items-center gap-3">
              {profile.availableForWork && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Available for high-impact software roles & contracts</span>
                </motion.div>
              )}

              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-400">
                <Compass className="w-3 h-3 text-neutral-500" />
                <span>Abuja, Nigeria & Remote</span>
              </span>
            </div>

            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className={`text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight ${themeStyles.titleFont}`}
              >
                {profile.name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-2.5"
              >
                <p className={`text-xl sm:text-2xl font-semibold ${curAccent.text} transition-colors duration-300`}>
                  {profile.headline}
                </p>
                <span className="text-neutral-600 font-mono hidden sm:inline">•</span>
                <span className="text-xs text-neutral-400 font-mono hidden sm:inline">Web & Mobile • APIs • QA</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl pt-1 font-normal"
              >
                {profile.bio}
              </motion.p>
            </div>

            {/* Interactive Animated Highlight Badges / Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 pt-2"
            >
              <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-all">
                <div className="flex items-center gap-2 text-indigo-400 mb-1">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Academic</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">First Class</div>
                <div className="text-[10px] text-neutral-400">B.Sc. Info Tech</div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-all">
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Shipped</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">Live Products</div>
                <div className="text-[10px] text-neutral-400">Vercel & Render</div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-all">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Fintech</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">BudPay APIs</div>
                <div className="text-[10px] text-neutral-400">Checkout & QA</div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-all">
                <div className="flex items-center gap-2 text-rose-400 mb-1">
                  <Smartphone className="w-4 h-4" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Stack</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">Cross-Platform</div>
                <div className="text-[10px] text-neutral-400">React • Flutter • AI</div>
              </div>
            </motion.div>

            {/* Quick Links & Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3.5 pt-1 text-xs text-neutral-300"
            >
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{profile.email}</span>
                </a>
              )}

              {profile.phone && (
                <a
                  href="tel:+2348121423316"
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{profile.phone}</span>
                </a>
              )}

              {profile.linkedin && (
                <a
                  href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>LinkedIn</span>
                </a>
              )}

              {profile.github && (
                <a
                  href={profile.github.startsWith('http') ? profile.github : `https://${profile.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-neutral-400" />
                  <span>GitHub</span>
                </a>
              )}
            </motion.div>
          </motion.section>
        )}

        {/* Featured Projects Section with Interactive Filter and Animations */}
        {visibility.projects && profile.projects && profile.projects.length > 0 && (
          <motion.section
            id="projects"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            className="space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <Code className={`w-5 h-5 ${curAccent.text} transition-colors duration-300`} />
                <h2 className={`text-2xl font-bold text-white tracking-tight ${themeStyles.titleFont}`}>
                  Featured Projects
                </h2>
              </div>

              {/* Interactive Category Filter Pills with Animation */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {[
                  { id: 'all', label: 'All Projects' },
                  { id: 'web', label: 'Web & Crypto' },
                  { id: 'ai', label: 'AI & Bot' },
                  { id: 'mobile', label: 'Mobile' },
                  { id: 'fintech', label: 'Fintech & Checkout' },
                ].map((cat) => {
                  const isSelected = activeCategory === cat.id;
                  const count = profile.projects.filter((p) =>
                    cat.id === 'all' ? true : p.category === cat.id
                  ).length;

                  if (count === 0 && cat.id !== 'all') return null;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`relative px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                        isSelected
                          ? `${curAccent.bg} ${curAccent.text} border ${curAccent.border} font-semibold shadow-sm`
                          : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800/80'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isSelected ? 'bg-white/10 text-white' : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filtered Projects Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {profile.projects
                  .filter((p) => {
                    if (activeCategory === 'all') return true;
                    return p.category === activeCategory;
                  })
                  .map((proj, idx) => {
                    const isExpanded = expandedProjectIdx === idx;

                    return (
                      <motion.div
                        layout
                        key={proj.title}
                        initial={{ opacity: 0, scale: 0.96, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35, delay: idx * 0.05 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className={`p-5 sm:p-6 rounded-2xl ${
                          mobileCardStyle === 'tactile'
                            ? 'bg-neutral-900/85 border border-neutral-800 hover:border-neutral-700 shadow-xl'
                            : themeStyles.card
                        } flex flex-col justify-between space-y-6 transition-all duration-300 hover:shadow-2xl hover:shadow-black/70 group relative overflow-hidden`}
                      >
                        {/* Ambient subtle card glow */}
                        <div
                          className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-10 group-hover:opacity-25 transition-opacity"
                          style={{ backgroundColor: curAccent.glow }}
                        />

                        <div className="space-y-3 relative z-10">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                                {proj.title}
                              </h3>
                              {proj.tagline && (
                                <p className={`text-xs font-medium ${curAccent.text} mt-0.5 transition-colors duration-300`}>
                                  {proj.tagline}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {proj.demoUrl && (
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                  <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                  </span>
                                  <span>Live</span>
                                </span>
                              )}
                              {proj.featured && (
                                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-sm text-neutral-400 leading-relaxed">
                            {proj.description}
                          </p>

                          {/* Collapsible Key Highlights Accordion */}
                          {proj.highlights && proj.highlights.length > 0 && (
                            <div className="pt-1">
                              <button
                                onClick={() => setExpandedProjectIdx(isExpanded ? null : idx)}
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors py-1"
                              >
                                <span>{isExpanded ? 'Hide Key Highlights' : `Key Engineering Wins (${proj.highlights.length})`}</span>
                                {isExpanded ? (
                                  <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                                )}
                              </button>

                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-1.5 pt-2 overflow-hidden"
                                  >
                                    {proj.highlights.map((h, hIdx) => (
                                      <div key={hIdx} className="text-xs text-neutral-300 flex items-start gap-2 bg-neutral-950/40 p-2 rounded-lg border border-neutral-800/60">
                                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                        <span className="leading-snug">{h}</span>
                                      </div>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}
                        </div>

                        <div className="space-y-4 pt-4 border-t border-neutral-800/80 relative z-10">
                          <div className="flex flex-wrap gap-1.5">
                            {proj.technologies.map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 text-xs rounded-md bg-neutral-900/90 text-neutral-300 border border-neutral-800 font-mono group-hover:border-neutral-700 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-3 text-xs font-semibold pt-1">
                            {proj.demoUrl && (
                              <motion.a
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                href={proj.demoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white font-medium transition-colors shadow-sm ${curAccent.button}`}
                              >
                                <span>View Live App</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </motion.a>
                            )}
                            {proj.githubUrl && (
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                              >
                                <Github className="w-3.5 h-3.5" />
                                <span>Code</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            </motion.div>

            {/* Interactive "What I Can Build For You / Engineering Roadmap" Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      Forward Engineering Scope
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    Need a custom fintech integration, mobile app, or QA suite?
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
                    I deliver complete end-to-end applications: from system requirements & database schemas to audited payment flows and automated regression tests.
                  </p>
                </div>
                <a
                  href="https://wa.me/2348121423316?text=Hello%20Otitologbon,%20I%20have%20a%20project%20I%20would%20like%20to%20discuss%20with%20you!"
                  target="_blank"
                  rel="noreferrer"
                  className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold text-white shadow-lg transition-all ${curAccent.button} flex items-center gap-2`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discuss a Project</span>
                </a>
              </div>
            </motion.div>
          </motion.section>
        )}

        {/* Experience Section */}
        {visibility.experience && profile.experiences && profile.experiences.length > 0 && (
          <motion.section
            id="experience"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
              <Briefcase className={`w-5 h-5 ${curAccent.text} transition-colors duration-300`} />
              <h2 className={`text-2xl font-bold text-white tracking-tight ${themeStyles.titleFont}`}>
                Work Experience
              </h2>
            </div>

            <div className="space-y-12">
              {profile.experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="relative pl-6 border-l-2 border-neutral-800 space-y-3 group hover:border-neutral-700 transition-colors"
                >
                  <div
                    className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${curAccent.bg} border ${curAccent.border} transition-colors duration-300`}
                  />

                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-bold text-white">
                      {exp.role}{' '}
                      <span className={`${curAccent.text} font-medium transition-colors duration-300`}>
                        @ {exp.company}
                      </span>
                    </h3>
                    <div className="text-xs text-neutral-400 font-mono flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-neutral-500" />
                      <span>{exp.startDate} – {exp.endDate}</span>
                      {exp.location && <span className="text-neutral-500">• {exp.location}</span>}
                    </div>
                  </div>

                  {exp.description && (
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="space-y-2 text-sm text-neutral-300">
                      {exp.highlights.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                          <span className={`w-1.5 h-1.5 rounded-full ${curAccent.text} mt-2 shrink-0 bg-current transition-colors duration-300`} />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 text-xs rounded-md bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Skills & Technical Expertise Section */}
        {visibility.skills && profile.skills && profile.skills.length > 0 && (
          <motion.section
            id="skills"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
              <Sparkles className={`w-5 h-5 ${curAccent.text} transition-colors duration-300`} />
              <h2 className={`text-2xl font-bold text-white tracking-tight ${themeStyles.titleFont}`}>
                Skills & Technical Expertise
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.skills.map((skillGroup, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`p-5 rounded-2xl ${themeStyles.card} space-y-3.5 transition-shadow`}
                >
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, sIdx) => (
                      <motion.span
                        key={sIdx}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.15 }}
                        className={`px-3 py-1 text-xs rounded-lg ${curAccent.pill} font-medium inline-block cursor-default transition-colors duration-300`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Education & Credentials Section */}
        {((visibility.education && profile.education && profile.education.length > 0) ||
          (visibility.certifications && profile.certifications && profile.certifications.length > 0)) && (
          <motion.section
            id="education"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
              <BookOpen className={`w-5 h-5 ${curAccent.text} transition-colors duration-300`} />
              <h2 className={`text-2xl font-bold text-white tracking-tight ${themeStyles.titleFont}`}>
                Education & Credentials
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Education */}
              {visibility.education && profile.education && profile.education.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider">
                    Academic Background
                  </h3>
                  <div className="space-y-4">
                    {profile.education.map((edu, idx) => (
                      <div key={idx} className={`p-4 rounded-xl ${themeStyles.card} space-y-1`}>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                          <span className="text-xs text-neutral-400 font-mono">{edu.endDate}</span>
                        </div>
                        <p className="text-xs text-neutral-400">{edu.institution}</p>
                        {edu.honors && (
                          <p className="text-xs text-neutral-500 pt-1">{edu.honors}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications & Awards */}
              {visibility.certifications && profile.certifications && profile.certifications.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider">
                    Certifications & Licenses
                  </h3>
                  <div className="space-y-4">
                    {profile.certifications.map((cert, idx) => (
                      <div key={idx} className={`p-4 rounded-xl ${themeStyles.card} space-y-1`}>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>{cert.name}</span>
                          </h4>
                          {cert.issueDate && (
                            <span className="text-xs text-neutral-400 font-mono">{cert.issueDate}</span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400">{cert.issuer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* Technical Training & Specialized Programs */}
        {visibility.training && profile.training && profile.training.length > 0 && (
          <motion.section
            id="training"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
              <GraduationCap className={`w-5 h-5 ${curAccent.text} transition-colors duration-300`} />
              <h2 className={`text-2xl font-bold text-white tracking-tight ${themeStyles.titleFont}`}>
                Technical Training & Continuous Learning
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {profile.training.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className={`p-5 rounded-2xl ${themeStyles.card} space-y-2`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-white">{item.program}</h3>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                      {item.provider}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Leadership & Volunteering */}
        {visibility.volunteering && profile.volunteering && profile.volunteering.length > 0 && (
          <motion.section
            id="leadership"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
              <Users className={`w-5 h-5 ${curAccent.text} transition-colors duration-300`} />
              <h2 className={`text-2xl font-bold text-white tracking-tight ${themeStyles.titleFont}`}>
                Leadership & Community Volunteering
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {profile.volunteering.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className={`p-5 rounded-2xl ${themeStyles.card} space-y-2.5 flex flex-col justify-between`}
                >
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white">{item.role}</h3>
                    <p className={`text-xs font-medium ${curAccent.text} transition-colors duration-300`}>{item.organization}</p>
                    {item.description && (
                      <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Contact Form Section */}
        {visibility.contact && (
          <motion.section
            id="contact"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            className={`p-8 sm:p-12 rounded-3xl ${themeStyles.card} text-center space-y-8 relative overflow-hidden`}
          >
            <div className="max-w-xl mx-auto space-y-3">
              <h2 className={`text-3xl sm:text-4xl font-bold text-white ${themeStyles.titleFont}`}>
                Get In Touch
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Have a project inquiry, software development opportunity, or collaboration in mind? Leave a message or write directly to{' '}
                <a href={`mailto:${profile.email}`} className="text-white underline underline-offset-2 hover:text-indigo-300 transition-colors">
                  {profile.email}
                </a>.
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="max-w-md mx-auto space-y-3 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full bg-neutral-950/80 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full bg-neutral-950/80 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-neutral-400 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Hi! I came across your portfolio and would love to discuss..."
                  className="w-full bg-neutral-950/80 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${curAccent.button}`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </motion.button>
              </div>

              {messageSent && (
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-center flex items-center justify-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Opening mail client... Thanks for reaching out!</span>
                </div>
              )}
            </form>
          </motion.section>
        )}
      </div>

      {/* Mobile Bottom Quick Action Navigation Dock */}
      <div className="sm:hidden fixed bottom-3 left-3 right-3 z-40">
        <div className="bg-neutral-900/95 backdrop-blur-xl border border-neutral-800/90 rounded-2xl py-2 px-3 flex items-center justify-around shadow-2xl text-[11px] font-medium text-neutral-400">
          <a
            href="#projects"
            className="flex flex-col items-center gap-0.5 hover:text-white transition-colors"
          >
            <Code className={`w-4 h-4 ${curAccent.text}`} />
            <span>Projects</span>
          </a>
          <a
            href="#experience"
            className="flex flex-col items-center gap-0.5 hover:text-white transition-colors"
          >
            <Briefcase className="w-4 h-4" />
            <span>Experience</span>
          </a>
          <a
            href="#skills"
            className="flex flex-col items-center gap-0.5 hover:text-white transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Skills</span>
          </a>
          <a
            href="https://wa.me/2348121423316?text=Hello%20Otitologbon,%20I%20came%20across%20your%20software%20developer%20portfolio!"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-0.5 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
          <a
            href="#contact"
            className="flex flex-col items-center gap-0.5 hover:text-white transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Contact</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-12 pb-24 sm:pb-12 text-center text-xs text-neutral-500 relative z-10">
        <div className="max-w-5xl mx-auto px-6 space-y-2">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="text-neutral-600 text-[11px]">Software Developer Portfolio</p>
        </div>
      </footer>
    </div>
  );
};
