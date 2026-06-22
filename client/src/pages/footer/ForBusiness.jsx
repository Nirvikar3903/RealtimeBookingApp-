import React from 'react';
import PageTransition from '../../components/PageTransition.jsx';

const ForBusiness = () => (
  <PageTransition>
    <div className="min-h-[calc(100vh-80px)] max-w-4xl mx-auto px-6 py-20 flex flex-col items-center text-center space-y-6">
      <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">For Business</h1>
      <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
        Partner with SortMyScene to elevate your venue or event. Access our exclusive organiser tools, real-time analytics, and massive user base to sell out your shows instantly.
      </p>
    </div>
  </PageTransition>
);

export default ForBusiness;
