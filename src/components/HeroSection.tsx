import React from 'react';
import { Building2, Users, MapPin, TrendingUp, Award, Handshake } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-indigo-500 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-indigo-400 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Hero Content */}
      <div className="relative text-center mb-12">
        <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-6 shadow-sm">
          <Award className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-blue-700 font-medium">Réseau d'excellence des Yvelines</span>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Annuaire des Adhérents
          <span className="block text-blue-600">MEDEF Yvelines</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
          Découvrez les entreprises et services de qualité proposés par nos adhérents. 
          Un réseau d'excellence au service du développement économique des Yvelines.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
              <Handshake className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Réseau de confiance</h3>
            <p className="text-gray-600 text-sm">Entreprises sélectionnées et recommandées par le MEDEF</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Expertise locale</h3>
            <p className="text-gray-600 text-sm">Savoir-faire et compétences ancrés dans les Yvelines</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Accompagnement</h3>
            <p className="text-gray-600 text-sm">Support et conseil pour vos projets d'entreprise</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 text-center border border-white/20">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">200</div>
          <div className="text-gray-600 font-medium">Adhérents</div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 text-center border border-white/20">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">15</div>
          <div className="text-gray-600 font-medium">Secteurs</div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 text-center border border-white/20">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
            <MapPin className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">78</div>
          <div className="text-gray-600 font-medium">Yvelines</div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 text-center border border-white/20">
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="text-3xl font-bold text-indigo-600 mb-2">2025</div>
          <div className="text-gray-600 font-medium">Année</div>
        </div>
      </div>
    </div>
  );
}