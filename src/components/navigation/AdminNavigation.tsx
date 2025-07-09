import { Link } from 'react-router-dom';

const AdminNavigation = () => {
  const navItems = [
    {
      type: '구독 상품 관리',
      name: '구독 상품 관리',
      path: '/admin/subscription-product',
    },
    {
      type: '회원 관리',
      name: '회원 관리',
      path: '/admin',
    },
    {
      type: '상품 관리',
      name: '상품 관리',
      path: '/admin',
    },
    {
      type: '카테고리 관리',
      name: '카테고리 관리',
      path: '/admin',
    },
  ];

  return (
    <nav className='h-screen w-full max-w-[300px] bg-white p-[30px]'>
      <h3 className='mb-[20px] w-full border-b border-solid border-[#E2E2E2] pb-[20px] text-[26px] font-bold'>
        관리
      </h3>
      <div className='flex flex-col'>
        {navItems.map((item) => (
          <Link
            key={item.type}
            to={item.path}
            className='rounded-md px-[20px] py-[14px] hover:bg-gray-50'
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default AdminNavigation;
