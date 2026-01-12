import React from 'react';
import * as Icons from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<any>;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group hover:border-blue-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
          <IconComponent className="w-6 h-6 text-blue-600" />
        </div>
        <span className="text-2xl font-bold text-blue-600">{category.count}</span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
      <p className="text-sm text-gray-600">
        {category.count} entreprise{category.count > 1 ? 's' : ''} référencée{category.count > 1 ? 's' : ''}
      </p>
    </div>
  );
}