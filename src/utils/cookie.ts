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

export const getCookie = ({ keyName }: { keyName: string }) => {
  return (
    document.cookie
      .split(';')
      .find((row) => row.startsWith(keyName + '='))
      ?.split('=')[1] ?? null
  );
};

export const deleteCookie = ({ keyName }: { keyName: string }) => {
  document.cookie = `${keyName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
