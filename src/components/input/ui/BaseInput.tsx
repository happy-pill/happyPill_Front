import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/utils/classNames';

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, BaseInputProps>(({ className, ...rest }, ref) => {
  return <input ref={ref} className={cn('outline-none', className)} {...rest} />;
});

export default Input;
