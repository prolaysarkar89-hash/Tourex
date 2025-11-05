import { useState, useEffect, useRef } from 'react';

// FIX: Add type definitions for Web Speech API which are not included in standard TypeScript libs.
// This resolves errors for SpeechRecognition, SpeechRecognitionEvent, and SpeechRecognitionErrorEvent.
interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly [key: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

// Fix: Augment the window object to include non-standard speech recognition APIs,
// resolving errors about these properties not existing on `window`.
declare global {
  interface Window {
    // FIX: Define SpeechRecognition properties as constructors returning the SpeechRecognition interface.
    SpeechRecognition: { new (): SpeechRecognition };
    webkitSpeechRecognition: { new (): SpeechRecognition };
  }
}

// Polyfill for browsers that might need it
// Fix: Renamed constant to avoid a name collision with the `SpeechRecognition` interface type.
const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  // Fix: With the constant renamed, this type reference to the `SpeechRecognition` interface is now valid.
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const hasRecognitionSupport = !!SpeechRecognitionAPI;

  useEffect(() => {
    if (!hasRecognitionSupport) {
      console.warn("Speech recognition not supported by this browser.");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setTranscript(prev => prev ? `${prev} ${finalTranscript}` : finalTranscript);
      }
    };
    
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
    }
    
    recognition.onend = () => {
        setIsListening(false);
    }

    recognitionRef.current = recognition;
    
    // Cleanup on unmount
    return () => {
      recognition.stop();
    };
  }, [hasRecognitionSupport]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript(''); // Clear previous transcript
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return { isListening, transcript, startListening, stopListening, hasRecognitionSupport, setTranscript };
};
