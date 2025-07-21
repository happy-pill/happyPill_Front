import { forwardRef, type ButtonHTMLAttributes } from 'react';

import { cn } from '@/utils/classNames';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type='button'
        className={cn('inline-flex items-center justify-center', className)}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export default Button;
