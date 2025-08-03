import { forwardRef, type InputHTMLAttributes } from 'react';

import type { UseFormRegister, FieldValues } from 'react-hook-form';

import { cn } from '@/utils/classNames';

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  register?: UseFormRegister<FieldValues>;
}

const Input = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, register, ...rest }, ref) => {
    return <input ref={ref} className={cn('outline-none', className)} {...register} {...rest} />;
  },
);

export default Input;
