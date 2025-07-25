import React from 'react';

import Carousel from '@/components/carousel/Carousel';
import { RELATED_PRODUCTS_SECTION } from '@/constants/locale';
import useLocale from '@/hooks/useLocale';

interface RelatedProductsCarouselProps {
  products: {
    productId: string;
    thumbnail: string;
    price: number;
  }[];
  onClickProduct: (productId: string) => void;
}

const RelatedProductsCarousel: React.FC<RelatedProductsCarouselProps> = ({
  products,
  onClickProduct,
}) => {
  const { locale } = useLocale();
  return (
    <div className='mt-[100px] max-w-[1280px]'>
      <h3 className='mb-5 text-[clamp(17px,2vw,22px)] font-bold'>
        {RELATED_PRODUCTS_SECTION[locale].title}
      </h3>
      <div className='relative mx-auto'>
        <Carousel variant='peek'>
          <Carousel.ItemList>
            {products.map((item, idx) => (
              <Carousel.Item key={idx} onClick={() => onClickProduct(item.productId)}>
                <div className='flex flex-col items-center gap-y-2'>
                  <img
                    className='h-[clamp(110px,10vw,200px)] w-[clamp(110px,10vw,200px)] overflow-hidden rounded-xl object-cover'
                    draggable={false}
                    src={item.thumbnail}
                    alt='상품 이미지'
                  />
                  <p className='text-[clamp(12px,1vw,14px)] font-bold'>
                    {item.price.toLocaleString()}원
                  </p>
                </div>
              </Carousel.Item>
            ))}
          </Carousel.ItemList>
          <Carousel.Navigation />
        </Carousel>
      </div>
    </div>
  );
};

export default RelatedProductsCarousel;
