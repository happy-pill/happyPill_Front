import StyledButton from '@/components/button/StyledButton';

interface ActionButtonSectionProps {
  productId?: string;
}

const ActionButtonSection = ({ productId }: ActionButtonSectionProps) => {
  return (
    <div className='mt-[100px]'>
      <StyledButton variant='green' size='M' type='submit'>
        {productId ? '상품 수정하기' : '상품 등록하기'}
      </StyledButton>
    </div>
  );
};

export default ActionButtonSection;
