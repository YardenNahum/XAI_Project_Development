import React from 'react';

// Notice the "default" keyword added here!
export default function ExplanationCard({ icon: Icon, title, description, colorClass }) {
  return (
    <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className={`flex items-center gap-2 font-bold mb-3 ${colorClass}`}>
        <Icon size={18} />
        <span>{title}</span>
      </div>
      <p className="text-sm text-slate-600">
        {description}
      </p>
    </div>
  );
}