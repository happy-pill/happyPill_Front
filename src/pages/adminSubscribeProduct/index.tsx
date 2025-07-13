import AdminTableListButton from '@/components/button/AdminTableListButton';
import AdminSearchInput from '@/components/input/AdminSearchInput';
import Pagination from '@/components/pagination/Pagination';
import AdminTable from '@/components/table/admin/AdminTable';

// TODO 기능 추가하면서 컴포넌트 분리 예정
const Index = () => {
  return (
    <>
      <h2 className='text-title-admin mb-[40px] font-semibold'>구독 상품 관리</h2>
      <div className='mb-3 flex justify-between'>
        <AdminSearchInput />
        <AdminTableListButton totalListNum={10} />
      </div>

      <div className='flex flex-col gap-5'>
        <AdminTable
          tableHeader={['상품이름', '알림받을 이메일', '주문번호', '배송일']}
          tableRow={tableRow}
        />
        <Pagination currentPage={1} totalPage={10} />
      </div>
    </>
  );
};

export default Index;

const tableRow = [
  {
    data1: 'Vitamin C Plus',
    data2: 'qkrcksgh5654@gmail.com',
    data3: '20250930',
    data4: '2025/09/30',
  },
  {
    data1: 'Vitamin C Plus',
    data2: 'qkrcksgh5654@gmail.com',
    data3: '20250930',
    data4: '2025/09/30',
  },
  {
    data1: 'Vitamin C Plus',
    data2: 'qkrcksgh5654@gmail.com',
    data3: '20250930',
    data4: '2025/09/30',
  },
  {
    data1: 'Vitamin C Plus',
    data2: 'qkrcksgh5654@gmail.com',
    data3: '20250930',
    data4: '2025/09/30',
  },
  {
    data1: 'Vitamin C Plus',
    data2: 'qkrcksgh5654@gmail.com',
    data3: '20250930',
    data4: '2025/09/30',
  },
  {
    data1: 'Vitamin C Plus',
    data2: 'qkrcksgh5654@gmail.com',
    data3: '20250930',
    data4: '2025/09/30',
  },
  {
    data1: 'Vitamin C Plus',
    data2: 'qkrcksgh5654@gmail.com',
    data3: '20250930',
    data4: '2025/09/30',
  },
  {
    data1: 'Vitamin C Plus',
    data2: 'qkrcksgh5654@gmail.com',
    data3: '20250930',
    data4: '2025/09/30',
  },
  {
    data1: 'Vitamin C Plus',
    data2: 'qkrcksgh5654@gmail.com',
    data3: '20250930',
    data4: '2025/09/30',
  },
];
