import instance from './instance/main'

/**
 * 상품 데이터 페칭
 * @param  categoryId 카테고리 아이디
 * @param  lastProductId 마지막으로 페칭된 상품의 아이디
 * @param  size 페이지 당 항목 수
 * @returns products: Product[], lastProductId: number, hasNext: boolean
 */

const getProductList = async (categoryId: string, lastProductId?: number, size: number = 8) => {
  try {
    let url = `/api/products?categoryId=${categoryId}&size=${size}`

    if (lastProductId !== undefined) {
      url += `&lastProductId=${lastProductId}`
    }

    const response = await instance.get(url)
    return response
  } catch (err) {
    console.log('상품 리스트를 불러오는 도중에 오류가 발생했습니다.', err)
    throw err
  }
}

const getProductDetail = async (productId: string) => {
  try {
    const response = await instance.get(`/api/products/${productId}`)
    return response
  } catch (err) {
    console.log('상품 디테일 정보를 불러오는 도중에 오류가 발생했습니다.', err)
    throw err
  }
}

const getRelatedProducts = async () => {
  try {
    const response = await instance.get('/api/products/related')
    return response
  } catch (err) {
    console.log('관련 상품 정보를 불러오는 도중에 오류가 발생했습니다.', err)
    throw err
  }
}

const productAPI = {
  getProductList,
  getProductDetail,
  getRelatedProducts,
}

export default productAPI
