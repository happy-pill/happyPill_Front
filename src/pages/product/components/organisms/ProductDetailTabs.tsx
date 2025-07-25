import { type Dispatch, type SetStateAction } from 'react';

import MobilePurchasePanel from './MobilePurchasePanel';
import StickySummary from '../molecules/StickySummary';

import type { ProductDetail } from '@/types/products';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import Tabs from '@/components/tabs/Tabs';
import { PRODUCT_DETAIL, PRODUCT_TABS } from '@/constants/locale';
import useLocale from '@/hooks/useLocale';
import useScrollTrigger from '@/hooks/useScrollTrigger';
import cn from '@/utils/classNames';

interface ProductDetailTabsProps {
  product: ProductDetail;
  subscriptionOption: number;
  setSubscriptionOption: Dispatch<SetStateAction<number>>;
  onAddToCart: () => void;
  onCheckout: (productId: string) => void;
}

const ProductDetailTabs = ({
  product,
  subscriptionOption,
  setSubscriptionOption,
  onAddToCart,
  onCheckout,
}: ProductDetailTabsProps) => {
  const { locale: currentLocale } = useLocale();

  const PRODUCT_DETAIL_FIELDS = [
    { label: PRODUCT_DETAIL[currentLocale].name, value: product.name },
    { label: PRODUCT_DETAIL[currentLocale].quantityDetails, value: product.quantityDetails },
    { label: PRODUCT_DETAIL[currentLocale].company, value: product.company },
    { label: PRODUCT_DETAIL[currentLocale].usage, value: product.usage },
    { label: PRODUCT_DETAIL[currentLocale].warningMessage, value: product.warningMessage },
    { label: PRODUCT_DETAIL[currentLocale].description, value: product.description },
  ] as const;

  console.log('product', product);
  const { locale } = useLocale();
  const { isFixed, triggerRef } = useScrollTrigger();
  const TAB_KEYS = ['product-info', 'product-detail'] as const;
  return (
    <div className='mt-[clamp(60px,10vw,80px)]'>
      <div ref={triggerRef} className='top-[100px]' />
      <Tabs defaultValue='product-info'>
        <Tabs.List
          className={cn(
            'border-primary-text bg-baseBg relative gap-x-0 rounded-none border-b',
            isFixed && 'top-[100px] z-10 w-full md:fixed',
          )}
        >
          {TAB_KEYS.map((value) => (
            <Tabs.Item
              key={value}
              value={value}
              className={cn(
                'flex h-[clamp(40px,5vw,60px)] w-[clamp(150px,20vw,250px)] items-center justify-center rounded-xl rounded-b-none py-2 text-[clamp(13px,2vw,18px)] font-bold',
                isFixed && 'rounded-none',
              )}
              activeClassName='bg-primary-text text-white'
            >
              {PRODUCT_TABS[locale][value]}
            </Tabs.Item>
          ))}
        </Tabs.List>

        <div className='relative grid grid-cols-1 gap-x-[clamp(20px,5vw,150px)] lg:grid-cols-[1.5fr_1fr]'>
          <Tabs.Panel value='product-info'>
            <div className='mt-[clamp(5px,5vw,60px)]'>
              <img
                className='mx-auto w-full'
                src='https://esther2023.cdn-nhncommerce.com/data/editor/goods/250527/d1d0de88c6d771ab23f5282c31c64759_161951.jpg'
                alt='이미지 설명'
              />
            </div>
          </Tabs.Panel>
          <Tabs.Panel value='product-detail'>
            <div className='mt-[clamp(14px,20vw,60px)]'>
              {product ? (
                <table className='w-full'>
                  <colgroup>
                    <col width={'20%'} />
                    <col width={'80%'} />
                  </colgroup>
                  <tbody>
                    {PRODUCT_DETAIL_FIELDS.map(({ label, value }) => {
                      return (
                        <tr key={value} className='border-b-[1px] border-[#DCDCDC]'>
                          <th className='bg-[#f1efef] px-5 py-3 text-left text-[clamp(10px,1vw,12px)] text-[#7C7C7C]'>
                            {label}
                          </th>
                          <td className='bg-white px-5 py-3 text-left text-[clamp(10px,1vw,12px)]'>
                            {value}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <LoadingSpinner className='h-[200px] w-full' />
              )}
            </div>
          </Tabs.Panel>
          <StickySummary
            price={product.price}
            subscriptionOption={subscriptionOption}
            setSubscriptionOption={setSubscriptionOption}
            onAddToCart={onAddToCart}
            onCheckout={() => onCheckout(product?.productId)}
          />
          <MobilePurchasePanel
            price={product.price}
            subscriptionOption={subscriptionOption}
            setSubscriptionOption={setSubscriptionOption}
            onAddToCart={onAddToCart}
            onCheckout={() => onCheckout(product?.productId)}
          />
        </div>
      </Tabs>
    </div>
  );
};

export default ProductDetailTabs;
