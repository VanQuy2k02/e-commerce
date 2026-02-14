'use client';
import { useCartStore } from '@/zustand/useCartStore';
import useWishListStore from '@/zustand/useWishListStore';
import Image from 'next/image';
import { useEffect } from 'react';

export default function WishlistPage() {
  const { wishlistItems, toggle, fetchDataWishList } = useWishListStore();
  const { addToCart } = useCartStore();

  const handleToggle = (id: number) => {
    if (!id) return;
    toggle(id);
  };

  const handleAddToCart = (id: number) => {
    if (!id) return;
    addToCart(id);
  };

  useEffect(() => {
    fetchDataWishList();
  }, []);
  return (
    <div className="max-w-[1200px] mx-auto px-4 my-10">
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">My Wishlist</h2>
        <span className="text-sm text-gray-500">{wishlistItems.length} items</span>
      </div>

      {/* EMPTY */}
      {wishlistItems.length === 0 && (
        <div className="flex flex-col items-center py-24 text-center">
          <Image src="/images/noSearch-image.png" alt="empty" width={320} height={220} />
          <p className="mt-6 text-xl font-semibold text-gray-900">Your wishlist is empty</p>
          <p className="text-sm text-gray-500 mt-2 max-w-md">
            Browse products and tap the heart icon to save your favorite items here.
          </p>
        </div>
      )}

      {/* LIST */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlistItems.length > 0 &&
          wishlistItems.map((item) => (
            <li
              key={item.product.id}
              className="group relative bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* IMAGE */}
              <div className="relative h-[260px] overflow-hidden">
                <Image
                  src="/images/cart-product1.png"
                  alt="image-product"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

                {/* REMOVE */}
                <button
                  onClick={() => handleToggle(item.product.id)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-50"
                >
                  ❌
                </button>

                {/* STOCK BADGE */}
                {item.product.stock === 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Out of stock
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[42px]">
                  {item.product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-gray-900">${item.product.price}</p>

                  <span className="text-xs text-gray-500">Stock: {item.product.stock}</span>
                </div>

                {/* ACTION */}
                <button
                  disabled={item.product.stock === 0}
                  onClick={() => handleAddToCart(item.product.id)}
                  className={`mt-2 w-full py-3 rounded-xl text-sm font-semibold transition
                  ${
                    item.product.stock === 0
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {item.product.stock === 0 ? 'Unavailable' : 'Add to Cart'}
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
