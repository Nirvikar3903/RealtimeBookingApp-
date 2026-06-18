import React from "react";

const SeatLegend = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md max-w-xl mx-auto my-6">
      {/* Available */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-md bg-white/5 border border-white/10" />
        <span className="text-sm font-medium text-slate-300">Available</span>
      </div>

      {/* Selected */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-md bg-cyan-500 border border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
        <span className="text-sm font-medium text-slate-300">Selected</span>
      </div>

      {/* Reserved */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-md bg-amber-500/20 border border-amber-500/40 animate-pulse" />
        <span className="text-sm font-medium text-slate-300">Reserved (Hold)</span>
      </div>

      {/* Booked */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-md bg-red-500/20 border border-red-500/40" />
        <span className="text-sm font-medium text-slate-300">Booked</span>
      </div>
    </div>
  );
};

export default SeatLegend;
