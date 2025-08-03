import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CartHeader from './components/molecules/CartHeader';
import CartItemList from './components/organisms/CartItemList';
import PurchaseSummary from './components/organisms/PurchaseSummary';

import PageTitle from '@/components/common/PageTitle';
import LayoutContainer from '@/components/container/LayoutContainer';
import { CART_LOCALES } from '@/constants/locale/cart';
import { PURCHASE_ALERT_MODAL } from '@/constants/locale/modal';
import { routePath } from '@/constants/path';
import useLocale from '@/hooks/useLocale';
import useModal from '@/hooks/useModal';
import useCheckoutStore from '@/stores/checkoutStore';
import { cartStorage } from '@/utils/cartStorage';

export interface CartItemProps {
  productId: string;
  productName: string;
  price: number;
  briefDescription: string;
  thumbnailUrl: string;
  period: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [selectedItemsId, setSelectedItemsId] = useState<string[]>([]);
  const isAllSelected = cartItems.length > 0 && selectedItemsId.length === cartItems.length;
  const { locale } = useLocale();
  const { openModal } = useModal();
  const { setItems } = useCheckoutStore();
  const navigate = useNavigate();

  // 체크박스 클릭 이벤트
  const handleSelectionChange = (productId: string) => {
    setSelectedItemsId((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  };
  const handleSelectAll = () => {
    if (selectedItemsId.length === cartItems.length) {
      // 전체 해제
      setSelectedItemsId([]);
    } else {
      // 전체 선택
      setSelectedItemsId(cartItems.map((item) => item.productId));
    }
  };

  // 상품 구독 개월 수 select 클릭 이벤트
  const handlePeriodChange = (productId: string, period: string | number) => {
    setCartItems((prev) => {
      const updatedItems = prev.map((item) =>
        item.productId === productId ? { ...item, period: Number(period) } : item,
      );
      cartStorage.set(updatedItems);
      return updatedItems;
    });
  };

  // 선택된 상품들 삭제
  const handleRemoveSelectedItem = () => {
    setCartItems((prev) => {
      const updatedItems = prev.filter((item) => !selectedItemsId.includes(item.productId));
      cartStorage.set(updatedItems);
      return updatedItems;
    });
    setSelectedItemsId([]);
  };
  // 개별 상품 삭제
  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => {
      const updatedItems = prev.filter((prevItem) => prevItem.productId !== productId);
      cartStorage.set(updatedItems);
      return updatedItems;
    });
    setSelectedItemsId((prev) => prev.filter((id) => id !== productId));
  };

  //결제 버튼 클릭 이벤트
  const handlePurchaseItems = () => {
    if (selectedItemsId.length === 0) {
      return openModal({
        type: 'message',
        props: {
          type: 'alert',
          title: PURCHASE_ALERT_MODAL[locale].title,
          message: PURCHASE_ALERT_MODAL[locale].message,
        },
      });
    }

    setItems(cartItems);
    navigate(routePath.common.purchase);
  };

  useEffect(() => {
    const cartItems = cartStorage.get();
    setCartItems(cartItems);
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => {
    if (selectedItemsId.includes(item.productId)) {
      return acc + item.price * item.period;
    }
    return acc;
  }, 0);

  return (
    <LayoutContainer>
      <div className='relative my-[clamp(40px,6vw,100px)]'>
        <PageTitle>{CART_LOCALES[locale].pageTitle}</PageTitle>
        <div className='mb-24 grid grid-cols-1 gap-x-6 lg:mb-0 lg:grid-cols-[2.5fr_1fr]'>
          <div>
            <CartHeader
              itemCount={cartItems.length}
              isAllSelected={isAllSelected}
              onSelectAll={handleSelectAll}
              onRemoveSelectedItem={handleRemoveSelectedItem}
            />

            <CartItemList
              items={cartItems}
              selectedIds={selectedItemsId}
              onSelectionChange={handleSelectionChange}
              onPeriodChange={handlePeriodChange}
              onRemoveItem={handleRemoveItem}
            />
          </div>
          <PurchaseSummary
            onPurchaseItems={handlePurchaseItems}
            totalPrice={totalPrice}
            selectedItemsCount={selectedItemsId.length}
          />
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Index;
