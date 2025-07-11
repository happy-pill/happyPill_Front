import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useSelectContext } from './Select';

import { cn } from '@/utils/classNames';

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

interface Position {
  top: number;
  left: number;
  width: number;
}

const Content: React.FC<SelectContentProps> = ({ children, className }) => {
  const { contentRef, triggerRef, isOpen, onClose } = useSelectContext();
  const [contentPosition, setContentPosition] = useState<Position | null>(null);

  const calculatePosition = (): Position | null => {
    if (!triggerRef.current) return null;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;

    return {
      top: triggerRect.bottom + scrollY + 2, // 2px 간격으로 하단에 배치
      left: triggerRect.left,
      width: triggerRect.width,
    };
  };

  // 위치 업데이트
  const updatePosition = () => {
    if (isOpen) {
      const newPosition = calculatePosition();
      console.log('newPosition', newPosition);
      setContentPosition(newPosition);
    }
  };

  // isOpen 상태 변경 시 위치 계산
  useEffect(() => {
    if (isOpen) {
      updatePosition();
    } else {
      setContentPosition(null);
    }
  }, [isOpen]);

  // 스크롤 및 리사이즈 이벤트 핸들러
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  // 외부 클릭 감지
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        triggerRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen || !contentPosition) return null;

  const contentElement = (
    <div
      ref={contentRef}
      className={cn(
        'absolute z-99 overflow-hidden rounded-sm bg-white shadow-md',
        'animate-in slide-in-from-top-2 duration-200',
        className,
      )}
      style={{
        top: contentPosition.top,
        left: contentPosition.left,
        width: contentPosition.width,
      }}
    >
      <div className='max-h-[300px] overflow-y-auto'>{children}</div>
    </div>
  );

  // Portal을 사용하여 body에 렌더링
  return createPortal(contentElement, document.body);
};

export default Content;
