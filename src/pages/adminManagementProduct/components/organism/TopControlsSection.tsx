import { useNavigate } from 'react-router-dom';

import Button from '@/components/button/StyledButton';
import SearchInput from '@/components/input/SearchInput';
import { routePath } from '@/constants/path';

// TODO 기능 추가 필요!
const TopControlsSection = () => {
  const navigate = useNavigate();
  return (
    <div className='mb-5 flex w-full items-center justify-between'>
      <SearchInput />

      <Button
        variant='orange'
        size='M'
        onClick={() => navigate(routePath.admin.management.product.register.root)}
      >
        상품 등록
      </Button>
    </div>
  );
};

export default TopControlsSection;
