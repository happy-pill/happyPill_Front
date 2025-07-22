const AdminContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='max-width-container mx-auto w-full min-w-[500px] flex-2 overflow-y-scroll p-[30px]'>
      {children}
    </div>
  );
};

export default AdminContainer;
