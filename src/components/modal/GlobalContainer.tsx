import AddToCartModal from './AddToCartModal'
import useModalStore from '../../store/modal'
import ReactDOM from 'react-dom'

const MODAL_COMPONENTS = {
  addToCart: AddToCartModal,
} as const

type ModalType = keyof typeof MODAL_COMPONENTS

const GlobalContainer = () => {
  const modals = useModalStore((state) => state.modals)

  return (
    <>
      {modals.map(({ type, props }, index) => {
        const ModalComponent = MODAL_COMPONENTS[type as ModalType]
        if (!ModalComponent) return null
        return ReactDOM.createPortal(<ModalComponent key={index} {...props} />, document.body)
      })}
    </>
  )
}

export default GlobalContainer
