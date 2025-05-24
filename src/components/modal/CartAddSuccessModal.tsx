import React from 'react'
import Modal from './ui/Modal'
import CloseButtonIcon from '../../assets/icon/CloseButtonIcon'
import { useNavigate } from 'react-router-dom'

const CartAddSuccessModal: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Modal>
      <Modal.Content className='relative max-w-[430px] w-full'>
        <Modal.Close className='absolute right-2 top-2'>
          <CloseButtonIcon />
        </Modal.Close>
        <div className='flex flex-col items-center mb-8'>
          <p className='text-14 tablet:text-18 font-semibold'>Vitamin C Plus</p>
          <h2 className='text-20 tablet:text-24 text-[#026242] font-bold'>장바구니 담기</h2>
        </div>
        <div className='text-center text-16 tablet:text-20'>장바구니에 담았습니다.</div>
        <div className='grid grid-cols-2 items-center gap-x-2 mt-8'>
          <Modal.Close className='text-14 py-2 border border-solid tablet:py-3 w-full rounded-3xl font-semibold   border-button-secondary bg-white text-button-secondary'>
            쇼핑 계속하기
          </Modal.Close>
          <button
            className='text-14 py-2  tablet:py-3 w-full rounded-3xl font-semibold  text-white bg-button-secondary'
            onClick={() => navigate('/cart')}
          >
            장바구니 가기
          </button>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default CartAddSuccessModal
