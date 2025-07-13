import { CiLogout, CiUser } from 'react-icons/ci';
import { Link } from 'react-router-dom';

import { Logo } from '@/assets/icon';

// TODO  기능 추가 필요/반응형 작업 필요
const AdminHeader: React.FC = () => {
  const ICON_SIZE = 25;

  const adminHeaderItems = [
    {
      type: 'logout',
      name: '로그아웃',
      icon: <CiLogout size={ICON_SIZE} />,
      path: '/',
    },
    {
      type: 'user',
      name: '사용자 전환',
      icon: <CiUser size={ICON_SIZE} />,
      path: '/',
    },
  ];

  return (
    <header className='px-md flex h-[100px] items-center border-b border-solid border-[#E2E2E2] bg-white'>
      <div className='mx-auto flex w-full max-w-(--max-width) items-center justify-between'>
        <h2 className='flex items-center gap-1'>
          <Link to='/' title='admin home'>
            <img src={Logo} alt='logo' width={129} height={21} />
          </Link>
          <Link to='/admin/subscription-product' title='admin home' className='text-[30px]'>
            Admin
          </Link>
        </h2>

        <nav className='gap-x-md flex items-center'>
          <div className='flex items-center gap-1'>
            <span>반갑습니다.</span>
            <span className='font-bold'>홍길동님</span>
          </div>

          {adminHeaderItems.map((item) => (
            <Link
              key={item.type}
              to={item.path}
              className='relative flex flex-col items-center justify-center gap-1'
            >
              {item.icon}
              <span className='text-xs font-semibold'>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
