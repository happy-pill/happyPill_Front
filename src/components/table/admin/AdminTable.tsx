import AdminTableHeader from './AdminTableHeader';
import AdminTableRow from './AdminTableRow';

interface AdminTableProps {
  tableHeader: string[];
  tableRow: { [key: string]: string }[];
}

const AdminTable = ({ tableHeader, tableRow }: AdminTableProps) => {
  return (
    <div className='table w-full border-collapse overflow-hidden rounded-t-md'>
      <AdminTableHeader tableHeader={tableHeader} />
      <AdminTableRow tableRow={tableRow} />
    </div>
  );
};

export default AdminTable;
