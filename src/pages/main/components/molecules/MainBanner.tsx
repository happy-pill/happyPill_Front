import Carousel from '@/components/carousel/Carousel';
import { MAIN_BANNER_DATA } from '@/constants/locale';
import useLocale from '@/hooks/useLocale';

const MainBanner = () => {
  const { locale } = useLocale();
  const TABLET_BREAKPOINT = 768;
  return (
    <div className='mx-auto mt-5 overflow-hidden md:mt-10'>
      <Carousel
        variant='centered'
        centerPadding={window.innerWidth < 768 ? 30 : 0}
        isInfinite
        gap={window.innerWidth < TABLET_BREAKPOINT ? 15 : 20}
        active
      >
        <Carousel.ItemList>
          {MAIN_BANNER_DATA.map((banner, idx) => {
            return (
              <Carousel.Item
                key={idx}
                className='min-h-[300px] w-full max-w-[1280px] overflow-hidden rounded-md lg:rounded-lg'
              >
                <div className='relative h-full' key={banner[locale].title + idx}>
                  <div className='absolute top-[15%] left-[7%] h-fit text-white'>
                    <div className='flex gap-x-1'>
                      {banner[locale].badge.map((badge, badgeIdx) => (
                        <div
                          key={badgeIdx}
                          className='w-fit rounded-lg bg-black/20 px-3 py-1 text-[clamp(12px,1vw,14px)]'
                        >
                          {badge}
                        </div>
                      ))}
                    </div>
                    <h1 className='my-[clamp(8px,1vw,24px)] text-[clamp(22px,3vw,40px)] leading-[clamp(30px,4vw,50px)] font-bold whitespace-pre-line'>
                      {banner[locale].title}
                    </h1>

                    <p className='text-[clamp(14px,2vw,20px)]'>{banner[locale].description}</p>
                  </div>
                  <img
                    src={banner.imageUrl}
                    alt={`배너이미지${idx}`}
                    className='h-full w-full object-cover'
                    draggable={false}
                  />
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel.ItemList>
      </Carousel>
    </div>
  );
};

export default MainBanner;
