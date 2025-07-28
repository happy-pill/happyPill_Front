import { Children, useEffect, cloneElement } from 'react';

import { useCarouselContext } from './Carousel';

import cn from '@/utils/classNames';

interface ItemListProps {
  children: React.ReactNode;
  className?: string;
}

type CloneType = 'front' | 'original' | 'back';
interface CloneOptions {
  type: CloneType;
  elements: React.ReactNode[];
  indexOffset?: number;
}

interface CloneProps {
  key: string;
  className: string;
}

const buttonClones = (
  { type, elements, indexOffset = 0 }: CloneOptions,
  active: boolean,
  actualIndex: number,
) => {
  return elements.map((child, index) => {
    const element = child as React.ReactElement<{ className?: string }>;
    const originalClassName = element.props.className || '';
    const originalIndex = type === 'front' ? indexOffset + index : index;
    const isActive = active && actualIndex === originalIndex;
    const keyPrefix = type === 'original' ? 'original' : `${type}-clone`;
    const classPrefix = `carousel-${type === 'original' ? 'original' : `${type}-clone`}`;
    /**
     *
     * indexOffset : 총 원본슬라이드 개수(3개일때) - 복제 슬라이드 개수 > 3 - 1 = 2
     * 해당 슬라이드가 앞에 클론 1번째 인 경우 > 2 + 0  원본 슬라이드 2번째꺼(originalIndex)
     * front ? 2 : 0
     * front이면 2번째 인덱스의 거고 아니면 backend 클론 0번째
     * original은 3개 > 0,1,2 (index > originalIndex)
     *
     * actualIndex는 currentIndex - cloneCount / 실제인덱스
     * 현재 인덱스 - 복제개수
     * 원본 3 복제 앞뒤 1개씩 총 5
     * 0,1,2,3,4의 index > currentIndex
     * 0(앞클론) 1~3(원본)  4(뒷클론)
     * 0번째 0(currentIndex) - 2(cloneCount) > -2
     * acutalIndex = -2 > 3번째의 element 원본3
     * 0번째 > 원본3
     */

    return cloneElement(element, {
      key: `${keyPrefix}-${originalIndex}`,
      className: cn(
        `${originalClassName} ${classPrefix} ${classPrefix}-${originalIndex}`.trim(),
        !isActive && 'opacity-50',
      ),
    } as CloneProps);
  });
};

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
    active,
    actualIndex,
  } = useCarouselContext();

  const childrenArray = Children.toArray(children);
  const slideCount = childrenArray.length;

  // 무한스크롤용 슬라이드 생성
  const createInfiniteSlides = () => {
    if (!isInfinite || slideCount === 0) return childrenArray;

    // cloneCount가 slideCount보다 클 수 없도록 제한
    const effectiveCloneCount = Math.min(cloneCount, slideCount);

    const frontClones = buttonClones(
      {
        type: 'front',
        elements: childrenArray.slice(-effectiveCloneCount),
        indexOffset: slideCount - effectiveCloneCount,
      },
      active,
      actualIndex,
    );

    const backClones = buttonClones(
      {
        type: 'back',
        elements: childrenArray.slice(0, effectiveCloneCount),
      },
      active,
      actualIndex,
    );

    const originalSlides = buttonClones(
      {
        type: 'original',
        elements: childrenArray,
      },
      active,
      actualIndex,
    );

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
    <div
      ref={listRef}
      className={className}
      style={listStyle}
      onTouchStart={onDragStart}
      onMouseDown={onDragStart}
    >
      {slides}
    </div>
  );
};

export default ItemList;
