import { useState } from 'react';
import { CgClose } from 'react-icons/cg';

import Modal from './ui/Modal';
import SubscriptionPlanButton from '../button/SubscriptionPlanButton';

import type { Product } from '@/types/products';

import useModal from '@/hooks/useModal';
import { cartStorage } from '@/utils/cartStorage';

type CartProductProps = Omit<Product, 'company' | 'categoryId'>;

export const OPTIONS = [1, 3, 6];

const AddToCartModal: React.FC<CartProductProps> = (props) => {
  const { productId, name, price, briefDescription, thumbnailUrl } = props;
  const [subscripionOption, setSubscriptionOption] = useState(1);
  const { openModal, closeModal } = useModal();
  const item = {
    productId,
    name,
    price,
    briefDescription,
    thumbnailUrl,
    period: subscripionOption,
  };

  const handleAddToCart = () => {
    cartStorage.save(item);
    closeModal();
    openModal({ type: 'cartAddSuccess', props: { name } });
  };
  return (
    <Modal>
      <Modal.Content className='relative w-full max-w-[430px]'>
        <Modal.Close className='absolute right-2 top-2'>
          <CgClose color='#777777' />
        </Modal.Close>

        <div className='mb-8 flex flex-col items-center'>
          <p className='text-18 font-semibold'>{name}</p>
          <h2 className='text-22 font-bold text-[#026242] tablet:text-24'>장바구니 담기</h2>
        </div>
        <div>
          <p className='mb-2 text-14 font-semibold'>개월 옵션</p>
          <div className='grid grid-cols-3 gap-x-5'>
            {OPTIONS.map((month) => (
              <SubscriptionPlanButton
                key={month}
                period={month}
                isSelected={subscripionOption === month}
                onClick={() => setSubscriptionOption(month)}
              />
            ))}
          </div>
        </div>
        <button
          className='mt-8 w-full rounded-3xl bg-button-secondary py-2 font-semibold text-white tablet:py-3'
          onClick={handleAddToCart}
        >
          장바구니 담기
        </button>
      </Modal.Content>
    </Modal>
  );
};

export default AddToCartModal;
