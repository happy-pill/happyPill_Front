/**
 * 천단위로 콤마 붙이기
 * @param value
 * @returns ex 1000 -> 1,000
 */
export const formatValueToComma = (value: number | string) => {
  if (!value) return '';

  return Number(value).toLocaleString();
};

/**
 * 날짜 데이터를 yyyy/mm/dd 형식으로 반환
 * @param dateValue
 * @returns yyyy/mm/dd
 */
export const formatDateToFullDateSlide = (dateValue: string) => {
  if (!dateValue) return '';

  const date = new Date(dateValue);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
};
