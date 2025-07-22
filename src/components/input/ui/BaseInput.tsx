import { forwardRef, type InputHTMLAttributes } from 'react';

import InputErrorMsg from './InputErrorMsg';
import InputIcon from './InputIcon';
import InputLabel from './InputLabel';

import { cn } from '@/utils/classNames';

// TODO 기능 구현 하면서 props 등 수정이 필요할 것 같습니다!
interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  isRequired?: boolean;
  errorMsg?: string;
  iconItem?: { icon: React.ReactNode; position: 'left' | 'right' };
  contentItem?: { item: React.ReactNode; position: 'left' | 'right' };
}

const Input = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, label, isRequired, errorMsg, iconItem, contentItem, ...rest }, ref) => {
    return (
      <label className='flex flex-col items-start gap-1'>
        {label && (
          <InputLabel>
            {label}
            {isRequired && <span className='text-invalid'>*</span>}
          </InputLabel>
        )}
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

          <input
            ref={ref}
            className={cn('outline-none', className)}
            required={isRequired}
            aria-invalid={!!errorMsg}
            {...rest}
          />
        </div>

        {errorMsg && <InputErrorMsg>{errorMsg}</InputErrorMsg>}
      </label>
    );
  },
);

export default Input;
