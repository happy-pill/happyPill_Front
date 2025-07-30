import { CgClose } from 'react-icons/cg';

import Button from '@/components/button/BaseButton';

interface RemoveButtonProps {
  onRemove: () => void;
}

const RemoveButton = ({ onRemove }: RemoveButtonProps) => {
  return (
    <Button
      onClick={onRemove}
      className='flex items-center justify-center rounded p-1 text-[clamp(15px,1vw,20px)] transition-colors'
    >
      <CgClose />
    </Button>
  );
};

export default RemoveButton;
