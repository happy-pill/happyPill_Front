import { cn } from '@/utils/classNames';

interface TableBodyProps {
  className?: string;
  children: React.ReactNode;
}

const TableBody = ({ className, children }: TableBodyProps) => {
  return <div className={cn('table-row-group', className)}>{children}</div>;
};

export default TableBody;
