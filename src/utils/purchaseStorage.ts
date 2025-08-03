import { PURCHASE_STORAGE_KEY } from '@/constants/common';

// 결제할 상품들 저장
const setPurchaseItems = (itemIds: string[]) => {
  localStorage.setItem(PURCHASE_STORAGE_KEY, JSON.stringify(itemIds));
};

// 결제할 상품들 가져오기
const getPurchaseItems = () => {
  const items = localStorage.getItem(PURCHASE_STORAGE_KEY);
  return items ? JSON.parse(items) : [];
};

// 결제할 데이터 초기화
const clearPurchaseItems = () => {
  localStorage.removeItem(PURCHASE_STORAGE_KEY);
};

/**
 *
 * 상품 결제와 관련해서 로컬 스토리지에 데이터를 가져오고 저장하고 초기화하는 기능이 들어있는 함수입니다.
 *
 * @methods
 * - set: 결제할 상품 ID 배열을 저장합니다 (덮어쓰기)
 * - get: 저장된 결제할 상품 ID 배열들을 가져옵니다 (없으면 빈배열)
 * - clear: 결제완료 후에 데이터를 삭제합니다
 */
export const purchaseStorage = {
  set: setPurchaseItems,
  get: getPurchaseItems,
  clear: clearPurchaseItems,
};
