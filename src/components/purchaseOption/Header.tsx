interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  return <section className={className}>{children}</section>;
};

export default Header;
