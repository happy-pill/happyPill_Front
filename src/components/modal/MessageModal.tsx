import React from 'react'
import Modal from './ui/Modal'
import { CgClose } from 'react-icons/cg'

interface MessageModalProps {
  type: 'confirm' | 'alert'
  title?: string
  message?: string
  onConfirm: () => void
}

const MessageModal: React.FC<MessageModalProps> = (props) => {
  const { type, title, message, onConfirm } = props
  return (
    <Modal>
      <Modal.Backdrop />
      <Modal.Content className='relative max-w-[430px] w-full'>
        <Modal.Close className='absolute right-2 top-2'>
          <CgClose color='#777777' />
        </Modal.Close>
        <div className='flex flex-col items-center mb-8'>
          <h2 className='text-22 font-semibold'>{title}</h2>
        </div>
        <div className='text-center text-[18px] py-5 break-all'>{message}</div>
        {type == 'confirm' ? (
          <div className='flex gap-x-4 items-center mt-10'>
            <button
              onClick={() => onConfirm()}
              className='py-2 w-full rounded-3xl font-semibold text-white bg-button-secondary'
            >
              확인
            </button>
            <Modal.Close className='text-14 py-2 border border-solid w-full rounded-3xl font-semibold   border-button-secondary bg-white text-button-secondary'>
              취소
            </Modal.Close>
          </div>
        ) : (
          <div className='text-center mt-10'>
            <Modal.Close className='w-[150px] text-14 py-2 rounded-3xl font-semibold  text-white bg-button-secondary'>
              확인
            </Modal.Close>
          </div>
        )}
      </Modal.Content>
    </Modal>
  )
}

export default MessageModal
