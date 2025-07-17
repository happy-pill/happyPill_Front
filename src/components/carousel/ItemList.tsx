import { Children, useEffect, cloneElement } from 'react';

import { useCarouselContext } from './Carousel';

interface ItemListProps {
  children: React.ReactNode;
  className?: string;
}
interface CloneProps {
  key: string;
  className: string;
}
const ItemList: React.FC<ItemListProps> = ({ children, className }) => {
  const {
    listRef,
    scrollX,
    dragging,
    onDragStart,
    isTransitioning,
    setSlideCount,
    isInfinite,
    gap,
    cloneCount,
  } = useCarouselContext();

  const childrenArray = Children.toArray(children);
  const slideCount = childrenArray.length;

  // 무한스크롤용 슬라이드 생성
  const createInfiniteSlides = () => {
    if (!isInfinite || slideCount === 0) return childrenArray;

    // cloneCount가 slideCount보다 클 수 없도록 제한
    const effectiveCloneCount = Math.min(cloneCount, slideCount);

    // 마지막 슬라이드들을 앞에 복제 (순서 유지)
    const frontClones = childrenArray.slice(-effectiveCloneCount).map((child, index) => {
      const element = child as React.ReactElement<{ className?: string }>;
      const originalClassName = element.props.className || '';
      const originalIndex = slideCount - effectiveCloneCount + index;

      return cloneElement(element, {
        key: `front-clone-${originalIndex}`,
        className:
          `${originalClassName} carousel-front-clone carousel-clone-${originalIndex}`.trim(),
      } as CloneProps);
    });

    // 첫 번째 슬라이드들을 뒤에 복제
    const backClones = childrenArray.slice(0, effectiveCloneCount).map((child, index) => {
      const element = child as React.ReactElement<{ className?: string }>;
      const originalClassName = element.props.className || '';

      return cloneElement(element, {
        key: `back-clone-${index}`,
        className: `${originalClassName} carousel-front-clone carousel-clone-${index}`.trim(),
      } as CloneProps);
    });

    // 원본 슬라이드에도 클래스 추가
    const originalSlides = childrenArray.map((child, index) => {
      const element = child as React.ReactElement<{ className?: string }>;
      const originalClassName = element.props.className || '';

      return cloneElement(element, {
        key: element.key || `original-${index}`,
        className: `${originalClassName} carousel-original carousel-original-${index}`.trim(),
      } as CloneProps);
    });

    return [...frontClones, ...originalSlides, ...backClones];
  };

  const slides = createInfiniteSlides();
  const listStyle: React.CSSProperties = {
    display: 'flex',
    transform: `translateX(-${scrollX}px)`,
    transition:
      dragging || !isTransitioning ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    gap,
  };

  // 슬라이드 개수 설정
  useEffect(() => {
    setSlideCount(Children.count(children));
  }, [slideCount, setSlideCount]);

  return (
    <div ref={listRef} className={className} style={listStyle} onMouseDown={onDragStart}>
      {slides}
    </div>
  );
};

export default ItemList;
