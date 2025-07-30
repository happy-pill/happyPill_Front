import TableBody from './TableBody';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

import { cn } from '@/utils/classNames';

interface TableProps {
  className?: string;
  children: React.ReactNode;
}

interface TableCompoundProps {
  Header: typeof TableHeader;
  Body: typeof TableBody;
  Row: typeof TableRow;
  Cell: typeof TableCell;
}

const Table: React.FC<TableProps> & TableCompoundProps = ({ className, children }) => {
  return (
    <div className='w-full overflow-x-scroll'>
      <div
        className={cn(
          'min-w-min-width table w-full border-collapse overflow-hidden rounded-t-md',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;
