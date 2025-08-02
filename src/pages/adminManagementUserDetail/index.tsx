import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import ActionButtonSection from './components/organism/ActionButtonSection';
import FiedFormSection from './components/organism/FiledFormSection';

import type { AdminUserDetail } from '@/types/admin';

import PageTitle from '@/components/common/PageTitle';
import LayoutContainer from '@/components/container/LayoutContainer';
import {
  useGetUserDetail,
  usePatchUserActivate,
  usePatchUserDeactivate,
  usePatchUserDetail,
} from '@/hooks/api/admin/management';
import { formatDateToFullDateSlide } from '@/utils/format';

const Index = () => {
  const param = useParams();
  const { userId } = param;

  const [isUserDeleted, setIsUserDeleted] = useState(false);

  const { data: userDetail } = useGetUserDetail(userId || '');

  const mutatePatchUserDeactivate = usePatchUserDeactivate(userId || '');
  const mutatePatchUserActivate = usePatchUserActivate(userId || '');
  const mutatePatchUserDetail = usePatchUserDetail(userId || '');

  const methods = useForm<AdminUserDetail>();

  const onSubmit = () => {
    const formData = methods.getValues();

    mutatePatchUserDetail.mutate(
      {
        userId: userId || '',
        nickName: formData.nickname || userDetail?.nickname,
        notifyEmail: formData.notifyEmail || userDetail?.notifyEmail,
      },
      {
        onSuccess: (data) => {
          methods.reset({
            nickname: data?.nickname || '',
            notifyEmail: data?.notifyEmail || '',
          });
        },
      },
    );
  };

  const handleUserDeactivate = (userId: string) => {
    mutatePatchUserDeactivate.mutate(userId || '', {
      onSuccess: (userData) => {
        setIsUserDeleted(userData.isDeleted);
      },
    });
  };

  const handleUserActivate = (userId: string) => {
    mutatePatchUserActivate.mutate(userId || '', {
      onSuccess: (userData) => {
        setIsUserDeleted(userData.isDeleted);
      },
    });
  };

  useEffect(() => {
    if (userDetail) {
      setIsUserDeleted(userDetail.isDeleted);
      methods.reset({
        ...userDetail,
        createdAt: formatDateToFullDateSlide(String(userDetail?.createdAt || '')) || '',
        deletedAt: formatDateToFullDateSlide(String(userDetail?.deletedAt || '')) || '',
      });
    }
  }, [userDetail, methods]);

  return (
    <LayoutContainer isMaxW={false} isHeader={false} px='px-0'>
      <PageTitle>회원 관리</PageTitle>

      <FormProvider {...methods}>
        <FiedFormSection />
        <ActionButtonSection
          userId={userId || ''}
          isDeleted={isUserDeleted}
          handleUserActivate={handleUserActivate}
          handleUserDeactivate={handleUserDeactivate}
          onSubmit={onSubmit}
        />
      </FormProvider>
    </LayoutContainer>
  );
};

export default Index;
