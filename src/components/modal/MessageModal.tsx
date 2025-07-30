import Modal from './ui/Modal';
import Button from '../button/BaseButton';
import StyledButton from '../button/StyledButton';

import useModal from '@/hooks/useModal';

interface MessageModalProps {
  type: 'confirm' | 'alert';
  title?: string;
  message?: string;
  onConfirm: () => void;
}

const MessageModal: React.FC<MessageModalProps> = (props) => {
  const { type, title, message, onConfirm } = props;
  const { closeModal } = useModal();
  return (
    <Modal>
      <Modal.Content className='relative flex w-full max-w-[430px] flex-col'>
        <div className='mt-4 mb-8 flex flex-col items-center'>
          <h2 className='text-[clamp(15px,2vw,20px)] font-semibold'>{title}</h2>
        </div>
        <div className='flex-1 text-center text-[clamp(14px,1.5vw,18px)] break-all'>{message}</div>
        {type == 'confirm' ? (
          <div className='mt-10 flex items-center gap-x-4'>
            <Button onClick={() => onConfirm()}>확인</Button>
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

export default MessageModal;
