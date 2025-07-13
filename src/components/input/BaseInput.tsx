import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/utils/classNames';

// TODO 기능 구현 하면서 props 등 수정이 필요할 것 같습니다!
interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  isRequired?: boolean;
  errorMsg?: string;
  iconItem?: { icon: React.ReactNode; position: 'left' | 'right' };
}

const Input = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, label, isRequired, errorMsg, iconItem, ...rest }, ref) => {
    return (
      <label>
        {label && (
          <span className='text-md flex items-center gap-1 font-semibold'>
            {label}
            {isRequired && <span className='text-[#F93737]'>*</span>}
          </span>
        )}
        <div className='relative'>
          {iconItem && (
            <span
              className={`absolute top-1/2 w-[20] -translate-y-1/2 ${iconItem.position === 'left' ? 'left-2' : 'right-2'}`}
            >
              {iconItem.icon}
            </span>
          )}

          <input
            ref={ref}
            className={cn('outline-none', className)}
            required={isRequired}
            aria-invalid={!!errorMsg}
            {...rest}
          />
        </div>

        {errorMsg && <span className='text-xs text-red-400'>{errorMsg}</span>}
      </label>
    );
  },
);

export default Input;
