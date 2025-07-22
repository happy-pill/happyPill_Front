interface InputErrorMsgProps {
  children: React.ReactNode;
}

const InputErrorMsg = ({ children }: InputErrorMsgProps) => {
  return <span className='text-invalid text-xs'>{children}</span>;
};

export default InputErrorMsg;
