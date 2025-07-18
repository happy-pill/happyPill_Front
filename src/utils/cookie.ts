/**
 * 데이터 쿠키에 저장
 * @param {keyName, value, days}
 */
export const setCookie = ({
  keyName,
  value,
  days,
}: {
  keyName: string;
  value: string;
  days: number;
}) => {
  let expires = '';

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 1000);
    expires = date.toUTCString();
    document.cookie = `${keyName}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }
};

/**
 * 쿠키 데이터 가져오기
 * @param keyName
 * @returns data
 */
export const getCookie = ({ keyName }: { keyName: string }) => {
  return (
    document.cookie
      .split(';')
      .find((row) => row.startsWith(keyName + '='))
      ?.split('=')[1] ?? null
  );
};

/**
 * 쿠키 삭제
 * @param keyName
 */
export const deleteCookie = ({ keyName }: { keyName: string }) => {
  document.cookie = `${keyName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
