import { useState } from 'react';

import type { LocaleType } from '@/types/common';

import { appStorage } from '@/utils/appStorage';

const useLocale = () => {
  const [locale, setLocale] = useState<LocaleType>(() => ({
    locale: (appStorage.getLanguage() ?? 'ko') as 'ko' | 'en',
  }));

  const changeLocale = (newLang: 'ko' | 'en') => {
    appStorage.setLanguage(newLang);
    setLocale({ locale: newLang });
  };

  return { locale, changeLocale };
};

export default useLocale;
