import GuestButtonBox from '../molecule/GuestButtonBox';
import LoginButtonBox from '../molecule/LoginButtonBox';

import HappyPillLetter from '@/assets/images/happypill-letter.svg';

const LoginContainer = () => {
  return (
    <div className='px-md my-[150px] flex h-full w-full flex-1 flex-col items-center'>
      <div className='mx-auto flex w-full max-w-[308px] flex-col items-center justify-center'>
        <div className='mb-[55px] flex flex-col items-center gap-2'>
          <img src={HappyPillLetter} alt='HappyPillLetter' />
          <p className='font-semibold'>하루 한 알, 기분 좋은 루틴을 만들다</p>
        </div>

        <LoginButtonBox />
        <GuestButtonBox />
      </div>
    </div>
  );
};

export default LoginContainer;
