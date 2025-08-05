import React from 'react';

import StyledButton from '@/components/button/StyledButton';
import PurchaseOption from '@/components/purchaseOption/PurchaseOption';
import { CURRENCY_UNIT } from '@/constants/locale/common';
import { LOCALE_LABELS } from '@/constants/locale/purchase';
import useLocale from '@/hooks/useLocale';

interface PaymentSummary {
  totalPrice: number;
  onSubmit: () => void;
}

const PaymentSummary: React.FC<PaymentSummary> = ({ totalPrice, onSubmit }) => {
  const { locale } = useLocale();
  return (
    <div className='sticky top-24 left-0 w-full self-start'>
      <PurchaseOption className='rounded-md bg-white'>
        <PurchaseOption.Title className='text-[clamp(13px,2vw,25px)] font-bold'>
          {LOCALE_LABELS[locale].paymentSummary.title}
        </PurchaseOption.Title>
        <div className='py-5'>
          <div className='flex items-center justify-between py-1'>
            <p>{LOCALE_LABELS[locale].paymentSummary.productAmount}</p>
            <p>
              {totalPrice.toLocaleString()}
              {CURRENCY_UNIT[locale]}
            </p>
          </div>
          <div className='flex items-center justify-between py-1'>
            <p>{LOCALE_LABELS[locale].paymentSummary.deliveryFee}</p>
            <p>+0{CURRENCY_UNIT[locale]}</p>
          </div>
          <div className='flex items-center justify-between py-1'>
            <p>{LOCALE_LABELS[locale].paymentSummary.discount}</p>
            <p>-0{CURRENCY_UNIT[locale]}</p>
          </div>
        </div>
        <PurchaseOption.PriceSection
          priceLabel={LOCALE_LABELS[locale].paymentSummary.totalAmount}
          totalPrice={totalPrice}
        />

        <StyledButton
          variant='green'
          className='mt-10 h-[50px] w-full rounded-md text-white'
          onClick={() => onSubmit()}
        >
          {LOCALE_LABELS[locale].paymentSummary.submitButton}
        </StyledButton>
      </PurchaseOption>
    </div>
  );
};

export default PaymentSummary;
