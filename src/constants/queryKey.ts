const member = {
  category: {
    detail: ['categoryDetail'],
  },
  product: {
    detail: (productId: string) => ['productDetail', productId],
    related: ['productRelated'],
  },
};
const admin = {};

export const queryKey = {
  member,
  admin,
};
