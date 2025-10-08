import { useState, useEffect, useCallback } from 'react';
import type { ClothingItem } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useWardrobe = () => {
  const { currentUser } = useAuth();
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getStorageKey = useCallback(() => {
    return currentUser ? `ai-wardrobe-items-${currentUser.email}` : null;
  }, [currentUser]);


  useEffect(() => {
    const storageKey = getStorageKey();
    if (!storageKey) {
        setWardrobe([]); // Clear wardrobe on logout
        return;
    };

    try {
      const storedItems = localStorage.getItem(storageKey);
      if (storedItems) {
        setWardrobe(JSON.parse(storedItems));
      } else {
        setWardrobe([]);
      }
    } catch (error) {
      console.error("Failed to load wardrobe from localStorage", error);
      setWardrobe([]);
    } finally {
      setIsLoaded(true);
    }
  }, [currentUser, getStorageKey]);

  useEffect(() => {
    const storageKey = getStorageKey();
    if (isLoaded && storageKey) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(wardrobe));
      } catch (error) {
        console.error("Failed to save wardrobe to localStorage", error);
      }
    }
  }, [wardrobe, isLoaded, getStorageKey]);

  const addItem = useCallback((item: Omit<ClothingItem, 'id' | 'createdAt'>) => {
    if (!currentUser) return; // Prevent adding items if not logged in
    const newItem: ClothingItem = {
      ...item,
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
    };
    setWardrobe((prev) => [newItem, ...prev]);
  }, [currentUser]);

  const removeItem = useCallback((itemId: string) => {
    if (!currentUser) return;
    setWardrobe((prev) => prev.filter((item) => item.id !== itemId));
  }, [currentUser]);

  return { wardrobe, addItem, removeItem, isLoaded };
};