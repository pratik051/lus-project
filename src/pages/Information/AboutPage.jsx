import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Compass, Sparkles, Feather } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          The Atelier Story
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
          Understated Essentials, Crafted with Quiet Intention
        </h1>
        <p className="text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed">
          LuxStore was established in Milan with a singular commitment: stripping away ornamental excess to focus purely on tactile materiality, human-centered comfort, and honest European manufacturing.
        </p>
      </div>

      {/* Image Banner */}
      <div className="rounded-xl overflow-hidden border border-surface-variant h-72 sm:h-96 relative bg-surface-container">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj05OOw6iiV4tBGwG8Y9lrjRrMR5umDsU9Vh5f5pQavkFFt4pItJiZVjFV0SCGb2ac6jwqwMEoVsbDL2l89RuLujFil1iOM1nog-zTNeUCNZK_VEZ7g0drB9QawVN2l-SyDu5gg9S5E2YQ9h9piYVze5gPzCwsJZ1DuWRICNSWwbuC8wgrNL3Ampk8LehK9HzHCJ-CqvJ1YokN2dUYcTjIbwWmTLHvI2_PLwAiEU8nZlwMDRCkWQxrwA"
          alt="Atelier interior studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <p className="text-white text-xs font-medium">Via Sant'Andrea, Milan — Atelier Prototype Room</p>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 bg-surface rounded-xl border border-surface-variant space-y-2.5">
          <Feather className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-bold text-on-surface">Quiet Geometry</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Our silhouettes shun oversized logos, seasonal gimmicks, and rapid micro-trends, ensuring our garments remain timeless.
          </p>
        </div>

        <div className="p-6 bg-surface rounded-xl border border-surface-variant space-y-2.5">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-bold text-on-surface">Artisan Provenance</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Produced in small family-owned workshops across Tuscany, Biella, and Porto with generational mastery in tailoring and leatherwork.
          </p>
        </div>

        <div className="p-6 bg-surface rounded-xl border border-surface-variant space-y-2.5">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-bold text-on-surface">Circular Lifecycle</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Every stitch and closure is repairable by design. We provide free lifetime replacement of hardware and horn buttons.
          </p>
        </div>
      </div>

      {/* Direct CTA */}
      <div className="text-center pt-6">
        <Link
          to="/shop"
          className="bg-primary text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors inline-block"
        >
          Explore Current Edition Catalog
        </Link>
      </div>

    </div>
  );
};

export default AboutPage;
