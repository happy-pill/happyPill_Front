import { useFormContext } from 'react-hook-form';

import FiledInput from '@/components/input/FiledInput';

const FiedFormSection = () => {
  const { register } = useFormContext();

  return (
    <section className='min-w-min-width mx-auto mb-[100px] flex w-full flex-col gap-2'>
      <div className='flex w-full gap-5'>
        <FiledInput label='로그인 이메일' readOnly {...register('loginEmail')} />
        <FiledInput
          label='알림받을 이메일'
          isRequired
          {...register('notifyEmail', { required: true })}
        />
      </div>
      <div className='flex w-full gap-5'>
        <FiledInput label='닉네임' isRequired {...register('nickname', { required: true })} />
        <FiledInput label='가입 수단' readOnly {...register('provider')} />
      </div>
      <div className='flex w-full gap-5'>
        <FiledInput label='가입 날짜' readOnly {...register('createdAt')} />
        <FiledInput label='탈퇴 날짜' readOnly {...register('deletedAt')} />
      </div>
    </section>
  );
};

export default FiedFormSection;
