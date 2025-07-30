import { CURRENCY_UNIT } from '@/constants/locale/common';
import useLocale from '@/hooks/useLocale';

interface PriceDisplayProps {
  price?: number;
  totalPrice: number;
  priceLabel: string;
  monthlyPriceLabelPrefix?: string;
  monthlyPriceLabelSuffix?: string;
  className?: string;
}

const PriceSection = ({
  price,
  totalPrice,
  monthlyPriceLabelPrefix,
  monthlyPriceLabelSuffix,
  priceLabel,
  className,
}: PriceDisplayProps) => {
  const { locale } = useLocale();

  return (
    <section className={`flex items-baseline justify-between ${className}`}>
      <h3 className='text-[clamp(14px,1vw,20px)] font-bold'>{priceLabel}</h3>
      <div className='grid justify-items-end'>
        <span className='text-[clamp(16px,1vw,24px)] font-bold'>
          {totalPrice.toLocaleString()}
          {CURRENCY_UNIT[locale]}
        </span>
        <span className='text-primary mt-[-5px] flex gap-x-1 text-[clamp(10px,1vw,12px)]'>
          {monthlyPriceLabelPrefix} {price?.toLocaleString()}
          {monthlyPriceLabelSuffix}
        </span>
      </div>
    </section>
  );
};

export default PriceSection;
