import React, { useState, useCallback } from 'react';
import { QUESTIONS, LANGUAGE_OPTIONS } from './constants';
import { Answers, AppState, Itinerary, LanguageOption } from './types';
import { generateItinerary } from './services/geminiService';

import QuestionCard from './components/QuestionCard';
import ItineraryDisplay from './components/ItineraryDisplay';
import Spinner from './components/Spinner';
import LanguageSelector from './components/LanguageSelector';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption | null>(null);

  const handleStart = () => {
    setAppState(AppState.QUESTIONING);
  };

  const handleLanguageSelect = (language: LanguageOption) => {
    setSelectedLanguage(language);
  };

  const handleAnswerSubmit = (answer: string) => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question answered, generate itinerary
      handleGenerateItinerary(newAnswers);
    }
  };

  const handleGenerateItinerary = useCallback(async (finalAnswers: Answers) => {
    setAppState(AppState.GENERATING);
    setError(null);
    try {
      if (!selectedLanguage) {
        throw new Error("Language not selected.");
      }
      const result = await generateItinerary(finalAnswers, selectedLanguage.name);
      setItinerary(result);
      setAppState(AppState.RESULT);
    } catch (err) {
      setError((err as Error).message);
      setAppState(AppState.ERROR);
    }
  }, [selectedLanguage]);

  const handleAdjustItinerary = useCallback(async (adjustmentRequest: string) => {
    setAppState(AppState.GENERATING);
    setError(null);
    try {
      if (!selectedLanguage) {
        throw new Error("Language not selected.");
      }
      // Use the original answers and add the adjustment request
      const result = await generateItinerary(answers, selectedLanguage.name, adjustmentRequest);
      setItinerary(result);
      setAppState(AppState.RESULT);
    } catch (err) {
      setError((err as Error).message);
      setAppState(AppState.ERROR);
    }
  }, [answers, selectedLanguage]);


  const handleReset = () => {
    setAppState(AppState.WELCOME);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setItinerary(null);
    setError(null);
    setSelectedLanguage(null);
  };
  
  const renderContent = () => {
    switch (appState) {
      case AppState.WELCOME:
        return (
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">Welcome to Tourex</h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Your personal AI guide to North Bengal, Dooars & Sikkim. Let's craft your dream adventure.</p>
            <button
              onClick={handleStart}
              className="bg-teal-500 text-white font-bold py-4 px-10 rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500 transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              Plan My Trip
            </button>
          </div>
        );
      
      case AppState.QUESTIONING:
        if (!selectedLanguage) {
          return <LanguageSelector onSelect={handleLanguageSelect} />;
        }
        return (
          <QuestionCard
            question={QUESTIONS[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={QUESTIONS.length}
            onSubmit={handleAnswerSubmit}
            isLastQuestion={currentQuestionIndex === QUESTIONS.length - 1}
          />
        );

      case AppState.GENERATING:
        return (
          <div className="text-center">
            <Spinner />
            <h2 className="text-2xl font-semibold text-white mt-6">Crafting Your Adventure...</h2>
            <p className="text-gray-300 mt-2">Our AI is exploring the best spots just for you.</p>
          </div>
        );
        
      case AppState.RESULT:
        return itinerary ? <ItineraryDisplay itinerary={itinerary} onReset={handleReset} onAdjust={handleAdjustItinerary} /> : null;
        
      case AppState.ERROR:
        return (
            <div className="text-center bg-white/10 p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-red-400 mb-4">Oops! Something went wrong.</h2>
                <p className="text-gray-300 mb-6">{error}</p>
                <button
                onClick={handleReset}
                className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500 transition-all duration-300 transform hover:scale-105"
                >
                Start Over
                </button>
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className={`min-h-screen w-full bg-gray-900 bg-cover bg-center bg-fixed text-white flex justify-center p-4 sm:p-8 ${appState === AppState.RESULT ? 'items-start' : 'items-center'}`} style={{backgroundImage: "url('https://images.unsplash.com/photo-1626533951590-0c460c18c6a5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 w-full">
            {renderContent()}
        </div>
    </main>
  );
};

export default App;