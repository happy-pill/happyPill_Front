import { useTabContext } from './Tabs';

interface PanelProps {
  children: React.ReactNode;
  value: string;
}

const Panel: React.FC<PanelProps> = ({ children, value }) => {
  const { selectedTab } = useTabContext();
  const isActive = selectedTab === value;

  if (!isActive) return null;

  return <div>{children}</div>;
};

export default Panel;
