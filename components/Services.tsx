import React from 'react';
import { Zap, Database, Image, Code, Server, Layout } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Core Web Vitals Fix',
    description: 'I specifically target LCP, FID/INP, and CLS issues to ensure your site passes Google’s validation.',
    iconName: 'Layout',
  },
  {
    id: '2',
    title: 'Code Optimization',
    description: 'Minifying CSS/JS, delaying non-critical scripts, and removing unused code bloat from Elementor/Divi.',
    iconName: 'Code',
  },
  {
    id: '3',
    title: 'Image Compression',
    description: 'Bulk converting images to WebP, setting up proper lazy-loading, and fixing adaptive sizing attributes.',
    iconName: 'Image',
  },
  {
    id: '4',
    title: 'Database Cleanup',
    description: 'Removing transient data, optimizing tables, and clearing post revisions to speed up backend queries.',
    iconName: 'Database',
  },
  {
    id: '5',
    title: 'Server-Side Caching',
    description: 'Configuring Redis/Memcached, Varnish, and ensuring your host is delivering content instantly.',
    iconName: 'Server',
  },
  {
    id: '6',
    title: 'CDN Integration',
    description: 'Setting up Cloudflare or BunnyCDN to serve your assets from edge locations closest to your users.',
    iconName: 'Zap',
  },
];

const iconMap = {
  Zap, Database, Image, Code, Server, Layout
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-slate-900 relative">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How I Achieve Speed</h2>
          <p className="text-slate-400">
            Optimization isn't just installing a plugin. It's a surgical process of removing bloat and fine-tuning server responses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.iconName];
            return (
              <div key={service.id} className="group bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-speed/50 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-6 group-hover:bg-speed group-hover:text-white transition-colors text-speed">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
       </div>
    </section>
  );
};

export default Services;