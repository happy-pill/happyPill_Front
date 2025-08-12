import { useFormContext } from 'react-hook-form';
import { IoIosArrowForward } from 'react-icons/io';

import CategorySelectBox from '../molecule/CategorySelectBox';

import StyledButton from '@/components/button/StyledButton';
import FiledInput from '@/components/input/FiledInput';
import FileSingleUploadInput from '@/components/input/FileSingleUploadInput';
import ToggleInput from '@/components/input/ToggleInput';
import FiledTextArea from '@/components/textArea/FiledTextArea';
import useModal from '@/hooks/useModal';
import { formatValueToComma } from '@/utils/format';

const ProductContentFieldFormSection = () => {
  const { register, watch, setValue, getValues } = useFormContext();
  const { openModal } = useModal();

  return (
    <div className='flex w-full gap-5'>
      <div className='flex w-full flex-col gap-2'>
        <FileSingleUploadInput
          label='썸네일'
          register={register('thumbnailUrl', { required: !getValues('thumbnailUrl') })}
          thumbnailUrl={getValues('thumbnailUrl')}
        />

        <FiledTextArea
          label='상세설명'
          {...register('description', { required: true })}
          maxLength={200}
          textState={(watch('description') || '').length || '0'}
          className='h-[200px]'
          placeholder='상세 설명을 입력해 주세요.'
        />

        <div className='flex gap-2'>
          <ToggleInput
            label={{ text: '이용 가능 여부', position: 'left' }}
            register={register('isAvailable', { required: true })}
          />
          <ToggleInput
            label={{ text: 'Best 상품', position: 'left' }}
            register={register('isBest')}
          />
        </div>
      </div>
      <div className='flex w-full flex-col gap-2'>
        <FileSingleUploadInput
          label='상세정보 이미지'
          register={register('contentImageUrl', { required: !getValues('contentImageUrl') })}
          thumbnailUrl={getValues('contentImageUrl')}
        />

        <div className='flex flex-col items-end gap-1'>
          <FiledInput
            label='제품가격'
            inputMode='numeric'
            {...register('price', {
              required: true,
              pattern: {
                value: /^[0-9,]+$/,
                message: '숫자만 입력해 주세요.',
              },
            })}
            onBlur={(e) => setValue('price', formatValueToComma(e.currentTarget.value))}
            placeholder='가격을 숫자로 입력해 주세요.'
          />
          <StyledButton
            variant='ghost'
            size='S'
            className='text-primary p-0'
            onClick={() => openModal({ type: 'adminProductStock' })}
          >
            금액변경 기록 보기
            <IoIosArrowForward />
          </StyledButton>
        </div>

        <FiledInput
          label='제조사'
          {...register('company', { required: true })}
          placeholder='제조사를 입력해 주세요.'
        />

        <CategorySelectBox register={register('categoryId', { required: true })} />

        <FiledInput
          label='재고현황'
          inputMode='numeric'
          {...register('stock', {
            required: true,
            pattern: {
              value: /^[0-9,]+$/,
              message: '숫자만 입력해 주세요.',
            },
          })}
          onBlur={(e) => setValue('stock', formatValueToComma(e.currentTarget.value))}
          placeholder='재고현황을 숫자로 입력해 주세요.'
        />
      </div>
    </div>
  );
};

export default ProductContentFieldFormSection;
