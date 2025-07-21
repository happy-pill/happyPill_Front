import React from 'react';

import cn from '@/utils/classNames';

interface SectionProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

const Section = ({ children, title, className }: SectionProps) => {
  return (
    <section className={cn('mx-auto max-w-[1280px] text-center', className)}>
      <h2 className='xl:text-5xl-bold mb-10 line-clamp-[3rem] text-[clamp(24px,3vw,40px)] font-bold md:mb-20 lg:mb-28'>
        {title.toUpperCase()}
      </h2>
      {children}
    </section>
  );
};

export default Section;
