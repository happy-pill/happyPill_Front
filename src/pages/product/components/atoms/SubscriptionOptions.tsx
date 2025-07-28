import { type Dispatch } from 'react';

import SubscriptionPlanButton from '@/components/button/SubscriptionPlanButton';
import { SUBSCRIPTION_MONTH_OPTIONS } from '@/constants/subscription';

interface SubscriptionOptionsProps {
  subscriptionOption: number;
  setSubscriptionOption: Dispatch<React.SetStateAction<number>>;
}

const SubscriptionOptions = ({
  subscriptionOption,
  setSubscriptionOption,
}: SubscriptionOptionsProps) => {
  return (
    <div className='my-6'>
      <p className='mb-2.5 text-[clamp(13px,1vw,16px)] font-semibold'>개월 옵션</p>
      <div className='flex gap-x-2.5'>
        {SUBSCRIPTION_MONTH_OPTIONS.map((month) => (
          <SubscriptionPlanButton
            key={month}
            period={month}
            isSelected={subscriptionOption === month}
            onClick={() => setSubscriptionOption(month)}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionOptions;
