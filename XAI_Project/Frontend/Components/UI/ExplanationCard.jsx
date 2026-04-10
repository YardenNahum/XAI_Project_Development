import React from 'react';
/**
 * ExplanationCard
 * A card component to display an explanation with an icon, title, and description.
 * Props:
 * - icon: The icon component to display.
 * - title: The title of the explanation.
 * - description: A brief description of the explanation method.
 *  - colorClass: The CSS class for the title and icon color.
 */
export default function ExplanationCard({ icon: Icon, title, description, colorClass }) {
  return (
    <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-5 hover:shadow-md transition-shadow h-full">
      <div className={`flex items-center gap-2 font-bold mb-3 ${colorClass}`}>
        <Icon size={18} />
        <span>{title}</span>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}