import React from 'react';

interface HeaderProps {
  userEmail: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userEmail, onLogout }) => {
  return (
    <header className="bg-white/5 backdrop-blur-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-tighter text-white">
            AI Wardrobe Manager
            </h1>
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300 hidden sm:block">{userEmail}</span>
                <button 
                    onClick={onLogout}
                    className="px-3 py-1.5 text-sm font-semibold text-white bg-indigo-600/80 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;