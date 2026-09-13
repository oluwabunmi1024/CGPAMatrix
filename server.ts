import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// CV Analysis Endpoint using Gemini 3.8 Flash
app.post('/api/analyze-cv', async (req, res) => {
  try {
    const { cvText } = req.body;

    if (!cvText || typeof cvText !== 'string' || cvText.trim().length === 0) {
      return res.status(400).json({ error: 'CV content is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'Gemini API key is not configured on the server. Please check the Secrets panel.',
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `You are an expert executive resume analyst and senior web portfolio designer. 
Analyze the provided Curriculum Vitae (CV) or Resume text, extract all key details accurately, and optimize the summaries, headlines, and project descriptions for a high-impact, professional web portfolio.

If information is missing (such as social links or project demo URLs), leave them as empty strings rather than making them up. For skills, organize them into logical categories (e.g., "Languages", "Frameworks & Libraries", "Cloud & DevOps", "Design & Tools", "Leadership"). Ensure bullet points in experience and projects are action-oriented, metrics-driven, and engaging.

CV TEXT:
"""
${cvText.slice(0, 30000)}
"""`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You extract and structure resumes into clean, comprehensive JSON for professional portfolio websites. Always return valid JSON adhering strictly to the schema.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: 'Full Name of the candidate' },
            headline: { type: Type.STRING, description: 'Professional title or headline, e.g. "Senior Full-Stack Engineer & Systems Architect"' },
            bio: { type: Type.STRING, description: 'Engaging, professional 2-4 sentence introduction/summary' },
            email: { type: Type.STRING, description: 'Contact email' },
            phone: { type: Type.STRING, description: 'Contact phone number' },
            location: { type: Type.STRING, description: 'Location, e.g. "San Francisco, CA" or "London, UK"' },
            website: { type: Type.STRING, description: 'Personal website or portfolio URL' },
            github: { type: Type.STRING, description: 'GitHub profile URL or username' },
            linkedin: { type: Type.STRING, description: 'LinkedIn profile URL' },
            twitter: { type: Type.STRING, description: 'Twitter / X or other social link' },
            skills: {
              type: Type.ARRAY,
              description: 'Categorized skill sets',
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING, description: 'Category name, e.g. "Frontend", "Cloud & Infra"' },
                  items: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'List of individual skills',
                  },
                },
                required: ['category', 'items'],
              },
            },
            experiences: {
              type: Type.ARRAY,
              description: 'Work history in reverse chronological order',
              items: {
                type: Type.OBJECT,
                properties: {
                  role: { type: Type.STRING, description: 'Job title' },
                  company: { type: Type.STRING, description: 'Company or organization name' },
                  location: { type: Type.STRING, description: 'City/State/Country or Remote' },
                  startDate: { type: Type.STRING, description: 'Start date, e.g. "Jan 2022"' },
                  endDate: { type: Type.STRING, description: 'End date, e.g. "Present" or "Dec 2023"' },
                  description: { type: Type.STRING, description: 'High level summary of the role' },
                  highlights: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Bullet points with measurable achievements',
                  },
                  technologies: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Key tools and technologies used',
                  },
                },
                required: ['role', 'company', 'startDate', 'endDate', 'highlights'],
              },
            },
            projects: {
              type: Type.ARRAY,
              description: 'Key notable projects or portfolio items',
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: 'Project title' },
                  tagline: { type: Type.STRING, description: 'One-sentence concise pitch' },
                  description: { type: Type.STRING, description: 'Detailed description of the project and impact' },
                  technologies: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Technologies used in the project',
                  },
                  demoUrl: { type: Type.STRING, description: 'Live preview or demo URL if any' },
                  githubUrl: { type: Type.STRING, description: 'Source code repository if any' },
                  highlights: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Key achievements or metrics from this project',
                  },
                },
                required: ['title', 'description', 'technologies'],
              },
            },
            education: {
              type: Type.ARRAY,
              description: 'Academic background',
              items: {
                type: Type.OBJECT,
                properties: {
                  degree: { type: Type.STRING, description: 'Degree and field of study' },
                  institution: { type: Type.STRING, description: 'University or College name' },
                  startDate: { type: Type.STRING, description: 'Start date/year' },
                  endDate: { type: Type.STRING, description: 'Graduation date/year' },
                  honors: { type: Type.STRING, description: 'GPA, honors, or noteworthy activities' },
                },
                required: ['degree', 'institution', 'endDate'],
              },
            },
            certifications: {
              type: Type.ARRAY,
              description: 'Professional certificates or licenses',
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: 'Certificate title' },
                  issuer: { type: Type.STRING, description: 'Issuing organization' },
                  issueDate: { type: Type.STRING, description: 'Date or year acquired' },
                  url: { type: Type.STRING, description: 'Verification credential URL if available' },
                },
                required: ['name', 'issuer'],
              },
            },
            awards: {
              type: Type.ARRAY,
              description: 'Key awards, honors, publications, or patents',
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: 'Award title' },
                  issuer: { type: Type.STRING, description: 'Issuing body or event' },
                  date: { type: Type.STRING, description: 'Date or year' },
                  description: { type: Type.STRING, description: 'Context or brief description' },
                },
                required: ['title', 'issuer'],
              },
            },
          },
          required: ['name', 'headline', 'bio', 'skills', 'experiences'],
        },
      },
    });

    const parsedData = JSON.parse(response.text?.trim() || '{}');
    return res.json({ success: true, portfolio: parsedData });
  } catch (error: any) {
    console.error('Error analyzing CV with Gemini:', error);
    return res.status(500).json({
      error: error.message || 'Failed to analyze CV with Gemini model.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
