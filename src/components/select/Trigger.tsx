import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import { useSelectContext } from './Select';
import Button from '../button/BaseButton';

import { cn } from '@/utils/classNames';

interface SelectTriggerProps {
  value?: React.ReactNode;
  placeholder?: string;
  className?: string;
}

const Trigger: React.FC<SelectTriggerProps> = ({ className, placeholder = '선택하세요' }) => {
  const { selectedValue, triggerRef, onToggle, isOpen } = useSelectContext();

  const handleClick = () => {
    onToggle();
  };

  return (
    <Button
      ref={triggerRef}
      onClick={handleClick}
      className={cn(
        'relative flex w-full items-center justify-between rounded-sm px-4 py-2',
        className,
      )}
    >
      <span>{selectedValue != null ? `${selectedValue}개월` : placeholder}</span>
      <IoIosArrowDown className={cn(isOpen && 'rotate-180')} />
    </Button>
  );
};

export default Trigger;
