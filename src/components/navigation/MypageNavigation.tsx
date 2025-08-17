import { Link, useLocation } from 'react-router-dom';

import PageTitle from '../common/PageTitle';

import { routePath } from '@/constants/path';

const MypageNavigation = () => {
  const location = useLocation();

  const activeClass = 'bg-primary text-white';

  const MYPAGE_NAV_ITEMS = [
    {
      title: '계정',
      list: [
        {
          type: 'mypageAccount',
          name: '계정 관리',
          path: routePath.member.mypage.account.route('1'),
        },
        {
          type: 'mypageAccountEdit',
          name: '정보 수정',
          path: routePath.member.mypage.accountEdit.route('1'),
        },
      ],
    },
    {
      title: '구독/주문',
      list: [
        {
          type: 'subscriptionHistory',
          name: '구독 내역',
          path: '/mypage/subscription-history',
        },
        {
          type: 'orderHistory',
          name: '주문 내역',
          path: '/mypage/order-history',
        },
      ],
    },
  ];

  return (
    <aside className='hidden h-full w-full max-w-[250px] min-w-[250px] flex-1 p-[20px] md:block'>
      <div className='flex flex-col'>
        <PageTitle>마이 페이지</PageTitle>
        {MYPAGE_NAV_ITEMS.map((item) => (
          <div className='flex w-full flex-col' key={item.title}>
            <h5 className='text-m-bold mb-[15px] w-full font-bold'>{item.title}</h5>
            {item.list.map((listItem) => (
              <Link
                key={listItem.type}
                to={listItem.path}
                className={`rounded-md p-[10px] text-sm ${location.pathname.includes(listItem.path) ? activeClass : 'bg-transparent'} `}
              >
                {listItem.name}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default MypageNavigation;
