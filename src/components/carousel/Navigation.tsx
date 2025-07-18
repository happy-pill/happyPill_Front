import { useEffect, useState } from 'react';
import { HiOutlineArrowSmRight } from 'react-icons/hi';

import { useCarouselContext } from './Carousel';

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className }: NavigationProps) => {
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
    <div className={className}>
      {showPrev && (
        <button
          onClick={prev}
          className='pointer-events-auto absolute top-1/2 left-0 z-10 -translate-y-1/2 rotate-180 cursor-pointer rounded-full bg-white/50 md:p-2'
        >
          <HiOutlineArrowSmRight size={40} className='text-black/70' />
        </button>
      )}
      {showNext && (
        <button
          onClick={next}
          className='pointer-events-auto absolute top-1/2 right-0 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/50 md:p-2'
        >
          <HiOutlineArrowSmRight size={40} className='text-black/70' />
        </button>
      )}
    </div>
  );
};

export default Navigation;
