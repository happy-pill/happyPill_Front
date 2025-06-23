import type { Product } from './products'

// 모달별 props 타입 정의
export type ModalPropsMap = {
  addToCart: Omit<Product, 'company' | 'categoryId'>
  cartAddSuccess: { name: string }
  message: { type: 'alert' | 'confirm'; title?: string; message?: string; onConfirm: () => void }
}

// 모달 타입을 자동 추론 하게 설정
export type ModalType = keyof ModalPropsMap

export type ModalItem<T extends ModalType = ModalType> = {
  [K in T]: {
    type: K
    props?: ModalPropsMap[K]
  }
}[T]
