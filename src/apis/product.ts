import instance from './instance/main'

/**
 * 상품 데이터 페칭
 * @param  categoryId 카테고리 아이디
 * @param  lastProductId 마지막으로 페칭된 상품의 아이디
 * @param  size 페이지 당 항목 수
 * @returns Axios 응답 객체
 */

const getProductList = async (categoryId: number, lastProductId: number, size: number = 8) => {
  const response = await instance.get(
    `/api/products?categories=${categoryId}&lastProductId=${lastProductId}&size=${size}`,
  )
  return response
}

const productAPI = {
  getProductList,
}

export default productAPI
