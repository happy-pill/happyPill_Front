import { cn } from '@/utils/classNames';

interface IconProps {
  children: React.ReactNode;
  className?: string;
}

const Icon = ({ children, className }: IconProps) => {
  return (
    <span className={cn('absolute top-1/2 w-[20] -translate-y-1/2', className)}>{children}</span>
  );
};

export default Icon;
