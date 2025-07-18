import { useState } from 'react';

import { appStorage } from '@/utils/appStorage';

const useLocale = () => {
  const [locale, setLocale] = useState<'ko' | 'en'>(() => appStorage.getLanguage() as 'ko' | 'en');

  const changeLocale = (newLang: 'ko' | 'en') => {
    appStorage.setLanguage(newLang);
    setLocale(newLang);
  };

  return { locale, changeLocale };
};
export default useLocale;
