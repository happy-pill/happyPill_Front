import React from 'react';

interface SelectGroupProps {
  children: React.ReactNode;
  className?: string;
}
const Group: React.FC<SelectGroupProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default Group;
