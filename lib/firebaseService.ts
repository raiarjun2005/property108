import { ref, get, set, push, remove, onValue, off, DataSnapshot } from 'firebase/database';
import { database } from './firebase';
import { Property } from '@/types/property';

const PROPERTIES_PATH = 'properties';

// Get all properties
export const getAllProperties = async (): Promise<Property[]> => {
  try {
    const propertiesRef = ref(database, PROPERTIES_PATH);
    const snapshot = await get(propertiesRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Convert object to array and add id
      return Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      })) as Property[];
    }
    return [];
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

// Get a single property by ID
export const getPropertyById = async (id: string): Promise<Property | null> => {
  try {
    const propertyRef = ref(database, `${PROPERTIES_PATH}/${id}`);
    const snapshot = await get(propertyRef);
    
    if (snapshot.exists()) {
      return {
        id,
        ...snapshot.val(),
      } as Property;
    }
    return null;
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
};

// Add a new property
export const addProperty = async (property: Omit<Property, 'id'>): Promise<string> => {
  try {
    const propertiesRef = ref(database, PROPERTIES_PATH);
    const newPropertyRef = push(propertiesRef);
    await set(newPropertyRef, property);
    return newPropertyRef.key || '';
  } catch (error) {
    console.error('Error adding property:', error);
    throw error;
  }
};

// Update a property
export const updateProperty = async (id: string, property: Partial<Property>): Promise<void> => {
  try {
    const propertyRef = ref(database, `${PROPERTIES_PATH}/${id}`);
    await set(propertyRef, property);
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};

// Delete a property
export const deleteProperty = async (id: string): Promise<void> => {
  try {
    const propertyRef = ref(database, `${PROPERTIES_PATH}/${id}`);
    await remove(propertyRef);
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};

// Subscribe to real-time updates
export const subscribeToProperties = (
  callback: (properties: Property[]) => void
): (() => void) => {
  const propertiesRef = ref(database, PROPERTIES_PATH);
  
  const unsubscribe = onValue(propertiesRef, (snapshot: DataSnapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const properties = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      })) as Property[];
      callback(properties);
    } else {
      callback([]);
    }
  }, (error) => {
    console.error('Error in real-time subscription:', error);
    callback([]);
  });

  // Return unsubscribe function
  return () => {
    off(propertiesRef);
  };
};

