import { IoMdArrowDropdown } from 'react-icons/io';

import type { PurchaseFormData } from '../..';
import type { UseFormRegister } from 'react-hook-form';

import { LOCALE_LABELS } from '@/constants/locale/purchase';
import useLocale from '@/hooks/useLocale';
import Accordion from '@/pages/purchase/components/molecules/Accordion';

interface RecipientFormProps {
  register: UseFormRegister<PurchaseFormData>;
}

const RecipientForm = ({ register }: RecipientFormProps) => {
  const PHONE_NUMBERS = ['010', '011', '016', '017', '018', '019'];
  const { locale } = useLocale();

  const STYLES = {
    input: 'rounded-sm border-[1px] border-solid border-[#dedede] p-2',
    fieldContainer: 'grid grid-cols-[100px_auto] items-center',
    label: 'font-semibold',
  } as const;

  return (
    <div className='rounded-md bg-white'>
      <Accordion title={LOCALE_LABELS[locale].recipientForm.title}>
        <div className='grid max-w-[900px] gap-y-4 p-5'>
          {/* 이름 */}
          <div className={STYLES.fieldContainer}>
            <label className={STYLES.label}>{LOCALE_LABELS[locale].recipientForm.name}</label>
            <input {...register('name')} type='text' className={STYLES.input} />
          </div>
          {/* 연락처 */}
          <div className={STYLES.fieldContainer}>
            <label className={STYLES.label}>{LOCALE_LABELS[locale].recipientForm.contact}</label>
            <div className='flex flex-wrap items-center gap-2'>
              <div className='relative min-w-[80px] flex-1 rounded-sm border border-[#dedede]'>
                <select className='w-full appearance-none p-2' {...register('phonePrefix')}>
                  {PHONE_NUMBERS.map((phone) => (
                    <option key={phone} value={phone}>
                      {phone}
                    </option>
                  ))}
                </select>
                <span className='pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-500'>
                  <IoMdArrowDropdown size={23} />
                </span>
              </div>
              <span>-</span>
              <input
                type='tel'
                className={STYLES.input}
                maxLength={4}
                {...register('phoneMiddle')}
              />
              <span>-</span>
              <input type='tel' className={STYLES.input} {...register('phoneLast')} maxLength={4} />
            </div>
          </div>
          {/* 이메일 */}
          <div className={STYLES.fieldContainer}>
            <label className={STYLES.label}>{LOCALE_LABELS[locale].recipientForm.email}</label>
            <input type='text' className={STYLES.input} autoComplete='off' {...register('email')} />
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default RecipientForm;
