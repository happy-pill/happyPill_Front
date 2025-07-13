import { IoMdArrowDropdown } from 'react-icons/io';

// TODO 공통 컴포넌트로 교체 + 기능 추가!
interface AdminTableListButtonProps {
  totalListNum: number;
}

const AdminTableListButton = ({ totalListNum }: AdminTableListButtonProps) => {
  return (
    <button className='flex items-center justify-center rounded-md border border-solid border-gray-400 bg-white px-2 py-1 text-gray-400'>
      <IoMdArrowDropdown />
      {totalListNum} 개
    </button>
  );
};

export default AdminTableListButton;
