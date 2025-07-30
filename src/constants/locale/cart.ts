export const CART_LOCALES = {
  ko: {
    pageTitle: '장바구니',
    selectAll: (count: number) => `전체 (총 ${count}개)`,
    removeSelected: '선택 삭제',
    purchaseSummary: {
      title: '결제 내역',
      totalAmount: '총 상품금액',
      shippingFee: '배송비',
      discount: '할인 / 프로모션',
      finalTotal: '합계',
      checkoutButton: (count: number) => `총 ${count}개 결제하기`,
    },
    emptyCart: '장바구니에 담긴 상품이 없습니다.',
  },
  en: {
    pageTitle: 'Shopping Cart',
    selectAll: (count: number) => `Total ${count}items`,
    removeSelected: 'Remove Selected',
    purchaseSummary: {
      title: 'Payment Summary',
      totalAmount: 'Total Amount',
      shippingFee: 'Shipping Fee',
      discount: 'Discount / Promotion',
      finalTotal: 'Total',
      checkoutButton: (count: number) => `Checkout ${count}items`,
    },
    emptyCart: 'Your cart is empty.',
  },
};
