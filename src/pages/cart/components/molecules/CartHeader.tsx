import StyledButton from '@/components/button/StyledButton';
import CheckBox from '@/components/checkbox/CheckBox';
import { CART_LOCALES } from '@/constants/locale/cart';
import useLocale from '@/hooks/useLocale';

interface CartHeaderProps {
  itemCount: number;
  isAllSelected: boolean;
  onSelectAll: () => void;
  onRemoveSelected: () => void;
}

const CartHeader = ({
  itemCount,
  isAllSelected,
  onSelectAll,
  onRemoveSelected,
}: CartHeaderProps) => {
  const { locale } = useLocale();
  return (
    <div className='mb-[clamp(10px,2vw,26px)] flex items-center justify-between'>
      <label className='flex cursor-pointer items-center gap-x-2 text-[clamp(10px,1vw,15px)] font-bold'>
        <CheckBox
          className='h-[clamp(18px,2vw,24px)] w-[clamp(18px,2vw,24px)]'
          iconClassName='text-[clamp(10px,1vw,14px)]'
          isSelected={isAllSelected}
          onChange={onSelectAll}
        />
        <span>{CART_LOCALES[locale].selectAll(itemCount)}</span>
      </label>
      <StyledButton
        onClick={onRemoveSelected}
        variant='border'
        className='bg-white text-[clamp(10px,1vw,14px)]'
      >
        {CART_LOCALES[locale].removeSelected}
      </StyledButton>
    </div>
  );
};

export default CartHeader;
