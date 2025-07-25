import type { Dispatch, SetStateAction } from 'react';

import React from 'react';

import type { ProductDetail } from '@/types/products';

import StyledButton from '@/components/button/StyledButton';
import SubscriptionPlanButton from '@/components/button/SubscriptionPlanButton';
import PurchaseOption from '@/components/purchaseOption/PurchaseOption';
import { CART_MODAL, PRODUCT_DELIVERY_BADGE } from '@/constants/locale';
import { SUBSCRIPTION_MONTH_OPTIONS } from '@/constants/subscription';
import useLocale from '@/hooks/useLocale';

interface productInfoProps {
  product: ProductDetail;
  subscriptionOption: number;
  setSubscriptionOption: Dispatch<SetStateAction<number>>;
  onAddToCart: () => void;
  onCheckout: (productId: string) => void;
}

const ProductInfoSection: React.FC<productInfoProps> = ({
  product,
  subscriptionOption,
  setSubscriptionOption,
  onAddToCart,
  onCheckout,
}) => {
  const { locale } = useLocale();

  const BUTTONS = [
    {
      key: 'addToCart',
      children: CART_MODAL[locale].addToCart,
      onClick: onAddToCart,
      variant: 'border',
      size: 'XL',
      className: 'h-[clamp(35px,5vw,50px)] rounded-sm bg-white text-[clamp(14px,2vw,18px)]',
    },
    {
      key: 'buyNow',
      children: CART_MODAL[locale].buyNow,
      onClick: () => onCheckout(product.productId),
      variant: 'green',
      size: 'XL',
      className: 'h-[clamp(35px,5vw,50px)] rounded-sm text-[clamp(14px,2vw,18px)]',
    },
  ] as const;

  return (
    <div className='max-width-container mx-auto grid w-full grid-cols-1 gap-x-5 md:grid-cols-2'>
      <img
        src={product?.thumbnailUrl}
        className='h-[150px] w-full rounded-md border-[#E2E2E2] object-cover md:h-auto'
        alt={`${product?.name} `}
      />
      <div className='pt-5 md:p-8'>
        <div className='border-b border-[#CECECE] pb-3'>
          <div className='flex justify-between'>
            <p className='font-regular text-[clamp(12px,1vw,14px)]'>{product?.company}</p>
            <p className='text-primary text-[clamp(10px,1vw,14px)] font-medium'>
              {PRODUCT_DELIVERY_BADGE[locale].prefix}
              <strong className='ml-1'>{PRODUCT_DELIVERY_BADGE[locale].highlight}</strong>
            </p>
          </div>
          <h2 className='mt-1 mb-2 text-[clamp(20px,2vw,34px)] font-bold'>{product?.name}</h2>
          <p className='text-[clamp(10px,1.8vw,16px)] font-medium'> {product?.description}</p>
        </div>
        <div>
          <div className='my-6'>
            <p className='mb-2.5 text-[clamp(13px,1vw,16px)] font-semibold'>개월 옵션</p>
            <div className='flex gap-x-2.5'>
              {SUBSCRIPTION_MONTH_OPTIONS.map((month) => (
                <SubscriptionPlanButton
                  key={month}
                  period={month}
                  isSelected={subscriptionOption === month}
                  onClick={() => setSubscriptionOption(month)}
                />
              ))}
            </div>
          </div>
          <div className='text-[clamp(10px,1.5vw,14px)] text-gray-400'>
            {product?.briefDescription}
          </div>

          <PurchaseOption className='p-0'>
            <PurchaseOption.PriceSection
              price={product?.price}
              quantity={subscriptionOption}
              priceLabel={CART_MODAL[locale].totalPriceLabel}
              className='mt-[clamp(30px,5vw,90px)]'
            />
            <PurchaseOption.ButtonGroup>
              {BUTTONS.map(({ key, ...buttonProps }) => (
                <StyledButton key={key} {...buttonProps} />
              ))}
            </PurchaseOption.ButtonGroup>
          </PurchaseOption>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSection;
