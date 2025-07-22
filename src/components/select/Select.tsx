import React, { createContext, useContext, useRef, useState } from 'react';

import Content from './Content';
import Group from './Group';
import Item from './Item';
import Trigger from './Trigger';

import { cn } from '@/utils/classNames';

interface SelectContextType {
  isOpen: boolean;
  selectedValue: string | number | null;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  onValueChange: (value: string | number) => void;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
}

interface SelectContextProps {
  children: React.ReactNode;
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (value: string | number) => void;
  className?: string;
}

export const useSelectContext = () => {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error('Select컴포넌트는 Select 컴포넌트 내부에서만 사용하세요');
  return ctx;
};

const SelectContext = createContext<SelectContextType | null>(null);

const Select = ({
  children,
  defaultValue,
  value: controlledValue,
  onChange,
  className,
}: SelectContextProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | null>(defaultValue || null);

  // controlledValue여부에 따라 부모가 제어, 없으면 내부 코드로 비제어 > 제어/비제어 컴포넌트
  const currentValue = controlledValue !== undefined ? controlledValue : selectedValue;

  const handleValueChange = (newValue: string | number) => {
    if (controlledValue === undefined) {
      setSelectedValue(newValue);
    }
    setIsOpen(false);
    onChange?.(newValue);
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const contextValue: SelectContextType = {
    isOpen,
    selectedValue: currentValue,
    triggerRef,
    contentRef,
    onValueChange: handleValueChange,
    onToggle: handleToggle,
    onOpen: handleOpen,
    onClose: handleClose,
  };
  return (
    <SelectContext.Provider value={contextValue}>
      <div className={cn('relative', className)}>{children}</div>
    </SelectContext.Provider>
  );
};

Select.Trigger = Trigger;
Select.Group = Group;
Select.Item = Item;
Select.Content = Content;

export default Select;
