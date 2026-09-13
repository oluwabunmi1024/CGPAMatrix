import { PortfolioProfile } from '../types';

export const sampleEngineeringProfile: PortfolioProfile = {
  name: 'Marcus Vance',
  headline: 'Staff Software Engineer & Distributed Systems Architect',
  bio: 'Specializing in resilient cloud-native architectures, high-throughput microservices, and modern web applications. Passionate about developer tooling, performance engineering, and mentoring technical teams.',
  email: 'marcus.vance@example.dev',
  phone: '+1 (415) 890-2144',
  location: 'San Francisco, CA (Open to Remote)',
  website: 'https://marcusvance.dev',
  github: 'https://github.com/marcusvance',
  linkedin: 'https://linkedin.com/in/marcusvance',
  twitter: 'https://twitter.com/marcusvance_dev',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  availableForWork: true,
  yearsOfExperience: '8+ years',
  skills: [
    {
      category: 'Languages & Core',
      items: ['TypeScript', 'Go', 'Python', 'Rust (Intermediate)', 'SQL', 'GraphQL'],
    },
    {
      category: 'Frontend & UI',
      items: ['React 19', 'Next.js', 'Tailwind CSS', 'WebSockets', 'Vite', 'Design Systems'],
    },
    {
      category: 'Backend & Cloud',
      items: ['Node.js', 'Distributed Caching', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'Google Cloud Platform (GCP)', 'AWS'],
    },
    {
      category: 'Architecture & Practices',
      items: ['Event-Driven Design', 'CI/CD Pipelines', 'Microservices', 'Zero-Downtime Deployments', 'Observability (OpenTelemetry)'],
    },
  ],
  experiences: [
    {
      role: 'Staff Infrastructure Engineer',
      company: 'Aether Cloud Systems',
      location: 'San Francisco, CA',
      startDate: '2022',
      endDate: 'Present',
      description: 'Lead architect for global event streaming pipeline processing 4.2B daily telemetry events.',
      highlights: [
        'Spearheaded migration of legacy message queues to Kafka cluster, reducing average message latency by 64% and cloud compute spend by $180k/yr.',
        'Architected automated regional failover system guaranteeing 99.995% uptime across US and EU data centers.',
        'Mentored 12 mid-level and senior engineers; established RFC review process adopted engineering-wide across 80+ developers.',
      ],
      technologies: ['Go', 'Kafka', 'Kubernetes', 'GCP', 'PostgreSQL', 'Terraform'],
    },
    {
      role: 'Senior Full-Stack Engineer',
      company: 'Hyperion Analytics',
      location: 'New York, NY (Remote)',
      startDate: '2019',
      endDate: '2022',
      description: 'Core member of the data visualization and real-time dashboarding team.',
      highlights: [
        'Rebuilt customer-facing analytical dashboard from scratch using React and Canvas, rendering 100k+ data points with 60 FPS fluidity.',
        'Created server-side query aggregation layer caching complex OLAP responses in Redis, trimming P95 load time from 4.8s to 240ms.',
        'Collaborated directly with enterprise clients to implement custom SSO (SAML 2.0 / Okta) and audit log retention.',
      ],
      technologies: ['TypeScript', 'React', 'Node.js', 'Redis', 'Docker', 'GraphQL'],
    },
    {
      role: 'Software Engineer',
      company: 'NextGen Fintech Labs',
      location: 'Boston, MA',
      startDate: '2017',
      endDate: '2019',
      description: 'Built customer onboarding workflows and automated fraud detection pipelines.',
      highlights: [
        'Developed KYC verification microservice with automated document OCR parsing, expediting account approval from 48 hours to under 3 minutes.',
        'Implemented PCI-DSS compliant credit card vaulting with tokenization and end-to-end encryption.',
      ],
      technologies: ['Python', 'Django', 'PostgreSQL', 'AWS Lambda', 'React'],
    },
  ],
  projects: [
    {
      title: 'StreamPulse',
      tagline: 'High-throughput distributed log indexing engine for Kubernetes clusters',
      description: 'An open-source, lightweight log shipping and streaming service built in Go with Raft consensus. Enables sub-second log querying across ephemeral pods with zero external dependencies.',
      technologies: ['Go', 'gRPC', 'Raft', 'Kubernetes', 'React UI'],
      demoUrl: 'https://streampulse.dev',
      githubUrl: 'https://github.com/marcusvance/streampulse',
      highlights: ['Over 1.8k GitHub stars', 'Benchmarks show 3x throughput compared to Fluentbit in memory-constrained environments'],
      featured: true,
    },
    {
      title: 'QuantaGrid',
      tagline: 'Fast headless data-grid component for ultra-dense financial data',
      description: 'Virtual scrolling grid built for React capable of rendering 1 million rows with zero DOM lag, multi-column sorting, formula evaluation, and custom column renderers.',
      technologies: ['TypeScript', 'React', 'Web Workers', 'CSS Grid'],
      demoUrl: 'https://quantagrid.example.com',
      githubUrl: 'https://github.com/marcusvance/quantagrid',
      highlights: ['Sub-16ms re-render cycles even during rapid WebSocket state surges'],
      featured: true,
    },
    {
      title: 'SentinelGuard',
      tagline: 'CLI & GitHub Action for scanning infrastructure-as-code for secret leaks',
      description: 'Zero-config security linter checking Terraform, Kubernetes YAML, and Dockerfiles for unencrypted credentials, permissive security groups, and CVE vulnerabilities.',
      technologies: ['Rust', 'AST Parsing', 'GitHub Actions', 'Docker'],
      demoUrl: 'https://sentinelguard.io',
      githubUrl: 'https://github.com/marcusvance/sentinelguard',
      highlights: ['Adopted by 45+ open-source projects with over 80,000 weekly Docker pulls'],
      featured: false,
    },
  ],
  education: [
    {
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      startDate: '2013',
      endDate: '2017',
      honors: 'Magna Cum Laude • Specialization in Computer Systems & Algorithms',
    },
  ],
  certifications: [
    {
      name: 'Google Cloud Certified Professional Cloud Architect',
      issuer: 'Google Cloud',
      issueDate: '2023',
    },
    {
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Linux Foundation / CNCF',
      issueDate: '2022',
    },
  ],
  awards: [
    {
      title: 'Best Architecture Innovation Award',
      issuer: 'Aether Cloud Annual Engineering Summit',
      date: '2023',
      description: 'Awarded for pioneering the multi-region Kafka zero-downtime replication strategy.',
    },
  ],
};

export const sampleDesignProfile: PortfolioProfile = {
  name: 'Elena Rostova',
  headline: 'Principal Product Designer & Design Systems Lead',
  bio: 'Crafting intentional, human-centered digital experiences for complex workflows. 10 years leading design at high-growth tech startups and shaping design systems used by millions.',
  email: 'elena.rostova@designstudio.io',
  phone: '+1 (212) 555-0192',
  location: 'Brooklyn, New York',
  website: 'https://elenarostova.design',
  github: 'https://github.com/elenarostova',
  linkedin: 'https://linkedin.com/in/elenarostova',
  twitter: 'https://twitter.com/elena_design',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  availableForWork: true,
  yearsOfExperience: '10 years',
  skills: [
    {
      category: 'Product & UX',
      items: ['Design Strategy', 'User Research & Testing', 'Information Architecture', 'Interaction Design', 'Wireframing & Prototyping'],
    },
    {
      category: 'Design Systems',
      items: ['Figma Component Architecture', 'Design Tokens', 'Accessibility (WCAG AAA)', 'Documentation', 'Figma to React Handoff'],
    },
    {
      category: 'Tools & Technologies',
      items: ['Figma', 'FigJam', 'Principle', 'HTML/Tailwind CSS', 'Framer', 'Linear', 'Dovetail'],
    },
  ],
  experiences: [
    {
      role: 'Head of Product Design',
      company: 'Kinetix Workspace',
      location: 'New York, NY',
      startDate: '2021',
      endDate: 'Present',
      description: 'Lead a cross-functional team of 6 product designers, 2 UX researchers, and 1 design technologist.',
      highlights: [
        'Redesigned core collaborative canvas tool, improving new user 30-day retention by 28% and user NPS from +34 to +61.',
        'Unified 4 fragmented product suites into a cohesive design system named "Prism", cutting UI engineering delivery times by 40%.',
        'Conducted over 140 enterprise customer user testing interviews to guide executive product roadmap decisions.',
      ],
      technologies: ['Figma', 'Design Systems', 'User Research', 'React UI Sync'],
    },
    {
      role: 'Senior Product Designer',
      company: 'Monolith Financial',
      location: 'San Francisco, CA',
      startDate: '2018',
      endDate: '2021',
      description: 'Owned the mobile banking experience and international remittance flows.',
      highlights: [
        'Designed new cross-border transfer flow handling $450M in annual volume with a 99.4% task completion rate.',
        'Received the 2020 Red Dot Design Award for exceptional mobile interaction design in fintech.',
      ],
      technologies: ['Mobile UI', 'Figma', 'Rapid Prototyping', 'Design Tokens'],
    },
  ],
  projects: [
    {
      title: 'Prism Design System',
      tagline: 'Enterprise multi-brand design tokens & component architecture',
      description: 'A multi-brand, tokenized design system supporting Web, iOS, and Android platforms. Includes 70+ components, automated token synchronization into CSS variables, and complete WCAG AAA contrast compliance.',
      technologies: ['Figma', 'Tokens Studio', 'Tailwind CSS', 'Storybook'],
      demoUrl: 'https://prism-system.example.com',
      highlights: ['Supports 4 sub-brands and 18 products across 200+ engineers'],
      featured: true,
    },
    {
      title: 'Horizon Flow Analytics',
      tagline: 'Frictionless data query visualizer for non-technical teams',
      description: 'Reimagined how non-data analysts query corporate databases through visual block chaining and natural language exploration.',
      technologies: ['Interaction Design', 'Usability Testing', 'Data Viz'],
      demoUrl: 'https://horizon-flow.example.com',
      highlights: ['Adopted by 85 enterprise customer success and marketing teams'],
      featured: true,
    },
  ],
  education: [
    {
      degree: 'B.F.A. in Interaction Design & Human-Computer Interaction',
      institution: 'Rhode Island School of Design (RISD)',
      startDate: '2014',
      endDate: '2018',
      honors: 'Department Honors • Thesis on Accessible Dynamic Interfaces',
    },
  ],
  certifications: [
    {
      name: 'Nielsen Norman Group UX Master Certified',
      issuer: 'NN/g',
      issueDate: '2021',
    },
  ],
};

export const sampleRawCvText = `ALEXANDER WRIGHT
San Francisco, CA | (415) 555-0182 | alex.wright@workmail.io | linkedin.com/in/alexwright-tech | github.com/alexwright

PROFESSIONAL SUMMARY
Senior Full-Stack Engineer with 7+ years of experience delivering scalable distributed systems and responsive web applications. Proven track record improving core API latency by 45%, building real-time collaboration engines, and scaling cloud infrastructure to support millions of active users. Strong advocate for type safety, test-driven development, and clean UI engineering.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, Go, SQL, HTML5, CSS3
Frontend: React, Next.js, Tailwind CSS, Vue.js, Redux Toolkit, WebSockets
Backend: Node.js, Express, Fastify, PostgreSQL, Redis, MongoDB, GraphQL, REST APIs
DevOps & Cloud: AWS (ECS, S3, RDS, Lambda), Docker, Kubernetes, GitHub Actions, Terraform

PROFESSIONAL EXPERIENCE

Senior Software Engineer | CloudNexus Inc. | San Francisco, CA | 2021 - Present
- Architected and launched real-time collaboration canvas used by over 500,000 monthly active users, utilizing WebSockets and Redis Pub/Sub.
- Reduced database query times by 52% through query indexing, automated caching, and connection pooling.
- Led migration of legacy monolith to modular TypeScript services, cutting build and deployment pipeline times by 35%.
- Mentored 5 junior engineers and instituted team-wide code review standards and accessibility benchmarks.

Software Engineer | Apex FinTech Labs | San Jose, CA | 2018 - 2021
- Designed and maintained transactional ledger microservices processing over $12M daily in settlements.
- Built responsive customer portal using React and Tailwind CSS, increasing onboarding completion rate from 68% to 89%.
- Integrated automated end-to-end testing suite with Playwright and Jest, increasing code test coverage to 92%.

PROJECTS

OrbitDB CLI & Visualizer (github.com/alexwright/orbit-db)
- Open-source database management CLI and web inspection interface for developers.
- Features real-time schema diffing, visual query planning, and instant mock data generation.
- Over 1,200 GitHub stars and 20,000 npm downloads.

PulseHealth Mobile Web App (pulsehealth.live)
- Telehealth patient appointment scheduler and encrypted chat portal.
- HIPAA-compliant client-side encryption and instant video consultation integration.

EDUCATION
B.S. in Computer Science | University of Washington | Seattle, WA | 2014 - 2018
- Dean's List (6 semesters), President of ACM Student Chapter

CERTIFICATIONS
- AWS Certified Solutions Architect - Associate (2022)
- Meta Front-End Developer Professional Certificate (2021)`;
