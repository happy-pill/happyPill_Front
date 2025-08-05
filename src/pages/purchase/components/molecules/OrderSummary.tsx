import React from 'react';
import { Link } from 'react-router-dom';

import type { CheckoutProduct } from '@/types/products';

import { LOCALE_LABELS } from '@/constants/locale/purchase';
import useLocale from '@/hooks/useLocale';
import AccordionSection from '@/pages/purchase/components/atoms/AccordionSection';
import { cn } from '@/utils/classNames';

interface OrderSummaryProps {
  items: CheckoutProduct[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items }) => {
  const { locale } = useLocale();
  const ORDER_SUMMARY = LOCALE_LABELS[locale].orderSummary;
  return (
    <div className='rounded-md bg-white'>
      <AccordionSection title={ORDER_SUMMARY.title}>
        {items &&
          items.map((item, idx) => {
            const isLast = idx === items.length - 1;

            return (
              <div key={`${item.productName} + ${idx}`} className={cn('p-5', idx !== 0 && 'pt-3')}>
                <div className={cn(`flex border-b border-[#e9e9e9] py-5`, isLast && 'border-none')}>
                  <div className='mr-5 h-[90px] w-[90px]'>
                    <a href={`product/${item.productId}`}>
                      <img src={item.thumbnailUrl} alt={item.productName} width={90} height={90} />
                    </a>
                  </div>
                  <div className='grid'>
                    <Link to={`product/${item.productId}`}>
                      <strong className='mb-2 text-[clamp(13px,1vw,16px)] font-medium'>
                        {item.productName}
                      </strong>
                    </Link>

                    <p className='mb-4 text-[clamp(11px,1vw,14px)] text-[#606060]'>
                      {ORDER_SUMMARY.subscriptionPeriod.prefix}: {item.period}
                      {ORDER_SUMMARY.subscriptionPeriod.suffix}
                    </p>
                    <p className='text-[clamp(11px,1vw,14px)] font-semibold'>
                      {item.price.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </AccordionSection>
    </div>
  );
};

export default OrderSummary;
