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
const admin = {
  management: {
    subscribe: {
      list: (page?: number, size?: number) => ['managementSubscribeList', page, size],
    },
    user: {
      list: (page?: number, size?: number) => ['managementUserList', page, size],
      detail: (userId: string) => ['managementUserDetail', userId],
    },
    product: {
      detail: (productId: string) => ['managementProductDetail', productId],
      list: (page?: number, size?: number, categories?: number) => [
        'managementProductList',
        page,
        size,
        categories,
      ],
      history: (productId: string, page?: number, size?: number) => [
        'managementProductHistory',
        productId,
        page,
        size,
      ],
    },
  },
};

export const queryKey = {
  member,
  admin,
};
