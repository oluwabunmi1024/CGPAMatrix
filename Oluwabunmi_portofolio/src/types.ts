export interface SkillCategory {
  category: string;
  items: string[];
}

export interface WorkExperience {
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  description?: string;
  highlights: string[];
  technologies?: string[];
}

export interface ProjectItem {
  title: string;
  tagline?: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  highlights?: string[];
  featured?: boolean;
  status?: 'live' | 'in-progress' | 'roadmap' | 'beta';
  category?: 'all' | 'web' | 'mobile' | 'fintech' | 'ai';
}

export interface EducationItem {
  degree: string;
  institution: string;
  startDate?: string;
  endDate: string;
  honors?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  issueDate?: string;
  url?: string;
}

export interface AwardItem {
  title: string;
  issuer: string;
  date?: string;
  description?: string;
}

export interface TrainingItem {
  program: string;
  provider: string;
  description: string;
}

export interface VolunteeringItem {
  role: string;
  organization: string;
  description?: string;
}

export interface PortfolioProfile {
  name: string;
  headline: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  avatarUrl?: string;
  availableForWork?: boolean;
  yearsOfExperience?: string;
  skills: SkillCategory[];
  experiences: WorkExperience[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  training?: TrainingItem[];
  volunteering?: VolunteeringItem[];
  awards?: AwardItem[];
}

export type PortfolioTheme = 'minimal' | 'editorial' | 'terminal' | 'studio';

export type AccentColor = 'blue' | 'emerald' | 'amber' | 'rose' | 'violet' | 'cyan' | 'slate';

export interface SectionVisibility {
  about: boolean;
  experience: boolean;
  projects: boolean;
  skills: boolean;
  education: boolean;
  certifications: boolean;
  training?: boolean;
  volunteering?: boolean;
  awards: boolean;
  contact: boolean;
}
