import type { loginItem } from '../molecule/LoginButtonBox';

interface LoginButtonProps {
  loginItem: loginItem;
}

const LoginButton = ({ loginItem }: LoginButtonProps) => {
  const { type, icon, name, style } = loginItem;

  const handleOAuthLogin = (type: string) => {
    const url = `https://happypill-api.jiheon2234.dev/oauth2/authorization/${type}`;
    window.open(url);
  };

  return (
    <button
      className={`p-md flex w-full items-center justify-center rounded-[8px] px-[50px] ${style}`}
      onClick={() => handleOAuthLogin(type)}
    >
      <div className='flex w-full justify-start gap-7'>
        <img src={icon} alt={type} className='w-[24px]' />
        <span className='text-md flex-2 text-left font-bold'>
          {name}
          {type === 'kakao' ? '으로' : '로'} 시작하기
        </span>
      </div>
    </button>
  );
};

export default LoginButton;
