import React, { useState, useEffect } from 'react';
import { Zap, Menu, X } from 'lucide-react';
import { NavSection } from '../types';

interface HeaderProps {
  activeSection: NavSection;
  scrollToSection: (section: NavSection) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: NavSection.HOME, label: 'Home' },
    { id: NavSection.SERVICES, label: 'Services' },
    { id: NavSection.PORTFOLIO, label: 'Results' },
    { id: NavSection.ADVISOR, label: 'AI Audit' },
    { id: NavSection.CONTACT, label: 'Hire Me' },
  ];

  const handleNavClick = (id: NavSection) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled ? 'bg-tech-dark/90 backdrop-blur-md border-slate-800 py-3 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer group" 
          onClick={() => handleNavClick(NavSection.HOME)}
        >
          <div className="bg-speed/10 p-2 rounded-full border border-speed/20 group-hover:border-speed/50 transition-colors">
            <Zap className="h-6 w-6 text-speed" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            WP<span className="text-speed">Speed</span>Master
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition-colors duration-200 hover:text-speed ${
                activeSection === item.id ? 'text-speed' : 'text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-tech-dark border-b border-slate-800 p-4 shadow-2xl">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-2 rounded-lg ${
                  activeSection === item.id ? 'bg-speed/10 text-speed' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;