import React from 'react'
import { cn } from '../../../utils/classNames'

interface ModalContentProps {
  className?: string
  children: React.ReactNode
}

const ModalContent: React.FC<ModalContentProps> = ({ className, children }) => {
  const modalContentCls = `absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white rounded-md py-[26px] px-[32px] rounded-md shadow-md`
  return <div className={cn(modalContentCls, className)}>{children}</div>
}

export default ModalContent
