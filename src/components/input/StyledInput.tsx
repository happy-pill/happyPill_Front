import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type InputHTMLAttributes } from 'react';

import Input from './ui/BaseInput';

import { cn } from '@/utils/classNames';

interface Props extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof InputVariants> {}

export const InputVariants = cva('flex items-center justify-center cursor-pointer w-full', {
  variants: {
    icon: {
      left: 'pl-8',
      right: 'pr-8',
      none: 'px-2',
    },
    inputSize: {
      M: 'rounded-md py-2 text-m-regular text-md',
      S: 'rounded-sm py-1 text-sm-regular text-xs',
    },
    variant: {
      base: 'border border-solid border-[#DEDEDE] text-primary-text bg-white disabled:bg-gray-100 focus:border-gray-400 invalid:border-invalid',
      ghost: 'text-primary-text bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'base',
    inputSize: 'M',
    icon: 'none',
  },
});

const StyledInput = forwardRef<HTMLInputElement, Props>(
  ({ variant, icon, inputSize, className, ...rest }, ref) => {
    const inputClasses = cn(InputVariants({ variant, icon, inputSize }), className);
    return <Input ref={ref} className={inputClasses} {...rest} />;
  },
);

export default StyledInput;
