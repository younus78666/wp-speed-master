import React from 'react';
import { NavSection } from '../types';
import { ArrowRight, Gauge } from 'lucide-react';

interface HeroProps {
  scrollToSection: (section: NavSection) => void;
  title?: string;
  subtitle?: string;
}

const Hero: React.FC<HeroProps> = ({ 
  scrollToSection, 
  title = "Don't Let a Slow Site Kill Your Business.",
  subtitle = "I transform sluggish WordPress websites into high-performance machines. Achieve 90+ PageSpeed scores, pass Core Web Vitals, and boost your SEO rankings."
}) => {
  
  // Helper to parse title if it contains HTML or specific markers (simple version)
  const renderTitle = () => {
    // Check if we want to highlight "Slow Site" (default behavior)
    if (title.includes("Slow Site")) {
      const parts = title.split("Slow Site");
      return (
        <>
          {parts[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">Slow Site</span> {parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-tech-dark">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-speed/10 rounded-full blur-3xl mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl mix-blend-screen"></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-speed text-sm font-medium mb-4">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-speed opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-speed"></span>
              </span>
              Accepting New Clients for {new Date().getFullYear()}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tighter">
              {renderTitle()}
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {subtitle.split("90+ PageSpeed scores").length > 1 ? (
                <>
                  {subtitle.split("90+ PageSpeed scores")[0]}
                  <span className="text-speed font-semibold">90+ PageSpeed scores</span>
                  {subtitle.split("90+ PageSpeed scores")[1]}
                </>
              ) : subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => scrollToSection(NavSection.PORTFOLIO)}
                className="px-8 py-4 bg-speed hover:bg-speed-dark text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center justify-center"
              >
                See My Results <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => scrollToSection(NavSection.ADVISOR)}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all flex items-center justify-center"
              >
                Consult AI Expert
              </button>
            </div>
          </div>

          {/* Visual Content - Speedometer Graphic */}
          <div className="flex-1 relative w-full max-w-lg">
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl transform lg:rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-4 -right-4 bg-speed text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Guaranteed
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <span className="text-slate-400 flex items-center"><Gauge className="mr-2 h-4 w-4" /> Performance</span>
                  <span className="text-4xl font-bold text-speed">98</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-800/50 p-3 rounded-lg">
                    <div className="text-xs text-slate-500 mb-1">LCP</div>
                    <div className="text-speed font-semibold">0.8s</div>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-lg">
                    <div className="text-xs text-slate-500 mb-1">TBT</div>
                    <div className="text-speed font-semibold">0ms</div>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-lg">
                    <div className="text-xs text-slate-500 mb-1">CLS</div>
                    <div className="text-speed font-semibold">0.00</div>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 space-y-2">
                  <div className="flex items-center text-speed"><span className="mr-2">✔</span> Removing unused CSS...</div>
                  <div className="flex items-center text-speed"><span className="mr-2">✔</span> Deferring JS execution...</div>
                  <div className="flex items-center text-speed"><span className="mr-2">✔</span> Compressing images (WebP)...</div>
                  <div className="flex items-center text-speed animate-pulse"><span className="mr-2">➜</span> Preloading critical assets...</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;