import Button from '@/components/button/StyledButton';
import SearchInput from '@/components/input/SearchInput';

// TODO 기능 추가 필요!
const TopControlsSection = () => {
  return (
    <div className='mb-5 flex w-full justify-between'>
      <SearchInput />

      <Button variant='orange' size='M' onClick={() => console.log('상품 등록')}>
        상품 등록
      </Button>
    </div>
  );
};

export default TopControlsSection;
