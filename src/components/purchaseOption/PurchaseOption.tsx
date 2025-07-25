import React from 'react';

import ButtonGroup from '@/components/purchaseOption/ButtonGroup';
import Header from '@/components/purchaseOption/Header';
import PriceSection from '@/components/purchaseOption/PriceSection';
import Title from '@/components/purchaseOption/Title';
import cn from '@/utils/classNames';

interface PurchaseOptionProps {
  children: React.ReactNode;
  className?: string;
}

const PurchaseOption = ({ className, children }: PurchaseOptionProps) => {
  return <div className={cn(` ${className}`)}>{children}</div>;
};

export default PurchaseOption;

PurchaseOption.Header = Header;
PurchaseOption.Title = Title;
PurchaseOption.PriceSection = PriceSection;
PurchaseOption.ButtonGroup = ButtonGroup;
