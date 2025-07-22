import { CATEGORY_COLORS } from '@/constants/colors';

//임시로 만들어놓은 함수
// 후에 관리자 페이지에서 카테고리 등록 할 때, text color 및 bg color 추가해서 등록할 예정

export const getCategoryColor = (categoryName: string): string => {
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    const char = categoryName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  const index = Math.abs(hash) % CATEGORY_COLORS.length;
  return CATEGORY_COLORS[index];
};
