import { CgClose } from 'react-icons/cg';
import { HiMiniCheckCircle } from 'react-icons/hi2';

import Modal from './ui/Modal';

import { CART_COMPLETE_MODAL } from '@/constants/locale';
import useModal from '@/hooks/useModal';

interface CartAddSuccessModalProps {
  locale: 'ko' | 'en';
}

const CartAddSuccessModal: React.FC<CartAddSuccessModalProps> = ({ locale }) => {
  const { closeModal } = useModal();
  return (
    <Modal>
      <Modal.Content className='relative w-fit'>
        <div className='text-xl-regular flex items-center gap-x-2'>
          <HiMiniCheckCircle size={35} className='text-primary' />
          <p className='text-primary'>{CART_COMPLETE_MODAL[locale].message}</p>
          <Modal.Close onClick={closeModal}>
            <CgClose size={20} className='text-primary' />
          </Modal.Close>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default CartAddSuccessModal;
