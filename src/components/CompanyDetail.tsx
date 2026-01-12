import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  Calendar,
  Award,
  Star,
  ExternalLink
} from 'lucide-react';
import { Company } from '../types';

interface CompanyDetailProps {
  company: Company;
  onBack: () => void;
}

export default function CompanyDetail({ company, onBack }: CompanyDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à l'annuaire
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 relative">
                {company.images[0] && (
                  <img
                    src={company.images[0]}
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                    {company.category}
                  </span>
                  <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
                  <div className="flex items-center space-x-4 text-sm">
                    {company.yearFounded && (
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Depuis {company.yearFounded}
                      </div>
                    )}
                    {company.employees && (
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {company.employees} employés
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">À propos</h2>
              <p className="text-gray-700 leading-relaxed">{company.description}</p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nos services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {company.services.map((service, index) => (
                  <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Star className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-900">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Spécialités</h2>
              <div className="flex flex-wrap gap-3">
                {company.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Gallery */}
            {company.images.length > 1 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Galerie</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {company.images.slice(1).map((image, index) => (
                    <div key={index} className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${company.name} - Image ${index + 2}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Adresse</p>
                    <p className="text-gray-600 text-sm">{company.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Téléphone</p>
                    <a href={`tel:${company.contact.phone}`} className="text-blue-600 hover:text-blue-700 text-sm">
                      {company.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href={`mailto:${company.contact.email}`} className="text-blue-600 hover:text-blue-700 text-sm">
                      {company.contact.email}
                    </a>
                  </div>
                </div>
                {company.contact.website && (
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Site web</p>
                      <a 
                        href={`https://${company.contact.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                      >
                        {company.contact.website}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Certifications */}
            {company.certifications && company.certifications.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Certifications</h3>
                <div className="space-y-3">
                  {company.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                      <Award className="w-5 h-5 text-green-600 mr-3" />
                      <span className="font-medium text-gray-900">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Intéressé par nos services ?</h3>
              <p className="text-blue-100 mb-4 text-sm">
                Contactez-nous pour discuter de votre projet
              </p>
              <div className="space-y-2">
                <a
                  href={`tel:${company.contact.phone}`}
                  className="block w-full bg-white text-blue-600 text-center py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Appeler maintenant
                </a>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors border border-blue-400"
                >
                  Envoyer un email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}