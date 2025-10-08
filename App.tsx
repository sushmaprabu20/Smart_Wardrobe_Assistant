import React, { useState } from 'react';
import Header from './components/Header';
import WardrobeGrid from './components/WardrobeGrid';
import AddItemModal from './components/AddItemModal';
import OutfitModal from './components/OutfitModal';
import { useWardrobe } from './hooks/useWardrobe';
import { PlusIcon } from './components/icons/PlusIcon';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { useAuth } from './contexts/AuthContext';
import Auth from './components/Auth';

const App: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { wardrobe, addItem, removeItem } = useWardrobe();
  const [isAddItemModalOpen, setAddItemModalOpen] = useState(false);
  const [isOutfitModalOpen, setOutfitModalOpen] = useState(false);

  if (!currentUser) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white selection:bg-indigo-500 selection:text-white">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-900/50 -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 15% 15%, rgba(124, 58, 237, 0.2) 0%, transparent 40%), radial-gradient(circle at 85% 75%, rgba(79, 70, 229, 0.2) 0%, transparent 40%)'
        }}
      ></div>

      <Header userEmail={currentUser.email} onLogout={logout} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-100">My Wardrobe</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setOutfitModalOpen(true)}
              disabled={wardrobe.length < 2}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-500 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
            >
              <SparklesIcon className="w-5 h-5" />
              Get Outfit Idea
            </button>
            <button
              onClick={() => setAddItemModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-gray-900 bg-white rounded-lg shadow-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
            >
              <PlusIcon className="w-5 h-5" />
              Add Item
            </button>
          </div>
        </div>

        <WardrobeGrid wardrobe={wardrobe} onRemoveItem={removeItem} />
      </main>

      <AddItemModal
        isOpen={isAddItemModalOpen}
        onClose={() => setAddItemModalOpen(false)}
        onAddItem={addItem}
      />

      <OutfitModal
        isOpen={isOutfitModalOpen}
        onClose={() => setOutfitModalOpen(false)}
        wardrobe={wardrobe}
      />
    </div>
  );
};

export default App;