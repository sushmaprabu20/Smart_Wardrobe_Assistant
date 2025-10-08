export enum Category {
  TOPS = "Tops",
  BOTTOMS = "Bottoms",
  OUTERWEAR = "Outerwear",
  FOOTWEAR = "Footwear",
  ACCESSORIES = "Accessories",
  DRESSES = "Dresses",
  UNKNOWN = "Unknown",
}

export interface ClothingItem {
  id: string;
  name: string;
  category: Category;
  subCategory: string;
  imageUrl: string; 
  createdAt: number;
}

export interface OutfitRecommendation {
  title: string;
  itemIds: string[];
  reasoning: string;
}

export interface Weather {
  temperature: number;
  description: string;
  emoji: string;
}

// FIX: Add missing type definitions for authentication to resolve import errors.
export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  email: string;
  // Stored users in localStorage have a password.
  // The currentUser in session/state only has the email.
  // Making password optional handles both cases.
  password?: string;
}

export interface AuthContextType {
  currentUser: User | null;
  login: (credentials: Credentials) => Promise<void>;
  signup: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}
