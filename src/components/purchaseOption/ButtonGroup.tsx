interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonGroup = ({ children, className }: ButtonGroupProps) => {
  return <div className={`mt-5 flex justify-center gap-x-3 ${className}`}>{children}</div>;
};

export default ButtonGroup;
