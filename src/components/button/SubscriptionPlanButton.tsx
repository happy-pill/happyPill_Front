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
  const buttonBgClass = isSelected ? 'bg-primary' : 'bg-[#E2E2E2]';
  const textColorClass = isSelected ? 'text-button-primary' : 'text-[#A3A2A2]';
  const subTextColor = isSelected ? 'text-white' : 'text-[#A3A2A2]';

  return (
    <Button
      onClick={onClick}
      className={cn('w-[100px] rounded-xl text-center', buttonBgClass, className)}
      aria-pressed={isSelected}
    >
      <div
        className={cn(
          'text-14 mx-[3px] my-[3px] rounded-md bg-white py-3 font-medium',
          textColorClass,
        )}
      >
        {period}개월
      </div>
      <p className={cn('text-xs-regular py-0.5 font-bold', subTextColor)}>구독</p>
    </Button>
  );
};

export default SubscriptionPlanButton;
