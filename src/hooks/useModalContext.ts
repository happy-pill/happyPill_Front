import { useContext } from 'react'
import { ModalContext } from '../components/modal/ui/Modal'

/**
 * useContext함수를 Provider 범위 밖에서 사용하는 상황에서 에러 발생 용도
 */
export const useModalContext = () => {
  const ctx = useContext(ModalContext)
  if (!ctx) {
    throw new Error('모달 컴포넌트는 모달 내부에서 사용해야 합니다.')
  }
  return ctx
}
