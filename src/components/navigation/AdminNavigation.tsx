import { Link, useLocation } from 'react-router-dom';

import { routePath } from '@/constants/path';

const AdminNavigation = () => {
  const location = useLocation();

  const navItems = [
    {
      type: '구독 상품 관리',
      name: '구독 상품 관리',
      path: routePath.admin.management.subscribe,
    },
    {
      type: '회원 관리',
      name: '회원 관리',
      path: routePath.admin.management.member,
    },
    {
      type: '상품 관리',
      name: '상품 관리',
      path: routePath.admin.management.product,
    },
    {
      type: '카테고리 관리',
      name: '카테고리 관리',
      path: routePath.admin.management.category,
    },
  ];

  const ativeCalss = 'bg-primary text-white';

  return (
    <nav className='h-full w-full max-w-[250px] min-w-[250px] flex-1 bg-white p-[20px]'>
      <h3 className='tex-l mb-[15px] w-full border-b border-solid border-[#E2E2E2] pb-[10px] font-bold'>
        관리
      </h3>
      <div className='flex flex-col'>
        {navItems.map((item) => (
          <Link
            key={item.type}
            to={item.path}
            className={`rounded-md p-[10px] text-sm ${item.path === location.pathname ? ativeCalss : 'bg-white hover:bg-gray-50'} `}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default AdminNavigation;
