import ReactDOM from 'react-dom';

import AddToCartModal from './AddToCartModal';
import CartAddSuccessModal from './CartAddSuccessModal';
import MessageModal from './MessageModal';
import WelcomeStepModal from './WelcomeStepModal';

import type { ModalItem, ModalPropsMap, ModalType } from '@/types/modal';

import useModalStore from '@/stores/modal';

const MODAL_COMPONENTS = {
  addToCart: AddToCartModal,
  cartAddSuccess: CartAddSuccessModal,
  message: MessageModal,
  welcomeStep: WelcomeStepModal,
} as const;

const renderModal = <T extends ModalType>(modal: ModalItem<T>, index: number) => {
  const Component = MODAL_COMPONENTS[modal.type] as React.FC<ModalPropsMap[T]>;
  return ReactDOM.createPortal(
    <Component key={index} {...(modal.props as ModalPropsMap[T])} />,
    document.body,
  );
};

const GlobalContainer = () => {
  const modals = useModalStore((state) => state.modals);

  return (
    <>
      {modals.map((modal: ModalItem, index) => {
        return renderModal(modal, index);
      })}
    </>
  );
};

export default GlobalContainer;
