import React, { useState } from 'react'
import Modal from './ui/Modal'
import SubscriptionPlanButton from '../button/SubscriptionPlanButton'
import CloseButtonIcon from '../../assets/icon/CloseButtonIcon'
import { Product } from '../../types/products'
import { cartStorage } from '../../utils/cart/cartStorage'
import useModal from '../../hooks/useModal'

type CartProductProps = Omit<Product, 'company' | 'categoryId'>

const AddToCartModal: React.FC<CartProductProps> = (props) => {
  const { productId, name, price, briefDescription, thumbnailUrl } = props
  const [subscripionOption, setSubscriptionOption] = useState(1)
  const { openModal, closeModal } = useModal()
  const item = {
    productId,
    name,
    price,
    briefDescription,
    thumbnailUrl,
    period: subscripionOption,
  }
  const OPTIONS = [1, 3, 6]

  const handleAddToCart = () => {
    cartStorage.save(item)
    closeModal()
    openModal({ type: 'cartAddSuccess' })
  }
  return (
    <Modal>
      <Modal.Content className='relative max-w-[430px] w-full'>
        <Modal.Close className='absolute right-2 top-2'>
          <CloseButtonIcon />
        </Modal.Close>

        <div className='flex flex-col items-center mb-8'>
          <p className='text-18 font-semibold'>{name}</p>
          <h2 className='text-22 tablet:text-24 text-[#026242] font-bold'>장바구니 담기</h2>
        </div>
        <div>
          <p className='text-14 font-semibold mb-2'>개월 옵션</p>
          <div className='grid grid-cols-3 gap-x-5'>
            {OPTIONS.map((month) => (
              <SubscriptionPlanButton
                key={month}
                period={month}
                isSelected={subscripionOption === month}
                onClick={() => setSubscriptionOption(month)}
              />
            ))}
          </div>
        </div>
        <button
          className='py-2 mt-8 tablet:py-3 w-full rounded-3xl font-semibold text-white bg-button-secondary'
          onClick={handleAddToCart}
        >
          장바구니 담기
        </button>
      </Modal.Content>
    </Modal>
  )
}

export default AddToCartModal
