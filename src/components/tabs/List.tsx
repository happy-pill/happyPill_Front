import { cn } from '@/utils/classNames';

interface ListProps {
  children: React.ReactNode;
  className?: string;
}

const List: React.FC<ListProps> = ({ children, className }) => {
  return (
    <div className={cn('flex items-center gap-x-5 rounded-md bg-white', className)}>{children}</div>
  );
};

export default List;
