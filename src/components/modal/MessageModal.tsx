import { CgClose } from 'react-icons/cg';

import Modal from './ui/Modal';

interface MessageModalProps {
  type: 'confirm' | 'alert';
  title?: string;
  message?: string;
  onConfirm: () => void;
}

const MessageModal: React.FC<MessageModalProps> = (props) => {
  const { type, title, message, onConfirm } = props;
  return (
    <Modal>
      <Modal.Backdrop />
      <Modal.Content className='relative w-full max-w-[430px]'>
        <Modal.Close className='absolute right-2 top-2'>
          <CgClose color='#777777' />
        </Modal.Close>
        <div className='mb-8 flex flex-col items-center'>
          <h2 className='text-22 font-semibold'>{title}</h2>
        </div>
        <div className='break-all py-5 text-center text-[18px]'>{message}</div>
        {type == 'confirm' ? (
          <div className='mt-10 flex items-center gap-x-4'>
            <button
              onClick={() => onConfirm()}
              className='w-full rounded-3xl bg-button-secondary py-2 font-semibold text-white'
            >
              확인
            </button>
            <Modal.Close className='w-full rounded-3xl border border-solid border-button-secondary bg-white py-2 text-14 font-semibold text-button-secondary'>
              취소
            </Modal.Close>
          </div>
        ) : (
          <div className='mt-10 text-center'>
            <Modal.Close className='w-[150px] rounded-3xl bg-button-secondary py-2 text-14 font-semibold text-white'>
              확인
            </Modal.Close>
          </div>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default MessageModal;
