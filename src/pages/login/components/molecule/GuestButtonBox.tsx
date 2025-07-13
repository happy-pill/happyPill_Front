import { useNavigate } from 'react-router-dom';

import GuestButton from '../atom/GuestButton';

const GuestButtonBox = () => {
  const navigation = useNavigate();

  return (
    <div className='*:p-md *:text-md flex gap-2 *:rounded-[8px] *:font-semibold *:text-white'>
      <GuestButton text='회원 로그인' bgColor='bg-[#88D37B]' onClick={() => navigation('/')} />
      <GuestButton text='관리자 로그인' bgColor='bg-[#E17664]' onClick={() => navigation('/')} />
    </div>
  );
};

export default GuestButtonBox;
