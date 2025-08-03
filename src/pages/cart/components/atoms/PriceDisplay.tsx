interface PriceDisplayProps {
  totalPrice: number;
  monthlyPrice: number;
  monthlyPriceLabelPrefix: string;
  monthlyPriceLabelSuffix: string;
}

const PriceDisplay = ({
  totalPrice,
  monthlyPrice,
  monthlyPriceLabelSuffix,
  monthlyPriceLabelPrefix,
}: PriceDisplayProps) => {
  return (
    <div className='grid gap-x-2 text-right'>
      <span className='text-[clamp(14px,2vw,20px)] font-semibold'>
        {totalPrice.toLocaleString()}
        {monthlyPriceLabelSuffix}
      </span>
      <span className='text-primary mt-[-5px] text-[clamp(10px,1vw,12px)]'>
        {monthlyPriceLabelPrefix} {monthlyPrice.toLocaleString()}
        {monthlyPriceLabelSuffix}
      </span>
    </div>
  );
};

export default PriceDisplay;
