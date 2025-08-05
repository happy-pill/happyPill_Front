import React, { type Dispatch, type SetStateAction } from 'react';

import Button from '@/components/button/BaseButton';
import { LOCALE_LABELS } from '@/constants/locale/purchase';
import useLocale from '@/hooks/useLocale';
import AccordionSection from '@/pages/purchase/components/atoms/AccordionSection';
import { cn } from '@/utils/classNames';

type PayMethod = 'CARD' | 'VIRTUAL_ACCOUNT';

interface PaymentMethodSelector {
  selected: string;
  onSelect: Dispatch<SetStateAction<PayMethod>>;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelector> = ({ selected, onSelect }) => {
  const { locale } = useLocale();
  const PAYMENT_METHOD = [
    {
      key: 'CARD',
      label: LOCALE_LABELS[locale].paymentMethod.CARD,
    },
    { key: 'VIRTUAL_ACCOUNT', label: LOCALE_LABELS[locale].paymentMethod.VIRTUAL_ACCOUNT },
  ] as const;

  const getButtonClassName = (payMethod: string) => {
    return cn(
      'h-14 border-1 border-[#E2E2E2] rounded-sm',
      selected === payMethod && 'bg-secondary text-white border-0',
    );
  };

  return (
    <div className='rounded-md bg-white'>
      <AccordionSection title={LOCALE_LABELS[locale].paymentMethod.title}>
        <div className='grid grid-cols-4 gap-2 p-5'>
          {PAYMENT_METHOD.map((method, idx) => (
            <Button
              key={idx}
              className={getButtonClassName(method.key)}
              onClick={() => onSelect(method.key)}
            >
              {method.label}
            </Button>
          ))}
        </div>
      </AccordionSection>
    </div>
  );
};

export default PaymentMethodSelector;
