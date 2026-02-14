import { handleProduct } from '@/service/product';
import { ProductDetailProps } from '@/types/typeProduct';
import Image from 'next/image';

interface productIDProps {
  productID: string;
}

export default async function InfoProduct({ productID }: productIDProps) {
  const product: ProductDetailProps = await handleProduct.getDetailProduct(productID);

  return (
    <div className="px-4 py-6 bg-white rounded-xl border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          <Image
            src="/images/product-image.jpg"
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-1c">{product.name}</h2>

          <p className="mt-2 text-sm text-gray-500">
            Category: <span className="font-medium">{product.categoryName}</span> | Supplier:{' '}
            <span className="font-medium">{product.supplierName}</span>
          </p>

          {/* Price */}
          <p className="mt-4 text-2xl font-extrabold text-9c">${product.price}</p>

          {/* Description */}
          <div className="mt-4">
            <h4 className="font-semibold text-1c mb-1">Description</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <button
              className="
                flex-1
                px-4 py-3
                rounded-md
                text-sm font-semibold
                text-white
                bg-9c
                hover:opacity-90
                transition
              "
            >
              Add to Cart
            </button>

            <button
              className="
                flex-1
                px-4 py-3
                rounded-md
                text-sm font-semibold
                text-white
                bg-red-500
                hover:opacity-90
                transition
              "
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
