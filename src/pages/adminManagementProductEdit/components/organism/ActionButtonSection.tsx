import { useFormContext } from 'react-hook-form';

import type { ProductFormData } from '../..';

import StyledButton from '@/components/button/StyledButton';

interface ActionButtonSectionProps {
  productId?: string;
  onSubmit: (formData: ProductFormData) => void;
}

const ActionButtonSection = ({ productId, onSubmit }: ActionButtonSectionProps) => {
  const { handleSubmit } = useFormContext();

  return (
    <div className='mt-[100px]'>
      <StyledButton
        variant='green'
        size='M'
        onClick={handleSubmit((formData) => onSubmit(formData as ProductFormData))}
      >
        {productId ? '상품 수정하기' : '상품 등록하기'}
      </StyledButton>
    </div>
  );
};

export default ActionButtonSection;
