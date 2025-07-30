import cn from '@/utils/classNames';

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

const PageTitle = ({ children, className }: PageTitleProps) => {
  const titleClasses = cn(
    'mb-[clamp(22px,3vw,70px)] text-[clamp(16px,2vw,25px)] font-bold',
    className,
  );
  return <h2 className={titleClasses}>{children}</h2>;
};

export default PageTitle;
