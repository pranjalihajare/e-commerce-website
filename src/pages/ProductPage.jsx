import React, { useState, useEffect } from 'react';
import ColorSwatch from '../components/ColorSwatch';
import CartIcon from '../components/CartIcon';
import toast from 'react-hot-toast';

const productData = {
  name: 'Univendor T-Shirt',
  images: {
    red: 'https://imagescdn.louisphilippe.com/img/app/product/9/949440-12224590.jpg?auto=format&w=390',
    blue: 'https://assets.ajio.com/medias/sys_master/root/20240523/CfAj/664f6fb905ac7d77bb742ae5/-473Wx593H-700005645-blue-MODEL.jpg',
    green: 'https://assets.ajio.com/medias/sys_master/root/20231230/MBL3/658f2252ddf7791519f6901c/-473Wx593H-466931544-green-MODEL5.jpg',
  },
  colors: ['red', 'blue', 'green'],
  sizes: ['S', 'M', 'L', 'XL'],
};

const ProductPage = ({ user, setUser }) => {
  const [mainImage, setMainImage] = useState(productData.images.red);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(savedCart.length);
  }, []);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error('Please select color and size to add product into cart.');
      return;
    }

    const newCartItem = {
      product: productData.name,
      color: selectedColor,
      size: selectedSize,
    };

    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    currentCart.push(newCartItem);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    setCartCount(currentCart.length);
    toast.success('Added to cart!');
  };

  const handleLogin = () => {
    const guestCart = JSON.parse(localStorage.getItem('cart')) || [];
    const fakeUser = { id: 1, name: 'John Doe' };

    const userCart = JSON.parse(localStorage.getItem('user_cart')) || [];
    const mergedCart = [...userCart, ...guestCart];
    localStorage.setItem('user', JSON.stringify(fakeUser));
    localStorage.setItem('user_cart', JSON.stringify(mergedCart));
    localStorage.removeItem('cart');

    setUser(fakeUser);
    setCartCount(mergedCart.length);
    toast.success('Logged in and cart merged!');
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 bg-white shadow-md">
      <div className="flex justify-between items-center mb-4">
        <CartIcon count={cartCount} />
        {user ? (
          <span className="text-sm text-gray-700">Welcome, {user.name}</span>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-gray-700 text-white px-4 py-1 rounded"
          >
            Login
          </button>
        )}
      </div>

      <div className="img-div h-96 overflow-hidden rounded-md mb-6">
  <img
    src={mainImage}
    alt="Main product"
    className="w-full h-96 transform transition-transform duration-300 hover:scale-105"
  />
</div>

      <h1 className="text-2xl font-semibold mb-4">{productData.name}</h1>

      <div className="mb-4">
        <p className="font-medium">Select Color:</p>
        <div className="flex gap-2 mt-2">
          {productData.colors.map((color) => (
            <ColorSwatch
              key={color}
              color={color}
              onHover={() => setMainImage(productData.images[color])}
              onClick={() => setSelectedColor(color)}
              selected={selectedColor === color}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="font-medium">Select Size:</p>
        <div className="flex gap-2 mt-2">
          {productData.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`border px-4 py-1 rounded-full ${
                selectedSize === size
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Add to Cart
        </button>
        <button
          onClick={handleAddToCart}
          className="border border-blue-600 text-blue-600 hover:bg-blue-100 px-6 py-2 rounded-lg"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductPage;