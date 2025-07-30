import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useSelectContext } from './Select';

import { cn } from '@/utils/classNames';

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

interface Position {
  top: number;
  left: number;
  width: number;
}

const Content: React.FC<SelectContentProps> = ({ children, className, placement = 'bottom' }) => {
  const { contentRef, triggerRef, isOpen, onClose } = useSelectContext();
  const [contentPosition, setContentPosition] = useState<Position | null>(null);

  const calculatePosition = (): Position | null => {
    if (!triggerRef.current) return null;

    const rect = triggerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const gap = 8;

    // portal로 띄운 Content는  document.body 바로 아래에 붙게 되서 문서의 전체 기준에서 위치함
    // scrollY(현재 문서의 수직 스크롤 위치)를 더해서 Content의 위치를 나타냄
    switch (placement) {
      case 'bottom':
        return {
          top: rect.bottom + scrollY + gap,
          left: rect.left + scrollX,
          width: rect.width,
        };
      case 'top':
        return {
          top: rect.top + scrollY - gap,
          left: rect.left + scrollX,
          width: rect.width,
        };
      case 'right':
        return {
          top: rect.top + scrollY,
          left: rect.right + scrollX + gap,
          width: rect.width,
        };
      case 'left':
        return {
          top: rect.top + scrollY,
          left: rect.left + scrollX - gap,
          width: rect.width,
        };
      default:
        return null;
    }
  };

  const updatePosition = () => {
    if (isOpen) {
      setContentPosition(calculatePosition());
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
    } else {
      setContentPosition(null);
    }
  }, [isOpen, placement]);

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
        'absolute z-100 overflow-hidden rounded-sm bg-white shadow-md',
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

  return createPortal(contentElement, document.body);
};

export default Content;
