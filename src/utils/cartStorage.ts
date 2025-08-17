import { getCartStorageKey } from './cartKeyUtil';

interface CartItem {
  productId: string;
  productName: string;
  price: number;
  thumbnailUrl: string;
  briefDescription: string;
  period: number;
}

const getKey = () => getCartStorageKey();

// TO DO: user store가 만들어 지면 게스트와 유저의 장바구니를 병합하는 함수 필요

const saveCartItem = (item: CartItem) => {
  const items: CartItem[] = getCartItems();
  const newItem = [...items.filter((i) => i.productId !== item.productId), item];
  localStorage.setItem(getKey(), JSON.stringify(newItem));
};

// 여러 개 삭제 시
const setCartItems = (items: CartItem[]) => {
  localStorage.setItem(getKey(), JSON.stringify(items));
};

const getCartItems = (): CartItem[] => {
  const raw = localStorage.getItem(getKey());
  return raw ? JSON.parse(raw) : [];
};

// 낱개별로 삭제
const deleteCartItem = (productId: string) => {
  const items = getCartItems();
  const newItems = items.filter((item: CartItem) => item.productId !== productId);
  localStorage.setItem(getKey(), JSON.stringify(newItems));
};

const clearCartItems = () => {
  localStorage.removeItem(getKey());
};

export const cartStorage = {
  get: getCartItems,
  save: saveCartItem,
  clear: clearCartItems,
  set: setCartItems,
  delete: deleteCartItem,
};
