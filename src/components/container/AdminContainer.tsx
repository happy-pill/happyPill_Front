const AdminContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full flex-2 overflow-x-scroll overflow-y-scroll p-[30px]'>{children}</div>
  );
};

export default AdminContainer;
