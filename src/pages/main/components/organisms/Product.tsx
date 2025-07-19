import React from 'react';

import Section from '../atoms/Section';
import CategorySection from '../molecules/Category';
import ProductList from '../molecules/ProductList';

import type { Category } from '@/types/category';
import type { ProductItem } from '@/types/products';

interface ProductSectionProps {
  categories: Category[];
  activeCategoryId: string;
  onCategoryChange: (category: Category, isAll?: boolean) => void;
  onLoadMore: () => void;
  productBlock: ProductItem[];
  hasNext: boolean;
  isCategoryLoading: boolean;
  isProductLoading: boolean;
  isFetchingNextPage: boolean;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  categories,
  activeCategoryId,
  onCategoryChange,
  onLoadMore,
  productBlock,
  isCategoryLoading,
  isProductLoading,
  hasNext,
  isFetchingNextPage,
}) => {
  return (
    <Section title='product list' className='px-4'>
      <div className='mb-40 flex flex-col gap-x-[8vw] md:flex-row'>
        <CategorySection
          onEventHandler={onCategoryChange}
          activeCategoryId={activeCategoryId}
          categories={categories}
          isLoading={isCategoryLoading}
        />

        <ProductList
          isProductLoading={isProductLoading}
          isCategoryLoading={isCategoryLoading}
          hasNext={hasNext}
          productBlock={productBlock}
          onLoadMore={onLoadMore}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </Section>
  );
};

export default ProductSection;
