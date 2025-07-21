import React from 'react';

import ButtonSkeleton from '../atoms/ButtonSkeleton';
import CategoryButton from '../atoms/CategoryButton';

import type { Category } from '@/types/category';

interface CategorySectionProps {
  activeCategoryId: string;
  categories: Category[];
  onEventHandler: (category: Category, isAll?: boolean) => void;
  isLoading: boolean;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  activeCategoryId,
  categories,
  onEventHandler,
  isLoading,
}) => {
  const renderContent = () => {
    // categories가 비어있거나 로딩 중일 때 처리
    if (isLoading || categories.length === 0) {
      return (
        <>
          {Array.from({ length: 8 }).map((_, idx) => (
            <ButtonSkeleton key={idx} />
          ))}
        </>
      );
    }

    const firstCategory = categories[0];
    return (
      <>
        <CategoryButton
          key={firstCategory.categoryId}
          value='모든 상품'
          isActive={activeCategoryId === 'ALL'}
          className='h-10 w-48 md:h-15'
          onClick={() => onEventHandler(firstCategory, true)}
        />
        {categories?.map((category: Category) => {
          return (
            <CategoryButton
              key={category.categoryId}
              icon={category.thumbnailUrl}
              value={category.name}
              isActive={activeCategoryId === category.categoryId}
              className='h-10 w-48 md:h-15'
              onClick={() => onEventHandler(category)}
            />
          );
        })}
      </>
    );
  };

  return (
    <div className='hide-scrollbar mb-5 flex w-full gap-x-3 gap-y-4 overflow-x-auto px-4 md:w-48 md:flex-col md:gap-y-3 md:overflow-x-visible lg:px-0'>
      {renderContent()}
    </div>
  );
};

export default CategorySection;
