import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import StyledButton from '@/components/button/StyledButton';
import FiledInput from '@/components/input/FiledInput';
import MemberLayout from '@/components/layout/MemberLayout';
import { useGetUserInfo } from '@/hooks/api/member/user';

const Index = () => {
  const { data: userData } = useGetUserInfo();

  console.log('userData', userData);

  const navigate = useNavigate();
  const methods = useForm();

  return (
    <MemberLayout pageTitle='정보 수정'>
      <div className='mx-auto flex w-full max-w-[415px] flex-col items-center gap-3'>
        <FormProvider {...methods}>
          <FiledInput label='로그인 이메일' readOnly disabled />
          <FiledInput label='닉네임' />
          <FiledInput
            label='알림받을 이메일'
            contentItem={{
              item: (
                <StyledButton variant='green' size='S' onClick={() => {}}>
                  이메일 수정
                </StyledButton>
              ),
              position: 'right',
            }}
          />
          <FiledInput
            label='인증 번호'
            contentItem={{
              item: (
                <div className='flex items-center gap-2'>
                  <span className='text-xs text-gray-400'>00:00</span>
                  <StyledButton variant='green' size='S' onClick={() => {}}>
                    인증 확인
                  </StyledButton>
                </div>
              ),
              position: 'right',
            }}
          />

          <div className='mt-[70px] flex gap-3'>
            <StyledButton variant='border' size='M' onClick={() => navigate(-1)}>
              취소
            </StyledButton>
            <StyledButton variant='green' size='M' onClick={() => {}}>
              정보 수정하기
            </StyledButton>
          </div>
        </FormProvider>
      </div>
    </MemberLayout>
  );
};

export default Index;
