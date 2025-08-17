import { useParams } from 'react-router-dom';

import ContentModal from '@/components/modal/ContentModal';
import { useGetProductPriceHistory } from '@/hooks/api/admin/management';
import useModal from '@/hooks/useModal';
import { formatDateToFullDateSlide, formatValueToComma } from '@/utils/format';

const ProductStockModal = () => {
  const { productId = '' } = useParams<{ productId?: string }>();
  const { closeModal } = useModal();
  const { data: productHistory } = useGetProductPriceHistory(productId);

  return (
    <ContentModal type='alert' title='금액 변경 기록' onConfirm={closeModal}>
      {productId ? (
        <>
          {productHistory?.contents.map((item, idx) => (
            <div
              key={idx}
              className='flex w-full justify-between border-b border-gray-200 p-2 *:text-sm'
            >
              <span>{formatDateToFullDateSlide(item.date)}</span>
              <span>{formatValueToComma(item.price)}원</span>
            </div>
          ))}
        </>
      ) : (
        <div className='text-primary text-sm'>변경 된 기록이 없습니다.</div>
      )}
    </ContentModal>
  );
};

export default ProductStockModal;
