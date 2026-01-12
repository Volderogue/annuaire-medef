import React from 'react';
import { Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <img 
              src="https://medefyvelines.com/wp-content/uploads/2024/11/MEDEF_Yvelines_LOGO_tranparent.png" 
              alt="MEDEF Yvelines" 
              className="h-10 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Annuaire des Adhérents</h1>
              <p className="text-sm text-gray-600">MEDEF Yvelines</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher une entreprise..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
            </div>
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Accueil</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Catégories</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">À propos</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
            </nav>
          </div>

          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
            <nav className="flex flex-col space-y-3">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Accueil</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Catégories</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">À propos</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}