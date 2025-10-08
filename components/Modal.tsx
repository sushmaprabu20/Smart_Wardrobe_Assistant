
import React, { Fragment } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        onClick={onClose}
      >
        <div 
            className="relative w-full max-w-lg m-4 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 id="modal-title" className="text-xl font-semibold text-white">{title}</h2>
                <button
                    onClick={onClose}
                    className="p-1 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                    aria-label="Close modal"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
      </div>
  );
};

export default Modal;
