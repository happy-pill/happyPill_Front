interface ArrowIconProps {
  className?: string;
}

const CarouselNavigationButton: React.FC<ArrowIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width='40'
      height='40'
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <ellipse cx='20' cy='20' rx='20' ry='20' fill='white' fillOpacity='0.5' />
      <path
        d='M23.1426 13L17.1922 18.2105C15.6022 19.6027 15.6022 20.1986 17.1922 21.5908L23.1426 26.8012'
        stroke='#026242'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default CarouselNavigationButton;
