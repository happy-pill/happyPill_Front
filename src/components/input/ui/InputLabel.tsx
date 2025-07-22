interface InputLabelProps {
  children: React.ReactNode;
}

const InputLabel = ({ children }: InputLabelProps) => {
  return <span className='flex items-center gap-1 text-xs font-semibold'>{children}</span>;
};

export default InputLabel;
