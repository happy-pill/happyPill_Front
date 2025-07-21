import React from 'react';

import Card from '../atoms/Card';
import CardSkeleton from '../atoms/CardSkeleton';
import Section from '../atoms/Section';

import type { BestProduct } from '@/types/products';

import Carousel from '@/components/carousel/Carousel';

interface BestProductProps {
  products: BestProduct[];
  isLoading: boolean;
}

const BestProductSection: React.FC<BestProductProps> = ({ products, isLoading }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      );
    }

    if (!isLoading && products.length === 0) {
      return (
        <div className='flex justify-center py-20 text-lg text-gray-500'>
          등록된 상품이 없습니다.
        </div>
      );
    }

    return (
      <Carousel
        variant='default'
        visibleSlides={{
          mobile: 1,
          tablet: 2,
          desktop: 4,
        }}
        gap={20}
      >
        <Carousel.ItemList>
          {products.map((product, idx) => (
            <Carousel.Item key={`${product.productId}-${idx}`}>
              <Card product={product} />
            </Carousel.Item>
          ))}
        </Carousel.ItemList>
      </Carousel>
    );
  };

  return (
    <Section title='best selection' className='mt-25 px-4 md:mt-20 lg:mt-48'>
      <div className='max-width-container mx-auto w-full'>{renderContent()}</div>
    </Section>
  );
};

export default BestProductSection;
