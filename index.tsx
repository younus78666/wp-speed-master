import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import SpeedAdvisor from './components/SpeedAdvisor';
import Contact from './components/Contact';
import { NavSection } from './types';

// This allows us to mount specific components if their ID is present on the page
const widgetMountPoints = [
  { id: 'wpsm-hero', Component: Hero, isWidget: true },
  { id: 'wpsm-services', Component: Services, isWidget: true },
  { id: 'wpsm-portfolio', Component: Portfolio, isWidget: true },
  { id: 'wpsm-advisor', Component: SpeedAdvisor, isWidget: true },
  { id: 'wpsm-contact', Component: Contact, isWidget: true },
];

let mountedWidget = false;

// 1. Check for individual widgets (Elementor Mode)
widgetMountPoints.forEach(({ id, Component, isWidget }) => {
  const element = document.getElementById(id);
  if (element) {
    const root = ReactDOM.createRoot(element);
    
    // Extract data attributes to pass as props (for Elementor editing)
    const props = { ...element.dataset };
    
    // If it's the Hero widget, we need to mock the scrollToSection function since Header isn't there
    const widgetProps = isWidget ? {
      ...props,
      scrollToSection: (section: NavSection) => {
        const target = document.getElementById(`wpsm-${section}`) || document.getElementById(section);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    } : props;

    root.render(
      <React.StrictMode>
        {/* Wrap in a div to ensure Tailwind styles apply correctly within the widget area */}
        <div className="bg-tech-dark text-white antialiased">
          {/* @ts-ignore - dynamically passing props */}
          <Component {...widgetProps} />
        </div>
      </React.StrictMode>
    );
    mountedWidget = true;
  }
});

// 2. Fallback: If no widgets found, look for the main root (Stand-alone App Mode)
const rootElement = document.getElementById('root');
if (rootElement && !mountedWidget) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
