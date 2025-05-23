import { useEffect, useState } from 'react'
import IntroSection from './components/main/IntroSection'
import CategorySection from './components/main/CategorySection'
import { CATEGORIES, PRODUCTS_BY_CATEGORIES } from '../../data/productsMock'
/* import categoryAPI from '../../apis/category' */
import productAPI from '../../apis/product'
import { Category, CategoryBlock } from '../../types/category'

const MainPage = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]) // 카테고리 버튼 리스트 및 배너
  const [categoryBlocks, setCategoryBlocks] = useState<CategoryBlock[]>([]) // 카테고리 배너 및 상품 리스트
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)

  // 카테고리 초기 로딩 및 관련 상품리스트 요청
  useEffect(() => {
    const fetchCategories = async () => {
      /* const res = await categoryAPI.getCategoryDetail()
      const list = res.data
      setCategoryList(list) */

      /* if (list.length > 0) {
        loadProductsForCategory(list[0], null)
        } */
      setCategoryList(CATEGORIES)
      setCategoryBlocks(PRODUCTS_BY_CATEGORIES)
    }

    fetchCategories()
  }, [])

  // 특정 카테고리에 대한 상품 리스트를 불러온 후 상태 저장하는 함수
  const loadProductsForCategory = async (category: Category, lastProductId?: number | null) => {
    const validLastProductId = lastProductId != null ? lastProductId : undefined
    const res = await productAPI.getProductList(category.categoryId, validLastProductId)

    const { products, lastProductId: newLastId, hasNext } = res.data

    setCategoryBlocks((prev) => {
      // 현재 전달받은 category의 id와 저장되어 있던 category의 id가 같은 지
      const existing = prev.find((block) => block.category.categoryId === category.categoryId)

      if (existing) {
        // 이미 존재하는 리스트는 업데이트
        return prev.map((block) =>
          block.category.categoryId === category.categoryId
            ? {
                ...block,
                products: [...block.products, ...products],
                lastProductId: newLastId,
                hasNext,
              }
            : block,
        )
      } else {
        // 새로운 상품 리스트 추가
        return [
          ...prev,
          {
            category,
            products,
            lastProductId: newLastId,
            hasNext,
          },
        ]
      }
    })
  }

  // 더보기 버튼 클릭 시 컨텐츠 fetching용도로 만든 함수
  const handleLoadMore = (category: Category, lastProductId: number | null) => {
    const block = categoryBlocks[currentCategoryIndex]
    if (block.hasNext) {
      // 아직 남은 상품이 있다면 현재 카테고리 상품 추가
      loadProductsForCategory(category, lastProductId)
    } else {
      // 마지막 페이지라면 다음 카테고리로 이동
      const nextCategory = categoryList[currentCategoryIndex + 1]
      loadProductsForCategory(nextCategory, null)
      setCurrentCategoryIndex(currentCategoryIndex + 1)
    }
  }

  return (
    <div className='relative'>
      <IntroSection categories={categoryList} />
      {categoryBlocks.map((block) => {
        return (
          <CategorySection
            key={block.category.categoryId}
            categoryBlock={block}
            onLoadMore={handleLoadMore}
          />
        )
      })}
    </div>
  )
}

export default MainPage
