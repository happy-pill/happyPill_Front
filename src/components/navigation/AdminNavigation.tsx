import { Link, useLocation } from 'react-router-dom';

import { ADMIN_NAV_ITEMS } from '@/constants/navigation';

const AdminNavigation = () => {
  const location = useLocation();

  const activeCalss = 'bg-primary text-white';

  return (
    <nav className='h-full w-full max-w-[250px] min-w-[250px] flex-1 bg-white p-[20px]'>
      <h3 className='text-l mb-[15px] w-full border-b border-solid border-[#E2E2E2] pb-[10px] font-bold'>
        관리
      </h3>
      <div className='flex flex-col'>
        {ADMIN_NAV_ITEMS.map((item) => (
          <Link
            key={item.type}
            to={item.path}
            className={`rounded-md p-[10px] text-sm ${location.pathname.includes(item.path) ? activeCalss : 'bg-white hover:bg-gray-50'} `}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default AdminNavigation;
