import { useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

import { cn } from '@/utils/classNames';

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionSection = ({ title, children, defaultOpen = true }: AccordionSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className='rounded-md bg-white'>
      <div
        className='flex cursor-pointer items-center justify-between border-b border-[#EAEAEA] p-5 pb-4 select-none'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h2 className='text-[clamp(12px,1vw,20px)] font-semibold'>{title}</h2>
        <IoIosArrowUp size={25} color='#BCBCBC' className={cn(isOpen && 'rotate-180')} />
      </div>

      <div className={cn('grid overflow-hidden', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
        <div className='overflow-hidden'>{children}</div>
      </div>
    </div>
  );
};

export default AccordionSection;
