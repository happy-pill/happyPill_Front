interface GuestButtonProps {
  text: string;
  bgColor: string;
  onClick: () => void;
}

const GuestButton = ({ text, bgColor, onClick }: GuestButtonProps) => {
  return (
    <button className={`rounded-[8px] font-semibold text-white ${bgColor}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default GuestButton;
