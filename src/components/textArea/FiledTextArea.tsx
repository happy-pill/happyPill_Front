import { forwardRef, type TextareaHTMLAttributes } from 'react';

import StyledTextArea from './StyledTextArea';
import ErrorMsg from './ui/ErrorMsg';
import Icon from './ui/Icon';
import Label from './ui/Label';
import TextState from './ui/TextState';

import type { UseFormRegister, FieldValues } from 'react-hook-form';

import cn from '@/utils/classNames';

interface FiledTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label?: string;
  isRequired?: boolean;
  errorMsg?: string;
  iconItem?: { icon: React.ReactNode; position: 'left' | 'right' };
  contentItem?: { item: React.ReactNode; position: 'left' | 'right' };
  textState?: string | number;
  register?: UseFormRegister<FieldValues>;
}

const FiledTextArea = forwardRef<HTMLTextAreaElement, FiledTextAreaProps>(
  (
    { className, label, isRequired, errorMsg, iconItem, contentItem, textState, register, ...rest },
    ref,
  ) => {
    return (
      <div className='flex w-full flex-col items-start gap-1'>
        <div className='flex w-full items-center justify-between'>
          {label && (
            <Label>
              {label}
              {isRequired && <span className='text-invalid'>*</span>}
            </Label>
          )}

          {textState && rest.maxLength && (
            <TextState>{`${textState} / ${rest.maxLength}`}</TextState>
          )}
        </div>

        <div className='relative w-full'>
          {iconItem && (
            <Icon className={iconItem.position === 'left' ? 'left-2' : 'right-2'}>
              {iconItem.icon}
            </Icon>
          )}

          {contentItem && (
            <div
              className={`absolute top-1/2 flex -translate-y-1/2 items-center gap-1 ${contentItem.position === 'left' ? 'left-2' : 'right-2'}`}
            >
              {contentItem.item}
            </div>
          )}

          <StyledTextArea
            ref={ref}
            className={cn('outline-none', className)}
            required={isRequired}
            aria-invalid={!!errorMsg}
            register={register}
            {...rest}
          />
        </div>

        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </div>
    );
  },
);

export default FiledTextArea;
