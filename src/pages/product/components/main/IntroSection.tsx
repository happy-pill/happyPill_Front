import { Category } from '../../../../types/category'

interface IntroSectionProps {
  categories: Category[]
}

const IntroSection: React.FC<IntroSectionProps> = ({ categories }) => {
  return (
    <div className='mx-auto w-[85%] labtop:max-w-[850px] desktop:max-w-[1020px] my-[80px] flex flex-col justify-between gap-y-[30px] md:flex-row '>
      <div className='flex flex-col justify-center items-center md:items-start text-24 md:text-28 lg:text-32 font-extrabold leading-8'>
        <h2 className='text-[#026242]'>당신의 건강,</h2>
        <h2 className='break-keep'>해피필이 매일 책임질게요!</h2>
      </div>

      <ul className='grid grid-cols-5 gap-x-1 '>
        {categories.map((category: Category) => {
          return (
            <li
              key={category.categoryId}
              /* onClick={() =>  } */
              className={`grid justify-items-center text-[#545861] font-semibold cursor-pointer`}
            >
              <div className='w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:h-[100px] lg:w-[100px]'>
                <img
                  className='w-full h-full object-cover'
                  src={category.thumbnailUrl}
                  alt={category.name}
                />
              </div>
              <p className='mt-[10px] text-[14px] md:text-[15px] lg:text-[16px]'>{category.name}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default IntroSection
