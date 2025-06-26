import { Children, useEffect } from 'react';

import { useCarouselContext } from './Carousel';

import { cn } from '@/utils/classNames';

interface ItemListProps {
  children: React.ReactNode;
  className?: string;
}

const ItemList: React.FC<ItemListProps> = ({ children, className }) => {
  const { listRef, scrollX, dragging, onDragStart, setSlideCount } = useCarouselContext();

  useEffect(() => {
    setSlideCount(Children.count(children));
  }, [children, setSlideCount]);

  return (
    <div
      ref={listRef}
      className={cn(
        'z-0 flex h-auto cursor-grab gap-x-5 bg-transparent',
        dragging && 'cursor-grabbing duration-0',
        !dragging && 'transition-transform duration-300 ease-out',
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
  );
};

export default ItemList;
