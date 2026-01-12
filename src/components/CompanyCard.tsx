import React from 'react';
import { MapPin, Phone, Mail, Globe, Users, Calendar } from 'lucide-react';
import { Company } from '../types';

interface CompanyCardProps {
  company: Company;
  onClick: () => void;
}

export default function CompanyCard({ company, onClick }: CompanyCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
        {company.images[0] && (
          <img
            src={company.images[0]}
            alt={company.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-blue-700">
            {company.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
            {company.name}
          </h3>
          {company.yearFounded && (
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              {company.yearFounded}
            </div>
          )}
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{company.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            {company.contact.address}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Phone className="w-4 h-4 mr-2 text-gray-400" />
            {company.contact.phone}
          </div>
          {company.employees && (
            <div className="flex items-center text-gray-600 text-sm">
              <Users className="w-4 h-4 mr-2 text-gray-400" />
              {company.employees} employés
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {company.specialties.slice(0, 3).map((specialty, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
            >
              {specialty}
            </span>
          ))}
          {company.specialties.length > 3 && (
            <span className="text-gray-500 text-xs">
              +{company.specialties.length - 3} autres
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-3">
            {company.contact.website && (
              <Globe className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
            )}
            <Mail className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            Voir le profil →
          </button>
        </div>
      </div>
    </div>
  );
}