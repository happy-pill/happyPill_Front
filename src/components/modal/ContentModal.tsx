import Modal from './ui/Modal';
import StyledButton from '../button/StyledButton';

import useModal from '@/hooks/useModal';

interface ContentModalProps {
  type: 'confirm' | 'alert';
  title?: string;
  children: React.ReactNode;
  onConfirm: () => void;
}

const ContentModal: React.FC<ContentModalProps> = (props) => {
  const { type, title, children, onConfirm } = props;
  const { closeModal } = useModal();
  return (
    <Modal>
      <Modal.Content className='relative flex w-full max-w-[430px] flex-col'>
        <div className='mt-4 mb-8 flex flex-col items-center'>
          <h2 className='text-[clamp(15px,2vw,20px)] font-semibold'>{title}</h2>
        </div>
        <div className='flex-1 text-center text-[clamp(14px,1.5vw,18px)] break-all'>{children}</div>
        {type == 'confirm' ? (
          <div className='mt-10 flex items-center gap-x-4'>
            <StyledButton variant='green' onClick={() => onConfirm()}>
              확인
            </StyledButton>
            <Modal.Close className='border-button-secondary text-14 text-button-secondary w-full rounded-3xl border border-solid bg-white py-2 font-semibold'>
              취소
            </Modal.Close>
          </div>
        ) : (
          <div className='mt-10 flex w-full items-center justify-center'>
            <StyledButton variant='green' onClick={closeModal}>
              확인
            </StyledButton>
          </div>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default ContentModal;
