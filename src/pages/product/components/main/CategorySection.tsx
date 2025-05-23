import React from 'react'
import desc_img from '../../../../../public/cat_vitamin_desc.png'
import ProductCard from './ProductCard'
import { Category, CategoryBlock } from '../../../../types/category'

interface CategorySectionProps {
  categoryBlock: CategoryBlock
  onLoadMore: (category: Category, lastProductId: number | null) => void
}

const CategorySection: React.FC<CategorySectionProps> = ({ categoryBlock, onLoadMore }) => {
  const { category, products, lastProductId, hasNext } = categoryBlock
  return (
    <section className='mb-10'>
      <div className='my-[80px] bg-[#F0F5FB]'>
        <div className='mx-auto w-[85%] labtop:max-w-[850px] desktop:max-w-[1020px] flex flex-col gap-y-3 tablet:flex-row  md:gap-x-5 justify-between items-center py-4 tablet:py-0'>
          <div>
            <h3 className='text-[#026242] text-24  labtop:text-28 desktop:text-32 font-bold text-center md:text-start mb-[30px]'>
              {category.name}
            </h3>
            <p className='max-w-[600px] text-14 tablet:text-22 labtop:text-24   text-[#272626] break-keep'>
              {category.description}
            </p>
          </div>
          <img src={desc_img} alt='비타민' className='w-[300px] h-[300px]' />
        </div>
      </div>
      <div className='mx-auto w-[85%] labtop:max-w-[850px] desktop:max-w-[1020px]'>
        <div className='grid grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4 gap-5'>
          {products.map((product, i) => {
            return <ProductCard key={i} product={product} />
          })}
        </div>
      </div>
      {hasNext && (
        <div className='w-full text-center mt-16'>
          <button
            className='text-14 text-white bg-button-primary w-[100px] h-[30px] rounded-2xl'
            onClick={() => onLoadMore(categoryBlock.category, lastProductId)}
          >
            더보기
          </button>
        </div>
      )}
    </section>
  )
}

export default CategorySection
