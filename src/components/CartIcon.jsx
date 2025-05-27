import { ShoppingCart } from 'lucide-react';

const CartIcon = ({ count }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="relative">
        <ShoppingCart className="w-7 h-7 text-gray-700" />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </div>
    </div>
  );
};

export default CartIcon;
