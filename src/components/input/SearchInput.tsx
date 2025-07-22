import { CiSearch } from 'react-icons/ci';

import FiledInput from './FiledInput';
import { InputVariants } from './StyledInput';
import StyledButton from '../button/StyledButton';

interface SearchInputProps {
  onClick?: () => void;
  onChange?: () => void;
}

const SearchInput = ({ onClick, onChange }: SearchInputProps) => {
  return (
    <div className='flex items-center gap-1'>
      <FiledInput
        type='search'
        className={InputVariants({ icon: 'left' })}
        iconItem={{ icon: <CiSearch size={20} />, position: 'left' }}
        onChange={onChange}
      />
      <StyledButton size='M' variant='green' onClick={onClick}>
        검색
      </StyledButton>
    </div>
  );
};

export default SearchInput;
