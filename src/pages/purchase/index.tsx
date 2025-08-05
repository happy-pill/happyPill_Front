import { zodResolver } from '@hookform/resolvers/zod';
import PortOne from '@portone/browser-sdk/v2';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import PageTitle from '@/components/common/PageTitle';
import LayoutContainer from '@/components/container/LayoutContainer';
import { LOCALE_LABELS } from '@/constants/locale/purchase';
import { useCreateOrder } from '@/hooks/api/member/purchase';
import useLocale from '@/hooks/useLocale';
import useModal from '@/hooks/useModal';
import PaymentMethodSelector from '@/pages/purchase/components/atoms/PaymentMethodSelector';
import OrderSummary from '@/pages/purchase/components/molecules/OrderSummary';
import PaymentSummary from '@/pages/purchase/components/molecules/PaymentSummary';
import RecipientForm from '@/pages/purchase/components/molecules/RecipientForm';
import useCheckoutStore from '@/stores/checkoutStore';

const userSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  phonePrefix: z.string(),
  phoneMiddle: z
    .string({ message: '숫자를 입력해주세요' })
    .min(1, '휴대폰 번호를 입력해주세요')
    .regex(/^\d+$/, '휴대폰 번호는 숫자로 입력해주세요'),
  phoneLast: z
    .string({ message: '휴대폰 번호는 숫자로 입력해주세요' })
    .min(1, '휴대폰 번호를 입력해주세요')
    .regex(/^\d+$/, '휴대폰 번호는 숫자로 입력해주세요'),
  email: z.email('올바른 이메일 형식이 아닙니다').min(1, '이메일을 입력해주세요'),
});

export type PurchaseFormData = z.infer<typeof userSchema>;

const Index = () => {
  const [payMethod, setPayMethod] = useState<'CARD' | 'VIRTUAL_ACCOUNT'>('CARD');
  const { items } = useCheckoutStore();
  const createOrderMutation = useCreateOrder();
  const { locale } = useLocale();
  const { openModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<PurchaseFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      phonePrefix: '010',
      phoneMiddle: undefined,
      phoneLast: undefined,
      email: '',
    },
    mode: 'onChange',
    criteriaMode: 'firstError',
  });

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.period;
  }, 0);

  const onSubmit = async (data: PurchaseFormData) => {
    if (payMethod === 'VIRTUAL_ACCOUNT')
      return openModal({
        type: 'message',
        props: {
          type: 'alert',
          message: '가상계좌 결제는 현재 준비중입니다.',
        },
      });
    const phoneNumber = [
      data.phonePrefix.toString(),
      data.phoneMiddle.toString(),
      data.phoneLast.toString(),
    ].join('');

    // 현재 날짜를 보냈을 때 미래 날짜로 보내라는 백엔드 오류로 인해 하루 뒤의 날짜를 계산
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startDate = tomorrow.toISOString().split('T')[0];

    const orderData = {
      recipentName: data.name,
      recipentMobile: phoneNumber,
      orderLineCreateRequests: items.map((item) => {
        return {
          productId: item.productId,
          month: item.period,
          startDate,
        };
      }),
    };

    createOrderMutation.mutate(orderData, {
      onSuccess: async (response) => {
        try {
          const basePayload = {
            storeId: 'store-48428764-61cf-4595-9a05-ddd25812b67b',
            channelKey: 'channel-key-10dbf30e-98fd-41a1-b8e9-b4668be3f73b',
            paymentId: response.paymentUid,
            orderName: `주문번호: ${response.orderId}`,
            totalAmount: 1000,
            currency: 'KRW' as any,
            payMethod,
            customer: {
              fullName: data.name,
              phoneNumber,
              email: data.email,
            },
            customData: {
              orderId: response.orderId,
            },
          };

          const payment = await PortOne.requestPayment(basePayload);

          if (payment?.code !== undefined) {
            //TODO: 결제취소에 관련된 UI를 사용자에게 제공
            openModal({
              type: 'message',
              props: { type: 'alert', message: '사용자가 결제를 취소했습니다.' },
            });
            return;
          }
        } catch (error) {
          console.error('결제 중 오류가 발생했습니다.', error);
        }
      },
      onError: (error) => {
        console.error('주문 생성 실패:', error);
      },
    });
  };

  useEffect(() => {
    // submit 된 후 에러가 있으면 모달 팝업
    if (isSubmitted && Object.keys(errors).length > 0) {
      const error = Object.values(errors)[0];

      openModal({
        type: 'message',
        props: {
          type: 'alert',
          title: '입력 오류',
          message: error?.message,
        },
      });
    }
  }, [errors, isSubmitted]);

  return (
    <LayoutContainer className='py-[clamp(40px,10vw,100px)]'>
      <PageTitle>{LOCALE_LABELS[locale].pageTitle}</PageTitle>
      <div className='relative grid gap-y-[30px] lg:grid-cols-[2fr_1fr] lg:gap-x-5 lg:gap-y-[40px]'>
        <div className='grid gap-y-[15px]'>
          <RecipientForm register={register} />
          <OrderSummary items={items} />
          <PaymentMethodSelector selected={payMethod} onSelect={setPayMethod} />
        </div>
        <PaymentSummary totalPrice={totalPrice} onSubmit={handleSubmit(onSubmit)} />
      </div>
    </LayoutContainer>
  );
};

export default Index;
