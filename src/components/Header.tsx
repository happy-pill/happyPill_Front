import { useState } from 'react';
import { CiLogin, CiLogout, CiShoppingCart, CiUser } from 'react-icons/ci';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Link } from 'react-router-dom';

import { Logo } from '@/assets/icon';
import IconLanguage from '@/assets/icon/IconLanguage';

// TODO  기능 추가 필요/반응형 작업 필요
const Header: React.FC = () => {
  const [isLogined] = useState(false); // 임시 상태
  const commonItems = [
    {
      type: 'cart',
      name: '장바구니',
      icon: <CiShoppingCart size={25} />,
      path: '/cart',
    },
  ];

  const loggedOutItems = [
    {
      type: 'login',
      name: '로그인',
      icon: <CiLogin size={25} />,
      path: '/login',
    },
  ];

  const loggedInItems = [
    {
      type: 'logout',
      name: '로그아웃',
      icon: <CiLogout size={25} />,
      path: '/',
    },
    {
      type: 'user',
      name: '내정보',
      icon: <CiUser size={25} />,
      path: '/mypage',
    },
  ];

  const headerItems = isLogined
    ? [...loggedInItems, ...commonItems]
    : [...loggedOutItems, ...commonItems];

  return (
    <header className='px-md sticky top-0 z-50 flex h-[100px] items-center bg-white'>
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
