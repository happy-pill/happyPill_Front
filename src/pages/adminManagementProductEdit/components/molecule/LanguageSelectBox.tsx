import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Select from '@/components/select/Select';

const LanguageSelectBox = () => {
  const { setValue, getValues } = useFormContext();
  const [selectLanguge, setSelectLanguge] = useState('');

  const LGNGUGE_ITEMS = [
    { type: 'KO', name: '한글' },
    { type: 'EN', name: 'English' },
  ];

  const onChangeLanguge = (value: string | number) => {
    setSelectLanguge(String(value));
  };

  return (
    <Select
      value={LGNGUGE_ITEMS.find((el) => el.type === (getValues('language') || selectLanguge))?.name}
      onChange={(value) => {
        onChangeLanguge(value);
        setValue('language', value);
      }}
      className='text-primary flex items-center justify-center gap-1 py-1 text-xs font-semibold'
    >
      <Select.Trigger className='gap-3' placeholder='언어 설정' />

      <Select.Content className='border-1 border-[#DEDEDE]'>
        <Select.Group className='grid'>
          {LGNGUGE_ITEMS.map((item) => (
            <Select.Item
              key={item.type}
              value={item.type}
              className='text-sm font-semibold hover:bg-gray-100'
            >
              {item.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select>
  );
};

export default LanguageSelectBox;
