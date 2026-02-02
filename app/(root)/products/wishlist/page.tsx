'use client';
import { wishlist_products } from '@/constants/products';
import Image from 'next/image';

export default function WishlistPage() {
  const handleWishlist = (id: number) => {
    console.log(id);
  };
  return (
    <div className="max-w-[960px] mx-auto w-full my-5">
      <div>
        <h3 className="px-4 py-4 text-1c font-bold text-[32px] leading-10">My Wishlist</h3>
        <ul className="px-4 py-4 grid grid-cols-4 gap-3">
          {wishlist_products.length > 0 &&
            wishlist_products.map((item, index) => (
              <li key={index} onClick={() => handleWishlist(item.id)}>
                <Image src={item.image} alt="wishlist-product_image" width={223} height={297} />
                <div className="my-3">
                  <p className="text-1c font-medium leading-6">{item.name}</p>
                  <p className="text-9c font-normal text-14 leading-height-21">{item.price}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex justify-between px-4 py-3 mb-[9px]">
        <button className="bg-f2 text-[#F7FAFC] px-4 py-[9.5px] rounded-[8px] text-14 font-bold leading-height-21">
          Add to Cart
        </button>
        <button className="bg-f5 text-1c px-4 py-[9.5px] rounded-[8px] text-14 font-bold leading-height-21">
          Remove
        </button>
      </div>
    </div>
  );
}
