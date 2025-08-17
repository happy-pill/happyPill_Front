import { useFormContext } from 'react-hook-form';

import FiledInput from '@/components/input/FiledInput';

const ProductInfoFieldFormSection = () => {
  const { register, watch } = useFormContext();

  return (
    <>
      <FiledInput
        label='상품이름'
        {...register('name', { required: true })}
        maxLength={50}
        textState={(watch('name') || '').length || '0'}
        placeholder='상품이름을 입력해 주세요.'
      />
      <FiledInput
        label='간단설명'
        {...register('briefDescription', { required: true })}
        maxLength={255}
        textState={(watch('briefDescription') || '').length || '0'}
        placeholder='상품에 대해 간단한 설명을 입력해 주세요.'
      />
    </>
  );
};

export default ProductInfoFieldFormSection;
