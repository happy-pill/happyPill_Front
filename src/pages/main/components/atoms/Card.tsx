import CartButton from './CartButton';
import TagButton from './TagButton';

import type { ProductItem } from '@/types/products';

import useModal from '@/hooks/useModal';
import { getCategoryColor } from '@/utils/colorUtils';

interface CardProps {
  product: ProductItem;
}

const Card = ({ product }: CardProps) => {
  const { best, categoryName } = product;
  const { openModal } = useModal();
  const categoryTagBgColor = getCategoryColor(categoryName);
  const bestTagBgColor = 'bg-primary-text';

  return (
    <div className='rounded-m mb-[12px] overflow-hidden rounded-md bg-[#ffffffE6] text-left'>
      <div className='relative z-[2] h-[250px]'>
        <div className='absolute top-[20px] left-[20px] flex gap-x-1'>
          {best && <TagButton value='BEST' bgColor={bestTagBgColor} />}
          <TagButton value={categoryName} bgColor={categoryTagBgColor} />
        </div>
        <a href={`/product/${product.productId}`}>
          <img
            className='h-full w-full object-cover'
            src='https://happypill-cdn.jiheon2234.dev/abcd.png'
            width={305}
            height={250}
            draggable={false}
            alt='비타민이미지'
          />
        </a>
      </div>
      <div className='px-[20px] py-[30px]'>
        <p className='text-xl-bold'>{product.name}</p>
        <p className='text-12 mt-[15px]'>{product.company}</p>
        <div className='mt-5xl flex justify-between'>
          <p className='text-xl-medium'>{product.price}</p>

          <CartButton onClick={() => openModal({ type: 'addToCart', props: { product } })} />
        </div>
      </div>
    </div>
  );
};

export default Card;
