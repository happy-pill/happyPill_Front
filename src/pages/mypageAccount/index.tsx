import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import StyledButton from '@/components/button/StyledButton';
import FiledInput from '@/components/input/FiledInput';
import MemberLayout from '@/components/layout/MemberLayout';
import { routePath } from '@/constants/path';
import { useGetUserInfo } from '@/hooks/api/member/user';

const Index = () => {
  const { data: userData } = useGetUserInfo();

  console.log('userData', userData);

  const navigate = useNavigate();
  const methods = useForm();

  return (
    <MemberLayout pageTitle='계정 관리'>
      <div className='mx-auto flex w-full max-w-[415px] flex-col items-center gap-3'>
        <FormProvider {...methods}>
          <FiledInput label='로그인 이메일' readOnly />
          <FiledInput label='닉네임' readOnly />
          <FiledInput label='알림받을 이메일' readOnly />
        </FormProvider>

        <StyledButton
          variant='green'
          size='M'
          className='mt-[70px]'
          onClick={() =>
            navigate(routePath.member.mypage.accountEdit.route(userData?.userId || ''))
          }
        >
          정보 수정하기
        </StyledButton>
      </div>
    </MemberLayout>
  );
};

export default Index;
