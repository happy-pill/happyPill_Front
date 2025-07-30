import type { ProductDetail } from '@/types/products';

import { PRODUCT_DELIVERY_BADGE } from '@/constants/locale';
import useLocale from '@/hooks/useLocale';

interface ProductHeaderProps {
  product: ProductDetail;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const { locale } = useLocale();
  return (
    <div className='border-b border-[#CECECE] pb-3'>
      <div className='flex justify-between'>
        <p className='font-regular text-[clamp(12px,1vw,14px)]'>{product?.company}</p>
        <p className='text-primary text-[clamp(10px,1vw,14px)] font-medium'>
          {PRODUCT_DELIVERY_BADGE[locale].prefix}
          <strong className='ml-1'>{PRODUCT_DELIVERY_BADGE[locale].highlight}</strong>
        </p>
      </div>
      <h2 className='mt-1 mb-2 text-[clamp(20px,2vw,34px)] font-bold'>{product?.productName}</h2>
      <p className='text-[clamp(10px,1.8vw,16px)] font-medium'> {product?.description}</p>
    </div>
  );
};

export default ProductHeader;
