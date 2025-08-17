interface InputTextStateProps {
  children: React.ReactNode;
}

const InputTextState = ({ children }: InputTextStateProps) => {
  return <span className='text-xs text-gray-400'>{children}</span>;
};

export default InputTextState;
