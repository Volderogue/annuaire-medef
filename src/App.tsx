import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ConstructionBanner from './components/ConstructionBanner';
import HeroSection from './components/HeroSection';
import SearchFilters from './components/SearchFilters';
import CompanyCard from './components/CompanyCard';
import CompanyDetail from './components/CompanyDetail';
import { companies } from './data/companies';
import { Company } from './types';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Extract unique categories and cities
  const categories = useMemo(() => {
    return Array.from(new Set(companies.map(company => company.category))).sort();
  }, []);

  const cities = useMemo(() => {
    return Array.from(new Set(companies.map(company => {
      const address = company.contact.address;
      const cityMatch = address.match(/\d{5}\s+(.+)$/);
      return cityMatch ? cityMatch[1] : '';
    }).filter(Boolean))).sort();
  }, []);

  // Filter companies based on search criteria
  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const matchesSearch = searchTerm === '' || 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase())) ||
        company.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === '' || company.category === selectedCategory;

      const matchesCity = selectedCity === '' || company.contact.address.includes(selectedCity);

      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [searchTerm, selectedCategory, selectedCity]);

  if (selectedCompany) {
    return (
      <CompanyDetail
        company={selectedCompany}
        onBack={() => setSelectedCompany(null)}
      />
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e0e9fc' }}>
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
      <ConstructionBanner />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Search and Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          categories={categories}
          cities={cities}
        />

        {/* Companies */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory || selectedCity || searchTerm ? 'Résultats de recherche' : 'Nos adhérents'}
            </h2>
            <div className="text-gray-600">
              {filteredCompanies.length} entreprise{filteredCompanies.length > 1 ? 's' : ''} trouvée{filteredCompanies.length > 1 ? 's' : ''}
            </div>
          </div>

          {filteredCompanies.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun résultat trouvé</h3>
              <p className="text-gray-600 mb-4">
                Essayez de modifier vos critères de recherche ou de supprimer certains filtres.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSelectedCity('');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  onClick={() => setSelectedCompany(company)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-12 border-t border-white/20">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <img 
                src="https://medefyvelines.com/wp-content/uploads/2024/11/MEDEF_Yvelines_LOGO_tranparent.png" 
                alt="MEDEF Yvelines" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-600 mb-2">
              MEDEF Yvelines - Mouvement des Entreprises de France
            </p>
            <p className="text-gray-500 text-sm">
              Accompagner et représenter les entreprises des Yvelines
            </p>
            <div className="mt-6 flex justify-center space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-blue-600">Mentions légales</a>
              <a href="#" className="hover:text-blue-600">Politique de confidentialité</a>
              <a href="#" className="hover:text-blue-600">Contact</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;