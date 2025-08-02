import { useFormContext } from 'react-hook-form';

import StyledButton from '@/components/button/StyledButton';

interface ActionButtonSectionProps {
  userId: string;
  isDeleted?: boolean;
  handleUserActivate: (userId: string) => void;
  handleUserDeactivate: (userId: string) => void;
  onSubmit: () => void;
}

const ActionButtonSection = ({
  userId,
  isDeleted,
  handleUserActivate,
  handleUserDeactivate,
  onSubmit,
}: ActionButtonSectionProps) => {
  const { handleSubmit, formState } = useFormContext();

  return (
    <section className='mx-auto flex items-center justify-center gap-2'>
      {isDeleted ? (
        <StyledButton variant='border' size='M' onClick={() => handleUserActivate(userId)}>
          복구
        </StyledButton>
      ) : (
        <StyledButton variant='orange' size='M' onClick={() => handleUserDeactivate(userId)}>
          비활성화
        </StyledButton>
      )}

      <StyledButton
        variant='green'
        size='M'
        disabled={!formState.isValid || !formState.isDirty}
        onClick={handleSubmit(onSubmit)}
      >
        확인
      </StyledButton>
    </section>
  );
};

export default ActionButtonSection;
