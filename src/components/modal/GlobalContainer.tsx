import CartAddSuccessModal from './CartAddSuccessModal'
import useModalStore from '../../store/modal'
import ReactDOM from 'react-dom'
import { ModalItem, ModalPropsMap, ModalType } from '../../types/modal'
import AddToCartModal from './AddToCartModal'

const MODAL_COMPONENTS: { [K in ModalType]: React.FC<ModalPropsMap[K]> } = {
  addToCart: AddToCartModal,
  cartAddSuccess: CartAddSuccessModal,
}

const renderModal = <T extends ModalType>(modal: ModalItem<T>, index: number) => {
  const Component = MODAL_COMPONENTS[modal.type] as React.FC<ModalPropsMap[T]>

  return ReactDOM.createPortal(<Component key={index} {...modal.props} />, document.body)
}

const GlobalContainer = () => {
  const modals = useModalStore((state) => state.modals)

  return (
    <>
      {modals.map((modal: ModalItem, index) => {
        return renderModal(modal, index)
      })}
    </>
  )
}

export default GlobalContainer
