/**
 * Script to seed initial property data to Firebase Realtime Database
 * 
 * Usage:
 * 1. Make sure your .env.local file has Firebase config
 * 2. Run: npx tsx scripts/seedFirebase.ts
 * 
 * Or compile and run:
 * npx ts-node scripts/seedFirebase.ts
 */

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Sample properties data for Firebase Realtime Database
const initialProperties = [
  {
    title: "The Aralias Penthouse",
    location: "Golf Course Road, Gurgaon",
    price: "₹ 185,000 / mo",
    type: "Rental",
    specs: "4 BHK • 4500 Sq. Ft.",
    image: "https://images.unsplash.com/photo-1600596542815-e25fa1108638?q=80&w=2075&auto=format&fit=crop",
    description: "This is a premium property located in the heart of the city. Recently renovated with high-quality materials. It features a spacious living area, modular kitchen, and balconies with a great view. Perfect for families looking for a peaceful yet connected lifestyle.",
    furnishing: "Semi-Furnished",
    amenities: ["24x7 Security", "Power Backup", "Car Parking", "Gymnasium", "Swimming Pool", "Club House", "Jogging Track", "Children's Play Area"]
  },
  {
    title: "Vasant Vihar Villa Floor",
    location: "Vasant Vihar, New Delhi",
    price: "₹ 12.5 Cr",
    type: "Resale",
    specs: "4 BHK • 600 Sq. Yds.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    description: "Luxurious villa floor in one of Delhi's most prestigious neighborhoods. This property offers premium living with modern amenities and excellent connectivity.",
    furnishing: "Fully Furnished",
    amenities: ["24x7 Security", "Power Backup", "Car Parking", "Gymnasium", "Swimming Pool", "Club House", "Garden", "Elevator"]
  },
  {
    title: "DLF Magnolias Luxury Apartment",
    location: "DLF Phase 5, Gurgaon",
    price: "₹ 8.5 Cr",
    type: "Resale",
    specs: "3 BHK • 3200 Sq. Ft.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    description: "Stunning luxury apartment in DLF Magnolias with premium finishes and world-class amenities. Features floor-to-ceiling windows, designer interiors, and private balconies with panoramic views.",
    furnishing: "Fully Furnished",
    amenities: ["24x7 Security", "Power Backup", "Valet Parking", "Gymnasium", "Swimming Pool", "Spa", "Concierge", "Private Garden"]
  },
  {
    title: "Lutyens Delhi Bungalow",
    location: "Lutyens Zone, New Delhi",
    price: "₹ 45 Cr",
    type: "Resale",
    specs: "5 BHK • 8000 Sq. Ft.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    description: "Heritage bungalow in the heart of Lutyens Delhi. This magnificent property combines colonial architecture with modern luxury. Perfect for those seeking exclusivity and prestige.",
    furnishing: "Fully Furnished",
    amenities: ["24x7 Security", "Power Backup", "Private Parking", "Garden", "Servant Quarters", "Heritage Structure", "Prime Location"]
  },
  {
    title: "Sector 43 Premium Flat",
    location: "Sector 43, Gurgaon",
    price: "₹ 125,000 / mo",
    type: "Rental",
    specs: "3 BHK • 2200 Sq. Ft.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
    description: "Modern and spacious 3 BHK apartment in a well-maintained society. Close to metro station and major business hubs. Ideal for working professionals and families.",
    furnishing: "Semi-Furnished",
    amenities: ["24x7 Security", "Power Backup", "Car Parking", "Gymnasium", "Swimming Pool", "Club House", "Metro Connectivity"]
  },
  {
    title: "Gurgaon Farmhouse",
    location: "Sohna Road, Gurgaon",
    price: "₹ 3.2 Cr",
    type: "Resale",
    specs: "4 BHK • 2 Acres",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=2070&auto=format&fit=crop",
    description: "Spacious farmhouse with lush green surroundings. Perfect for those who want to escape the city hustle while staying connected. Features private garden, swimming pool, and servant quarters.",
    furnishing: "Fully Furnished",
    amenities: ["24x7 Security", "Power Backup", "Private Garden", "Swimming Pool", "Servant Quarters", "Parking", "Peaceful Location"]
  },
  {
    title: "Dwarka Sector 19 Apartment",
    location: "Sector 19, Dwarka, New Delhi",
    price: "₹ 95,000 / mo",
    type: "Rental",
    specs: "2 BHK • 1200 Sq. Ft.",
    image: "https://images.unsplash.com/photo-1600585154084-4c5f3d5c5b5c?q=80&w=2070&auto=format&fit=crop",
    description: "Well-maintained 2 BHK apartment in a gated community. Close to schools, hospitals, and metro station. Perfect for small families or working professionals.",
    furnishing: "Unfurnished",
    amenities: ["24x7 Security", "Power Backup", "Car Parking", "Gymnasium", "Children's Play Area", "Metro Connectivity"]
  },
  {
    title: "DLF Camellias Penthouse",
    location: "DLF Phase 5, Gurgaon",
    price: "₹ 22 Cr",
    type: "Resale",
    specs: "5 BHK • 6500 Sq. Ft.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    description: "Ultra-luxury penthouse with private terrace and jacuzzi. Features premium Italian marble, smart home automation, and panoramic city views. The epitome of luxury living.",
    furnishing: "Fully Furnished",
    amenities: ["24x7 Security", "Power Backup", "Valet Parking", "Private Terrace", "Jacuzzi", "Smart Home", "Concierge", "Private Elevator"]
  },
  {
    title: "DDA HIG Specialist Assistance",
    location: "Dwarka / Rohini, Delhi",
    price: "Consultation",
    type: "Govt. Scheme Guidance",
    specs: "Process Support",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    description: "Expert guidance for DDA HIG (High Income Group) housing schemes. We provide comprehensive support throughout the application and allocation process.",
    furnishing: "N/A",
    amenities: ["Expert Consultation", "Documentation Support", "Application Assistance", "Follow-up Services"]
  },
  {
    title: "Rohini Sector 24 Independent House",
    location: "Sector 24, Rohini, New Delhi",
    price: "₹ 2.8 Cr",
    type: "Resale",
    specs: "4 BHK • 400 Sq. Yds.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    description: "Beautiful independent house with modern architecture. Features spacious rooms, modular kitchen, and private garden. Located in a peaceful residential area.",
    furnishing: "Semi-Furnished",
    amenities: ["24x7 Security", "Power Backup", "Car Parking", "Private Garden", "Modular Kitchen", "Spacious Rooms"]
  }
];

async function seedFirebase() {
  try {
    console.log('🌱 Starting to seed Firebase Realtime Database...\n');

    // Check if config is valid
    if (!firebaseConfig.databaseURL) {
      throw new Error('Firebase configuration is missing. Please check your .env.local file.');
    }

    const propertiesRef = ref(database, 'properties');

    // Write each property to Firebase
    for (let i = 0; i < initialProperties.length; i++) {
      const property = initialProperties[i];
      const propertyKey = `property_${i + 1}`;
      const propertyRef = ref(database, `properties/${propertyKey}`);

      await set(propertyRef, property);
      console.log(`✅ Added: ${property.title}`);
    }

    console.log(`\n🎉 Successfully seeded ${initialProperties.length} properties to Firebase!`);
    console.log(`📊 Database URL: ${firebaseConfig.databaseURL}`);
    console.log('\n✨ You can now view your properties in the Firebase Console.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding Firebase:', error);
    process.exit(1);
  }
}

// Run the seed function
seedFirebase();

