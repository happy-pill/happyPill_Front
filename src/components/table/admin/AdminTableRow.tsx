interface AdminTableRow {
  tableRow: { [key: string]: string }[];
}

const AdminTableRow = ({ tableRow }: AdminTableRow) => {
  return (
    <>
      {tableRow.map((item, rowIdx) => (
        <div key={rowIdx} className='table-row border-b border-solid border-[#dcdcdc] bg-white'>
          {Object.values(item).map((cell, cellIdx) => (
            <div key={cellIdx} className='text-s table-cell px-1 py-3 text-center text-[#666666]'>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
export default AdminTableRow;
