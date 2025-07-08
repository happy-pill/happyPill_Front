import { IconKakao, IconGoogle } from '@/assets/icon';

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

  const handleOAuthLogin = (type: string) => {
    const url = `https://happypill-api.jiheon2234.dev/oauth2/authorization/${type}`;
    window.open(url);
  };

  return (
    <div className='mb-[108px] flex w-full flex-col gap-2'>
      {loginItems.map((item) => (
        <button
          key={item.type}
          className={`p-md flex w-full items-center justify-center rounded-[8px] px-[50px] ${item.style}`}
          onClick={() => handleOAuthLogin(item.type)}
        >
          <div className='flex w-full justify-start gap-7'>
            <img src={item.icon} alt={item.type} className='w-[24px]' />
            <span className='text-md flex-2 text-left font-bold'>
              {item.name}
              {item.type === 'kakao' ? '으로' : '로'} 시작하기
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default LoginButtonBox;
