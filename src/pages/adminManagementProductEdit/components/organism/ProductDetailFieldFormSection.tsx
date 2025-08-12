import { useFormContext } from 'react-hook-form';

import FiledInput from '@/components/input/FiledInput';
import FiledTextArea from '@/components/textArea/FiledTextArea';

const ProductDetailFieldFormSection = () => {
  const { register, watch } = useFormContext();

  return (
    <div className='w-full'>
      <span className='text-md mb-5 font-semibold'>제품 상세</span>
      <div className='flex flex-col gap-2'>
        <FiledInput
          label='용량/수량'
          {...register('quantityDetails', { required: true })}
          maxLength={200}
          textState={(watch('quantityDetails') || '').length || '0'}
          placeholder='용량/수량을 입력해 주세요.'
        />
        <FiledInput
          label='섭취방법'
          {...register('usage', { required: true })}
          maxLength={400}
          textState={(watch('usage') || '').length || '0'}
          placeholder='섭취방법을 입력해 주세요.'
        />
        <FiledTextArea
          label='주의사항'
          {...register('warningMessage', { required: true })}
          maxLength={400}
          textState={(watch('warningMessage') || '').length || '0'}
          className='h-[200px]'
          placeholder='주의사항을 입력해 주세요.'
        />
      </div>
    </div>
  );
};

export default ProductDetailFieldFormSection;
