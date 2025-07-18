import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { CgClose } from 'react-icons/cg';

import StyledButton from '../button/StyledButton';
import Input from '../input/BaseInput';

import logoHappypill from '@/assets/icon/logo-happypill.svg';
import Modal from '@/components/modal/ui/Modal';
import { CREATE_WELCOME_STEPS } from '@/constants/locale';
import { usePostUserNickname } from '@/hooks/api/member/user';
import useLanguage from '@/hooks/useLanguage';
import useModal from '@/hooks/useModal';
import useLoginedStore from '@/stores/loginedStore';
import { logoutAndRedirect } from '@/utils/auth/logoutAndRedirect';
import cn from '@/utils/classNames';

interface Inputs {
  nickname: string;
}

const WelcomeStepModal: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { language } = useLanguage();
  const { closeModal } = useModal();
  const { setLogined } = useLoginedStore();
  const stepMessages = CREATE_WELCOME_STEPS;
  const currentMessage = stepMessages[currentStep];
  const postUserNicknameMutation = usePostUserNickname();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (currentStep == 0) setCurrentStep((prev) => prev + 1);
    if (currentStep == 1) {
      postUserNicknameMutation.mutate(data.nickname, {
        onSuccess: () => {
          setCurrentStep((prev) => prev + 1);
          setLogined(true);
        },
        onError: (error) => {
          console.error('닉네임 업데이트에 실패했습니다.', error);
        },
      });
    }
    if (currentStep == 2) {
      closeModal();
    }
  };

  const handleClose = async () => {
    await logoutAndRedirect();
    // 스토어 상태 업데이트
    setLogined(null);
    // 모달 닫기
    closeModal();
  };

  return (
    <Modal>
      <Modal.Content>
        <Modal.Close className='absolute top-1 right-1' onClick={() => handleClose()}>
          <CgClose color='#777777' size={20} />
        </Modal.Close>

        <section className='w-[430px] p-12 py-7'>
          {currentStep < 2 && (
            <div className='mt-5 flex w-full'>
              <div
                className={cn(
                  'h-3.5 flex-1 rounded-md',
                  currentStep === 0 ? 'bg-primary' : 'bg-gray-400',
                )}
              />
              <div
                className={cn(
                  'ml-1.5 h-3.5 flex-1 rounded-md',
                  currentStep === 1 ? 'bg-primary' : 'bg-gray-400',
                )}
              />
            </div>
          )}

          <div className='mt-6 flex flex-col items-center'>
            <h2>
              <img src={logoHappypill} alt='해피필 로고' className='w-32 object-contain' />
            </h2>

            <span className='text-xl-bold mt-4'>{currentMessage[language].title}</span>
            <span className='text-m-regular mt-1.5'>{currentMessage[language].description}</span>
            <form onSubmit={handleSubmit(onSubmit)}>
              {currentStep == 1 && (
                <div>
                  <Input
                    placeholder='닉네임을 입력해주세요'
                    className='mt-6 rounded-md border border-[#bbbbbb] p-3 px-5'
                    {...register('nickname', { required: '닉네임을 입력해주세요' })}
                  />
                  <span
                    className={cn(
                      'text-xs-regular block min-h-[20px] text-[#F93737] opacity-0 transition-opacity duration-200',
                      errors?.nickname?.message && 'opacity-100',
                    )}
                  >
                    {errors?.nickname?.message}
                  </span>
                </div>
              )}
              <StyledButton
                type='submit'
                size='M'
                variant='green'
                className={cn(
                  'mx-auto',
                  currentStep == 0 && 'mt-32',
                  currentStep == 1 && 'mt-20',
                  currentStep == 2 && 'mt-30',
                )}
              >
                {currentMessage[language].btnText}
              </StyledButton>
            </form>
          </div>
        </section>
      </Modal.Content>
    </Modal>
  );
};

export default WelcomeStepModal;
