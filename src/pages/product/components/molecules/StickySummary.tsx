import type { Dispatch, SetStateAction } from 'react';

import StyledButton from '@/components/button/StyledButton';
import PurchaseOption from '@/components/purchaseOption/PurchaseOption';
import Select from '@/components/select/Select';
import { CART_MODAL } from '@/constants/locale';
import { SUBSCRIPTION_MONTH_OPTIONS } from '@/constants/subscription';
import useLocale from '@/hooks/useLocale';

interface StickySummaryProps {
  price: number;
  subscriptionOption: number;
  setSubscriptionOption: Dispatch<SetStateAction<number>>;
  onAddToCart: () => void;
  onCheckout: () => void;
}

const StickySummary: React.FC<StickySummaryProps> = ({
  price,
  subscriptionOption,
  setSubscriptionOption,
  onAddToCart,
  onCheckout,
}) => {
  const { locale } = useLocale();

  const BUTTONS = [
    { key: 'addToCart', variant: 'border', onClick: onAddToCart },
    { key: 'buyNow', variant: 'green', onClick: onCheckout },
  ] as const;

  const handleChange = (value: string | number) => {
    setSubscriptionOption(Number(value));
  };

  return (
    <div className='max-w-[400px]'>
      <div className='left-0 mt-10 hidden h-fit rounded-md bg-white lg:sticky lg:top-[250px] lg:block'>
        <PurchaseOption>
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
            quantity={subscriptionOption}
            priceLabel={CART_MODAL[locale].totalPriceLabel}
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
      </div>
    </div>
  );
};

export default StickySummary;
