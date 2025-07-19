const CardSkeleton = () => {
  return (
    <div className='rounded-m mb-[12px] animate-pulse overflow-hidden bg-[#ffffffE6] text-left'>
      <div className='relative z-[2] h-[250px]'>
        <div className='absolute top-[20px] left-[20px] flex gap-x-1'>
          <div className='h-[24px] w-[50px] rounded-full bg-gray-300'></div>
          <div className='h-[24px] w-[60px] rounded-full bg-gray-300'></div>
        </div>

        <div className='h-full w-full bg-gray-300'></div>
      </div>

      <div className='px-[20px] py-[30px]'>
        <div className='mb-[15px] h-[24px] w-[70%] rounded bg-gray-300'></div>

        <div className='mb-[20px] h-[12px] w-[40%] rounded bg-gray-300'></div>

        <div className='flex items-center justify-between'>
          <div className='h-[20px] w-[80px] rounded bg-gray-300'></div>
          <div className='h-[36px] w-[36px] rounded-full bg-gray-300'></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
