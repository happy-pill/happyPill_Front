import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import Modal from './ui/Modal';
import Button from '../button/StyledButton';
import Select from '../select/Select';

import type { LocaleType } from '@/types/common';
import type { ProductItem } from '@/types/products';

import { CART_MODAL } from '@/constants/locale';
import useLocale from '@/hooks/useLocale';
import useModal from '@/hooks/useModal';
import { cartStorage } from '@/utils/cartStorage';

type CartProductProps = {
  locale: LocaleType;
  product: Omit<ProductItem, 'company' | 'categoryId'>;
};

const AddToCartModal: React.FC<CartProductProps> = ({ product }) => {
  const { productId, name, price, briefDescription, thumbnailUrl } = product;
  const { locale } = useLocale();
  const [subscriptionOption, setSubscriptionOption] = useState<number | undefined>(undefined);
  const { openModal, closeModal } = useModal();

  const navigate = useNavigate();

  const handleSubscriptionChange = (value: string | number) => {
    setSubscriptionOption(Number(value));
  };

  const handleAddToCart = () => {
    if (subscriptionOption === undefined) {
      // 옵션 선택 안내 또는 기본값 설정
      alert('구독 옵션을 선택해주세요.');
      return;
    }

    const item = {
      productId,
      name,
      price,
      briefDescription,
      thumbnailUrl,
      period: subscriptionOption,
    };

    cartStorage.save(item);
    closeModal();
    openModal({ type: 'cartAddSuccess' });
  };

  //총 가격을 계산하는 함수
  const calculateTotalPrice = () => {
    if (subscriptionOption === undefined) return 0;

    return price * subscriptionOption;
  };

  return (
    <Modal>
      <Modal.Content className='relative w-full max-w-[430px]'>
        <Modal.Close className='absolute top-4 right-4' onClick={closeModal}>
          <IoClose size={20} />
        </Modal.Close>
        <section>
          <h2 className='text-m-medium mb-2.5'>{CART_MODAL[locale].title}</h2>
          <div>
            <Select value={subscriptionOption} onChange={handleSubscriptionChange}>
              <Select.Trigger
                className='border-1 border-[#dedede]'
                placeholder='구독 기간을 선택하세요'
                suffix={CART_MODAL[locale].subscriptionLabel}
              />
              <Select.Content className='border-1 border-[#DEDEDE]'>
                <Select.Group className='grid'>
                  <Select.Item value='1' className='hover:bg-gray-100'>
                    1{CART_MODAL[locale].subscriptionLabel}
                  </Select.Item>
                  <Select.Item value='3' className='hover:bg-gray-100'>
                    3{CART_MODAL[locale].subscriptionLabel}
                  </Select.Item>
                  <Select.Item value='6' className='hover:bg-gray-100'>
                    6{CART_MODAL[locale].subscriptionLabel}
                  </Select.Item>
                </Select.Group>
              </Select.Content>
            </Select>
          </div>
        </section>
        <section className='mt-40 flex justify-between'>
          <h3 className='text-xl-regular'>{CART_MODAL[locale].totalPriceLabel}</h3>

          <div className='grid justify-items-end'>
            <span className='text-2xl-bold'>{calculateTotalPrice().toLocaleString()}원</span>
            <span className='text-xs-regular text-primary'>
              {CART_MODAL[locale].monthlyPriceLabelPrefix}
              {price}
            </span>
          </div>
        </section>
        <div className='mt-5 flex justify-center gap-x-3'>
          <Button variant='border' size='M' onClick={handleAddToCart}>
            {CART_MODAL[locale].addToCart}
          </Button>
          <Button variant='green' size='M' onClick={() => navigate(`/payment/${productId}`)}>
            {CART_MODAL[locale].buyNow}
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default AddToCartModal;
