import { cn } from '../../utils/classNames'

interface SubscriptionPlanButtonProps {
  period: number
  isSelected?: boolean
  onClick: () => void
  className?: string
}

const SubscriptionPlanButton = ({
  period,
  isSelected,
  onClick,
  className,
}: SubscriptionPlanButtonProps) => {
  const buttonBgClass = isSelected ? 'bg-button-primary' : 'bg-[#E2E2E2]'
  const textColorClass = isSelected ? 'text-button-primary' : 'text-[#E2E2E2]'
  const subTextColor = isSelected ? 'text-white' : 'text-[#A3A2A2]'

  return (
    <button
      onClick={onClick}
      className={cn('w-full border rounded-xl text-center', buttonBgClass, className)}
      aria-pressed={isSelected}
    >
      <div
        className={cn(
          'mx-[3px] my-[3px] rounded-lg py-3 text-14 font-medium bg-white',
          textColorClass,
        )}
      >
        {period}개월
      </div>
      <p className={cn('text-12 font-medium', subTextColor)}>구독</p>
    </button>
  )
}

export default SubscriptionPlanButton
