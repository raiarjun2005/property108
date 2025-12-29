export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  specs: string;
  image: string;
  description?: string;
  furnishing?: string;
  amenities?: string[];
  [key: string]: any; // For additional fields
}

