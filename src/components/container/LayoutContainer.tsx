interface LayoutContainerProps {
  children: React.ReactNode;
  className: string;
  px?: 'px-md' | 'px-0';
}

const LayoutContainer = ({ children, className, px = 'px-md' }: LayoutContainerProps) => {
  return (
    <main className={`mx-auto w-full max-w-(--max-width) flex-1 ${px} ${className}`}>
      {children}
    </main>
  );
};

export default LayoutContainer;
