import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi' | 'te' | 'pa';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.predict': 'Predict',
    'nav.disease': 'Disease',
    'nav.presentation': 'Presentation',
    'hero.title': 'AI-Powered Crop Prediction',
    'hero.subtitle': 'Helping farmers maximize yield and sustainability using AI.',
    'hero.cta': 'Get Started',
    'dashboard.title': 'Farmer Dashboard',
    'predict.title': 'AI Crop Predictor Engine',
    'disease.title': 'Disease Detector',
  },
  hi: {
    'nav.dashboard': 'डैशबोर्ड',
    'nav.predict': 'फसल भविष्यवाणी',
    'nav.disease': 'रोग पहचान',
    'nav.presentation': 'प्रस्तुति',
    'hero.title': 'एआई-संचालित फसल भविष्यवाणी',
    'hero.subtitle': 'किसानों को एआई का उपयोग करके पैदावार और स्थिरता बढ़ाने में मदद करना।',
    'hero.cta': 'शुरू करें',
    'dashboard.title': 'किसान डैशबोर्ड',
    'predict.title': 'एआई फसल भविष्यवाणी इंजन',
    'disease.title': 'रोग पहचानकर्ता',
  },
  te: {
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.predict': 'పంట అంచనా',
    'nav.disease': 'వ్యాధి గుర్తింపు',
    'nav.presentation': 'ప్రెజెంటేషన్',
    'hero.title': 'AI-ఆధారిత పంట అంచనా',
    'hero.subtitle': 'AI ఉపయోగించి రైతులు దిగుబడి మరియు స్థిరత్వాన్ని పెంచడంలో సహాయపడుతుంది.',
    'hero.cta': 'ప్రారంభించండి',
    'dashboard.title': 'రైతు డాష్‌బోర్డ్',
    'predict.title': 'AI పంట అంచనా ఇంజిన్',
    'disease.title': 'వ్యాధి గుర్తింపుదారు',
  },
  pa: {
    'nav.dashboard': 'ਡੈਸ਼ਬੋਰਡ',
    'nav.predict': 'ਫਸਲ ਦੀ ਭਵਿੱਖਬਾਣੀ',
    'nav.disease': 'ਬਿਮਾਰੀ ਦੀ ਪਛਾਣ',
    'nav.presentation': 'ਪੇਸ਼ਕਾਰੀ',
    'hero.title': 'AI-ਅਧਾਰਤ ਫਸਲ ਦੀ ਭਵਿੱਖਬਾਣੀ',
    'hero.subtitle': 'AI ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕਿਸਾਨਾਂ ਨੂੰ ਪੈਦਾਵਾਰ ਅਤੇ ਸਥਿਰਤਾ ਵਧਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਨਾ।',
    'hero.cta': 'ਸ਼ੁਰੂ ਕਰੋ',
    'dashboard.title': 'ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ',
    'predict.title': 'AI ਫਸਲ ਭਵਿੱਖਬਾਣੀ ਇੰਜਣ',
    'disease.title': 'ਬਿਮਾਰੀ ਪਛਾਣਕਰਤਾ',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
