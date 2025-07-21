import instance from '../instance/main';

/**
 * 상품 데이터 페칭
 * @param  categoryId 카테고리 아이디
 * @param  lastProductId 마지막으로 페칭된 상품의 아이디
 * @param  size 페이지 당 항목 수
 * @returns products: Product[], lastProductId: number, hasNext: boolean
 */

const getProductList = async (categoryId: string, lastProductId?: number, size: number = 8) => {
  let url = `/api/products?categoryId=${categoryId}&size=${size}`;

  if (lastProductId !== undefined) {
    url += `&lastProductId=${lastProductId}`;
  }

  const response = await instance.get(url);
  return response.data;
};

const getProductDetail = async (productId: string) => {
  const response = await instance.get(`/api/products/${productId}`);
  return response.data;
};

const getRelatedProducts = async () => {
  const response = await instance.get('/api/products/related');
  return response.data;
};

const getBestProductList = async () => {
  const response = await instance.get(`/api/products/best`);
  return response.data;
};
const productAPI = {
  getProductList,
  getProductDetail,
  getRelatedProducts,
  getBestProductList,
};

export default productAPI;
