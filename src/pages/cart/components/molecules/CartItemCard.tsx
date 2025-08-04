import PeriodSelector from '../atoms/PeriodSelector';
import PriceDisplay from '../atoms/PriceDisplay';
import ProductInfo from '../atoms/ProductInfo';
import ProductThumbnail from '../atoms/ProductThumbnail';
import RemoveButton from '../atoms/RemoveButton';

import type { CartItemProps } from '@/pages/cart/index';

import CheckBox from '@/components/checkbox/CheckBox';
import { CART_MODAL } from '@/constants/locale/modal';
import useLocale from '@/hooks/useLocale';

interface CartItemCardProps {
  item: CartItemProps;
  isSelected: boolean;
  onSelectionChange: (productId: string) => void;
  onPeriodChange: (productId: string, period: string | number) => void;
  onRemoveItem: (productId: string) => void;
}

const CartItemCard = ({
  item,
  isSelected,
  onSelectionChange,
  onPeriodChange,
  onRemoveItem,
}: CartItemCardProps) => {
  const { locale } = useLocale();
  return (
    <div className='grid grid-cols-[max-content_1fr] items-center gap-x-[clamp(6px,1vw,20px)] rounded-md bg-white px-[clamp(10px,1vw,16px)] py-6'>
      <CheckBox
        className='h-[clamp(18px,2vw,24px)] w-[clamp(18px,2vw,24px)]'
        iconClassName='text-[clamp(10px,1vw,14px)]'
        isSelected={isSelected}
        onChange={() => onSelectionChange(item.productId)}
      />

      <div className='grid grid-cols-[max-content_auto_30px] items-center gap-x-[clamp(8px,2vw,20px)]'>
        <ProductThumbnail productId={item.productId} src={item.thumbnailUrl} alt={item.name} />
        <div className='grid grid-cols-[1fr_auto] items-center gap-x-[clamp(8px,2vw,20px)]'>
          <div className='grid items-center gap-x-[clamp(10px,2vw,20px)] gap-y-2 lg:grid-cols-[1fr_1fr] lg:justify-between'>
            <ProductInfo productName={item.productName} briefDescription={item.briefDescription} />
            <PeriodSelector
              period={item.period}
              onChange={(value: string | number) => onPeriodChange(item.productId, Number(value))}
              subscriptionLabel={CART_MODAL[locale].subscriptionLabel}
            />
          </div>

          <PriceDisplay
            monthlyPriceLabelSuffix={CART_MODAL[locale].monthlyPriceLabelSuffix}
            monthlyPriceLabelPrefix={CART_MODAL[locale].monthlyPriceLabelPrefix}
            totalPrice={item.price * item.period}
            monthlyPrice={item.price}
          />
        </div>
        <RemoveButton onRemove={() => onRemoveItem(item.productId)} />
      </div>
    </div>
  );
};

export default CartItemCard;
