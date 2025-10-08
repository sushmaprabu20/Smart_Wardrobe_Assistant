
import React from 'react';
import type { ClothingItem } from '../types';
import ItemCard from './ItemCard';

interface WardrobeGridProps {
  wardrobe: ClothingItem[];
  onRemoveItem: (id: string) => void;
}

const WardrobeGrid: React.FC<WardrobeGridProps> = ({ wardrobe, onRemoveItem }) => {
  if (wardrobe.length === 0) {
    return (
      <div className="text-center py-20 px-6 rounded-2xl border-2 border-dashed border-gray-700">
        <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-300">Your wardrobe is empty</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by adding your first clothing item.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {wardrobe.map((item) => (
        <ItemCard key={item.id} item={item} onRemove={onRemoveItem} />
      ))}
    </div>
  );
};

export default WardrobeGrid;
