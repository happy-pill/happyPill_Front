import { getCartStorageKey } from './key'

interface CartItem {
  productId: number
  name: string
  price: number
  thumbnailUrl: string
  briefDescription: string
  period: number
}

const getKey = () => getCartStorageKey()

// TO DO: user store가 만들어 지면 게스트와 유저의 장바구니를 병합하는 함수 필요

export const saveCartItem = (item: CartItem) => {
  const items: CartItem[] = getCartItems()
  const newItem = [...items.filter((i) => i.productId !== item.productId), item]
  localStorage.setItem(getKey(), JSON.stringify(newItem))
}

export const getCartItems = () => {
  const raw = localStorage.getItem(getKey())
  return raw ? JSON.parse(raw) : []
}

export const clearCartItems = () => {
  localStorage.removeItem(getKey())
}

export const cartStorage = {
  get: getCartItems,
  save: saveCartItem,
  clear: clearCartItems,
}
