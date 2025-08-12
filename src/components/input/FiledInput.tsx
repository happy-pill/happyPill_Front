import { forwardRef, type InputHTMLAttributes } from 'react';

import StyledInput from './StyledInput';
import InputErrorMsg from './ui/InputErrorMsg';
import InputIcon from './ui/InputIcon';
import InputLabel from './ui/InputLabel';
import InputTextState from './ui/InputTextState';

import type { UseFormRegister, FieldValues } from 'react-hook-form';

import cn from '@/utils/classNames';

interface FiledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  isRequired?: boolean;
  errorMsg?: string;
  iconItem?: { icon: React.ReactNode; position: 'left' | 'right' };
  contentItem?: { item: React.ReactNode; position: 'left' | 'right' };
  textState?: string | number;
  register?: UseFormRegister<FieldValues>;
}

const FiledInput = forwardRef<HTMLInputElement, FiledInputProps>(
  (
    { className, label, isRequired, errorMsg, iconItem, contentItem, textState, register, ...rest },
    ref,
  ) => {
    return (
      <label className='flex w-full flex-col items-start gap-1'>
        <div className='flex w-full items-center justify-between'>
          {label && (
            <InputLabel>
              {label}
              {isRequired && <span className='text-invalid'>*</span>}
            </InputLabel>
          )}

          {textState && rest.maxLength && (
            <InputTextState>{`${textState} / ${rest.maxLength}`}</InputTextState>
          )}
        </div>

        <div className='relative w-full'>
          {iconItem && (
            <InputIcon className={iconItem.position === 'left' ? 'left-2' : 'right-2'}>
              {iconItem.icon}
            </InputIcon>
          )}

          {contentItem && (
            <div
              className={`absolute top-1/2 flex -translate-y-1/2 items-center gap-1 ${contentItem.position === 'left' ? 'left-2' : 'right-2'}`}
            >
              {contentItem.item}
            </div>
          )}

          <StyledInput
            ref={ref}
            className={cn('outline-none', className)}
            required={isRequired}
            aria-invalid={!!errorMsg}
            register={register}
            {...rest}
          />
        </div>

        {errorMsg && <InputErrorMsg>{errorMsg}</InputErrorMsg>}
      </label>
    );
  },
);

export default FiledInput;
