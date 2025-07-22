import Card from '../atoms/Card';
import CardSkeleton from '../atoms/CardSkeleton';

import type { ProductItem } from '@/types/products';

interface ProductListProps {
  productBlock: ProductItem[];
  onLoadMore: () => void;
  hasNext: boolean;
  isProductLoading: boolean;
  isCategoryLoading: boolean;
  isFetchingNextPage: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  isCategoryLoading,
  isProductLoading,
  productBlock,
  hasNext,
  onLoadMore,
  isFetchingNextPage,
}) => {
  const isAnyLoading = isCategoryLoading || isProductLoading;

  const renderContent = () => {
    // 로딩 중이면서 기존 상품이 없는 경우 (초기 로딩 또는 카테고리 변경 시)
    if ((isProductLoading || isCategoryLoading) && productBlock.length === 0) {
      return (
        <div className='grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 xl:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, idx) => (
            <CardSkeleton key={`${idx}`} />
          ))}
        </div>
      );
    }
    // 로딩이 완료되었고 상품이 없는 경우
    if (!isAnyLoading && productBlock.length === 0) {
      return (
        <div className='flex h-full w-full items-center justify-center text-center'>
          <div className='text-lg text-gray-500'>등록된 상품이 없습니다.</div>
        </div>
      );
    }

    return (
      <div className='grid grid-cols-1 gap-x-5 gap-y-5 px-4 md:grid-cols-2 lg:px-0 xl:grid-cols-3'>
        {productBlock.map((product, idx) => (
          <Card key={`${product.categoryName}${idx}`} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div className='w-full'>
      {renderContent()}

      {isFetchingNextPage && (
        <div className='mx-auto mt-40 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'></div>
      )}
      {!isFetchingNextPage && hasNext && (
        <div className='mt-40 text-center'>
          <button
            className='bg-primary h-[40px] w-[190px] cursor-pointer rounded-md font-semibold text-white shadow-xl'
            onClick={onLoadMore}
          >
            더 보기
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
