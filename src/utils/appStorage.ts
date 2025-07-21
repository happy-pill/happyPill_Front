/**
 * getLanguage : APP_LANGUAGE 데이터 가져오기
 * setLanguage : APP_LANGUAGE 스토리지에 저장
 */
export const appStorage = {
  getLanguage: () => localStorage.getItem('APP_LANGUAGE'),
  setLanguage: (lang: string) => localStorage.setItem('APP_LANGUAGE', lang),
};
