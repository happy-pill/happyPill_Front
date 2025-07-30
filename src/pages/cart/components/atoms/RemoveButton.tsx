import { CgClose } from 'react-icons/cg';

import Button from '@/components/button/BaseButton';
import cn from '@/utils/classNames';

interface RemoveButtonProps {
  onRemove: () => void;
  className?: string;
}

const RemoveButton = ({ onRemove, className }: RemoveButtonProps) => {
  return (
    <Button
      onClick={onRemove}
      className={cn('flex items-center justify-center rounded p-1 transition-colors', className)}
    >
      <CgClose />
    </Button>
  );
};

export default RemoveButton;
