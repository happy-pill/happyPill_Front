import { CiLogin, CiLogout, CiUser } from 'react-icons/ci';
import { IoMdArrowDropdown } from 'react-icons/io';
import { PiShoppingBagLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';

import { Logo } from '@/assets/icon';
import IconLanguage from '@/assets/icon/IconLanguage';
import useLoginedStore from '@/stores/loginedStore';

// TODO  기능 추가 필요/반응형 작업 필요
const Header: React.FC = () => {
  const ICON_SIZE = 25;
  const isLogined = useLoginedStore((state) => state.isLogined); // 임시 상태

  const commonItems = [
    {
      type: 'cart',
      name: '장바구니',
      icon: <PiShoppingBagLight size={ICON_SIZE} />,
      path: '/cart',
    },
  ];

  const loggedOutItems = [
    {
      type: 'login',
      name: '로그인',
      icon: <CiLogin size={ICON_SIZE} />,
      path: '/login',
    },
  ];

  const loggedInItems = [
    {
      type: 'logout',
      name: '로그아웃',
      icon: <CiLogout size={ICON_SIZE} />,
      path: '/',
    },
    {
      type: 'user',
      name: '내정보',
      icon: <CiUser size={ICON_SIZE} />,
      path: '/mypage',
    },
  ];

  const headerItems = isLogined
    ? [...loggedInItems, ...commonItems]
    : [...loggedOutItems, ...commonItems];

  return (
    <header className='px-md fixed top-0 z-50 flex h-[100px] w-full items-center bg-white'>
      <div className='mx-auto flex w-full max-w-(--max-width) items-center justify-between'>
        <Link to='/' title='home'>
          <h2>
            <img src={Logo} alt='logo' width={129} height={21} />
          </h2>
        </Link>

        <nav className='gap-x-md flex items-center'>
          <button className='flex items-center justify-center gap-1'>
            <IconLanguage size='20' />
            <span className='text-sm font-semibold'>한국어</span>
            <IoMdArrowDropdown />
          </button>

          {headerItems.map((item) => (
            <Link
              key={item.type}
              to={item.path}
              className='relative flex flex-col items-center justify-center gap-1'
            >
              {item.type === 'cart' && (
                <span className='absolute -top-1 right-1 flex aspect-square h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white'>
                  0
                </span>
              )}
              {item.icon}
              <span className='text-xs font-semibold'>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
