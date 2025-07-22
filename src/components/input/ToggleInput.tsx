import InputLabel from './ui/InputLabel';

// TODO 추후 props 수정 필요
interface ToggleInputProps {
  label?: { text: string; position: 'top' | 'left' };
  isRequired?: boolean;
  isChecked?: boolean;
  onChange?: () => void;
}

const ToggleInput = ({ label, isRequired, isChecked, onChange }: ToggleInputProps) => {
  return (
    <label
      className={`cursor-pointer items-center gap-1 ${label?.position === 'top' ? 'flex-col justify-start' : 'flex'}`}
    >
      {label && <InputLabel>{label.text}</InputLabel>}
      <input
        type='checkbox'
        checked={isChecked}
        className='peer sr-only'
        required={isRequired}
        onChange={onChange}
      />
      <div className="peer after:bg-primary peer-checked:after:bg-secondary relative h-6 w-11 rounded-full bg-white peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border-0 after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full" />
    </label>
  );
};

export default ToggleInput;
