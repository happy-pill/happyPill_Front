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
          className='h-10 md:h-15'
          onClickHandler={() => onEventHandler(firstCategory, true)}
        />
        {categories?.map((category: Category) => {
          return (
            <CategoryButton
              key={category.categoryId}
              icon={category.thumbnailUrl}
              value={category.name}
              isActive={activeCategoryId === category.categoryId}
              className='h-10 md:h-15'
              onClickHandler={() => onEventHandler(category)}
            />
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className='hide-scrollbar md:gap-x-auto mb-5 flex w-full gap-x-3 gap-y-4 overflow-x-scroll px-4 md:grid md:w-48 lg:px-0'>
        {renderContent()}
      </div>
    </div>
  );
};

export default CategorySection;
