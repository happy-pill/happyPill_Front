interface TextStateProps {
  children: React.ReactNode;
}

const TextState = ({ children }: TextStateProps) => {
  return <span className='text-xs text-gray-400'>{children}</span>;
};

export default TextState;
