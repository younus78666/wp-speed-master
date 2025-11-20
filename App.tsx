import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import SpeedAdvisor from './components/SpeedAdvisor';
import Contact from './components/Contact';
import { NavSection } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>(NavSection.HOME);

  const scrollToSection = (section: NavSection) => {
    setActiveSection(section);
    const element = document.getElementById(section === NavSection.HOME ? 'root' : section);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-tech-dark text-white selection:bg-speed selection:text-white">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      
      <main>
        <Hero scrollToSection={scrollToSection} />
        <Services />
        <Portfolio />
        <SpeedAdvisor />
        <Contact />
      </main>

      <footer className="bg-slate-950 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} WPSpeedMaster. All rights reserved.</p>
          <p className="mt-2">Achieving 90+ PageSpeed, one site at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;