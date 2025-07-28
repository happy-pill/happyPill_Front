import { cn } from '@/utils/classNames';

interface TableCellProps {
  className?: string;
  attribute?: 'th' | 'td';
  type?: 'text' | 'image' | 'button';
  textAlign?: 'center' | 'left' | 'right';
  flexType?: 'default' | 'col' | 'row' | 'wrap';
  children: React.ReactNode;
}

const TableCell = ({
  className,
  attribute = 'td',
  type = 'text',
  textAlign = 'center',
  flexType = 'default',
  children,
}: TableCellProps) => {
  const getAttributeClass = () => {
    switch (attribute) {
      case 'th':
        return 'text-white';
      case 'td':
        return 'text-[#666666]';
    }
  };

  const getTextAlignClass = () => {
    if (type !== 'text') return;

    switch (textAlign) {
      case 'center':
        return 'item-center text-center';
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
    }
  };

  const getFlexTypeClass = () => {
    switch (flexType) {
      case 'col':
        return 'flex-col';
      case 'row':
        return 'flex-row';
      case 'wrap':
        return 'flex-wrap';
      case 'default':
        return 'flex';
    }
  };

  const tableCellClass = `${className} ${getAttributeClass()} ${getTextAlignClass()}`;

  return (
    <div
      className={cn(
        'table-cell items-center justify-center gap-1 px-2 py-3 text-center align-middle text-sm break-keep',
        tableCellClass,
      )}
    >
      {type === 'text' && <>{children}</>}
      {type !== 'text' && (
        <div
          className={cn(
            `w-full items-center justify-center gap-1 ${type === 'image' && '*:rounded-md'}`,
            getFlexTypeClass(),
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default TableCell;
