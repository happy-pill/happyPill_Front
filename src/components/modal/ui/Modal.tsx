import { createContext, useContext } from 'react'
import { cn } from '../../../utils/classNames'
import useModal from '../../../hooks/useModal'
import ModalBackDrop from './ModalBackDrop'
import ModalContent from './ModalContent'
import ModalClose from './ModalClose'
import { ModalConfig } from '../../../store/modal'

interface ModalContextProps {
  openModal: (modaL: ModalConfig) => void
  closeModal: () => void
}

interface ModalProps {
  className?: string
  children: React.ReactNode
}

interface ModalCompoundProps {
  Backdrop: typeof ModalBackDrop
  Content: typeof ModalContent
  Close: typeof ModalClose
}

export const ModalContext = createContext<ModalContextProps | null>(null)

// useContext함수를 Provider 범위 밖에서 사용하는 상황에서 에러 발생 용도
export const useModalContext = () => {
  const ctx = useContext(ModalContext)
  if (!ctx) {
    throw new Error('모달 컴포넌트는 모달 내부에서 사용해야 합니다.')
  }
  return ctx
}

const Modal: React.FC<ModalProps> & ModalCompoundProps = ({ className, children }) => {
  const { openModal, closeModal } = useModal()

  const modalBaseCls = `fixed inset-0 z-50 pointer-events-auto`
  const contextValue = {
    openModal,
    closeModal,
  }

  return (
    <ModalContext.Provider value={contextValue}>
      <div className={cn(modalBaseCls, className)} role='dialog' aria-modal='true'>
        {children}
      </div>
    </ModalContext.Provider>
  )
}
Modal.Backdrop = ModalBackDrop
Modal.Content = ModalContent
Modal.Close = ModalClose

export default Modal
