// common

export const CURRENCY_UNIT = {
  ko: '원',
  en: 'KRW',
};

// main page

export const MAIN_BANNER_DATA = [
  {
    ko: {
      title: '당신의건강,\n 해피필이 매일 책임질게요',
      description: '복잡하게 고민할 필요 없이, 필요한 영양을 간편하게',
      badge: ['정기배송', '구독서비스', '건강관리'],
    },
    en: {
      title: 'Your health. Our promise.\nEvery day with Happypill',
      description: 'Your daily nutrients. Smarter living',
      badge: ['Delivery', 'Subscription', 'Health'],
    },
    imageUrl: '/images/main-banner-01.webp',
  },
  {
    ko: {
      title: '바쁘고 복잡한 하루에도,\n당신의 영양은 잊지 않도록',
      description: '해피필이 필요한 것만 담아, 간편하게 전해드릴게요',
      badge: ['정기배송', '구독서비스', '건강관리'],
    },
    en: {
      title: 'Never miss a day.\nNever miss your health',
      description: 'Simplified. Essential. Delivered by Happypill',
      badge: ['Delivery', 'Subscription', 'Health'],
    },
    imageUrl: '/images/main-banner-02.webp',
  },
  {
    ko: {
      title: '오늘도 당신의 루틴에\n해피필 한 알',
      description: '매일 챙기기 어려운 영양, 더 쉽고 가볍게 도와줄게요',
      badge: ['정기배송', '구독서비스', '건강관리'],
    },
    en: {
      title: 'Start your day with Happypill.\nEnd it feeling better.',
      description: 'We make nutrition simple, so care feels lighter.',
      badge: ['Delivery', 'Subscription', 'Health'],
    },
    imageUrl: '/images/main-banner-03.webp',
  },
];

export const PROMOTION_BANNER_DATA = [
  {
    ko: {
      badge: 'New Awards',
      title: {
        normal: '언제나 여러분의 자부심이 되겠습니다',
        highlight: '브랜드 대상 3관왕 달성',
      },
    },
    en: {
      badge: 'New Awards',
      title: {
        normal: 'Proud to be your choice.',
        highlight: '3-time Brand Award winner.',
      },
    },
    imageUrl: '/images/trophy.webp',
  },
  {
    ko: {
      badge: 'Free Returns',
      title: {
        normal: '고민은 NO! 영양제, 섭취 후 결정하세요',
        highlight: '개봉해도 무료반품',
      },
    },
    en: {
      badge: 'Free Returns',
      title: {
        normal: 'Opened it? No problem.',
        highlight: 'Free returns guaranteed',
      },
    },
    imageUrl: '/images/box.webp',
  },
  {
    ko: {
      badge: 'Free Delivery',
      title: {
        normal: '하루 한 알, 간편하게 채우는 영양제',
        highlight: '전제품 무료배송',
      },
    },
    en: {
      badge: 'Free Delivery',
      title: {
        normal: 'One capsule a day.',
        highlight: 'Free delivery on all products',
      },
    },
    imageUrl: '/images/vitamins.webp',
  },
];

// modal

export const CREATE_WELCOME_STEPS = [
  {
    ko: {
      title: 'HappyPill에 오신 걸 환영해요 🎉',
      description: '여기서 당신만의 건강 루틴을 만들어볼 수 있어요',
      btnText: '다음으로',
    },
    en: {
      title: 'Welcome to HappyPill 🎉',
      description: 'You can start building your own daily health routine here.',
      btnText: 'Next',
    },
  },
  {
    ko: {
      title: '당신을 무엇으로 부르면 좋을까요?',
      description: '닉네임은 해피필에서 당신을 나타내요',
      placeholderText: '닉네임을 입력해주세요',
      errorMessage: '닉네임을 입력해주세요',
      btnText: '다음으로',
    },
    en: {
      title: 'What should we call you?',
      description: 'Your nickname will represent you on HappyPill.',
      placeholderText: 'Please enter your nickname',
      errorMessage: 'Please enter your nickname',
      btnText: 'Next',
    },
  },
  {
    ko: {
      title: '닉네임이 설정되었습니다.',
      description: '지금부터 해피필과 건강한 루틴, 시작해볼까요?',
      btnText: '해피필 시작하기',
    },
    en: {
      title: 'Your nickname has been set!',
      description: 'Shall we start your healthy routine with HappyPill?',
      btnText: 'Start Happypill',
    },
  },
];

export const CART_MODAL = {
  ko: {
    title: '개월 옵션',
    subscriptionLabel: '개월 구독',
    totalPriceLabel: '총 상품금액',
    monthlyPriceLabelPrefix: '개월당 ',
    monthlyPriceLabelSuffix: '원',
    addToCart: '장바구니',
    buyNow: '구매하기',
  },
  en: {
    title: 'Subscription Duration',
    subscriptionLabel: '1-Month',
    totalPriceLabel: 'Total Price',
    monthlyPriceLabelPrefix: 'Per month ',
    monthlyPriceLabelSuffix: 'KRW',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
  },
};

export const CART_COMPLETE_MODAL = {
  ko: {
    message: '선택하신 제품이 장바구니에 담겼습니다.',
  },
  en: {
    message: 'Your item has been added to the cart.',
  },
};

// product page

export const PRODUCT_DELIVERY_BADGE = {
  ko: {
    prefix: '이 상품은',
    highlight: '내일도착, 무료배송',
  },
  en: {
    prefix: 'This product qualifies for',
    highlight: 'Next-day Delivery & Free Shipping',
  },
};

export const RELATED_PRODUCTS_SECTION = {
  ko: {
    title: '다른 고객이 함께 본 상품',
    currencyUnit: '원',
  },
  en: {
    title: 'Customers Also Viewed',
    currencyUnit: 'KRW',
  },
};

export const PRODUCT_TABS = {
  ko: {
    'product-info': '상세정보',
    'product-detail': '제품상세',
  },
  en: {
    'product-info': 'Product Info',
    'product-detail': 'Details',
  },
};

export const PRODUCT_DETAIL = {
  ko: {
    name: '제품명',
    quantityDetails: '용량/수량',
    company: '제조사',
    usage: '섭취방법',
    warningMessage: '주의사항',
    description: '제품설명',
  },
  en: {
    name: 'Product Name',
    quantityDetails: 'Capacity/Quantity',
    company: 'Manufacturer',
    usage: 'How to Use',
    warningMessage: 'Precautions',
    description: 'Product Description',
  },
};
