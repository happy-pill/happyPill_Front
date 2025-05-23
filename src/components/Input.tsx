interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  const { className = '', type = 'text', id } = props

  return (
    <div className='flex flex-col gap-1'>
      {id && (
        <label className='text-sm text-gray-500' htmlFor={id}>
          {id}
        </label>
      )}
      <input
        {...props}
        type={type}
        className={`px-4 py-2 border border-solid border-gray-300 rounded-md w-ful focus:ring-[#637C5A] focus:ring-1 ${className}`}
      />
    </div>
  )
}

export default Input
