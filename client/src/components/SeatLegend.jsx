import React from "react";

const SeatLegend = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md max-w-xl mx-auto my-6">
      {/* Available */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-[#1e293b] border border-[#334155]" />
        <span className="text-xs font-semibold text-slate-300">Available</span>
      </div>

      {/* Selected */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-cyan-500/20 border-2 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
        <span className="text-xs font-semibold text-slate-300">Selected</span>
      </div>

      {/* Reserved */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-amber-500/20 border border-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)] animate-pulse" />
        <span className="text-xs font-semibold text-slate-300">Reserved</span>
      </div>

      {/* Booked */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-red-500/10 border border-red-500 opacity-50" />
        <span className="text-xs font-semibold text-slate-300">Booked</span>
      </div>
    </div>
  );
};

export default SeatLegend;

