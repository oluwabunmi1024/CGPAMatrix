import { useState } from 'react';
import {
  PortfolioProfile,
  PortfolioTheme,
  AccentColor,
  SectionVisibility,
} from './types';
import { otitologbonProfile } from './data/userProfile';
import { LivePortfolio } from './components/LivePortfolio';

export default function App() {
  const [profile] = useState<PortfolioProfile>(otitologbonProfile);
  const [theme, setTheme] = useState<PortfolioTheme>('minimal');
  const [accent, setAccent] = useState<AccentColor>('blue');

  const [visibility] = useState<SectionVisibility>({
    about: true,
    experience: true,
    projects: true,
    skills: true,
    education: true,
    certifications: true,
    leadership: true,
    contact: true,
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <main className="flex-1 w-full">
        <LivePortfolio
          profile={profile}
          theme={theme}
          accent={accent}
          visibility={visibility}
          onSelectTheme={setTheme}
          onSelectAccent={setAccent}
        />
      </main>
    </div>
  );
}