interface GuestButtonProps {
  text: string;
  bgColor: string;
  onClick: () => void;
}

const GuestButton = ({ text, bgColor, onClick }: GuestButtonProps) => {
  return (
    <button
      className={`p-md text-md rounded-[8px] font-semibold text-white ${bgColor}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default GuestButton;
