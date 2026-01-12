import React from 'react';

export default function ConstructionBanner() {
  return (
    <div className="bg-yellow-50 border-b border-yellow-200 text-yellow-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm flex flex-col gap-1 md:flex-row md:items-center md:gap-3">
        <span className="font-semibold text-yellow-900">
          Site en construction
        </span>
        <span className="text-yellow-800">
          Les données visibles sont provisoires&nbsp;; retrouvez très bientôt la liste des entreprises adhérentes du MEDEF Yvelines.
        </span>
      </div>
    </div>
  );
}





