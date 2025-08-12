import { forwardRef, type TextareaHTMLAttributes } from 'react';

import type { UseFormRegister, FieldValues } from 'react-hook-form';

import { cn } from '@/utils/classNames';

interface BaseTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  register?: UseFormRegister<FieldValues>;
}

const TextArea = forwardRef<HTMLTextAreaElement, BaseTextAreaProps>(
  ({ className, register, ...rest }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn('resize-none outline-none', className)}
        {...register}
        {...rest}
      />
    );
  },
);

export default TextArea;
