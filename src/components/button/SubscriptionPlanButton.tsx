import Button from './BaseButton';

import { cn } from '@/utils/classNames';

interface SubscriptionPlanButtonProps {
  period: number;
  isSelected?: boolean;
  onClick: () => void;
  className?: string;
}

const SubscriptionPlanButton = ({
  period,
  isSelected,
  onClick,
  className,
}: SubscriptionPlanButtonProps) => {
  const buttonBgClass = isSelected ? 'bg-primary' : 'bg-[#E6E3E3]';
  const textColorClass = isSelected ? 'text-text-primary' : 'text-[#E6E3E3]';
  const subTextColor = isSelected ? 'text-white' : 'text-[#A3A2A2]';
  const borderClass = isSelected ? 'border-primary' : 'border-[#E6E3E3]';
  return (
    <Button
      onClick={onClick}
      className={cn(
        'w-full flex-col rounded-md border-2 text-center',
        buttonBgClass,
        borderClass,
        className,
      )}
      aria-pressed={isSelected}
    >
      <div className={cn('w-full rounded-md bg-white px-[3px] py-3 font-medium', textColorClass)}>
        {period}개월
      </div>
      <p className={cn('text-12 font-medium', subTextColor)}>구독</p>
    </Button>
  );
};

export default SubscriptionPlanButton;
