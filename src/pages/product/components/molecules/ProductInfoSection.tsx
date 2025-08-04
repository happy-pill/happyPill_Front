import type { Dispatch, SetStateAction } from 'react';

import React from 'react';

import ProductDescription from '../atoms/ProductDescription';
import ProductHeader from '../atoms/ProductHeader';
import ProductThumbnail from '../atoms/ProductThumbnail';
import SubscriptionOptions from '../atoms/SubscriptionOptions';

import type { ProductDetail } from '@/types/products';

import StyledButton from '@/components/button/StyledButton';
import PurchaseOption from '@/components/purchaseOption/PurchaseOption';
import { CART_MODAL } from '@/constants/locale/modal';
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
    <div className='grid w-full grid-cols-1 gap-x-5 md:grid-cols-2'>
      <ProductThumbnail src={product?.thumbnailUrl} alt={product?.productName} />
      <div className='pt-5 md:p-8'>
        <ProductHeader product={product} />

        <SubscriptionOptions
          subscriptionOption={subscriptionOption}
          setSubscriptionOption={setSubscriptionOption}
        />

        <ProductDescription description={product?.description} />

        <PurchaseOption className='p-0'>
          <PurchaseOption.PriceSection
            price={product?.price}
            totalPrice={product?.price * subscriptionOption}
            monthlyPriceLabelPrefix={CART_MODAL[locale].monthlyPriceLabelPrefix}
            monthlyPriceLabelSuffix={CART_MODAL[locale].monthlyPriceLabelSuffix}
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
  );
};

export default ProductInfoSection;
