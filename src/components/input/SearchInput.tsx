import { CiSearch } from 'react-icons/ci';

import StyledInput, { InputVariants } from './StyledInput';

interface SearchInputProps {
  onClick?: () => void;
  onChange?: () => void;
}

// TODO button 공통 컴포넌트로 교체 필요
const SearchInput = ({ onClick, onChange }: SearchInputProps) => {
  return (
    <div className='flex gap-1'>
      <StyledInput
        type='search'
        className={InputVariants({ icon: 'left' })}
        iconItem={{ icon: <CiSearch size={20} />, position: 'left' }}
        onChange={onChange}
      />
      <button className='bg-primary text-s rounded-md px-3 py-1 text-white' onClick={onClick}>
        검색
      </button>
    </div>
  );
};

export default SearchInput;
