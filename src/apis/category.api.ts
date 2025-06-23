import instance from './instance/main'

/**
 * 카테고리 버튼 리스트 및 배너 data fetching
 * @returns  categoryId: string, thumbnailUrl: string, name: string, description:string, bannerImgUrl:string
 */

const getCategoryDetail = async () => {
  try {
    const response = await instance.get(`/api/categories`)

    return response
  } catch (err) {
    console.log('카테고리 리스트와 배너를 가져오는 도중에 오류가 발생했습니다.', err)
    throw err
  }
}

const categoryAPI = {
  getCategoryDetail,
}

export default categoryAPI
