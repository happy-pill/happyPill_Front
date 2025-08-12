import { useState } from 'react';
import { useFormContext, type UseFormRegisterReturn } from 'react-hook-form';

import Select from '@/components/select/Select';
import { useGetCategoryDetail } from '@/hooks/api/member/category';

interface CategorySelectBoxProps {
  register?: UseFormRegisterReturn;
}

const CategorySelectBox = ({ register }: CategorySelectBoxProps) => {
  const [selected, setSelected] = useState('선택하기');
  const { data: categorysData } = useGetCategoryDetail();

  const { setValue, getValues } = useFormContext();

  return (
    <div className='flex w-full flex-col items-start gap-1'>
      <span className='flex items-center gap-1 text-xs font-semibold'>카테고리</span>
      <Select
        value={
          categorysData?.find(
            (el: { categoryId: string }) => el.categoryId === getValues('categoryId') || selected,
          )?.name
        }
        onChange={(value) => {
          register?.onChange?.({ target: { value } });
          setValue('categoryId', value, { shouldDirty: true });
          setSelected(String(value));
        }}
        className='flex w-full items-center justify-center gap-1 rounded-md border border-solid border-[#DEDEDE] bg-white py-1 text-xs font-semibold hover:bg-gray-50'
      >
        <Select.Trigger className='gap-3' placeholder='선택' />

        <Select.Content className='border-1 border-[#DEDEDE]'>
          <Select.Group className='grid'>
            {categorysData?.map((item: { categoryId: string; name: string }) => (
              <Select.Item
                key={item.categoryId}
                value={item.categoryId}
                className='text-sm font-semibold hover:bg-gray-100'
              >
                {item.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select>
    </div>
  );
};

export default CategorySelectBox;
