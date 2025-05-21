import { InfoPageProps } from '../types/infoPage'

const InfoPage = ({ title, description, sections }: InfoPageProps) => {
  const isAboutPage = title === '회사소개'

  return (
    <div className='min-h-screen bg-primary py-10'>
      <div className='max-w-[1280px] mx-auto mb-2 px-4 tablet:px-8'>
        <h1 className='text-24 tablet:text-28 desktop:text-32 font-bold mb-2 text-black pl-1'>
          {title}
        </h1>
      </div>

      <div className='w-full h-4 bg-secondary mb-6' />
      <div className='max-w-[1280px] mx-auto px-4 tablet:px-8 p-6'>
        <p className='text-12 tablet:text-13 desktop:text-14 text-gray-700 mb-8 whitespace-pre-line'>
          {description}
        </p>

        {sections.map((section, i) => (
          <div key={i} className='mb-10'>
            {isAboutPage ? (
              <h2 className='text-[#637C5A] font-semibold text-sm mb-1'>{section.title}</h2>
            ) : (
              <h2 className='font-semibold text-lg mb-3 text-black'>{section.title}</h2>
            )}

            <div className='bg-white p-4 rounded'>
              {typeof section.content === 'string' ? (
                <p className='text-12 tablet:text-13 desktop:text-14 text-gray-700 whitespace-pre-line'>
                  {section.content}
                </p>
              ) : (
                <ul className='list-none text-sm'>
                  {section.content.map((item, j) => (
                    <li key={j} className='mb-6'>
                      <p className='text-12 tablet:text-13 desktop:text-14 font-bold text-[#637C5A] mb-1'>
                        {item.heading}
                      </p>
                      <p className='text-12 tablet:text-13 desktop:text-14 text-gray-700 whitespace-pre-line'>
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfoPage