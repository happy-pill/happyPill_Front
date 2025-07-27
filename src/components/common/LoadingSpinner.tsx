import cn from '@/utils/classNames';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'gray' | 'black';
  className?: string;
}

const LoadingSpinner = ({ size = 'md', color = 'blue', className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const colorClasses = {
    blue: 'border-blue-500',
    gray: 'border-gray-500',
    black: 'border-black',
  };

  return (
    <div className={cn(`flex flex-col items-center justify-center ${className}`)}>
      <div
        className={`mx-auto mt-40 animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}
      />
    </div>
  );
};

export default LoadingSpinner;
