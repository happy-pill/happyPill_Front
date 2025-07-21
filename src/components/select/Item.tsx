import React from 'react';

import { useSelectContext } from './Select';
import Button from '../button/BaseButton';

import { cn } from '@/utils/classNames';

interface SelectItemProps {
  value: string | number;
  children: React.ReactNode;
  className?: string;
}

const Item: React.FC<SelectItemProps> = ({ className, children, value }) => {
  const { onValueChange } = useSelectContext();
  return (
    <Button
      className={cn('py-1.5', className)}
      data-value={value}
      onClick={() => onValueChange(value)}
    >
      {children}
    </Button>
  );
};

export default Item;
