import { cn } from '@/utils/classNames';

interface LayoutContainerProps {
  children: React.ReactNode;
  className: string;
  // isHeader: boolean;
  px?: 'px-md' | 'px-0';
}

const LayoutContainer = ({ children, className, px = 'px-md' }: LayoutContainerProps) => {
  return (
    <main className={cn(`max-width-container mx-auto mt-[100px] w-full flex-1 ${px}`, className)}>
      {children}
    </main>
  );
};

export default LayoutContainer;
