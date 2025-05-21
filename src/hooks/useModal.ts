import useModalStore, { ModalConfig } from '../store/modal'

const useModal = () => {
  const { modals, openModal, closeModal } = useModalStore()

  const handleOpenModal = (modal: ModalConfig) => {
    openModal(modal)
  }

  const handleCloseModal = () => {
    closeModal()
  }
  return { modals, openModal: handleOpenModal, closeModal: handleCloseModal }
}

export default useModal
