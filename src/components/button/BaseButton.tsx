import { forwardRef, type ButtonHTMLAttributes } from 'react';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <button ref={ref} type='button' className={className} {...rest}>
        {children}
      </button>
    );
  },
);

export default Button;
