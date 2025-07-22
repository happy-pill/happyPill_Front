import { cn } from '@/utils/classNames';

interface InputIconProps {
  children: React.ReactNode;
  className?: string;
}

const InputIcon = ({ children, className }: InputIconProps) => {
  return (
    <span className={cn('absolute top-1/2 w-[20] -translate-y-1/2', className)}>{children}</span>
  );
};

export default InputIcon;
