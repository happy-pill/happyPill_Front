interface AdminTableHeaderProps {
  tableHeader: string[];
}

const AdminTableHeader = ({ tableHeader }: AdminTableHeaderProps) => {
  return (
    <div className={`bg-primary table-row w-full text-white`}>
      {tableHeader.map((item) => (
        <div key={item} className='text-s table-cell px-1 py-3 text-center'>
          {item}
        </div>
      ))}
    </div>
  );
};

export default AdminTableHeader;
