import { cn } from '@/utils/classNames';

interface ModalButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const ModalClose: React.FC<ModalButtonProps> = ({ className, children, onClick }) => {
  const modalClosecls = `px-3 py-1.5 text-sm text-gray-600 rounded cursor-pointer`;
  return (
    <button className={cn(modalClosecls, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default ModalClose;
