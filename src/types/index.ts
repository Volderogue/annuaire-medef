export interface Company {
  id: string;
  name: string;
  category: string;
  description: string;
  services: string[];
  contact: {
    phone: string;
    email: string;
    website?: string;
    address: string;
  };
  logo?: string;
  images: string[];
  certifications?: string[];
  yearFounded?: number;
  employees?: string;
  specialties: string[];
}
