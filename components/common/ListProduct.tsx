'use client';
import { handleProduct } from '@/service/product';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ParamsProps } from '@/types/typeParams';
import { Product, ResponseProduct } from '@/types/typeProduct';
import { formatBigNumber } from '@/utilities/formatBigNumber';
import { useRouter, useSearchParams } from 'next/navigation';
import PaginationPage from './PaginationPage';
import { useCartStore } from '@/zustand/useCartStore';
import useWishListStore from '@/zustand/useWishListStore';

export default function ListProduct({
  // category,
  supplier,
  hideOutOfStock,
}: ParamsProps) {
  const searchParams = useSearchParams();
  const [products, setProduct] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<ResponseProduct>();
  const page = Number(searchParams.get('page')) || 1;
  const category = String(searchParams.get('category')) || '';
  const orderBy = String(searchParams.get('orderBy')) || '';
  const order = String(searchParams.get('order')) || '';
  const minPrice = Number(searchParams.get('minPrice')) || 1;
  const maxPrice = Number(searchParams.get('maxPrice')) || 10000;
  const limit = 25;
  const router = useRouter();
  const { addToCart } = useCartStore();
  const { toggle, wishlistItems } = useWishListStore();

  const handleAddToCart = (productId: number) => {
    if (!productId) return;
    addToCart(productId);
  };

  const addToWishlist = (productId: number) => {
    if (!productId) return;
    toggle(productId);
  };

  useEffect(() => {
    const loadingDataProduct = async () => {
      const res = await handleProduct.getProduct({
        page,
        limit,
        category,
        supplier,
        orderBy,
        order,
        hideOutOfStock,
        minPrice,
        maxPrice,
      });

      setPagination(res);
      setProduct(res.products);
    };
    loadingDataProduct();
  }, [page, limit, category, supplier, orderBy, order, hideOutOfStock, minPrice, maxPrice]);

  // const page = pagination?.page;
  let totalPages = 0;
  if (pagination?.totalResults && pagination.count) {
    totalPages = Math.ceil(pagination.totalResults / pagination.count);
  }

  return (
    <div className="px-4 max-w-[1100px] mx-auto">
      <h2 className="mt-6 mb-4 text-xl font-bold text-gray-900">Products</h2>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((item) => {
            const heart = wishlistItems.length > 0 && wishlistItems.map((item) => item.product.id);
            return (
              <li
                key={item.id}
                className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* IMAGE */}
                <div
                  onClick={() => router.push(`/products/${item.id}`)}
                  className="relative cursor-pointer"
                >
                  <Image
                    src="/images/product-image.jpg"
                    alt={item.name}
                    width={300}
                    height={360}
                    className="h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />

                  {/* Category */}
                  <span className="absolute top-3 left-3 bg-white/90 text-gray-900 text-xs font-medium px-3 py-1 rounded-full shadow">
                    {item.categoryName}
                  </span>

                  {/* Out of stock */}
                  {item.stock === 0 && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                      Hết hàng
                    </span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[40px]">
                    {item.name}
                  </h3>

                  <p className="text-xs text-gray-500">{item.categoryName}</p>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-gray-900">
                      {formatBigNumber(item.price, true)}
                    </span>

                    {/* Wishlist */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(item.id);
                      }}
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-red-50 hover:border-red-300 transition"
                    >
                      {Array.isArray(heart) && heart.includes(item.id) ? '❤️' : '🤍'}
                    </button>
                  </div>

                  {/* ADD TO CART */}
                  <button
                    disabled={item.stock === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item.id);
                    }}
                    className={`mt-3 w-full text-sm py-2.5 rounded-xl font-medium transition
        ${
          item.stock === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
                  >
                    {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <li className="col-span-full flex flex-col items-center py-16">
            <Image src="/images/noSearch-image.png" alt="noSearch" width={360} height={203} />
            <p className="mt-6 text-gray-900 font-semibold">No products found</p>
            <p className="mt-2 text-sm text-gray-500">
              Try adjusting your filters or search keywords.
            </p>
          </li>
        )}
      </ul>

      <div className="mt-8">
        <PaginationPage totalPages={totalPages} page={page} />
      </div>
    </div>
  );
}
