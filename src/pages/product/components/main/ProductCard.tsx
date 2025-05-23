import React from 'react'
import useModal from '../../../../hooks/useModal'
import { Product } from '../../../../types/products'
import { useNavigate } from 'react-router-dom'

interface ProductCard {
  product: Product
}

const ProductCard: React.FC<ProductCard> = ({ product }) => {
  const { productId, name, company, price, briefDescription, thumbnailUrl } = product
  const { openModal } = useModal()
  const navigation = useNavigate()

  const handleAddToCart = () => {
    openModal({
      type: 'addToCart',
      props: { productId, name, price, briefDescription, thumbnailUrl },
    })
  }
  return (
    <div className='flex flex-col rounded-lg overflow-hidden' onClick={() => console.log('')}>
      <div className='w-full h-[200px]' onClick={() => navigation(`/product/${productId}`)}>
        <img
          src='https://cdn.pixabay.com/photo/2024/03/16/20/35/ai-generated-8637800_640.jpg'
          alt='종합비타민 A to Z1'
          className='object-cover w-full h-full'
        />
      </div>
      <div className='px-[45px] tablet:px-[17px] bg-white '>
        <div className='py-[40px] border-b-[1px] border-[#D9D9D9] text-[#272626]'>
          <div className='text-16 mb-2 font-semibold'>{name}</div>
          <div className='text-12 mb-2'>{company}</div>
          <div className='text-14 mb-2 font-medium'>{price.toLocaleString()}원</div>
          <div className='text-12'>{briefDescription}</div>
        </div>
        <div className='flex justify-between gap-x-5 text-12 my-[30px] text-white'>
          <button
            className='bg-button-secondary w-[100px] h-[30px] rounded-2xl'
            onClick={handleAddToCart}
          >
            장바구니 담기
          </button>
          <button className='bg-button-primary w-[100px] h-[30px] rounded-2xl'>바로 구매</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
