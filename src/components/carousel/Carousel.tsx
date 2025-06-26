import type { Dispatch, RefObject } from 'react';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

import Item from './Item';
import ItemList from './ItemList';
import Navigation from './Navigation';

interface CarouselContextProps {
  slideCount: number; // 현재 보여지는 슬라이드 인덱스
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
}

const CarouselContext = createContext<CarouselContextProps | null>(null);
export const useCarouselContext = () => {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error('Carousel components must be used within Carousel.');
  return ctx;
};

const Carousel = ({ children }: { children: React.ReactNode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [slideCount, setSlideCount] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [maxScrollX, setMaxScrollX] = useState(0);
  const [scrollX, setScrollX] = useState(0); // 슬라이드 스크롤의 현재 위치
  const listRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null); // 드래그를 시작한 시점의 마우스 좌표
  const startScrollXRef = useRef<number | null>(null); // 드래그 시점의 슬라이드의 스크롤 좌표
  const isDraggingRef = useRef(false); // 마우스 클릭/드래그 판별용

  // 슬라이드 크기 및 최대 스크롤 거리 계산
  useEffect(() => {
    const updateMetrics = () => {
      const listEl = listRef.current;
      if (!listEl) return;

      const children = Array.from(listEl.children) as HTMLElement[];
      if (children.length === 0) return;

      const firstItem = children[0];
      const itemWidth = firstItem.offsetWidth;

      const style = window.getComputedStyle(listEl);
      const gap = parseFloat(style.columnGap || style.gap || '0');
      const slideUnit = itemWidth + gap;

      setSlideWidth(slideUnit);

      const containerWidth = listEl.parentElement?.clientWidth ?? 0;
      // 캐러셀 전체의 영역
      const lastChild = children[children.length - 1];
      const totalWidth = lastChild.offsetLeft + lastChild.offsetWidth;

      // 스크롤 가능한 최대 거리
      const scrollable = Math.max(0, totalWidth - containerWidth);
      setMaxScrollX(scrollable);
    };

    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, [slideCount]);

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

  const goTo = (index: number) => {
    if (slideWidth <= 0 || maxScrollX <= 0) return;
    // 현재 스크롤 위치와 제한된 스크롤 위치를 비교
    const targetScrollX = Math.min(index * slideWidth, maxScrollX);

    setCurrentIndex(index);
    setScrollX(targetScrollX);
  };

  const next = () => goTo(currentIndex + 1);
  const prev = () => goTo(currentIndex - 1);

  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    isDraggingRef.current = false;
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    startXRef.current = pageX; // 드래그 시작 시점의 마우스 위치를 저장
    startScrollXRef.current = scrollX; // 드래그 시작 시점의 현재 스크롤의 위치 저장
  };

  const onDragMove = (e: MouseEvent | TouchEvent) => {
    if (!dragging || startXRef.current === null || startScrollXRef.current === null) return;

    const pageX = 'touches' in e ? e.touches[0].pageX : (e as MouseEvent).pageX;
    const delta = pageX - startXRef.current;

    // 드래그한 거리만큼 스크롤 위치 계산 = 클릭했을 때의 스크롤 위치 - 드래그한 거리(현재 마우스의 위치 - 클릭했을 때의 위치 )> 스크롤이 위치해야 하는 값
    const newScrollX = startScrollXRef.current - delta;

    // 경계값 처리 (오버스크롤 제한)
    const boundedScrollX = Math.max(-30, Math.min(newScrollX, maxScrollX + 30));

    setScrollX(boundedScrollX);

    if (Math.abs(delta) > 10) {
      isDraggingRef.current = true;
      return;
    }
  };

  const onDragEnd = (e: MouseEvent | TouchEvent) => {
    setDragging(false);

    if (startXRef.current === null || startScrollXRef.current === null || slideWidth <= 0) return;

    const lastPageX = 'changedTouches' in e ? e.changedTouches[0].pageX : (e as MouseEvent).pageX;

    const dragDistance = lastPageX - startXRef.current; // 드래그 시작 지점과 끝 지점 사이의 거리
    const movedSlides = dragDistance / slideWidth; // 이동한 거리 대비 몇개의 슬라이드 이동헀는지 계산

    let newIndex = currentIndex - Math.round(movedSlides);
    newIndex = Math.max(0, Math.min(newIndex, slideCount - 1)); //0보다 작거나 전체 슬라이드 개수보다 크지 않도록 범위 제한

    const rawScrollX = newIndex * slideWidth; // 슬라이드를 이동할 위치
    const clampedScrollX = Math.min(rawScrollX, maxScrollX); // viweport 넘지 않도록 제한

    setCurrentIndex(newIndex);
    setScrollX(clampedScrollX);

    isDraggingRef.current = false;
    startXRef.current = null;
    startScrollXRef.current = null;
  };

  return (
    <CarouselContext.Provider
      value={{
        listRef,
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
      }}
    >
      <div className='w-full overflow-hidden'>{children}</div>
    </CarouselContext.Provider>
  );
};

Carousel.ItemList = ItemList;
Carousel.Item = Item;
Carousel.Navigation = Navigation;

export default Carousel;
