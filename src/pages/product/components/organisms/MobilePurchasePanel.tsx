import { useState, type Dispatch, type SetStateAction } from 'react';

import StyledButton from '@/components/button/StyledButton';
import PurchaseOption from '@/components/purchaseOption/PurchaseOption';
import Select from '@/components/select/Select';
import { CART_MODAL } from '@/constants/locale';
import { SUBSCRIPTION_MONTH_OPTIONS } from '@/constants/subscription';
import useLocale from '@/hooks/useLocale';

interface MobilePurchasePanelProps {
  price: number;
  subscriptionOption: number;
  setSubscriptionOption: Dispatch<SetStateAction<number>>;
  onAddToCart: () => void;
  onCheckout: () => void;
}

const MobilePurchasePanel = ({
  price,
  subscriptionOption,
  setSubscriptionOption,
  onAddToCart,
  onCheckout,
}: MobilePurchasePanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { locale } = useLocale();
  const cartLocale = CART_MODAL[locale];
  const handleAddToCartClick = () => {
    onAddToCart();
    setIsExpanded(false);
  };
  const handleChange = (value: string | number) => {
    setSubscriptionOption(Number(value));
  };
  const BUTTONS = [
    {
      key: 'addToCart',
      children: cartLocale.addToCart,
      onClick: handleAddToCartClick,
      variant: 'border',
      size: 'XL',
      className: 'text-s-medium h-[clamp(35px,5vw,50px)] flex-1 rounded-sm',
    },
    {
      key: 'buyNow',
      children: cartLocale.buyNow,
      onClick: onCheckout,
      variant: 'green',
      size: 'XL',
      className: 'text-s-medium h-[clamp(35px,5vw,50px)] flex-1 rounded-sm',
    },
  ] as const;

  return (
    <div className='pointer-events-none fixed top-0 left-0 z-11 h-[100vh] w-full justify-center lg:hidden'>
      {isExpanded && (
        <div
          className='pointer-events-auto absolute inset-0 top-0 left-0 bg-black/25'
          onClick={() => setIsExpanded(false)}
        />
      )}
      <div className='pointer-events-auto absolute bottom-0 left-0 w-full bg-white'>
        {isExpanded && (
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
          </PurchaseOption>
        )}
        <div className='flex justify-center border-t-1 border-[#eee] px-[30px] py-4'>
          {!isExpanded ? (
            <StyledButton
              variant='green'
              size='XL'
              className='text-s-medium h-[clamp(35px,5vw,50px)] flex-1 rounded-sm'
              onClick={() => setIsExpanded(true)}
            >
              구매하기
            </StyledButton>
          ) : (
            <div className='flex w-full gap-x-3'>
              {BUTTONS.map(({ key, ...buttonProps }) => (
                <StyledButton key={key} {...buttonProps} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobilePurchasePanel;
