import StyledButton from '@/components/button/StyledButton';
import PurchaseOption from '@/components/purchaseOption/PurchaseOption';
import { CART_LOCALES } from '@/constants/locale/cart';
import { CURRENCY_UNIT } from '@/constants/locale/common';
import useLocale from '@/hooks/useLocale';

interface SummarySectionProps {
  totalPrice: number;
  selectedItemsCount: number;
  onPurchaseItems: () => void;
}

const PurchaseSummary = ({
  totalPrice,
  selectedItemsCount,
  onPurchaseItems,
}: SummarySectionProps) => {
  const { locale } = useLocale();
  const priceItems = [
    {
      label: CART_LOCALES[locale].purchaseSummary.totalAmount,
      value: totalPrice.toLocaleString() + CURRENCY_UNIT[locale],
    },
    {
      label: CART_LOCALES[locale].purchaseSummary.shippingFee,
      value: '+0원',
    },
    {
      label: CART_LOCALES[locale].purchaseSummary.discount,
      value: '-0원',
    },
  ];
  return (
    <PurchaseOption className='sticky top-[120px] left-0 mt-3 flex max-h-[350px] flex-col justify-between rounded-md bg-white lg:mt-0'>
      <div>
        <PurchaseOption.Title className='mb-4 text-[clamp(15px,2vw,25px)] font-bold'>
          {CART_LOCALES[locale].purchaseSummary.title}
        </PurchaseOption.Title>
        <div className='grid gap-y-1.5'>
          {priceItems.map(({ label, value }) => (
            <div
              key={label}
              className='flex items-center justify-between text-[clamp(11px,1vw,15px)] font-bold'
            >
              <span className='text-[gray]'>{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className='lg:mt-10'>
        <PurchaseOption.PriceSection
          className='mb-[clamp(15px,5vw,44px)]'
          priceLabel={CART_LOCALES[locale].purchaseSummary.finalTotal}
          totalPrice={totalPrice}
        />
        <PurchaseOption.ButtonGroup>
          <StyledButton
            variant='green'
            size='L'
            className='w-full max-w-none rounded-sm text-[clamp(12px,1vw,18px)] font-bold'
            onClick={onPurchaseItems}
          >
            {CART_LOCALES[locale].purchaseSummary.checkoutButton(selectedItemsCount)}
          </StyledButton>
        </PurchaseOption.ButtonGroup>
      </div>
    </PurchaseOption>
  );
};

export default PurchaseSummary;
