import { CgClose } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

import Modal from './ui/Modal';

import useModal from '@/hooks/useModal';

interface CartAddSuccessModalProps {
  name: string;
}

const CartAddSuccessModal: React.FC<CartAddSuccessModalProps> = ({ name }) => {
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const handleMoveToCart = () => {
    closeModal();
    navigate('/cart');
  };
  return (
    <Modal>
      <Modal.Content className='relative w-full max-w-[430px]'>
        <Modal.Close className='absolute right-2 top-2'>
          <CgClose color='#777777' />
        </Modal.Close>
        <div className='mb-8 flex flex-col items-center'>
          <p className='tablet:text-18 text-14 font-semibold'>{name}</p>
          <h2 className='text-20 font-bold text-[#026242] tablet:text-24'>장바구니 담기</h2>
        </div>
        <div className='tablet:text-20 text-center text-16'>장바구니에 담았습니다.</div>
        <div className='mt-8 grid grid-cols-2 items-center gap-x-2'>
          <Modal.Close className='w-full rounded-3xl border border-solid border-button-secondary bg-white py-2 text-14 font-semibold text-button-secondary tablet:py-3'>
            쇼핑 계속하기
          </Modal.Close>
          <button
            className='w-full rounded-3xl bg-button-secondary py-2 text-14 font-semibold text-white tablet:py-3'
            onClick={handleMoveToCart}
          >
            장바구니 가기
          </button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default CartAddSuccessModal;
