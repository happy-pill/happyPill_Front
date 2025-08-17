import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import LanguageSelectBox from './components/molecule/LanguageSelectBox';
import ActionButtonSection from './components/organism/ActionButtonSection';
import ProductContentFieldFormSection from './components/organism/ProductContentFieldFormSection';
import ProductDetailFieldFormSection from './components/organism/ProductDetailFieldFormSection';
import ProductInfoFieldFormSection from './components/organism/ProductInfoFieldFormSection';

import type { AdminProductDetailEdit } from '@/types/admin';

import PageTitle from '@/components/common/PageTitle';
import LayoutContainer from '@/components/container/LayoutContainer';
import { routePath } from '@/constants/path';
import {
  useGetProductDetail,
  usePatchProductEdit,
  usePostProductRegister,
} from '@/hooks/api/admin/management';

interface ProdcutFormData {
  categoryId: number;
  thumbnailUrl: string;
  isAvailable: boolean;
  isBest?: boolean;
  stock: number;
  price: number;
  name: string;
  briefDescription: string;
  description: string;
  contentImageUrl: string;
  company: string;
  quantityDetails: string;
  usage: string;
  warningMessage: string;
  language: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const { productId = '' } = useParams<{ productId?: string }>();

  const mutatePostProductRegister = usePostProductRegister();
  const mutatePatchProductEdit = usePatchProductEdit(productId);
  const { data: productItem } = useGetProductDetail(productId);

  const RegisterMethods = useForm<ProdcutFormData>();
  const EditMethods = useForm<ProdcutFormData>();

  const methods = productId ? EditMethods : RegisterMethods;

  const removeValueToComma = (value: number) => {
    const removeStringValue = String(value).split(',').join('');
    return Number(removeStringValue);
  };

  const getFormData = (formData: ProdcutFormData) => {
    // NOTE 임시 이미지 url
    const thumbnailUrl =
      'https://cdn.pixabay.com/photo/2013/11/05/23/59/gel-capsules-206150_1280.jpg';
    const contentImageUrl =
      'https://cdn.pixabay.com/photo/2016/08/10/04/45/medicine-1582472_1280.jpg';

    const data = {
      categoryId: Number(formData.categoryId),
      thumbnailUrl: thumbnailUrl,
      isAvailable: formData.isAvailable,
      stock: removeValueToComma(formData.stock),
      price: removeValueToComma(formData.price),
      productInfos: [
        {
          language: formData.language,
          name: formData.name,
          briefDescription: formData.briefDescription,
          description: formData.description,
          contentImageUrl: contentImageUrl,
          company: formData.company,
          quantityDetails: formData.quantityDetails,
          usage: formData.usage,
          warningMessage: formData.warningMessage,
        },
      ],
    };

    return data;
  };

  const onSubmitEdit = (formData: ProdcutFormData) => {
    const editData = getFormData(formData) as AdminProductDetailEdit;

    mutatePatchProductEdit.mutate(
      { editData },
      {
        onSuccess: () => {
          setErrorMsg('');
          navigate(routePath.admin.management.product.root);
        },
        onError(error) {
          setErrorMsg('예기치 못한 에러가 발생했습니다. 다시 시도해 주세요.');
          return console.error(error);
        },
      },
    );
  };

  const onSubmitRegister = (formData: ProdcutFormData) => {
    const registerData = getFormData(formData) as AdminProductDetailEdit;

    mutatePostProductRegister.mutate(
      { registerData },
      {
        onSuccess: () => {
          setErrorMsg('');
          navigate(routePath.admin.management.product.root);
        },
        onError(error) {
          setErrorMsg('예기치 못한 에러가 발생했습니다. 다시 시도해 주세요.');
          return console.error(error);
        },
      },
    );
  };

  const onSubmit = (formData: ProdcutFormData) => {
    if (!formData.language) return setErrorMsg('언어 설정은 필수 입니다.');

    if (productId) {
      onSubmitEdit(formData);
    } else {
      onSubmitRegister(formData);
    }
  };

  useEffect(() => {
    if (productItem) {
      const productInfo = productItem?.productInfo[0];
      EditMethods.reset({
        categoryId: productItem?.categoryId,
        thumbnailUrl: productItem?.thumbnailUrl,
        isAvailable: productItem?.isAvailable,
        stock: productItem?.stock,
        price: productItem?.price,

        name: productInfo?.name,
        briefDescription: productInfo?.briefDescription,
        description: productInfo?.description,
        contentImageUrl: productInfo?.contentImageUrl,
        company: productInfo?.company,
        quantityDetails: productInfo?.quantityDetails,
        usage: productInfo?.usage,
        warningMessage: productInfo?.warningMessage,
        language: productInfo?.language,
      });
    }
  }, [productId, productItem, EditMethods]);

  return (
    <LayoutContainer isHeader={false} isMaxW={false} px='px-0'>
      <FormProvider {...methods}>
        <PageTitle className='flex w-full items-center'>
          {productId ? '상품 수정' : '상품 등록'}
          <LanguageSelectBox />
        </PageTitle>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <section className='min-w-min-width mx-auto flex w-full max-w-[760px] flex-col items-center justify-center gap-2'>
            <ProductInfoFieldFormSection />
            <ProductContentFieldFormSection />
            <ProductDetailFieldFormSection />
            {errorMsg && <span className='text-sm text-red-300'>{errorMsg}</span>}
            <ActionButtonSection productId={productId} />
          </section>
        </form>
      </FormProvider>
    </LayoutContainer>
  );
};

export default Index;
