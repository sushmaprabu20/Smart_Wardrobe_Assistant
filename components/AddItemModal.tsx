
import React, { useState, useCallback, ChangeEvent } from 'react';
import Modal from './Modal';
import { categorizeClothingItem } from '../services/geminiService';
import type { ClothingItem } from '../types';
import { Category } from '../types';
import Spinner from './Spinner';
import {
  CATEGORIES_LIST
} from '../constants';


interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: Omit<ClothingItem, 'id' | 'createdAt'>) => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onAddItem }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>(Category.UNKNOWN);
  const [subCategory, setSubCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setImageFile(null);
    setPreviewUrl(null);
    setName('');
    setCategory(Category.UNKNOWN);
    setSubCategory('');
    setIsLoading(false);
    setError(null);
  }, []);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setError(null);
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const url = reader.result as string;
        setPreviewUrl(url);
        
        const base64String = url.split(',')[1];
        if (base64String) {
          try {
            setIsLoading(true);
            const result = await categorizeClothingItem(base64String, file.type);
            setName(result.name);
            setCategory(result.category);
            setSubCategory(result.subCategory);
          } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
          } finally {
            setIsLoading(false);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (previewUrl && name && category && subCategory) {
      onAddItem({ imageUrl: previewUrl, name, category, subCategory });
      handleClose();
    } else {
      setError("Please fill all fields and upload an image.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Item">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300">Clothing Image</label>
          <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {previewUrl ? (
                <div className="relative">
                  <img src={previewUrl} alt="Preview" className="mx-auto h-40 w-auto rounded-md" />
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-md">
                      <Spinner />
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-400">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </>
              )}
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50" />
            </div>
            <div>
              <label htmlFor="subCategory" className="block text-sm font-medium text-gray-300">Sub-Category</label>
              <input type="text" id="subCategory" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} disabled={isLoading} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50" />
            </div>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value as Category)} disabled={isLoading} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50">
            {CATEGORIES_LIST.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            <option value={Category.UNKNOWN} disabled>Select a category</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
            Cancel
          </button>
          <button type="submit" disabled={!previewUrl || isLoading} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed">
            {isLoading ? 'Analyzing...' : 'Add Item'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddItemModal;
