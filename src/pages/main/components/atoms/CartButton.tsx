import { type ButtonHTMLAttributes } from 'react';
import { PiShoppingBagLight } from 'react-icons/pi';

import Button from '@/components/button/BaseButton';

type CartButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
const CartButton: React.FC<CartButtonProps> = ({ ...props }) => {
  return (
    <Button
      className='hover:bg-primary cursor-pointer rounded-3xl bg-gray-50 p-2 transition-colors duration-100 hover:text-white'
      {...props}
    >
      <PiShoppingBagLight size={15} />
    </Button>
  );
};

export default CartButton;
