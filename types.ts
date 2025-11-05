export interface Question {
  id: string;
  text: string;
  placeholder: string;
}

export type Answers = Record<string, string>;

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  imageQuery: string;
}

export interface Itinerary {
  title: string;
  summary: string;
  days: ItineraryDay[];
  notes: string[];
}

export interface LanguageOption {
  code: string;
  name: string;
}

export enum AppState {
  WELCOME,
  QUESTIONING,
  GENERATING,
  RESULT,
  ERROR,
}