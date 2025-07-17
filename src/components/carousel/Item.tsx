import { useCarouselContext } from './Carousel';

import { cn } from '@/utils/classNames';

interface ItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Item: React.FC<ItemProps> = ({ children, className, onClick }) => {
  const { dragging, isDraggingRef, slideWidth } = useCarouselContext();

  const handleClick = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  return (
    <div
      className={cn('flex-shrink-0 select-none', className)}
      style={{
        pointerEvents: dragging ? 'none' : 'auto',
        width: slideWidth > 0 ? `${slideWidth}px` : 'auto',
      }}
    >
      <div className='pointer-events-auto h-full w-full' onClick={handleClick}>
        {children}
      </div>
    </div>
  );
};

export default Item;
