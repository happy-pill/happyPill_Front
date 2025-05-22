import { useEffect } from 'react'
import useModalStore, { ModalConfig } from '../store/modal'

const useModal = () => {
  const { modals, openModal, closeModal } = useModalStore()

  useEffect(() => {
    if (modals.length === 0) {
      document.body.style.removeProperty('overflow')
    } else {
      document.body.style.overflowY = 'hidden'
    }

    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [modals.length])

  const handleOpenModal = (modal: ModalConfig) => {
    openModal(modal)
  }

  const handleCloseModal = () => {
    closeModal()
  }
  return { modals, openModal: handleOpenModal, closeModal: handleCloseModal }
}

export default useModal
