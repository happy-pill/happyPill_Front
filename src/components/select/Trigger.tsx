import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import { useSelectContext } from './Select';
import Button from '../button/BaseButton';

import { cn } from '@/utils/classNames';

interface SelectTriggerProps {
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode; //아이콘(컴포넌트)
  iconPosition?: 'left' | 'right'; // 아이콘의 위치
  hideIcon?: boolean; // 아이콘은 없앨 지
  suffix?: string; // 단위
}

const Trigger: React.FC<SelectTriggerProps> = ({
  className,
  placeholder = '선택하세요',
  icon,
  iconPosition = 'right',
  hideIcon = false,
  suffix,
}) => {
  const { selectedValue, triggerRef, onToggle, isOpen } = useSelectContext();

  const handleClick = () => {
    onToggle();
  };

  const renderIcon = () => {
    if (hideIcon) return null;

    if (icon) {
      return icon;
    }

    // 기본 아이콘만 rotate 애니메이션 적용
    return <IoIosArrowDown className={cn('transition-transform', isOpen && 'rotate-180')} />;
  };

  const iconElement = renderIcon();
  const displayValue = selectedValue != null ? `${selectedValue}${suffix || ''}` : placeholder;
  return (
    <Button
      ref={triggerRef}
      onClick={handleClick}
      className={cn(
        'relative flex w-full items-center justify-between rounded-sm px-4 py-2',
        className,
      )}
    >
      {iconPosition === 'left' && iconElement && renderIcon()}
      <span>{selectedValue != null ? displayValue : placeholder}</span>
      {iconPosition === 'right' && iconElement && renderIcon()}
    </Button>
  );
};

export default Trigger;
