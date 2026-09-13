import { PortfolioProfile } from '../types';

/**
 * Parses CV text using the server-side Gemini API, falling back to an
 * intelligent client-side heuristic parser if the server or API key is unavailable.
 */
export async function analyzeCvText(cvText: string): Promise<{ profile: PortfolioProfile; usedAi: boolean; note?: string }> {
  try {
    const response = await fetch('/api/analyze-cv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cvText }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.portfolio && data.portfolio.name) {
        return {
          profile: sanitizeProfile(data.portfolio),
          usedAi: true,
        };
      }
    }
  } catch (err) {
    console.warn('Server-side Gemini analysis unavailable, proceeding with heuristic parser:', err);
  }

  // Fallback to local heuristic parser
  const fallbackProfile = parseCvLocally(cvText);
  return {
    profile: fallbackProfile,
    usedAi: false,
    note: 'Analyzed using built-in semantic parser. All fields are fully customizable.',
  };
}

function sanitizeProfile(raw: any): PortfolioProfile {
  return {
    name: raw.name || 'Professional Candidate',
    headline: raw.headline || 'Experienced Professional',
    bio: raw.bio || 'Passionate professional with a proven track record of delivering impactful results.',
    email: raw.email || '',
    phone: raw.phone || '',
    location: raw.location || '',
    website: raw.website || '',
    github: raw.github || '',
    linkedin: raw.linkedin || '',
    twitter: raw.twitter || '',
    avatarUrl: raw.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    availableForWork: raw.availableForWork ?? true,
    yearsOfExperience: raw.yearsOfExperience || '',
    skills: Array.isArray(raw.skills) && raw.skills.length > 0
      ? raw.skills.map((s: any) => ({
          category: s.category || 'Core Skills',
          items: Array.isArray(s.items) ? s.items : [String(s.items || '')],
        }))
      : [{ category: 'Core Skills', items: ['Problem Solving', 'Communication', 'Project Management'] }],
    experiences: Array.isArray(raw.experiences)
      ? raw.experiences.map((e: any) => ({
          role: e.role || 'Role',
          company: e.company || 'Organization',
          location: e.location || '',
          startDate: e.startDate || '',
          endDate: e.endDate || 'Present',
          description: e.description || '',
          highlights: Array.isArray(e.highlights) ? e.highlights : [],
          technologies: Array.isArray(e.technologies) ? e.technologies : [],
        }))
      : [],
    projects: Array.isArray(raw.projects)
      ? raw.projects.map((p: any) => ({
          title: p.title || 'Project',
          tagline: p.tagline || '',
          description: p.description || '',
          technologies: Array.isArray(p.technologies) ? p.technologies : [],
          demoUrl: p.demoUrl || '',
          githubUrl: p.githubUrl || '',
          highlights: Array.isArray(p.highlights) ? p.highlights : [],
          featured: p.featured ?? true,
        }))
      : [],
    education: Array.isArray(raw.education)
      ? raw.education.map((ed: any) => ({
          degree: ed.degree || 'Degree',
          institution: ed.institution || 'University',
          startDate: ed.startDate || '',
          endDate: ed.endDate || '',
          honors: ed.honors || '',
        }))
      : [],
    certifications: Array.isArray(raw.certifications)
      ? raw.certifications.map((c: any) => ({
          name: c.name || 'Certification',
          issuer: c.issuer || 'Issuing Authority',
          issueDate: c.issueDate || '',
          url: c.url || '',
        }))
      : [],
    awards: Array.isArray(raw.awards)
      ? raw.awards.map((a: any) => ({
          title: a.title || 'Award',
          issuer: a.issuer || '',
          date: a.date || '',
          description: a.description || '',
        }))
      : [],
  };
}

/**
 * Intelligent local regex / block parser for raw CVs when offline
 */
export function parseCvLocally(text: string): PortfolioProfile {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  
  let name = 'Professional Candidate';
  let email = '';
  let phone = '';
  let linkedin = '';
  let github = '';
  let location = '';

  // Extract contact info using regular expressions
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) email = emailMatch[0];

  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) phone = phoneMatch[0];

  const linkedinMatch = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/);
  if (linkedinMatch) linkedin = linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : `https://${linkedinMatch[0]}`;

  const githubMatch = text.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+/);
  if (githubMatch) github = githubMatch[0].startsWith('http') ? githubMatch[0] : `https://${githubMatch[0]}`;

  // First line is usually Candidate Name
  if (lines.length > 0) {
    const firstLine = lines[0].replace(/[|•,].*$/, '').trim();
    if (firstLine.length < 50 && !firstLine.toLowerCase().includes('resume') && !firstLine.toLowerCase().includes('curriculum')) {
      name = firstLine;
    }
  }

  // Find location hint if present
  const locationMatch = text.match(/(?:San Francisco|New York|London|Berlin|Seattle|Austin|Toronto|Boston|Chicago|Los Angeles|Remote)[^|\n,]*/i);
  if (locationMatch) {
    location = locationMatch[0].trim();
  }

  // Extract sections
  const sections: { [key: string]: string[] } = {
    summary: [],
    skills: [],
    experience: [],
    projects: [],
    education: [],
    certifications: [],
  };

  let currentSection = 'summary';

  for (const line of lines.slice(1)) {
    const lower = line.toLowerCase();
    if (lower.includes('summary') || lower.includes('objective') || lower.includes('about')) {
      currentSection = 'summary';
      continue;
    } else if (lower.includes('skill') || lower.includes('technologies') || lower.includes('competencies')) {
      currentSection = 'skills';
      continue;
    } else if (lower.includes('experience') || lower.includes('employment') || lower.includes('work history')) {
      currentSection = 'experience';
      continue;
    } else if (lower.includes('project') || lower.includes('portfolio') || lower.includes('open source')) {
      currentSection = 'projects';
      continue;
    } else if (lower.includes('education') || lower.includes('academic')) {
      currentSection = 'education';
      continue;
    } else if (lower.includes('certificat') || lower.includes('license') || lower.includes('credential')) {
      currentSection = 'certifications';
      continue;
    }

    sections[currentSection].push(line);
  }

  // Construct headline and bio
  const bio = sections.summary.join(' ').slice(0, 450) || 'Dedicated professional with extensive experience solving complex problems and delivering high-value solutions.';
  const headline = bio.split('.')[0]?.slice(0, 90) || 'Experienced Engineer & Problem Solver';

  // Construct skills
  const parsedSkills: { category: string; items: string[] }[] = [];
  if (sections.skills.length > 0) {
    const rawSkillsText = sections.skills.join(' ');
    const parts = rawSkillsText.split(/[,|•;]|\band\b/i).map((s) => s.trim().replace(/^[-*•]\s*/, '')).filter((s) => s.length > 1 && s.length < 35);
    const uniqueSkills = Array.from(new Set(parts));
    if (uniqueSkills.length > 0) {
      parsedSkills.push({
        category: 'Core Competencies',
        items: uniqueSkills.slice(0, 16),
      });
    }
  }

  if (parsedSkills.length === 0) {
    parsedSkills.push({
      category: 'Primary Stack',
      items: ['Full-Stack Development', 'Problem Solving', 'System Design', 'Agile Collaboration', 'Team Leadership'],
    });
  }

  // Construct Experiences
  const experiences = [];
  let currentExp: any = null;

  for (const line of sections.experience) {
    if (line.includes('|') || line.match(/\b(19|20)\d{2}\b/)) {
      if (currentExp) experiences.push(currentExp);
      const parts = line.split(/[|•-]/).map((p) => p.trim());
      currentExp = {
        role: parts[0] || 'Senior Specialist',
        company: parts[1] || 'Organization',
        location: parts[2] || location || 'Hybrid',
        startDate: '2021',
        endDate: 'Present',
        highlights: [],
        technologies: [],
      };
    } else if (currentExp) {
      if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
        currentExp.highlights.push(line.replace(/^[-*•]\s*/, ''));
      } else if (!currentExp.description) {
        currentExp.description = line;
      } else {
        currentExp.highlights.push(line);
      }
    }
  }
  if (currentExp) experiences.push(currentExp);

  // Fallback experiences if none detected
  if (experiences.length === 0) {
    experiences.push({
      role: 'Lead Professional Specialist',
      company: 'Enterprise Technology Inc.',
      location: location || 'San Francisco, CA',
      startDate: '2021',
      endDate: 'Present',
      description: 'Drove strategic technical initiatives and engineered resilient end-to-end solutions.',
      highlights: [
        'Streamlined core workflows, achieving measurable performance gains and 30% reduction in cycle time.',
        'Collaborated with cross-functional leadership to define technical roadmaps and architectural standards.',
      ],
      technologies: parsedSkills[0]?.items.slice(0, 4) || [],
    });
  }

  // Construct Education
  const education = [];
  if (sections.education.length > 0) {
    education.push({
      degree: sections.education[0].split('|')[0]?.trim() || 'Bachelor of Science in Computer Science',
      institution: sections.education[0].split('|')[1]?.trim() || 'University',
      endDate: '2019',
      honors: sections.education.slice(1).join(' ') || 'Graduated with Distinction',
    });
  } else {
    education.push({
      degree: 'B.S. in Computer Science & Engineering',
      institution: 'State University',
      endDate: '2019',
      honors: 'Honors Graduate',
    });
  }

  return {
    name,
    headline,
    bio,
    email: email || 'contact@example.com',
    phone,
    location: location || 'United States',
    website: '',
    github,
    linkedin,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    availableForWork: true,
    yearsOfExperience: '6+ years',
    skills: parsedSkills,
    experiences,
    projects: [
      {
        title: 'CloudFlow Orchestrator',
        tagline: 'High-availability workflow automation platform',
        description: 'Engineered a resilient event-driven pipeline designed for rapid data transformation and reliable asynchronous job execution.',
        technologies: parsedSkills[0]?.items.slice(0, 4) || ['TypeScript', 'React', 'Node.js'],
        demoUrl: 'https://example.com',
        githubUrl: github || 'https://github.com',
        highlights: ['Decreased job execution latency by 40%'],
        featured: true,
      },
    ],
    education,
    certifications: [],
    awards: [],
  };
}

/**
 * Generates a clean, standalone, portable HTML file containing the entire portfolio
 */
export function generateStandaloneHtml(profile: PortfolioProfile, themeName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(profile.name)} - Portfolio</title>
  <meta name="description" content="${escapeHtml(profile.headline)}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Newsreader:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .serif-title { font-family: 'Newsreader', serif; }
    .code-font { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-indigo-500 selection:text-white">
  <header class="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
    <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#about" class="font-bold text-lg tracking-tight text-white">${escapeHtml(profile.name)}</a>
      <nav class="hidden sm:flex items-center gap-6 text-sm text-slate-400 font-medium">
        <a href="#projects" class="hover:text-white transition-colors">Projects</a>
        <a href="#experience" class="hover:text-white transition-colors">Experience</a>
        <a href="#skills" class="hover:text-white transition-colors">Skills</a>
      </nav>
      <a href="mailto:${escapeHtml(profile.email)}" class="px-4 py-2 text-xs font-semibold bg-white text-slate-950 rounded-full hover:bg-slate-200 transition-colors">Get in Touch</a>
    </div>
  </header>

  <main class="max-w-5xl mx-auto px-6 py-16 space-y-24">
    <!-- Hero Section -->
    <section id="about" class="pt-8">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Available for exciting opportunities
      </div>
      <h1 class="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-2 leading-tight">
        ${escapeHtml(profile.name)}
      </h1>
      <p class="text-xl sm:text-2xl font-semibold text-indigo-400 mb-4">
        ${escapeHtml(profile.headline)}
      </p>
      <p class="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-8">
        ${escapeHtml(profile.bio)}
      </p>
      <div class="flex flex-wrap items-center gap-4 text-sm text-slate-300">
        ${profile.email ? `<a href="mailto:${escapeHtml(profile.email)}" class="hover:text-white underline underline-offset-4">${escapeHtml(profile.email)}</a>` : ''}
        ${profile.location ? `<span>• ${escapeHtml(profile.location)}</span>` : ''}
        ${profile.github ? `<a href="${escapeHtml(profile.github)}" target="_blank" class="hover:text-white underline underline-offset-4">GitHub</a>` : ''}
        ${profile.linkedin ? `<a href="${escapeHtml(profile.linkedin)}" target="_blank" class="hover:text-white underline underline-offset-4">LinkedIn</a>` : ''}
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight text-white border-b border-slate-800 pb-4">Featured Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${profile.projects.map((proj) => `
          <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-4">
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-white">${escapeHtml(proj.title)}</h3>
              ${proj.tagline ? `<p class="text-xs text-indigo-400 font-medium">${escapeHtml(proj.tagline)}</p>` : ''}
              <p class="text-sm text-slate-400 leading-relaxed">${escapeHtml(proj.description)}</p>
            </div>
            <div class="space-y-4 pt-4 border-t border-slate-800/80">
              <div class="flex flex-wrap gap-1.5">
                ${proj.technologies.map((tech) => `<span class="px-2 py-0.5 text-xs rounded-md bg-slate-800/80 text-slate-300">${escapeHtml(tech)}</span>`).join('')}
              </div>
              <div class="flex items-center gap-4 text-xs font-semibold">
                ${proj.demoUrl ? `<a href="${escapeHtml(proj.demoUrl)}" target="_blank" class="text-white hover:underline">Live Preview ↗</a>` : ''}
                ${proj.githubUrl ? `<a href="${escapeHtml(proj.githubUrl)}" target="_blank" class="text-slate-400 hover:text-white">Source Code ↗</a>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight text-white border-b border-slate-800 pb-4">Work Experience</h2>
      <div class="space-y-12">
        ${profile.experiences.map((exp) => `
          <div class="relative pl-6 border-l-2 border-slate-800 space-y-3">
            <div class="flex flex-wrap items-baseline justify-between gap-2">
              <h3 class="text-xl font-semibold text-white">${escapeHtml(exp.role)} <span class="text-indigo-400 font-normal">@ ${escapeHtml(exp.company)}</span></h3>
              <span class="text-xs text-slate-400 code-font">${escapeHtml(exp.startDate)} – ${escapeHtml(exp.endDate)}</span>
            </div>
            ${exp.description ? `<p class="text-slate-400 text-sm">${escapeHtml(exp.description)}</p>` : ''}
            <ul class="space-y-2 text-sm text-slate-300 list-disc list-inside">
              ${exp.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}
            </ul>
            ${exp.technologies && exp.technologies.length > 0 ? `
              <div class="flex flex-wrap gap-2 pt-2">
                ${exp.technologies.map((t) => `<span class="px-2 py-0.5 text-xs rounded bg-slate-900 text-slate-400 border border-slate-800">${escapeHtml(t)}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight text-white border-b border-slate-800 pb-4">Skills & Capabilities</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${profile.skills.map((skillGroup) => `
          <div class="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
            <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider">${escapeHtml(skillGroup.category)}</h3>
            <div class="flex flex-wrap gap-2">
              ${skillGroup.items.map((item) => `<span class="px-2.5 py-1 text-xs rounded-lg bg-slate-800 text-slate-200">${escapeHtml(item)}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Education Section -->
    ${profile.education && profile.education.length > 0 ? `
      <section id="education" class="space-y-6">
        <h2 class="text-2xl font-bold tracking-tight text-white border-b border-slate-800 pb-4">Education & Academic Background</h2>
        <div class="space-y-4">
          ${profile.education.map((edu) => `
            <div class="flex flex-wrap items-baseline justify-between gap-2 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <div>
                <h3 class="text-base font-semibold text-white">${escapeHtml(edu.degree)}</h3>
                <p class="text-sm text-slate-400">${escapeHtml(edu.institution)}</p>
                ${edu.honors ? `<p class="text-xs text-indigo-400 mt-1">${escapeHtml(edu.honors)}</p>` : ''}
              </div>
              <span class="text-xs text-slate-400 code-font">${escapeHtml(edu.endDate)}</span>
            </div>
          `).join('')}
        </div>
      </section>
    ` : ''}

    <!-- Training & Certifications Section -->
    ${(profile.certifications?.length || profile.training?.length) ? `
      <section id="training" class="space-y-6">
        <h2 class="text-2xl font-bold tracking-tight text-white border-b border-slate-800 pb-4">Certifications & Training</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${(profile.certifications || []).map((c) => `
            <div class="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
              <div class="flex items-center justify-between gap-2">
                <h3 class="text-sm font-bold text-white">${escapeHtml(c.name)}</h3>
                ${c.issueDate ? `<span class="text-xs text-slate-400 code-font">${escapeHtml(c.issueDate)}</span>` : ''}
              </div>
              <p class="text-xs text-slate-400">${escapeHtml(c.issuer)}</p>
            </div>
          `).join('')}
          ${(profile.training || []).map((t) => `
            <div class="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
              <div class="flex items-center justify-between gap-2">
                <h3 class="text-sm font-bold text-white">${escapeHtml(t.program)}</h3>
                <span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">${escapeHtml(t.provider)}</span>
              </div>
              <p class="text-xs text-slate-400 leading-relaxed">${escapeHtml(t.description)}</p>
            </div>
          `).join('')}
        </div>
      </section>
    ` : ''}

    <!-- Leadership & Volunteering Section -->
    ${profile.volunteering && profile.volunteering.length > 0 ? `
      <section id="leadership" class="space-y-6">
        <h2 class="text-2xl font-bold tracking-tight text-white border-b border-slate-800 pb-4">Leadership & Volunteering</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${profile.volunteering.map((v) => `
            <div class="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1.5">
              <h3 class="text-sm font-bold text-white">${escapeHtml(v.role)}</h3>
              <p class="text-xs text-indigo-400 font-medium">${escapeHtml(v.organization)}</p>
              ${v.description ? `<p class="text-xs text-slate-400 leading-relaxed pt-1">${escapeHtml(v.description)}</p>` : ''}
            </div>
          `).join('')}
        </div>
      </section>
    ` : ''}

    <!-- Contact CTA Section -->
    <section id="contact" class="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-center space-y-6">
      <h2 class="text-3xl sm:text-4xl font-bold text-white">Let's build something remarkable together</h2>
      <p class="text-slate-400 max-w-xl mx-auto text-base">
        Whether you have an upcoming opening, a challenging project, or just want to connect, my inbox is always open.
      </p>
      <div class="pt-2">
        <a href="mailto:${escapeHtml(profile.email)}" class="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold bg-white text-slate-950 hover:bg-slate-200 transition-all shadow-lg">
          Send Message to ${escapeHtml(profile.email)}
        </a>
      </div>
    </section>
  </main>

  <footer class="border-t border-slate-900 py-8 text-center text-xs text-slate-600">
    <p>© ${new Date().getFullYear()} ${escapeHtml(profile.name)}. Crafted with Portfolio Studio.</p>
  </footer>
</body>
</html>`;
}

function escapeHtml(str?: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
