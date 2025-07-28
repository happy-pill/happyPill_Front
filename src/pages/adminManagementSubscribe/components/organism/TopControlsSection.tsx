import SelectBox from '../molecule/SelectBox';

import SearchInput from '@/components/input/SearchInput';

// TODO 기능 추가 필요!
interface TopControlsSectionProps {
  crrentSize: number;
  onChange: (value: number | string) => void;
}

const TopControlsSection = ({ crrentSize, onChange }: TopControlsSectionProps) => {
  return (
    <div className='mb-5 flex w-full justify-between'>
      <SearchInput />
      <SelectBox crrentSize={crrentSize} onChange={onChange} />
    </div>
  );
};

export default TopControlsSection;
