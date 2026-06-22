import React from 'react';
import PageTransition from '../../components/PageTransition.jsx';

const PrivacyPolicy = () => (
  <PageTransition>
    <div className="min-h-[calc(100vh-80px)] max-w-3xl mx-auto px-6 py-16 flex flex-col text-left space-y-6">
      <h1 className="text-3xl md:text-5xl font-black text-slate-100 uppercase tracking-tight">Privacy Policy</h1>
      <div className="text-slate-400 space-y-6 leading-relaxed">
        <p>Your privacy is important to us. This privacy statement explains the personal data SortMyScene processes, how SortMyScene processes it, and for what purposes.</p>
        
        <h2 className="text-xl font-bold text-slate-200">Data Collection</h2>
        <p>We collect data to operate effectively and provide you the best experiences with our services. You provide some of this data directly, such as when you create an account, purchase a ticket, or contact us for support.</p>
        
        <h2 className="text-xl font-bold text-slate-200">Data Usage</h2>
        <p>SortMyScene uses the data we collect to provide you with rich, interactive experiences. In particular, we use data to provide our services, process transactions, and communicate with you.</p>
      </div>
    </div>
  </PageTransition>
);

export default PrivacyPolicy;
