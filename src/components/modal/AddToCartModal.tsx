import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import Modal from './ui/Modal';
import StyledButton from '../button/StyledButton';
import PurchaseOption from '../purchaseOption/PurchaseOption';
import Select from '../select/Select';

import type { CheckoutProduct, ProductDetail } from '@/types/products';

import { CART_MODAL } from '@/constants/locale/modal';
import { routePath } from '@/constants/path';
import { SUBSCRIPTION_MONTH_OPTIONS } from '@/constants/subscription';
import useLocale from '@/hooks/useLocale';
import useModal from '@/hooks/useModal';
import useCheckoutStore from '@/stores/checkoutStore';
import { cartStorage } from '@/utils/cartStorage';

type CartProductProps = {
  product: ProductDetail;
};

const AddToCartModal: React.FC<CartProductProps> = ({ product }) => {
  const { productId, productName, price, briefDescription, thumbnailUrl } = product;
  const [subscriptionOption, setSubscriptionOption] = useState<number>(1);
  const { openModal, closeModal } = useModal();
  const { addItem } = useCheckoutStore();
  const navigate = useNavigate();
  const { locale } = useLocale();
  const item: CheckoutProduct = {
    productId,
    productName,
    price,
    briefDescription,
    thumbnailUrl,
    period: subscriptionOption,
  };

  const handleChange = (value: string | number) => {
    setSubscriptionOption(Number(value));
  };

  const handlePurchase = () => {
    navigate(routePath.common.purchase);
    addItem(item);
  };

  const handleAddToCart = () => {
    if (subscriptionOption === undefined) {
      // 옵션 선택 안내 또는 기본값 설정
      alert('구독 옵션을 선택해주세요.');
      return;
    }

    cartStorage.save(item);
    closeModal();
    openModal({ type: 'cartAddSuccess' });
  };
  const BUTTONS = [
    { key: 'addToCart', variant: 'border', onClick: handleAddToCart },
    { key: 'buyNow', variant: 'green', onClick: handlePurchase },
  ] as const;

  return (
    <Modal>
      <Modal.Content className='relative w-full max-w-[430px]'>
        <Modal.Close className='absolute top-4 right-4' onClick={closeModal}>
          <IoClose size={20} />
        </Modal.Close>
        <PurchaseOption className='p-0'>
          <PurchaseOption.Header>
            <PurchaseOption.Title>{CART_MODAL[locale].title}</PurchaseOption.Title>
            <Select value={subscriptionOption} onChange={handleChange}>
              <Select.Trigger
                className='border-1 border-[#dedede]'
                suffix={CART_MODAL[locale].subscriptionLabel}
              />
              <Select.Content className='border-1 border-[#DEDEDE]'>
                <Select.Group className='grid'>
                  {SUBSCRIPTION_MONTH_OPTIONS.map((month) => (
                    <Select.Item
                      key={month}
                      value={month}
                      className='text-[clamp(13px,2vw,16px)] hover:bg-gray-100'
                    >
                      {month}
                      {CART_MODAL[locale].subscriptionLabel}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select>
          </PurchaseOption.Header>
          <PurchaseOption.PriceSection
            price={price}
            totalPrice={price * subscriptionOption}
            priceLabel={CART_MODAL[locale].totalPriceLabel}
            monthlyPriceLabelPrefix={CART_MODAL[locale].monthlyPriceLabelPrefix}
            monthlyPriceLabelSuffix={CART_MODAL[locale].monthlyPriceLabelSuffix}
            className='mt-40'
          />
          <PurchaseOption.ButtonGroup>
            {BUTTONS.map(({ key, variant, onClick }) => (
              <StyledButton
                key={key}
                variant={variant}
                size='XL'
                className='h-[clamp(35px,5vw,50px)] rounded-sm text-[clamp(14px,2vw,18px)]'
                onClick={onClick}
              >
                {CART_MODAL[locale][key]}
              </StyledButton>
            ))}
          </PurchaseOption.ButtonGroup>
        </PurchaseOption>
      </Modal.Content>
    </Modal>
  );
};

export default AddToCartModal;
