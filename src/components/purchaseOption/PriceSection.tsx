import { CURRENCY_UNIT } from '@/constants/locale';
import useLocale from '@/hooks/useLocale';

interface PriceDisplayProps {
  price: number;
  quantity: number; // month → quantity로 변경
  priceLabel: string; // 외부에서 텍스트 주입
  className?: string;
}

const PriceSection = ({ price, quantity, priceLabel, className }: PriceDisplayProps) => {
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
      </div>
    </section>
  );
};

export default PriceSection;
