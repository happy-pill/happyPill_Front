import LoginButton from '../atom/LoginButtoon';

import { IconKakao, IconGoogle } from '@/assets/icon';

export interface loginItem {
  icon: string;
  type: string;
  name: string;
  style: string;
}

const LoginButtonBox = () => {
  const loginItems = [
    {
      icon: IconKakao,
      type: 'kakao',
      name: '카카오톡',
      style: 'bg-[#FEE500] border-1 border-solid border-transparent',
    },
    {
      icon: IconGoogle,
      type: 'google',
      name: '구글',
      style: 'bg-white border-1 border-solid border-[#E8E8E8]',
    },
  ];

  return (
    <div className='mb-[108px] flex w-full flex-col gap-2'>
      {loginItems.map((item) => (
        <LoginButton loginItem={item} />
      ))}
    </div>
  );
};

export default LoginButtonBox;
