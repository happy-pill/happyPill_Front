import Select from '@/components/select/Select';
import { ADMIN_SELECT_ITEMS } from '@/constants/common';

interface SelectBoxProps {
  crrentSize: number;
  onChange: (value: number | string) => void;
}

const SelectBox = ({ crrentSize, onChange }: SelectBoxProps) => {
  return (
    <Select
      value={`${crrentSize}개`}
      onChange={onChange}
      className='rounded-md border-1 border-[#DEDEDE] bg-white'
    >
      <Select.Trigger className='gap-1 px-2' placeholder={`${crrentSize}개`} iconPosition='left' />
      <Select.Content className='border-1 border-[#DEDEDE]'>
        <Select.Group className='grid'>
          {ADMIN_SELECT_ITEMS.map((item) => (
            <Select.Item key={item} value={item} className='hover:bg-gray-100'>
              {item}개
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select>
  );
};

export default SelectBox;
