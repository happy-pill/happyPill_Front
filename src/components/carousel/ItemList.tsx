import React, { useEffect, Children } from 'react'
import { useCarouselContext } from './Carousel'
import { cn } from '../../utils/classNames'

interface ItemListProps {
  children: React.ReactNode
  className?: string
}

const ItemList: React.FC<ItemListProps> = ({ children, className }) => {
  const { listRef, scrollX, dragging, onDragStart, setSlideCount } = useCarouselContext()

  useEffect(() => {
    setSlideCount(Children.count(children))
  }, [children, setSlideCount])

  return (
    <div
      ref={listRef}
      className={cn(
        'flex gap-x-5 h-auto z-0 bg-transparent cursor-grab',
        dragging && 'cursor-grabbing duration-0',
        !dragging && 'transition-transform ease-out duration-300',
        className,
      )}
      style={{
        transform: `translateX(-${scrollX}px)`,
      }}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
    >
      {children}
    </div>
  )
}

export default ItemList
