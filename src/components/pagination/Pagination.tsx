import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
}

const Pagination = ({ currentPage, totalPage }: PaginationProps) => {
  const [currentPageNum, setCurrentPageNum] = useState(currentPage);
  const totalPages = Array.from({ length: totalPage }).map((_, i) => i + 1);

  const changePage = (page: number) => {
    setCurrentPageNum(page);
  };

  return (
    <div className='flex w-full items-center justify-center gap-2'>
      <button
        onClick={() => changePage(currentPageNum - 1)}
        disabled={currentPageNum === 1}
        className='disabled:text-gray-400'
      >
        <IoIosArrowBack />
      </button>
      <div className='flex items-center justify-between gap-1'>
        {totalPages.map((page) => (
          <button
            key={page}
            className={`flex aspect-square h-6 w-6 items-center justify-center rounded-full ${currentPageNum === page ? 'bg-[#BED0A2]' : 'hover:bg-[#BED0A2]/20'}`}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => changePage(currentPageNum + 1)}
        disabled={currentPageNum === totalPage}
        className='disabled:text-gray-400'
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
