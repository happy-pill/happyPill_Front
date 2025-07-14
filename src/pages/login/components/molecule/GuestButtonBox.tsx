import { useNavigate } from 'react-router-dom';

import GuestButton from '../atom/GuestButton';

// TODO 추후 path 수정 필요
const GuestButtonBox = () => {
  const navigation = useNavigate();

  return (
    <div className='flex gap-2'>
      <GuestButton text='회원 로그인' bgColor='bg-[#88D37B]' onClick={() => navigation('/')} />
      <GuestButton text='관리자 로그인' bgColor='bg-[#E17664]' onClick={() => navigation('/')} />
    </div>
  );
};

export default GuestButtonBox;
