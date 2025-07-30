import cn from '@/utils/classNames';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title = ({ children, className }: TitleProps) => {
  return <h2 className={cn(`mb-2.5 ${className}`)}>{children}</h2>;
};

export default Title;
