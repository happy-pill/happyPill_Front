import InputLabel from './ui/InputLabel';

import type { UseFormRegisterReturn } from 'react-hook-form';

interface ToggleInputProps {
  label?: { text: string; position: 'top' | 'left' };
  name?: string;
  isRequired?: boolean;
  isChecked?: boolean;
  register?: UseFormRegisterReturn;
  onChange?: () => void;
}

const ToggleInput = ({
  label,
  name,
  isRequired,
  isChecked,
  register,
  onChange,
}: ToggleInputProps) => {
  return (
    <label
      className={`cursor-pointer items-center gap-1 ${label?.position === 'top' ? 'flex-col justify-start' : 'flex'}`}
    >
      {label && <InputLabel>{label.text}</InputLabel>}
      <input
        id={register?.name || name}
        name={register?.name || name}
        type='checkbox'
        checked={isChecked}
        className='peer sr-only'
        required={isRequired}
        onChange={(e) => {
          onChange?.();
          register?.onChange?.(e);
        }}
        onBlur={register?.onBlur}
        ref={register?.ref}
      />
      <div className="peer after:bg-primary peer-checked:after:bg-secondary relative h-6 w-11 rounded-full bg-white peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border-0 after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full" />
    </label>
  );
};

export default ToggleInput;
