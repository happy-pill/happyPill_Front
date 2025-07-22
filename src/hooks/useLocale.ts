import { useState } from 'react';

import type { LocaleType } from '@/types/common';

import { appStorage } from '@/utils/appStorage';

const useLocale = () => {
  const [localeState, setLocaleState] = useState<LocaleType>(() => ({
    locale: (appStorage.getLanguage() ?? 'ko') as 'ko' | 'en',
  }));

  const changeLocale = (newLang: 'ko' | 'en') => {
    appStorage.setLanguage(newLang);
    setLocaleState({ locale: newLang });
  };

  return { locale: localeState.locale, changeLocale };
};

export default useLocale;
