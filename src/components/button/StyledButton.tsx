import { cva, type VariantProps } from 'class-variance-authority';
import React, { type ButtonHTMLAttributes } from 'react';

import Button from './BaseButton';

import { cn } from '@/utils/classNames';

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  children: React.ReactNode;
}

const ButtonVariants = cva('flex items-center justify-center cursor-pointer w-full', {
  variants: {
    size: {
      XL: 'max-w-[360px] rounded-full text-xl-regular py-3 px-5',
      L: 'max-w-[180px] rounded-lg text-l-regular py-3 px-5',
      M: 'w-fit rounded-md py-2 text-m-regular px-4',
      S: 'w-fit rounded-md py-1 text-sm-regular px-3 text-xs',
      XS: 'w-fit rounded-sm py-1 text-sm-regular px-2 text-xs',
    },
    variant: {
      border:
        'border border-primary bg-transpar hover:bg-[#fdfdfd] active:bg-[#e5e5e5] text-primary ',
      orange: 'bg-secondary text-white hover:bg-[#e29300] active:bg-[#d08000] disabled:bg-gray-300',
      green: 'bg-primary text-white hover:bg-[#506b4a] active:bg-[#405a3a] disabled:bg-gray-300',
      gray: 'bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 disabled:bg-gray-300',
      ghost: 'text-primary-text bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'ghost',
    size: 'M',
  },
});

const StyledButton = ({ variant, size, className, children, ...rest }: Props) => {
  const buttonClasses = cn(ButtonVariants({ variant, size }), className);
  return (
    <Button className={buttonClasses} {...rest}>
      {children}
    </Button>
  );
};

export default StyledButton;
