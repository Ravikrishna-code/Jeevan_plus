import { useState, useCallback } from 'react';
import * as Speech from 'expo-speech';
import { useLanguage } from '@/context/LanguageContext';

export function useVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { language } = useLanguage();

  const getVoiceLanguage = () => {
    switch (language) {
      case 'hi':
        return 'hi-IN';
      case 'pa':
        return 'pa-IN';
      default:
        return 'en-US';
    }
  };

  const speak = useCallback((text: string) => {
    if (isSpeaking) {
      Speech.stop();
    }

    setIsSpeaking(true);
    
    Speech.speak(text, {
      language: getVoiceLanguage(),
      pitch: 1.0,
      rate: 0.8,
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
    });
  }, [isSpeaking, language]);

  const stopSpeaking = useCallback(() => {
    Speech.stop();
    setIsSpeaking(false);
  }, []);

  return {
    speak,
    stopSpeaking,
    isSpeaking,
  };
}