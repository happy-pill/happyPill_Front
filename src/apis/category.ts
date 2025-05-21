import instance from './instance/main'

/**
 * 카테고리 버튼 리스트 및 배너 data fetching
 * @returns {response} { categoryId: number, thumbnailUrl: string, name: string, description:string, bannerImgUrl:string }
 */

const getCategoryDetail = async () => {
  const response = await instance.get(`/api/categories`)
  return response
}

const categoryAPI = {
  getCategoryDetail,
}

export default categoryAPI
