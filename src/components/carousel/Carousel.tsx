import type { Dispatch, RefObject } from 'react';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

import Item from './Item';
import ItemList from './ItemList';
import Navigation from './Navigation';

interface CarouselContextProps {
  currentIndex: number;
  slideCount: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  dragging: boolean;
  onDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
  onDragMove: (e: MouseEvent | TouchEvent) => void;
  onDragEnd: (e: MouseEvent | TouchEvent) => void;
  setSlideCount: Dispatch<React.SetStateAction<number>>;
  isDraggingRef: React.RefObject<boolean>;
  listRef: RefObject<HTMLDivElement | null>;
  scrollX: number;
  slideWidth: number;
  maxIndex: number;
  variant: 'default' | 'centered' | 'peek';
  isInfinite: boolean;
  actualIndex: number;
  gap: number;
  cloneCount: number;
  isTransitioning: boolean;
  active: boolean;
}

const CarouselContext = createContext<CarouselContextProps | null>(null);
export const useCarouselContext = () => {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error('Carousel components must be used within Carousel.');
  return ctx;
};

interface CarouselProps {
  children: React.ReactNode;
  variant?: 'default' | 'centered' | 'peek';
  visibleSlides?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap?: number;
  centerPadding?: number;
  isInfinite?: boolean;
  active?: boolean;
}

/**
 *
 * @param vairant 캐러셀의 모드
 * - default: 여러 슬라이드가 한 화면에 딱 맞게 채워져 보이는 기본 모드.
 * - centered: 선택된 슬라이드가 중앙에 정렬되고 양옆 슬라이드가 살짝 보이는 모드
 * - peek: 왼쪽 정렬 상태에서 오른쪽에 다음 슬라이드 일부가 보이는 모드
 * @param visibleSlides 반응형에서 보여질 슬라이드 개수
 * @param gap 슬라이드 간격
 * @param centerPadding 'peek'모드에서 양쪽 패딩
 * @param isInfinite 무한스크롤 여부
 * @param active active 된 Item에 css 스타일 추가 여부
 * @returns
 */

const Carousel = ({
  children,
  variant = 'default',
  visibleSlides = { mobile: 1, tablet: 2, desktop: 4 },
  gap = 20,
  centerPadding = 0,
  isInfinite = false,
  active = false,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [slideCount, setSlideCount] = useState(0); // 원본 슬라이드 아이템의 개수
  const [slideWidth, setSlideWidth] = useState(0); // 슬라이드 아이템의 넓이
  const [scrollX, setScrollX] = useState(0); // 슬라이드 스크롤의 현재 위치
  const [visibleCount, setVisibleCount] = useState(visibleSlides.desktop); // 현재 화면에서 보여야 될 컨텐츠 갯수
  const [maxScrollX, setMaxScrollX] = useState(0);
  const [actualIndex, setActualIndex] = useState(0); // 실제 슬라이드 인덱스
  const [isTransitioning, setIsTransitioning] = useState(false);

  const listRef = useRef<HTMLDivElement>(null); // 컨테이너 element에 접근하기 위한 ref
  const startXRef = useRef<number | null>(null); // 드래그를 시작한 시점의 마우스 좌표
  const startScrollXRef = useRef<number | null>(null); // 드래그 시점의 슬라이드의 스크롤 좌표
  const isDraggingRef = useRef(false); // 마우스 클릭/드래그 판별용
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cloneCount = isInfinite ? Math.min(slideCount, Math.max(visibleCount, 1)) : 0; // 무한스크롤을 위한 복제된 슬라이드 개수
  const totalSlides = isInfinite ? slideCount + cloneCount * 2 : slideCount;

  // centerPadding 계산 (centered 모드에서 0이면 자동으로 적절한 값 설정)
  const getEffectiveCenterPadding = () => {
    if (variant === 'centered' && centerPadding === 0) {
      // centerPadding이 0이면 컨테이너 너비의 20%를 기본값으로 사용
      const listEl = listRef.current;
      if (listEl) {
        const container = listEl.parentElement;
        if (container) {
          return container.clientWidth * 0.2;
        }
      }
      return 80; // 기본값
    }
    return centerPadding;
  };

  // scrollX 계산 헬퍼 함수
  const calculateScrollX = (index: number): number => {
    const effectivePadding = getEffectiveCenterPadding();

    if (variant === 'centered') {
      // centered 모드에서는 현재 슬라이드가 중앙에 오도록 계산
      const listEl = listRef.current;
      if (listEl) {
        const container = listEl.parentElement;
        if (container) {
          const containerWidth = container.clientWidth;
          const centerOffset = (containerWidth - slideWidth) / 2;
          return index * (slideWidth + gap) - centerOffset;
        }
      }
      return index * (slideWidth + gap) - effectivePadding;
    } else if (variant === 'peek') {
      return index * (slideWidth + gap) - effectivePadding;
    }
    return index * (slideWidth + gap);
  };

  // 반응형 처리
  useEffect(() => {
    const updateVisibleSlides = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleCount(visibleSlides.mobile);
      } else if (width < 1024) {
        setVisibleCount(visibleSlides.tablet);
      } else {
        setVisibleCount(visibleSlides.desktop);
      }
    };

    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);
    return () => window.removeEventListener('resize', updateVisibleSlides);
  }, [visibleSlides]);

  // 슬라이드 크기 및 최대 스크롤 거리 계산
  useEffect(() => {
    const updateMetrics = () => {
      const listEl = listRef.current;
      if (!listEl) return;

      const container = listEl.parentElement;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const effectivePadding = getEffectiveCenterPadding();

      let calculatedSlideWidth: number;
      let calculatedMaxScrollX: number;

      if (variant === 'centered') {
        // centered 모드에서는 슬라이드가 중앙에 오도록 너비 계산
        calculatedSlideWidth = containerWidth - effectivePadding * 2;
        const totalWidth = totalSlides * calculatedSlideWidth + (totalSlides - 1) * gap;
        calculatedMaxScrollX = Math.max(0, totalWidth - containerWidth);
      } else if (variant === 'peek') {
        calculatedSlideWidth = containerWidth - effectivePadding * 2;
        const totalWidth = totalSlides * calculatedSlideWidth + (totalSlides - 1) * gap;
        calculatedMaxScrollX = Math.max(0, totalWidth - containerWidth + effectivePadding);
      } else {
        calculatedSlideWidth = (containerWidth - gap * (visibleCount - 1)) / visibleCount;
        const totalWidth = totalSlides * calculatedSlideWidth + (totalSlides - 1) * gap;
        calculatedMaxScrollX = Math.max(0, totalWidth - containerWidth);
      }

      setSlideWidth(calculatedSlideWidth);
      setMaxScrollX(calculatedMaxScrollX);
    };

    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, [totalSlides, visibleCount, variant, gap, centerPadding]);

  // 초기 위치 설정
  useEffect(() => {
    // 무한스크롤의 경우
    if (isInfinite && slideCount > 0 && slideWidth > 0) {
      const initialIndex = cloneCount;
      const initialScrollX = calculateScrollX(initialIndex);

      setCurrentIndex(initialIndex);
      setScrollX(initialScrollX);
      setActualIndex(0);
    } else if (!isInfinite && slideCount > 0 && slideWidth > 0) {
      // 일반 모드에서도 초기 위치 설정
      const initialScrollX = calculateScrollX(0);
      setScrollX(initialScrollX);
    }
  }, [isInfinite, slideCount, slideWidth, cloneCount, variant]);

  // 드래그 이벤트 리스너 등록
  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: MouseEvent) => onDragMove(e);
    const handleTouchMove = (e: TouchEvent) => onDragMove(e);
    const handleMouseUp = (e: MouseEvent) => onDragEnd(e);
    const handleTouchEnd = (e: TouchEvent) => onDragEnd(e);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dragging]);

  // 무한스크롤 위치 조정 함수 (개선됨)
  const adjustInfinitePosition = (targetIndex: number) => {
    if (!isInfinite || slideWidth <= 0 || slideCount === 0) return targetIndex;

    let adjustedIndex = targetIndex;

    // 앞쪽 클론 영역에 있을 때 (0 ~ cloneCount-1)
    if (targetIndex < cloneCount) {
      adjustedIndex = slideCount + targetIndex;
    }
    // 뒤쪽 클론 영역에 있을 때 (slideCount + cloneCount ~ totalSlides-1)
    else if (targetIndex >= slideCount + cloneCount) {
      adjustedIndex = targetIndex - slideCount;
    }

    return adjustedIndex;
  };

  // 트랜지션 완료 후 위치 조정
  useEffect(() => {
    if (!isTransitioning) return;

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);

      if (isInfinite) {
        const adjustedIndex = adjustInfinitePosition(currentIndex);
        if (adjustedIndex !== currentIndex) {
          // 트랜지션 없이 위치 조정
          setCurrentIndex(adjustedIndex);
          setScrollX(calculateScrollX(adjustedIndex));
        }
      }
    }, 300);

    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [isTransitioning, currentIndex, isInfinite, slideCount, cloneCount, slideWidth, variant, gap]);

  // 실제 인덱스 업데이트
  useEffect(() => {
    if (isInfinite) {
      let newActualIndex = currentIndex - cloneCount;

      // 음수 처리 (앞쪽 클론 영역)
      if (newActualIndex < 0) {
        newActualIndex = slideCount + newActualIndex;
      }
      // slideCount 이상 처리 (뒤쪽 클론 영역)
      if (newActualIndex >= slideCount) {
        newActualIndex = newActualIndex - slideCount;
      }

      setActualIndex(newActualIndex);
    } else {
      setActualIndex(currentIndex);
    }
  }, [currentIndex, isInfinite, slideCount, cloneCount]);

  // 최대 인덱스 계산
  const maxIndex = isInfinite
    ? totalSlides - 1
    : variant === 'centered' || variant === 'peek'
      ? slideCount - 1
      : Math.max(0, slideCount - visibleCount);

  const goTo = (index: number) => {
    if (slideWidth <= 0) return;

    setIsTransitioning(true);
    let targetIndex = index;

    if (!isInfinite) {
      targetIndex = Math.max(0, Math.min(index, maxIndex));
    }

    const targetScrollX = calculateScrollX(targetIndex);

    // 무한스크롤이 아닐 때만 maxScrollX 제한 적용
    const finalScrollX = isInfinite
      ? targetScrollX
      : Math.max(0, Math.min(targetScrollX, maxScrollX));

    setCurrentIndex(targetIndex);
    setScrollX(finalScrollX);
  };

  const next = () => {
    if (isInfinite) {
      goTo(currentIndex + 1);
    } else {
      goTo(Math.min(currentIndex + 1, maxIndex));
    }
  };

  const prev = () => {
    if (isInfinite) {
      goTo(currentIndex - 1);
    } else {
      goTo(Math.max(currentIndex - 1, 0));
    }
  };

  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
    isDraggingRef.current = false;
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    startXRef.current = pageX;
    startScrollXRef.current = scrollX;
  };

  const onDragMove = (e: MouseEvent | TouchEvent) => {
    if (!dragging || startXRef.current === null || startScrollXRef.current === null) return;

    const pageX = 'touches' in e ? e.touches[0].pageX : (e as MouseEvent).pageX;
    const delta = pageX - startXRef.current;
    const newScrollX = startScrollXRef.current - delta;

    if (!isInfinite) {
      const overscrollLimit = 30;
      const boundedScrollX = Math.max(
        -overscrollLimit,
        Math.min(newScrollX, maxScrollX + overscrollLimit),
      );
      setScrollX(boundedScrollX);
    } else {
      setScrollX(newScrollX);
    }

    if (Math.abs(delta) > 10) {
      isDraggingRef.current = true;
    }
  };

  const onDragEnd = (e: MouseEvent | TouchEvent) => {
    setDragging(false);

    if (startXRef.current === null || startScrollXRef.current === null || slideWidth <= 0) return;

    const lastPageX = 'changedTouches' in e ? e.changedTouches[0].pageX : (e as MouseEvent).pageX;
    const dragDistance = lastPageX - startXRef.current;

    // 드래그 거리에 따라 이동할 슬라이드 개수 계산
    const slideStep = slideWidth + gap;
    const dragThreshold = slideWidth * 0.1;

    let newIndex = currentIndex;

    if (Math.abs(dragDistance) > dragThreshold) {
      if (dragDistance > 0) {
        // 왼쪽으로 드래그 (이전 슬라이드로)
        newIndex = currentIndex - Math.ceil(Math.abs(dragDistance) / slideStep);
      } else {
        // 오른쪽으로 드래그 (다음 슬라이드로)
        newIndex = currentIndex + Math.ceil(Math.abs(dragDistance) / slideStep);
      }
    }

    // 무한스크롤이 아닌 경우 범위 제한
    if (!isInfinite) {
      newIndex = Math.max(0, Math.min(newIndex, maxIndex));
    }

    goTo(newIndex);

    isDraggingRef.current = false;
    startXRef.current = null;
    startScrollXRef.current = null;
  };

  return (
    <CarouselContext.Provider
      value={{
        listRef,
        currentIndex,
        slideCount,
        goTo,
        next,
        prev,
        dragging,
        onDragStart,
        onDragMove,
        onDragEnd,
        setSlideCount,
        scrollX,
        isDraggingRef,
        slideWidth,
        maxIndex,
        variant,
        isInfinite,
        actualIndex,
        gap,
        cloneCount,
        isTransitioning,
        active,
      }}
    >
      <div className='relative w-full overflow-hidden'>{children}</div>
    </CarouselContext.Provider>
  );
};

Carousel.ItemList = ItemList;
Carousel.Item = Item;
Carousel.Navigation = Navigation;

export default Carousel;
