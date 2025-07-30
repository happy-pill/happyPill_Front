import { HEADER_HEIGHT_SIZE } from '@/constants/common';
import { cn } from '@/utils/classNames';

interface LayoutContainerProps {
  children: React.ReactNode;
  className?: string;
  px?: 'px-md' | 'px-0';
  isMaxW?: boolean;
  isHeader?: boolean;
}

const LayoutContainer = ({
  children,
  className,
  px = 'px-md',
  isMaxW = true,
  isHeader = true,
}: LayoutContainerProps) => {
  return (
    <main
      className={cn(`mx-auto w-full flex-1 ${isMaxW && 'max-width-container'} ${px}`, className)}
      style={{ marginTop: `${isHeader ? HEADER_HEIGHT_SIZE : 0}px` }}
    >
      {children}
    </main>
  );
};

export default LayoutContainer;
