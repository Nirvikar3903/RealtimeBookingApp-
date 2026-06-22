import React from 'react';
import PageTransition from '../../components/PageTransition.jsx';

const Blog = () => (
  <PageTransition>
    <div className="min-h-[calc(100vh-80px)] max-w-4xl mx-auto px-6 py-20 flex flex-col items-center text-center space-y-6">
      <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">Blog</h1>
      <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
        Coming soon! Stay tuned for updates on nightlife trends, featured artists, event tips, and behind-the-scenes stories from the best festivals.
      </p>
    </div>
  </PageTransition>
);

export default Blog;
