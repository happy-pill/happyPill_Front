import React from 'react'
import { useModalContext } from './Modal'
import { cn } from '../../../utils/classNames'

interface ModalBackdropProps {
  className?: string
}

const ModalBackDrop: React.FC<ModalBackdropProps> = ({ className }) => {
  const { closeModal } = useModalContext()
  const modalBackdropCls = `fixed inset-0 bg-black opacity-25`
  return (
    <div
      role='presentation'
      aria-hidden='true'
      className={cn(modalBackdropCls, className)}
      onClick={closeModal}
    />
  )
}

export default ModalBackDrop
