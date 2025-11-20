import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PortfolioItem } from '../types';

const portfolioData: PortfolioItem[] = [
  {
    id: '1',
    clientName: 'TechNews Portal',
    websiteType: 'High Traffic Blog',
    beforeScore: 34,
    afterScore: 98,
    loadTimeBefore: '6.2s',
    loadTimeAfter: '0.8s',
    description: 'Reduced DOM size by 40% and implemented advanced caching strategies.',
    imageUrl: 'https://picsum.photos/600/400?random=1'
  },
  {
    id: '2',
    clientName: 'LuxeEcom Store',
    websiteType: 'WooCommerce',
    beforeScore: 22,
    afterScore: 94,
    loadTimeBefore: '8.5s',
    loadTimeAfter: '1.2s',
    description: 'Optimized WooCommerce scripts and deferred cart fragments.',
    imageUrl: 'https://picsum.photos/600/400?random=2'
  },
  {
    id: '3',
    clientName: 'Corp Agency',
    websiteType: 'Elementor Site',
    beforeScore: 45,
    afterScore: 99,
    loadTimeBefore: '4.1s',
    loadTimeAfter: '0.6s',
    description: 'Removed unused CSS/JS from Elementor and served assets via CDN.',
    imageUrl: 'https://picsum.photos/600/400?random=3'
  }
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 bg-tech-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Proven Results</h2>
          <p className="text-slate-400">Numbers don't lie. Here are real comparisons from recent client projects.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Case Study Carousel (Simplified to list for single page) */}
          <div className="space-y-8">
            {portfolioData.map((item) => (
              <div key={item.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-speed/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{item.clientName}</h3>
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{item.websiteType}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-speed">{item.afterScore}</div>
                    <div className="text-xs text-slate-500">Google Score</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-900/50 p-3 rounded border border-slate-700/50">
                    <div className="text-xs text-slate-500">Before</div>
                    <div className="text-red-400 font-mono">{item.loadTimeBefore}</div>
                  </div>
                  <div className="bg-speed/10 p-3 rounded border border-speed/20">
                    <div className="text-xs text-speed">After</div>
                    <div className="text-speed font-bold font-mono">{item.loadTimeAfter}</div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Right Column: Visual Chart */}
          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-6 text-center">Average Performance Gain</h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={portfolioData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="clientName" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    cursor={{fill: 'transparent'}}
                  />
                  <Bar dataKey="beforeScore" name="Before Score" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                  <Bar dataKey="afterScore" name="After Score" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={30}>
                    {
                      portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#22c55e" />
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center mt-6 space-x-8">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                <span className="text-sm text-slate-400">Before Optimization</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-speed mr-2"></span>
                <span className="text-sm text-slate-400">After Optimization</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;