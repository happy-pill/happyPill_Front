import { cva, type VariantProps } from 'class-variance-authority';
import { type InputHTMLAttributes } from 'react';

import Input from './ui/BaseInput';

import { cn } from '@/utils/classNames';

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof InputVariants> {
  label?: string;
  isRequired?: boolean;
  errorMsg?: string;
  iconItem?: { icon: React.ReactNode; position: 'left' | 'right' };
  contentItem?: { item: React.ReactNode; position: 'left' | 'right' };
}

export const InputVariants = cva('flex items-center justify-center cursor-pointer w-full', {
  variants: {
    icon: {
      left: 'pl-8',
      right: 'pr-8',
      none: 'px-2',
    },
    size: {
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
    size: 'M',
    icon: 'none',
  },
});

const StyledInput = ({
  variant,
  size,
  className,
  label,
  isRequired,
  errorMsg,
  iconItem,
  contentItem,
  ...rest
}: Props) => {
  const buttonClasses = cn(InputVariants({ variant, size }), className);
  return (
    <Input
      className={buttonClasses}
      label={label}
      isRequired={isRequired}
      errorMsg={errorMsg}
      iconItem={iconItem}
      contentItem={contentItem}
      {...rest}
    />
  );
};

export default StyledInput;
