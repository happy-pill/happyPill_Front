interface ErrorMsgProps {
  children: React.ReactNode;
}

const ErrorMsg = ({ children }: ErrorMsgProps) => {
  return <span className='text-invalid text-xs'>{children}</span>;
};

export default ErrorMsg;
