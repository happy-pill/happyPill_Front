import { Link, useNavigate } from 'react-router-dom';

import { Logo } from '@/assets/icon';
import { HEADER_HEIGHT_SIZE } from '@/constants/common';
import { ADMIN_HEADER_ITEMS } from '@/constants/header';
import { routePath } from '@/constants/path';

const AdminHeader = () => {
  const navigate = useNavigate();

  return (
    <header
      className='px-md flex w-full items-center border-b border-solid border-[#E2E2E2] bg-white'
      style={{ height: `${HEADER_HEIGHT_SIZE}px` }}
    >
      <div className='mx-auto flex w-full items-center justify-between'>
        <h2 className='flex items-center gap-1'>
          <Link to={routePath.common.root} title='admin home'>
            <img src={Logo} alt='logo' width={100} />
          </Link>
          <Link to={routePath.admin.management.subscribe} title='admin home' className='text-xl'>
            Admin
          </Link>
        </h2>

        <nav className='gap-x-md flex items-center'>
          <div className='flex items-center gap-1'>
            <span>반갑습니다.</span>
            <span className='font-bold'>홍길동님</span>
          </div>

          {ADMIN_HEADER_ITEMS.map((item) => (
            <button
              key={item.type}
              onClick={() => navigate(item.path)}
              className='relative flex flex-col items-center justify-center gap-1'
            >
              {item.icon}
              <span className='text-xs font-semibold'>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
