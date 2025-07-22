import type { Dispatch, RefObject } from 'react';

import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

import Item from './Item';
import ItemList from './ItemList';
import Navigation from './Navigation';

interface CarouselContextProps {
  currentIndex: number; // 현재 위치한 슬라이드의 인덱스
  slideCount: number; // 총 슬라이드 인덱스
  goTo: (index: number) => void; // 특정 인덱스로 이동
  next: () => void; // 다음 슬라이드로 이동
  prev: () => void; // 이전 슬라이드로 이동
  dragging: boolean; // 드래그 중 여부
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

interface VisibleSlides {
  mobile: number;
  tablet: number;
  desktop: number;
}

interface CarouselProps {
  children: React.ReactNode;
  variant?: 'default' | 'centered' | 'peek';
  visibleSlides?: VisibleSlides | null;
  gap?: number;
  centerPadding?: number;
  isInfinite?: boolean;
  active?: boolean;
}

/**
 * @param variant 캐러셀의 모드
 * - default: 여러 슬라이드가 한 화면에 딱 맞게 채워져 보이는 기본 모드.
 * - centered: 선택된 슬라이드가 중앙에 정렬되고 양옆 슬라이드가 살짝 보이는 모드
 * - peek: 왼쪽 정렬 상태에서 오른쪽에 다음 슬라이드 일부가 보이는 모드
 * @param visibleSlides 반응형에서 보여질 슬라이드 개수 (null이면 자동 맞춤)
 * @param gap 슬라이드 간격
 * @param centerPadding 'peek'모드에서 양쪽 패딩
 * @param isInfinite 무한스크롤 여부
 * @param active active 된 Item에 css 스타일 추가 여부
 */
const Carousel = ({
  children,
  variant = 'default',
  visibleSlides = null,
  gap = 20,
  centerPadding = 0,
  isInfinite = false,
  active = false,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 활성화된 슬라이드의 인덱스
  const [dragging, setDragging] = useState(false); // 사용자가 드래그 중인지 여부
  const [slideCount, setSlideCount] = useState(0); // 원본 슬라이드 아이템의 개수
  const [slideWidth, setSlideWidth] = useState(0); // 슬라이드 아이템의 넓이
  const [scrollX, setScrollX] = useState(0); // 슬라이드 스크롤의 현재 위치
  const [visibleCount, setVisibleCount] = useState(visibleSlides?.desktop ?? 0); // 현재 화면에서 보여야 될 컨텐츠 갯수
  const [maxScrollX, setMaxScrollX] = useState(0);
  const [actualIndex, setActualIndex] = useState(0); // 실제 슬라이드 인덱스
  const [isTransitioning, setIsTransitioning] = useState(false);

  const listRef = useRef<HTMLDivElement>(null); // 컨테이너 element에 접근하기 위한 ref
  const startXRef = useRef<number | null>(null); // 드래그를 시작한 시점의 마우스 좌표
  const startScrollXRef = useRef<number | null>(null); // 드래그 시점의 슬라이드의 스크롤 좌표
  const isDraggingRef = useRef(false); // 마우스 클릭/드래그 판별용
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cloneCount = isInfinite ? Math.min(slideCount, Math.max(visibleCount, 1)) : 0; // 무한스크롤을 위한 복제된 슬라이드
  const totalSlides = isInfinite ? slideCount + cloneCount * 2 : slideCount; // 렌더링 되는 전체 슬라이드 개수
  const maxIndex = isInfinite
    ? totalSlides - 1
    : variant === 'centered' || variant === 'peek'
      ? slideCount - 1
      : Math.max(0, slideCount - visibleCount);

  // centerPadding 계산 (centered 모드에서 0이면 자동으로 적절한 값 설정)
  const getEffectiveCenterPadding = useCallback(() => {
    if (variant === 'centered' && centerPadding === 0) {
      const container = listRef.current?.parentElement;
      return container ? container.clientWidth * 0.2 : 80;
    }
    return centerPadding;
  }, [variant, centerPadding]);

  // scrollX 계산 헬퍼 함수
  const calculateScrollX = useCallback(
    (index: number): number => {
      const effectivePadding = getEffectiveCenterPadding();

      if (variant === 'centered') {
        const container = listRef.current?.parentElement;
        if (container) {
          const centerOffset = (container.clientWidth - slideWidth) / 2;
          return index * (slideWidth + gap) - centerOffset;
        }
        return index * (slideWidth + gap) - effectivePadding;
      }

      if (variant === 'peek') {
        return index * (slideWidth + gap) - effectivePadding;
      }

      return index * (slideWidth + gap);
    },
    [variant, slideWidth, gap, getEffectiveCenterPadding],
  );

  const updateVisibleCount = useCallback(() => {
    if (!visibleSlides) return;

    const width = window.innerWidth;
    let newCount: number;

    if (width < 768) newCount = visibleSlides.mobile;
    else if (width < 1024) newCount = visibleSlides.tablet;
    else newCount = visibleSlides.desktop;

    setVisibleCount(newCount);
  }, [visibleSlides]);

  const calculateSlideMetrics = useCallback(() => {
    const container = listRef.current?.parentElement;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const effectivePadding = getEffectiveCenterPadding();
    let calculatedSlideWidth: number;

    if (variant === 'centered') {
      calculatedSlideWidth = containerWidth - effectivePadding * 2;
    } else if (variant === 'peek') {
      const peekSize = 60;
      const availableWidth = containerWidth - effectivePadding - peekSize;
      calculatedSlideWidth = visibleSlides
        ? (availableWidth - gap * (visibleCount - 1)) / visibleCount
        : Math.max(200, (availableWidth - gap * (visibleCount - 1)) / visibleCount);
    } else {
      if (visibleSlides) {
        calculatedSlideWidth = (containerWidth - gap * (visibleCount - 1)) / visibleCount;
      } else {
        // default 모드
        // 최소 200px 기준
        const minSlideWidth = 200;
        // 최대 슬라이드 개수 계산
        const maxPossibleSlides = Math.floor((containerWidth + gap) / (minSlideWidth + gap));
        //실제 보여줄 슬라이드 개수 설정( 실제 슬라이드 개수와 계산된 최대 개수 중 작은 값)
        const actualCount = Math.min(maxPossibleSlides, slideCount);
        //최증 슬라이드 너비 계산함
        calculatedSlideWidth = (containerWidth - gap * (actualCount - 1)) / actualCount;
        setVisibleCount(actualCount);
      }
    }

    const totalWidth = totalSlides * calculatedSlideWidth + (totalSlides - 1) * gap;
    const calculatedMaxScrollX = Math.max(
      0,
      totalWidth - containerWidth + (variant === 'peek' ? effectivePadding : 0),
    );

    setSlideWidth(calculatedSlideWidth);
    setMaxScrollX(calculatedMaxScrollX);
  }, [
    variant,
    visibleSlides,
    visibleCount,
    gap,
    totalSlides,
    slideCount,
    getEffectiveCenterPadding,
  ]);

  // 무한스크롤 위치 조정 함수
  const adjustInfinitePosition = useCallback(
    (targetIndex: number) => {
      if (!isInfinite || slideCount === 0) return targetIndex;

      if (targetIndex < cloneCount) return slideCount + targetIndex;
      if (targetIndex >= slideCount + cloneCount) return targetIndex - slideCount;
      return targetIndex;
    },
    [isInfinite, slideCount, cloneCount],
  );

  /**
   * 특정 인덱스로 슬라이드 이동
   * - 무한스크롤 여부에 따라 인덱스 제한 처리
   * - scrollX 위치 계산하여 이동
   */
  const goTo = useCallback(
    (index: number) => {
      if (slideWidth <= 0) return;

      setIsTransitioning(true);
      const targetIndex = isInfinite ? index : Math.max(0, Math.min(index, maxIndex));
      const targetScrollX = calculateScrollX(targetIndex);
      const finalScrollX = isInfinite
        ? targetScrollX
        : Math.max(0, Math.min(targetScrollX, maxScrollX));

      setCurrentIndex(targetIndex);
      setScrollX(finalScrollX);
    },
    [slideWidth, isInfinite, maxIndex, calculateScrollX, maxScrollX],
  );

  const next = useCallback(() => {
    const nextIndex = isInfinite ? currentIndex + 1 : Math.min(currentIndex + 1, maxIndex);
    goTo(nextIndex);
  }, [isInfinite, currentIndex, maxIndex, goTo]);

  const prev = useCallback(() => {
    const prevIndex = isInfinite ? currentIndex - 1 : Math.max(currentIndex - 1, 0);
    goTo(prevIndex);
  }, [isInfinite, currentIndex, goTo]);

  /**
   * 드래그 시작 시 호출
   * - 시작 좌표 저장
   * - 드래그 상태 활성화
   */
  const onDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(true);
      isDraggingRef.current = false;

      const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
      startXRef.current = pageX;
      startScrollXRef.current = scrollX;
    },
    [scrollX],
  );

  /**
   * 드래그 중 이동 처리
   * - delta 계산하여 scrollX 조절
   * - 무한스크롤 여부에 따라 제한 유무 결정
   */
  const onDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!dragging || startXRef.current === null || startScrollXRef.current === null) return;

      const pageX = 'touches' in e ? e.touches[0].pageX : (e as MouseEvent).pageX;
      const delta = pageX - startXRef.current;
      const newScrollX = startScrollXRef.current - delta;

      if (isInfinite) {
        setScrollX(newScrollX);
      } else {
        const overscrollLimit = 30;
        const boundedScrollX = Math.max(
          -overscrollLimit,
          Math.min(newScrollX, maxScrollX + overscrollLimit),
        );
        setScrollX(boundedScrollX);
      }

      if (Math.abs(delta) > 10) isDraggingRef.current = true;
    },
    [dragging, isInfinite, maxScrollX],
  );

  /**
   * 드래그 종료 처리
   * - 이동 거리 기준으로 인덱스 계산
   * - 슬라이드 이동
   */
  const onDragEnd = useCallback(
    (e: MouseEvent | TouchEvent) => {
      setDragging(false);

      if (startXRef.current === null || startScrollXRef.current === null || slideWidth <= 0) return;

      const lastPageX = 'changedTouches' in e ? e.changedTouches[0].pageX : (e as MouseEvent).pageX;
      const dragDistance = lastPageX - startXRef.current;
      const slideStep = slideWidth + gap;
      const dragThreshold = slideWidth * 0.1;

      let newIndex = currentIndex;
      if (Math.abs(dragDistance) > dragThreshold) {
        const slideMove = Math.ceil(Math.abs(dragDistance) / slideStep);
        newIndex = dragDistance > 0 ? currentIndex - slideMove : currentIndex + slideMove;
      }

      if (!isInfinite) {
        newIndex = Math.max(0, Math.min(newIndex, maxIndex));
      }

      goTo(newIndex);

      isDraggingRef.current = false;
      startXRef.current = null;
      startScrollXRef.current = null;
    },
    [slideWidth, gap, currentIndex, isInfinite, maxIndex, goTo],
  );

  // 반응형 처리
  useEffect(() => {
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [updateVisibleCount]);

  // 슬라이드 크기 및 최대 스크롤 거리 계산
  useEffect(() => {
    calculateSlideMetrics();
    window.addEventListener('resize', calculateSlideMetrics);
    return () => window.removeEventListener('resize', calculateSlideMetrics);
  }, [calculateSlideMetrics]);

  // 초기 위치 설정
  useEffect(() => {
    if (slideCount === 0 || slideWidth === 0) return;

    const initialIndex = isInfinite ? cloneCount : 0;
    const initialScrollX = calculateScrollX(initialIndex);

    setCurrentIndex(initialIndex);
    setScrollX(initialScrollX);
    setActualIndex(0);
  }, [isInfinite, slideCount, slideWidth, cloneCount, calculateScrollX]);

  // 드래그 이벤트 리스너 등록
  useEffect(() => {
    if (!dragging) return;

    const handleMove = (e: MouseEvent | TouchEvent) => onDragMove(e);
    const handleEnd = (e: MouseEvent | TouchEvent) => onDragEnd(e);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [dragging, onDragMove, onDragEnd]);

  // 트랜지션 완료 후 위치 조정
  useEffect(() => {
    if (!isTransitioning) return;

    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);

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
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, [isTransitioning, currentIndex, isInfinite, adjustInfinitePosition, calculateScrollX]);

  // 실제 인덱스 업데이트
  useEffect(() => {
    if (isInfinite) {
      let newActualIndex = currentIndex - cloneCount;
      if (newActualIndex < 0) newActualIndex = slideCount + newActualIndex;
      if (newActualIndex >= slideCount) newActualIndex = newActualIndex - slideCount;
      setActualIndex(newActualIndex);
    } else {
      setActualIndex(currentIndex);
    }
  }, [currentIndex, isInfinite, slideCount, cloneCount]);

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
