import { cn } from '@/utils/classNames';

interface TableCellProps {
  className?: string;
  attribute?: 'th' | 'td';
  type?: 'text' | 'image' | 'button';
  children: React.ReactNode;
}

const TableCell = ({ className, attribute = 'td', type = 'text', children }: TableCellProps) => {
  const getTypeClass = () => {
    switch (type) {
      case 'text':
        return 'text-sm';
      case 'image':
        return 'flex *:rounded-md';
      case 'button':
        return 'gap-1';
    }
  };

  const getAttributeClass = () => {
    switch (attribute) {
      case 'th':
        return 'text-white';
      case 'td':
        return 'text-[#666666]';
    }
  };

  const tableCellClass = `${className} ${getAttributeClass()} ${getTypeClass()}`;

  return (
    <div
      className={cn(
        'table-cell items-center justify-center gap-1 px-1 py-3 text-center align-middle',
        tableCellClass,
      )}
    >
      {children}
    </div>
  );
};

export default TableCell;
