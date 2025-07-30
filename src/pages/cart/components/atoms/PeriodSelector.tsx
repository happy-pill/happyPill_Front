import Select from '@/components/select/Select';
import { SUBSCRIPTION_MONTH_OPTIONS } from '@/constants/subscription';

interface PeriodSelectorProps {
  onChange: (period: string | number) => void;
  period: number;
  subscriptionLabel: string;
}

const PeriodSelector = ({ period, onChange, subscriptionLabel }: PeriodSelectorProps) => {
  return (
    <Select value={period} onChange={onChange}>
      <Select.Trigger
        className='border-1 border-[#dedede] px-3 py-1 text-[clamp(11px,1vw,14px)]'
        suffix={subscriptionLabel}
      />

      <Select.Content className='w-[110px] shadow-md'>
        <Select.Group className='grid'>
          {SUBSCRIPTION_MONTH_OPTIONS.map((option) => (
            <Select.Item
              key={option}
              value={option}
              className='mb-2 px-3 py-1 text-[clamp(11px,1vw,14px)] hover:bg-slate-50'
            >
              {option}
              {subscriptionLabel}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select>
  );
};

export default PeriodSelector;
