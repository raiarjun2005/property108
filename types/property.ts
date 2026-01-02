export interface Property {
  id: string;
  title: string;
  location: string;
  state?: string;
  city?: string;
  price: string;
  type: string;       // e.g. "Rent" or "Buy"
  category?: string;  // e.g. "Flat", "House", "Villa" <-- ADD THIS
  specs: string;
  image: string;
  description?: string;
  furnishing?: string;
  amenities?: string[];
  ownerName?: string;
  postedOn?: string;
  deposit?: string;
  phone?: string;
  [key: string]: any;
}