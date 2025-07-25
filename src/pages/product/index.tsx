import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductInfoSection from './components/molecules/ProductInfoSection';
import RelatedProductsCarousel from './components/molecules/RelatedProductsCarousel';
import useModal from '../../hooks/useModal';
import { cartStorage } from '../../utils/cartStorage';
import ProductDetailTabs from './components/organisms/ProductDetailTabs';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useGetProductDetail, useGetRelatedProducts } from '@/hooks/api/member/product';

const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const [subscriptionOption, setSubscriptionOption] = useState(1);
  console.log('script', subscriptionOption);
  /*  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]) */
  const navigate = useNavigate();
  const { openModal } = useModal();

  const { data: productData, isLoading: isLoadingProductDetail } = useGetProductDetail(
    productId ?? '',
  );
  const { data: bestProductData, isLoading: isLoadingRelatedProducts } = useGetRelatedProducts();

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  // 장바구니(스토리지)에 담는 함수
  const handleAddToCart = () => {
    if (!productData) return;

    const item = {
      productId: productData.productId,
      name: productData.name,
      price: productData.price,
      briefDescription: productData.briefDescription,
      thumbnailUrl: productData.thumbnailUrl,
      period: subscriptionOption,
    };

    cartStorage.save(item);
    openModal({ type: 'cartAddSuccess' });
  };

  const handlePurchase = (productId: string) => {
    navigate(`/purchase/${productId}`);
  };

  useEffect(() => {
    //새로고침 시 브라우저의 스크롤 유지 기능을 방지하여 맨 위로 올림
    if (!productData) return;
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0 });
    });
  }, [productData?.productId]);

  if (isLoadingProductDetail || isLoadingRelatedProducts || !productData) {
    return (
      <div className='flex h-[150vh] w-full items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className='max-width-container mx-auto w-full px-[30px] pt-[clamp(120px,15vw,200px)] pb-[40px]'>
      <ProductInfoSection
        product={productData}
        subscriptionOption={subscriptionOption}
        setSubscriptionOption={setSubscriptionOption}
        onAddToCart={handleAddToCart}
        onCheckout={handlePurchase}
      />

      <ProductDetailTabs
        product={productData}
        subscriptionOption={subscriptionOption}
        setSubscriptionOption={setSubscriptionOption}
        onAddToCart={handleAddToCart}
        onCheckout={handlePurchase}
      />
      <RelatedProductsCarousel products={bestProductData} onClickProduct={handleProductClick} />
    </div>
  );
};
export default ProductPage;
