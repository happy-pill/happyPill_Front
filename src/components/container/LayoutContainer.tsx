const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
  return <main className='px-md mx-auto w-full max-w-(--max-width) flex-1'>{children}</main>;
};

export default LayoutContainer;
