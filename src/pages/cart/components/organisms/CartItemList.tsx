import CartItemCard from '../molecules/CartItemCard';

import type { CartItemProps } from '../..';

import { CART_LOCALES } from '@/constants/locale/cart';
import useLocale from '@/hooks/useLocale';

interface CardListProps {
  items: CartItemProps[];
  selectedIds: string[];
  onSelectionChange: (productId: string) => void;
  onPeriodChange: (productId: string, period: string | number) => void;
  onRemoveItem: (productId: string) => void;
}

const CartItemList = ({
  items,
  selectedIds,
  onSelectionChange,
  onPeriodChange,
  onRemoveItem,
}: CardListProps) => {
  const { locale } = useLocale();
  return (
    <div className='grid grid-cols-1 gap-y-3.5'>
      {items && items?.length > 0 ? (
        items.map((item) => {
          const isSelected = selectedIds.includes(item.productId);
          return (
            <CartItemCard
              key={item.productId}
              item={item}
              isSelected={isSelected}
              onSelectionChange={onSelectionChange}
              onPeriodChange={onPeriodChange}
              onRemoveItem={onRemoveItem}
            />
          );
        })
      ) : (
        <div className='bg-white py-20 text-center text-[clamp(12px,1vw,14px)]'>
          {CART_LOCALES[locale].emptyCart}
        </div>
      )}
    </div>
  );
};

export default CartItemList;
