export const LOCALE_LABELS = {
  ko: {
    pageTitle: '주문/결제',
    recipientForm: {
      title: '받는 사람',
      name: '이름',
      contact: '연락처',
      email: '이메일',
    },
    paymentMethod: {
      title: '결제수단',
      CARD: '카드 결제',
      VIRTUAL_ACCOUNT: '가상 계좌',
    },
    paymentSummary: {
      title: '결제금액',
      productAmount: '상품금액',
      deliveryFee: '배송비',
      discount: '할인 / 프로모션',
      totalAmount: '최종 결제 금액',
      submitButton: '결제하기',
    },
  },
  en: {
    pageTitle: 'Order / Payment',
    recipientForm: {
      title: 'Recipient',
      name: 'Name',
      contact: 'Contact',
      email: 'Email',
    },
    paymentMethod: {
      title: 'Payment Method',
      CARD: 'Card payment',
      VIRTUAL_ACCOUNT: 'Virtual Account',
    },
    paymentSummary: {
      title: 'Payment Summary',
      productAmount: 'Product Amount',
      deliveryFee: 'Shipping Fee',
      discount: 'Discount / Promotion',
      totalAmount: 'Total Payment',
      submitButton: 'Proceed to Pay',
    },
  },
} as const;
