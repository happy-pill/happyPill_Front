import SelectBox from '../molecule/SelectBox';

import SearchInput from '@/components/input/SearchInput';

// TODO 기능 추가 필요!
interface TopControlsSectionProps {
  currentSize: number;
  onChange: (value: number | string) => void;
}

const TopControlsSection = ({ currentSize, onChange }: TopControlsSectionProps) => {
  return (
    <div className='mb-5 flex w-full items-center justify-between'>
      <SearchInput />
      <SelectBox currentSize={currentSize} onChange={onChange} />
    </div>
  );
};

export default TopControlsSection;
