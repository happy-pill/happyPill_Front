import { cn } from '@/utils/classNames';

interface TableHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const TableHeader = ({ className, children }: TableHeaderProps) => {
  return (
    <div className={cn('bg-primary table-header-group w-full whitespace-nowrap', className)}>
      {children}
    </div>
  );
};

export default TableHeader;
