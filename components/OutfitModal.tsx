import React, { useState } from 'react';
import Modal from './Modal';
import { getOutfitRecommendation, getWeatherForLocation } from '../services/geminiService';
import type { ClothingItem, OutfitRecommendation, Weather } from '../types';
import Spinner from './Spinner';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';

interface OutfitModalProps {
  isOpen: boolean;
  onClose: () => void;
  wardrobe: ClothingItem[];
}

const OutfitModal: React.FC<OutfitModalProps> = ({ isOpen, onClose, wardrobe }) => {
  const [prompt, setPrompt] = useState('');
  const [recommendation, setRecommendation] = useState<OutfitRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [weather, setWeather] = useState<Weather | null>(null);
  const [isFetchingWeather, setIsFetchingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const recommendedItems = recommendation ? wardrobe.filter(item => recommendation.itemIds.includes(item.id)) : [];

  const handleFetchWeather = () => {
    if (!navigator.geolocation) {
      setWeatherError("Geolocation is not supported by your browser.");
      return;
    }

    setIsFetchingWeather(true);
    setWeatherError(null);
    setWeather(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherData = await getWeatherForLocation(latitude, longitude);
          setWeather(weatherData);
        } catch (err: any) {
          setWeatherError(err.message || "Could not get weather data.");
        } finally {
          setIsFetchingWeather(false);
        }
      },
      () => {
        setWeatherError("Unable to retrieve your location. Please enable location permissions.");
        setIsFetchingWeather(false);
      }
    );
  };

  const handleGetRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) {
      setError("Please describe the occasion.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const result = await getOutfitRecommendation(wardrobe, prompt, weather ?? undefined);
      setRecommendation(result);
    } catch (err: any) {
      setError(err.message || "Failed to get recommendation.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClose = () => {
      setPrompt('');
      setRecommendation(null);
      setError(null);
      setIsLoading(false);
      setWeather(null);
      setWeatherError(null);
      setIsFetchingWeather(false);
      onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Get an Outfit Idea">
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="occasion" className="block text-sm font-medium text-gray-300">What's the occasion?</label>
          <form onSubmit={handleGetRecommendation} className="flex items-start space-x-3">
            <input
              type="text"
              id="occasion"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., a casual weekend brunch"
              className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button type="submit" disabled={isLoading || !prompt} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed">
              {isLoading ? <Spinner small /> : 'Generate'}
            </button>
          </form>
        </div>

        <div className="space-y-2">
           <label className="block text-sm font-medium text-gray-300">Factor in weather? (Optional)</label>
            <div className="flex items-center gap-4 p-3 bg-gray-900/50 rounded-lg">
                <button 
                  type="button" 
                  onClick={handleFetchWeather} 
                  disabled={isFetchingWeather}
                  className="flex-shrink-0 flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-gray-900 bg-white rounded-md shadow-sm hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white disabled:opacity-60 disabled:cursor-wait"
                >
                    <LocationMarkerIcon className="w-4 h-4" />
                    Use Current Weather
                </button>
                <div className="flex-grow text-sm text-gray-400 min-h-[20px]">
                    {isFetchingWeather && <div className="flex items-center gap-2"><Spinner small /> <span>Fetching weather...</span></div>}
                    {weatherError && <p className="text-red-400 text-xs">{weatherError}</p>}
                    {weather && <p className="text-indigo-300 font-medium">{weather.emoji} {weather.temperature}°C, {weather.description}</p>}
                </div>
            </div>
        </div>
        
        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
        
        {isLoading && !recommendation && (
             <div className="text-center py-10">
                <Spinner />
                <p className="mt-4 text-sm text-gray-400">Our AI stylist is thinking...</p>
            </div>
        )}

        {recommendation && (
          <div className="animate-fade-in space-y-4 pt-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-white">{recommendation.title}</h3>
            <p className="text-sm text-gray-400 italic">"{recommendation.reasoning}"</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {recommendedItems.map(item => (
                <div key={item.id} className="rounded-lg overflow-hidden bg-gray-700">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover" />
                  <div className="p-2">
                    <p className="text-xs font-bold text-white truncate">{item.name}</p>
                    <p className="text-xs text-indigo-300">{item.subCategory}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default OutfitModal;