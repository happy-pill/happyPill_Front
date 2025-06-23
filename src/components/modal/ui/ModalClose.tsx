import React from 'react'
import { useModalContext } from './Modal'
import { cn } from '../../../utils/classNames'

interface ModalButtonProps {
  className?: string
  children: React.ReactNode
}

const ModalClose: React.FC<ModalButtonProps> = ({ className, children }) => {
  const { closeModal } = useModalContext()
  const modalClosecls = `px-3 py-1.5 text-sm text-gray-600 rounded`
  return (
    <button className={cn(modalClosecls, className)} onClick={closeModal}>
      {children}
    </button>
  )
}

export default ModalClose
