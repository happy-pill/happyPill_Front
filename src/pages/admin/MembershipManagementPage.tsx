import { useState } from 'react'
import Pagination from '../../components/pagination'
import Button from '../../components/Button'

interface membership {
  userId: number
  nickname: string
  loginEmail: string
  provider: string
  createdAt: string
  deletedAt: string
}

const totalItems = 30
const pageSize = 10
const blockSize = 15

const members: membership[] = Array.from({ length: totalItems }, (_, index) => ({
  userId: index,
  nickname: `nickname ${index + 1}`,
  loginEmail: `loginEmail ${index + 1}`,
  provider: '20250930 + index',
  createdAt: `2025/${index < 10 ? '09' : '10'}/${
    index < 10
      ? totalItems + index
      : ((index - 10) % totalItems) + 1 < 10
      ? '0' + (((index - 10) % 30) + 1)
      : ((index - 10) % totalItems) + 1
  }`,
  deletedAt: `2025/${index < 10 ? '09' : '10'}/${
    index < 10
      ? totalItems + index
      : ((index - 10) % totalItems) + 1 < 10
      ? '0' + (((index - 10) % 30) + 1)
      : ((index - 10) % totalItems) + 1
  }`,
}))

const MembershipManagementPage = () => {
  const [currentPage, setCurrentPage] = useState(0)

  const startIdx = currentPage * pageSize
  const endIdx = startIdx + pageSize
  const currentPageMembers = members.slice(startIdx, endIdx)

  const handlePageChange = (index: number) => {
    setCurrentPage(index)
  }

  return (
    <div className='flex justify-center w-full'>
      <div className='flex flex-col w-[1280px] px-4 tablet:px-8'>
        <div className='flex flex-col gap-6 desktop:gap-12 py-16 items-center'>
          <h1 className='text-24 tablet:text-28 desktop:text-32 font-semibold'>회원관리</h1>
          <div className='flex flex-col gap-2 desktop:gap-4 w-full text-12 tablet:text-14 desktop:text-16'>
            <div className='grid grid-cols-[4fr_4fr_1fr_2fr_2fr_2fr] bg-button-primary text-white rounded-lg py-4 px-2 justify-items-center items-center font-semibold'>
              <p>닉네임</p>
              <p>이메일</p>
              <p>가입수단</p>
              <p>가입날짜</p>
              <p>탈퇴날짜</p>
            </div>
            {currentPageMembers.map((item, index) => (
              <div
                key={index}
                className='grid grid-cols-[4fr_4fr_1fr_2fr_2fr_2fr] bg-white rounded-lg py-4 px-2 justify-items-center items-center'
              >
                <p>{item.nickname}</p>
                <p>{item.loginEmail}</p>
                <p>{item.provider}</p>
                <p>{item.createdAt}</p>
                <p>{item.deletedAt}</p>
                <Button>편집</Button>
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
export default MembershipManagementPage
