interface LabelProps {
  children: React.ReactNode;
}

const Label = ({ children }: LabelProps) => {
  return <span className='flex items-center gap-1 text-xs font-semibold'>{children}</span>;
};

export default Label;
