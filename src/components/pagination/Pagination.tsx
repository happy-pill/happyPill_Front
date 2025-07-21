import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  changePage: (page: number) => void;
}

const Pagination = ({ currentPage, totalPage, changePage }: PaginationProps) => {
  const totalPages = Array.from({ length: totalPage }).map((_, i) => i + 1);

  const handleChangePage = (page: number) => {
    changePage(page);
  };

  return (
    <div className='flex w-full items-center justify-center gap-2'>
      <button
        onClick={() => handleChangePage(currentPage - 1)}
        disabled={currentPage === 1}
        className='disabled:text-gray-400'
      >
        <IoIosArrowBack />
      </button>
      <div className='flex items-center justify-between gap-1'>
        {totalPages.map((page) => (
          <button
            key={page}
            className={`flex aspect-square h-6 w-6 items-center justify-center rounded-full ${currentPage === page ? 'bg-[#BED0A2]' : 'hover:bg-[#BED0A2]/20'}`}
            onClick={() => handleChangePage(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => handleChangePage(currentPage + 1)}
        disabled={currentPage === totalPage}
        className='disabled:text-gray-400'
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
