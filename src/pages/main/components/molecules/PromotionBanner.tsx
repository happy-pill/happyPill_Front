import Carousel from '@/components/carousel/Carousel';
import { PROMOTION_BANNER_DATA } from '@/constants/locale/main';
import useLocale from '@/hooks/useLocale';

const PromotionBanner = () => {
  const { locale } = useLocale();
  const TABLET_BREAKPOINT = 768;
  return (
    <div className='my-25 bg-[#BED0A2] lg:my-36'>
      <Carousel
        variant='centered'
        centerPadding={window.innerWidth < TABLET_BREAKPOINT ? 10 : 0}
        isInfinite
        active
      >
        <Carousel.ItemList>
          {PROMOTION_BANNER_DATA.map((data, idx) => {
            return (
              <Carousel.Item
                key={data.imageUrl + idx}
                className='flex min-h-[150px] w-full items-center justify-center sm:min-h-[250px]'
              >
                <div className='flex items-center justify-center gap-x-[clamp(20px,2vw,90px)]'>
                  <div className='min-w-0 flex-1 py-8'>
                    <div className='bg-primary mb-1 w-fit rounded-lg px-3 py-1 text-[clamp(10px,1.5vw,16px)] text-white'>
                      {data[locale].badge}
                    </div>
                    <div className='text-[clamp(14px,2vw,32px)] text-white'>
                      <p className='font-light'>{data[locale].title.normal}</p>
                      <p className='font-semibold'>{data[locale].title.highlight}</p>
                    </div>
                  </div>
                  <img
                    src={data.imageUrl}
                    draggable={false}
                    alt='배너이미지'
                    className='h-full w-[clamp(100px,15vw,200px)]'
                  />
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel.ItemList>
        <Carousel.Navigation className='pointer-events-none absolute inset-0 right-3 left-3 flex items-center justify-between lg:right-[5%] lg:left-[5%]' />
      </Carousel>
    </div>
  );
};

export default PromotionBanner;
