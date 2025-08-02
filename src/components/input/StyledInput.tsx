import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type InputHTMLAttributes } from 'react';

import Input from './ui/BaseInput';

import type { UseFormRegister, FieldValues } from 'react-hook-form';

import { cn } from '@/utils/classNames';

interface Props extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof InputVariants> {
  register?: UseFormRegister<FieldValues>;
}

export const InputVariants = cva('flex items-center justify-center cursor-pointer w-full', {
  variants: {
    icon: {
      left: 'pl-8',
      right: 'pr-8',
      none: 'px-2',
    },
    inputSize: {
      M: 'rounded-md py-3 text-s-regular',
      S: 'rounded-sm py-2 text-xs-regular',
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
  ({ variant, icon, inputSize, className, register, ...rest }, ref) => {
    const inputClasses = cn(InputVariants({ variant, icon, inputSize }), className);
    return <Input ref={ref} className={inputClasses} register={register} {...rest} />;
  },
);

export default StyledInput;
