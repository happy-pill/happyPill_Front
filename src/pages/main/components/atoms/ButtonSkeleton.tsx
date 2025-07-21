const ButtonSkeleton = () => {
  return (
    <div className='flex h-14 w-full max-w-[360px] items-center justify-center rounded-lg bg-gray-300 px-5 py-3'>
      <div className='mr-2 h-[40px] w-[40px] bg-gray-200' />
      <div className='h-[15px] w-[50px] bg-gray-200' />
    </div>
  );
};

export default ButtonSkeleton;
