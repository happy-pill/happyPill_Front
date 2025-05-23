interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-[#FFAF00] text-white rounded-full hover:bg-[#FF8800] transition duration-10 w-full ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
