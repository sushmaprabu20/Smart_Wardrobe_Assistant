
import React from 'react';
import type { ClothingItem } from '../types';
import { TrashIcon } from './icons/TrashIcon';

interface ItemCardProps {
  item: ClothingItem;
  onRemove: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onRemove }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg bg-gray-800 transition-transform duration-300 hover:scale-105">
      <img src={item.imageUrl} alt={item.name} className="w-full h-56 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="font-bold text-white text-sm truncate" title={item.name}>{item.name}</h3>
        <p className="text-xs text-indigo-300">{item.subCategory}</p>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-label="Remove item"
      >
        <TrashIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ItemCard;
