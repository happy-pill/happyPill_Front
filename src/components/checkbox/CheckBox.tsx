import { FaCheck } from 'react-icons/fa';

import cn from '@/utils/classNames';

interface CheckBoxProps {
  isSelected: boolean;
  onChange: () => void;
  className?: string;
  iconClassName?: string;
}

const CheckBox = ({ isSelected, onChange, className, iconClassName }: CheckBoxProps) => {
  const baseClasses = cn(
    'flex items-center justify-center h-6 w-6 rounded-full bg-[#e9e9e9] transition-colors duration-200 peer-checked:border-primary peer-checked:bg-primary',
    className,
  );
  const iconClasses = cn(
    'text-white transition-opacity duration-200 peer-checked:opacity-100',
    iconClassName,
  );

  return (
    <label className='relative inline-flex cursor-pointer items-center'>
      <input type='checkbox' className='peer sr-only' checked={isSelected} onChange={onChange} />
      <div className={baseClasses}>
        <FaCheck className={iconClasses} />
      </div>
    </label>
  );
};

export default CheckBox;
