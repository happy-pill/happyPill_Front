import Button from '@/components/button/BaseButton';
import { cn } from '@/utils/classNames';

interface TageButtonProps {
  value: string;
  bgColor: string;
}

const TagButton = ({ value, bgColor }: TageButtonProps) => {
  return (
    <Button
      className={cn(
        `text-s-regular h-[29px] rounded-md px-4 py-1.5 font-medium text-white shadow-black`,
        bgColor,
      )}
    >
      {value}
    </Button>
  );
};

export default TagButton;
