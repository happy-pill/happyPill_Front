import React, { useEffect, useState } from 'react'
import { useCarouselContext } from './Carousel'

import CarouselNavigationButton from '../../assets/icon/CarouselNavigationButton'

interface NavigationProps {
  className?: string
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const { scrollX, listRef, slideCount, next, prev } = useCarouselContext()

  const [showPrev, setShowPrev] = useState(false)
  const [showNext, setShowNext] = useState(false)

  useEffect(() => {
    const listEl = listRef.current
    if (!listEl) return

    const containerWidth = listEl.parentElement?.clientWidth ?? 0
    const scrollWidth = listEl.scrollWidth

    setShowPrev(scrollX > 0)
    setShowNext(scrollX + containerWidth < scrollWidth - 1)
  }, [scrollX, slideCount])

  return (
    <div className={className}>
      {showPrev && (
        <button
          onClick={prev}
          className='absolute left-0 top-1/2 -translate-x-[50px] -translate-y-1/2 z-10'
        >
          <CarouselNavigationButton />
        </button>
      )}
      {showNext && (
        <button
          onClick={next}
          className='absolute right-0 rotate-180 top-1/2 -translate-x-[-50px] -translate-y-1/2 z-10'
        >
          <CarouselNavigationButton />
        </button>
      )}
    </div>
  )
}

export default Navigation
