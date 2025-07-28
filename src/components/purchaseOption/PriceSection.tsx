import { CURRENCY_UNIT } from '@/constants/locale';
import useLocale from '@/hooks/useLocale';

interface PriceDisplayProps {
  price: number;
  quantity: number;
  priceLabel: string;
  monthlyPriceLabelPrefix: string;
  monthlyPriceLabelSuffix: string;
  className?: string;
}

const PriceSection = ({
  price,
  quantity,
  monthlyPriceLabelPrefix,
  monthlyPriceLabelSuffix,
  priceLabel,
  className,
}: PriceDisplayProps) => {
  const { locale } = useLocale();
  const totalPrice = price * quantity;

  return (
    <section className={`flex items-baseline justify-between ${className}`}>
      <h3 className='text-[clamp(14px,5vw,20px)] font-bold'>{priceLabel}</h3>
      <div className='grid justify-items-end'>
        <span className='text-[clamp(16px,7vw,24px)] font-bold'>
          {totalPrice.toLocaleString()}
          {CURRENCY_UNIT[locale]}
        </span>
        <span className='text-primary mt-[-5px] flex gap-x-1 text-[clamp(10px,1vw,12px)]'>
          {monthlyPriceLabelPrefix} {price.toLocaleString()}
          {monthlyPriceLabelSuffix}
        </span>
      </div>
    </section>
  );
};

export default PriceSection;
