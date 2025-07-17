import { useEffect, useState } from 'react';

import { useCarouselContext } from './Carousel';

import CarouselNavigationButton from '@/assets/icon/CarouselNavigationButton';

const Navigation = () => {
  const { scrollX, listRef, slideCount, next, prev } = useCarouselContext();

  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    const containerWidth = listEl.parentElement?.clientWidth ?? 0;
    const scrollWidth = listEl.scrollWidth;

    setShowPrev(scrollX > 0);
    setShowNext(scrollX + containerWidth < scrollWidth - 1);
  }, [scrollX, slideCount]);

  return (
    <div>
      {showPrev && (
        <button
          onClick={prev}
          className='absolute top-1/2 left-0 z-10 -translate-x-[50px] -translate-y-1/2'
        >
          <CarouselNavigationButton />
        </button>
      )}
      {showNext && (
        <button
          onClick={next}
          className='absolute top-1/2 right-0 z-10 -translate-x-[-50px] -translate-y-1/2 rotate-180'
        >
          <CarouselNavigationButton />
        </button>
      )}
    </div>
  );
};

export default Navigation;
