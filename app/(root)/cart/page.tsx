'use client';
import { carts_products } from '@/constants/products';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const router = useRouter();
  const total = carts_products
    .reduce((sum, item) => {
      const price = Number(item.price.replace('$', ''));
      return sum + price * item.quantity;
    }, 0)
    .toFixed(2);
  return (
    <div className="max-w-[1280px] mx-auto w-full">
      <div className="px-6 py-5 flex gap-1 justify-between">
        <div className="w-[868px]">
          <h3 className="px-4 py-4 text-1c text-[32px] leading-10 font-bold">Shopping Cart</h3>
          <ul>
            {carts_products.length > 0 &&
              carts_products.map((item, index) => {
                const priceNumber = Number(item.price.replace('$', ''));
                const totalPrice = priceNumber * item.quantity;
                return (
                  <li key={index} className="py-3 px-4 flex justify-between items-center">
                    <div className="flex gap-4 items-center w-75">
                      <Image src={item.image} alt="product_cart-image" width={70} height={70} />
                      <div>
                        <h5 className="text-1c leading-6 font-medium">{item.name}</h5>
                        <p className="text-8a text-14 leading-height-21">
                          Unit Price: ${item.price}
                        </p>
                        <p className="text-8a text-14 leading-height-21">Size: ${item.size}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="w-7 h-7 rounded-full flex justify-center items-center bg-f5">
                        -
                      </button>
                      <span className="w-7 h-7 bg-f5 flex items-center justify-center text-14">
                        {item.quantity}
                      </span>
                      <button className="w-7 h-7 rounded-full flex justify-center items-center bg-f5">
                        +
                      </button>
                    </div>
                    <div>$ {totalPrice}</div>
                    <button className="w-7 h-7 bg-red-500 text-white rounded-sm">x</button>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="px-4 py-4">
          <Image src="/images/cart-image.png" alt="cart_image" width={328} height={246} />
          <div className="flex justify-between mt-3">
            <p className="text-1c text-18 leading-height-23">Total:</p>
            <p>$ {total}</p>
          </div>
          <button className="py-[9.5px] w-full text-14 bg-f2 rounded-[8px] text-white mt-3">
            Proceed to Checkout
          </button>
        </div>
      </div>
      <div className="px-10 py-3">
        <button
          onClick={() => router.push('/')}
          className="px-4 py-[9.5px] rounded-[8px] bg-f5 text-1c font-bold text-14 leading-height-21"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
