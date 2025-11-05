import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import MicrophoneIcon from './icons/MicrophoneIcon';
import StopIcon from './icons/StopIcon';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onSubmit: (answer: string) => void;
  isLastQuestion: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, questionNumber, totalQuestions, onSubmit, isLastQuestion }) => {
  const [answer, setAnswer] = useState('');
  const { isListening, transcript, startListening, stopListening, hasRecognitionSupport, setTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setAnswer(transcript);
    }
  }, [transcript]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer);
      setAnswer('');
      setTranscript('');
    }
  };

  const handleVoiceButtonClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 text-gray-300">
          <span>Question {questionNumber} of {totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div className="bg-teal-400 h-2.5 rounded-full" style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}></div>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{question.text}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={isListening ? "Listening..." : question.placeholder}
            className="w-full p-4 pr-16 bg-gray-900/50 border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition duration-300 resize-none h-32"
          />
          {hasRecognitionSupport && (
            <button
              type="button"
              onClick={handleVoiceButtonClick}
              className={`absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${isListening ? 'bg-red-500 animate-pulse' : 'bg-teal-500 hover:bg-teal-600'}`}
            >
              {isListening ? (
                 <StopIcon className="h-6 w-6 text-white" />
              ) : (
                <MicrophoneIcon className="h-6 w-6 text-white" />
              )}
            </button>
          )}
        </div>
        
        <button
          type="submit"
          disabled={!answer.trim()}
          className="w-full mt-6 bg-teal-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
        >
          {isLastQuestion ? 'Generate Itinerary' : 'Next Question'}
        </button>
      </form>
    </div>
  );
};

export default QuestionCard;
