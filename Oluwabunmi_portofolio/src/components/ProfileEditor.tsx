import React, { useState } from 'react';
import {
  User,
  Briefcase,
  Code,
  Sparkles,
  BookOpen,
  Plus,
  Trash2,
  Sliders,
  ChevronRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  PortfolioProfile,
  SectionVisibility,
  WorkExperience,
  ProjectItem,
  SkillCategory,
} from '../types';

interface ProfileEditorProps {
  profile: PortfolioProfile;
  onChange: (updated: PortfolioProfile) => void;
  visibility: SectionVisibility;
  onVisibilityChange: (updated: SectionVisibility) => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({
  profile,
  onChange,
  visibility,
  onVisibilityChange,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'projects' | 'skills' | 'sections'>('profile');

  // Update top-level text field
  const updateField = (field: keyof PortfolioProfile, value: any) => {
    onChange({
      ...profile,
      [field]: value,
    });
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: WorkExperience = {
      role: 'Senior Role Title',
      company: 'Company Name',
      location: 'City, Country',
      startDate: '2023',
      endDate: 'Present',
      description: 'Key responsibilities and achievements in this role.',
      highlights: ['Delivered high-impact initiative resulting in measurable metric improvement.'],
      technologies: ['TypeScript', 'React'],
    };
    onChange({
      ...profile,
      experiences: [newExp, ...profile.experiences],
    });
  };

  const updateExperience = (index: number, updated: WorkExperience) => {
    const next = [...profile.experiences];
    next[index] = updated;
    onChange({ ...profile, experiences: next });
  };

  const removeExperience = (index: number) => {
    const next = profile.experiences.filter((_, i) => i !== index);
    onChange({ ...profile, experiences: next });
  };

  // Project handlers
  const addProject = () => {
    const newProj: ProjectItem = {
      title: 'New Featured Project',
      tagline: 'Concise project value proposition',
      description: 'Detailed description of the architectural decisions, problem solved, and technical outcomes.',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      highlights: ['High throughput and sub-second latency'],
      featured: true,
    };
    onChange({
      ...profile,
      projects: [newProj, ...profile.projects],
    });
  };

  const updateProject = (index: number, updated: ProjectItem) => {
    const next = [...profile.projects];
    next[index] = updated;
    onChange({ ...profile, projects: next });
  };

  const removeProject = (index: number) => {
    const next = profile.projects.filter((_, i) => i !== index);
    onChange({ ...profile, projects: next });
  };

  // Skill category handlers
  const updateSkillCategory = (index: number, updated: SkillCategory) => {
    const next = [...profile.skills];
    next[index] = updated;
    onChange({ ...profile, skills: next });
  };

  const addSkillCategory = () => {
    onChange({
      ...profile,
      skills: [
        ...profile.skills,
        { category: 'New Competency Group', items: ['Skill 1', 'Skill 2', 'Skill 3'] },
      ],
    });
  };

  const removeSkillCategory = (index: number) => {
    onChange({
      ...profile,
      skills: profile.skills.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="h-full bg-neutral-900 border-r border-neutral-800 flex flex-col text-neutral-200">
      {/* Tab Navigation */}
      <div className="flex items-center gap-1 p-2 border-b border-neutral-800 bg-neutral-950/50 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'profile' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Bio & Info</span>
        </button>
        <button
          onClick={() => setActiveTab('experience')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'experience' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Experience ({profile.experiences.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'projects' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>Projects ({profile.projects.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'skills' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Skills</span>
        </button>
        <button
          onClick={() => setActiveTab('sections')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'sections' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Visibility</span>
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">General Information</h3>

            <div>
              <label className="block text-neutral-400 font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-neutral-400 font-medium mb-1">Professional Title / Headline</label>
              <input
                type="text"
                value={profile.headline}
                onChange={(e) => updateField('headline', e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-neutral-400 font-medium mb-1">Professional Summary / Bio</label>
              <textarea
                rows={4}
                value={profile.bio}
                onChange={(e) => updateField('bio', e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Phone</label>
                <input
                  type="text"
                  value={profile.phone || ''}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={profile.location || ''}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Website URL</label>
                <input
                  type="text"
                  value={profile.website || ''}
                  onChange={(e) => updateField('website', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 font-medium mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={profile.github || ''}
                  onChange={(e) => updateField('github', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-neutral-400 font-medium mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={profile.linkedin || ''}
                  onChange={(e) => updateField('linkedin', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="available-work-checkbox"
                checked={profile.availableForWork ?? true}
                onChange={(e) => updateField('availableForWork', e.target.checked)}
                className="w-4 h-4 rounded border-neutral-700 bg-neutral-950 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="available-work-checkbox" className="text-neutral-300 font-medium">
                Show &ldquo;Available for opportunities&rdquo; status badge
              </label>
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Work History</h3>
              <button
                onClick={addExperience}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Role</span>
              </button>
            </div>

            <div className="space-y-6">
              {profile.experiences.map((exp, idx) => (
                <div key={idx} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Role #{idx + 1}</span>
                    <button
                      onClick={() => removeExperience(idx)}
                      className="text-neutral-500 hover:text-red-400 p-1 rounded transition-colors"
                      title="Remove Role"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-neutral-400 font-medium mb-1">Role Title</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(idx, { ...exp, role: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 font-medium mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(idx, { ...exp, company: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-neutral-400 font-medium mb-1">Dates</label>
                      <input
                        type="text"
                        value={`${exp.startDate} - ${exp.endDate}`}
                        onChange={(e) => {
                          const parts = e.target.value.split('-');
                          updateExperience(idx, {
                            ...exp,
                            startDate: parts[0]?.trim() || '',
                            endDate: parts[1]?.trim() || 'Present',
                          });
                        }}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 font-medium mb-1">Location</label>
                      <input
                        type="text"
                        value={exp.location || ''}
                        onChange={(e) => updateExperience(idx, { ...exp, location: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-400 font-medium mb-1">Bullet Achievements (one per line)</label>
                    <textarea
                      rows={3}
                      value={exp.highlights.join('\n')}
                      onChange={(e) =>
                        updateExperience(idx, {
                          ...exp,
                          highlights: e.target.value.split('\n').filter(Boolean),
                        })
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 font-medium mb-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={(exp.technologies || []).join(', ')}
                      onChange={(e) =>
                        updateExperience(idx, {
                          ...exp,
                          technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                        })
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-white font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Project Showcase</h3>
              <button
                onClick={addProject}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-6">
              {profile.projects.map((proj, idx) => (
                <div key={idx} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Project #{idx + 1}</span>
                    <button
                      onClick={() => removeProject(idx)}
                      className="text-neutral-500 hover:text-red-400 p-1 rounded transition-colors"
                      title="Remove Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-neutral-400 font-medium mb-1">Project Title</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateProject(idx, { ...proj, title: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 font-medium mb-1">Tagline / Short Pitch</label>
                    <input
                      type="text"
                      value={proj.tagline || ''}
                      onChange={(e) => updateProject(idx, { ...proj, tagline: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 font-medium mb-1">Detailed Description</label>
                    <textarea
                      rows={3}
                      value={proj.description}
                      onChange={(e) => updateProject(idx, { ...proj, description: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-neutral-400 font-medium mb-1">Live Demo URL</label>
                      <input
                        type="text"
                        value={proj.demoUrl || ''}
                        onChange={(e) => updateProject(idx, { ...proj, demoUrl: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 font-medium mb-1">Source Code / GitHub</label>
                      <input
                        type="text"
                        value={proj.githubUrl || ''}
                        onChange={(e) => updateProject(idx, { ...proj, githubUrl: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-400 font-medium mb-1">Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={proj.technologies.join(', ')}
                      onChange={(e) =>
                        updateProject(idx, {
                          ...proj,
                          technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                        })
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-white font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Skill Categories</h3>
              <button
                onClick={addSkillCategory}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="space-y-4">
              {profile.skills.map((category, idx) => (
                <div key={idx} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={category.category}
                      onChange={(e) => updateSkillCategory(idx, { ...category, category: e.target.value })}
                      className="bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1 text-white font-semibold"
                    />
                    <button
                      onClick={() => removeSkillCategory(idx)}
                      className="text-neutral-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-neutral-400 text-[11px] mb-1">Skills (comma separated)</label>
                    <textarea
                      rows={2}
                      value={category.items.join(', ')}
                      onChange={(e) =>
                        updateSkillCategory(idx, {
                          ...category,
                          items: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-white font-mono text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visibility Tab */}
        {activeTab === 'sections' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Section Visibility Controls</h3>
            <p className="text-neutral-400 text-xs">Toggle which sections appear on your published portfolio.</p>

            <div className="space-y-2 pt-2">
              {(Object.keys(visibility) as (keyof SectionVisibility)[]).map((key) => (
                <div
                  key={key}
                  onClick={() => onVisibilityChange({ ...visibility, [key]: !visibility[key] })}
                  className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 cursor-pointer transition-colors"
                >
                  <span className="capitalize font-medium text-white">{key} Section</span>
                  <div className="flex items-center gap-2">
                    {visibility[key] ? (
                      <span className="text-emerald-400 flex items-center gap-1 text-xs">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Visible</span>
                      </span>
                    ) : (
                      <span className="text-neutral-500 flex items-center gap-1 text-xs">
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hidden</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
