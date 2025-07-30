import { cn } from '@/utils/classNames';

interface TableRowProps {
  className?: string;
  children: React.ReactNode;
}

const TableRow = ({ className, children }: TableRowProps) => {
  return (
    <div
      className={cn(
        'table-row border-b border-solid border-[#dcdcdc] bg-white hover:bg-gray-50',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default TableRow;
