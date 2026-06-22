import React from 'react';
import PageTransition from '../../components/PageTransition.jsx';

const TermsAndConditions = () => (
  <PageTransition>
    <div className="min-h-[calc(100vh-80px)] max-w-3xl mx-auto px-6 py-16 flex flex-col text-left space-y-6">
      <h1 className="text-3xl md:text-5xl font-black text-slate-100 uppercase tracking-tight">Terms & Conditions</h1>
      <div className="text-slate-400 space-y-6 leading-relaxed">
        <p>Welcome to SortMyScene. By accessing or using our platform, you agree to be bound by these Terms & Conditions.</p>
        
        <h2 className="text-xl font-bold text-slate-200">Ticket Purchases</h2>
        <p>All ticket sales are final. Refunds will only be issued if an event is cancelled or rescheduled by the organiser. We are not responsible for entry restrictions enforced by the venue.</p>
        
        <h2 className="text-xl font-bold text-slate-200">Usage Rules</h2>
        <p>You agree to use our services only for lawful purposes. You must not use our platform to distribute malicious software, spam, or engage in any fraudulent activity.</p>
      </div>
    </div>
  </PageTransition>
);

export default TermsAndConditions;
