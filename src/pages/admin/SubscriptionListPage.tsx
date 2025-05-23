import { useState } from 'react'
import Pagination from '../../components/pagination'

interface PurchasedItem {
  ProductName: string
  notifyEmail: string
  orderId: number
  deliveryDate: string
}

const totalItems = 30
const pageSize = 10
const blockSize = 15

const items: PurchasedItem[] = Array.from({ length: totalItems }, (_, index) => ({
  ProductName: `Item ${index + 1}`,
  notifyEmail: `email ${index + 1}`,
  orderId: 20250930 + index,
  deliveryDate: `2025/${index < 10 ? '09' : '10'}/${
    index < 10
      ? totalItems + index
      : ((index - 10) % totalItems) + 1 < 10
      ? '0' + (((index - 10) % 30) + 1)
      : ((index - 10) % totalItems) + 1
  }`,
}))

const SubscriptionListPage = () => {
  const [currentPage, setCurrentPage] = useState(0)

  const startIdx = currentPage * pageSize
  const endIdx = startIdx + pageSize
  const currentPageItems = items.slice(startIdx, endIdx)

  const handlePageChange = (index: number) => {
    setCurrentPage(index)
  }

  return (
    <div className='flex justify-center w-full'>
      <div className='flex flex-col w-[1280px] px-4 tablet:px-8'>
        <div className='flex flex-col gap-6 desktop:gap-12 py-16 items-center'>
          <h1 className='text-24 tablet:text-28 desktop:text-32 font-semibold'>구독 상품 목록</h1>
          <div className='flex flex-col gap-2 desktop:gap-4 w-full text-12 tablet:text-14 desktop:text-16'>
            <div className='grid grid-cols-[2fr_2fr_1fr_1fr] bg-button-primary text-white rounded-lg py-4 px-2 justify-items-center items-center font-semibold'>
              <p>상품이름</p>
              <p>알림받을 이메일</p>
              <p>주문번호</p>
              <p>배송일</p>
            </div>
            {currentPageItems.map((item, index) => (
              <div
                key={index}
                className='grid grid-cols-[2fr_2fr_1fr_1fr] bg-white rounded-lg py-4 px-2 justify-items-center items-center'
              >
                <p>{item.ProductName}</p>
                <p>{item.notifyEmail}</p>
                <p>{item.orderId}</p>
                <p>{item.deliveryDate}</p>
              </div>
            ))}
          </div>
          <Pagination
            total={totalItems}
            value={currentPage}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            blockSize={blockSize}
            color='#637c0a'
            className='flex justify-center'
          >
            <Pagination.Navigator className='flex gap-4'>
              <Pagination.Buttons className='PaginationButtons flex gap-4 font-bold text-slate-300' />
            </Pagination.Navigator>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
export default SubscriptionListPage
