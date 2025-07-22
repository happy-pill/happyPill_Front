const member = {
  category: {
    detail: ['categoryDetail'],
  },
  product: {
    detail: (productId: string) => ['productDetail', productId],
    related: ['productRelated'],
    list: (activeCategoryId: string, filteredCategoryIds: string[]) => [
      'productList',
      activeCategoryId,
      filteredCategoryIds,
    ],
  },
  user: {
    info: ['userInfo'],
    updateNickname: ['userUpdateNickname'],
  },
};
const admin = {};

export const queryKey = {
  member,
  admin,
};
