import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type TextareaHTMLAttributes } from 'react';

import TextArea from './ui/BaseTextArea';

import type { UseFormRegister, FieldValues } from 'react-hook-form';

import { cn } from '@/utils/classNames';

interface Props
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof TextAreaVariants> {
  register?: UseFormRegister<FieldValues>;
}

export const TextAreaVariants = cva('flex items-center justify-center cursor-pointer w-full', {
  variants: {
    icon: {
      left: 'pl-8',
      right: 'pr-8',
      none: 'px-2',
    },
    textAreaSize: {
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
    textAreaSize: 'M',
    icon: 'none',
  },
});

const StyledTextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ variant, icon, textAreaSize, className, register, ...rest }, ref) => {
    const inputClasses = cn(TextAreaVariants({ variant, icon, textAreaSize }), className);
    return <TextArea ref={ref} className={inputClasses} register={register} {...rest} />;
  },
);

export default StyledTextArea;
