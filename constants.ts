import { Question, LanguageOption } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 'startLocation',
    text: "Where will you be starting your journey from?",
    placeholder: "e.g., Siliguri, NJP Station, Bagdogra Airport...",
  },
  {
    id: 'duration',
    text: "How many days are you planning for your trip?",
    placeholder: "e.g., 5 days, a week...",
  },
  {
    id: 'travelers',
    text: "Who are you traveling with?",
    placeholder: "e.g., solo, with family, friends, couple...",
  },
  {
    id: 'interests',
    text: "What are your primary interests?",
    placeholder: "e.g., adventure, nature, relaxation, culture, food...",
  },
  {
    id: 'pace',
    text: "What kind of pace do you prefer for your trip?",
    placeholder: "e.g., relaxed, fast-paced, a mix...",
  },
  {
    id: 'budget',
    text: "What is your approximate budget per person (excluding flights)?",
    placeholder: "e.g., budget-friendly, mid-range, luxury...",
  },
];

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', name: 'English' },
  { code: 'bn', name: 'Bengali' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ne', name: 'Nepali' },
];