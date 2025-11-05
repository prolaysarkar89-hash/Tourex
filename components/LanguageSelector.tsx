import React from 'react';
import { LanguageOption } from '../types';
import { LANGUAGE_OPTIONS } from '../constants';

interface LanguageSelectorProps {
  onSelect: (language: LanguageOption) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-lg mx-auto text-center p-8">
      <h2 className="text-3xl font-bold text-white mb-6">Choose Your Language</h2>
      <p className="text-gray-300 mb-8">Select the language for your personalized itinerary.</p>
      <div className="grid grid-cols-2 gap-4">
        {LANGUAGE_OPTIONS.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang)}
            className="p-4 bg-white/10 backdrop-blur-sm rounded-lg text-white font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
