import React from 'react';

import Button from '@/components/button/StyledButton';
import { cn } from '@/utils/classNames';

interface CategoryButtonProps {
  value: string;
  icon?: string;
  isActive: boolean;
  className?: string;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = React.memo(
  ({ value, icon, isActive, onClick, className }) => {
    const buttonClasses = cn(
      'w-full min-w-fit flex justify-center items-center transition-colors duration-100',
      {
        'bg-primary-text text-white': isActive,
        'bg-white text-primary-text': !isActive,
      },
      className,
    );

    return (
      <Button className={buttonClasses} onClick={onClick} size='XL' aria-pressed={isActive}>
        {icon && (
          <img src={icon} alt={value} className='mr-2 h-[40px] w-[40px]' role='presentation' />
        )}
        {value}
      </Button>
    );
  },
);

export default CategoryButton;
