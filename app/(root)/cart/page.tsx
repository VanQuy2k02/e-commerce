'use client';
import { useCartStore } from '@/zustand/useCartStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Cart() {
  const router = useRouter();
  const { carts, increment, decrement, deleteCart, fetchDataCart } = useCartStore();

  const total = carts.reduce((sum, item) => {
    return sum + Number(item.product.price) * item.quantity;
  }, 0);

  const handleDeleteCartItem = (productId: number) => {
    deleteCart(productId);
    toast.success('Xóa sản phẩm thành công', { duration: 2000 });
  };

  useEffect(() => {
    fetchDataCart();
  }, []);
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-1c mb-8">Shopping Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT - CART LIST */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
          {carts.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {carts.map((item, index) => {
                const price = Number(item.product.price);
                const totalPrice = price * item.quantity;

                return (
                  <li key={index} className="p-6 flex items-center gap-6">
                    {/* Product image */}
                    <div className="w-[100px] h-[100px] rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                      <Image
                        src={'/images/cart-product1.png'}
                        alt="anh"
                        width={100}
                        height={100}
                        className="object-cover"
                      />
                    </div>

                    {/* Product info */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-1c text-lg">{item.product.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{item.product.categoryName}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Unit price: ${item.product.price}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decrement(item.product.id)}
                        disabled={item.quantity === 1 || (item.product.stock ?? 0) < item.quantity}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-12 h-10 flex items-center justify-center text-sm font-medium border border-gray-300 rounded-md">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increment(item.product.id)}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="w-[100px] text-right font-semibold text-1c text-lg">
                      ${totalPrice.toFixed(2)}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => handleDeleteCartItem(item.product.id)}
                      className="text-sm text-red-500 hover:underline ml-4"
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-12 text-center text-gray-500 text-lg">
              Chưa có sản phẩm nào trong giỏ hàng
            </div>
          )}
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 h-fit shadow-sm">
          <h3 className="text-xl font-bold text-1c mb-6">Order Summary</h3>

          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>

          <div className="border-t pt-6 mt-6 flex justify-between font-semibold text-1c text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => router.push('/cart/checkout')}
            disabled={carts.length === 0}
            className={`
    mt-8 w-full py-4 rounded-md font-semibold transition-all
    ${
      carts.length === 0
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
        : 'bg-black text-white hover:opacity-90'
    }
  `}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Continue shopping */}
      <div className="mt-8 text-center">
        <button
          onClick={() => router.push('/products')}
          className="text-sm font-medium text-1c hover:underline"
        >
          ← Continue Shopping
        </button>
      </div>
    </div>
  );
}
