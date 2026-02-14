'use client';
import { handleProduct } from '@/service/product';
import { ReviewItem, ReviewListResponse } from '@/types/typeReviewsProduct';
import { formatDate } from '@/utilities/formatDate';
import Image from 'next/image';
import StarRating from '../ui/Rating';
import { useEffect, useState } from 'react';
import useAuthStore from '@/zustand/useAuthStore';

interface productIDProps {
  productID: string;
}
const DISPLAY_LIMIT = 3;
export default function ReviewProduct({ productID }: productIDProps) {
  const [comment, setComment] = useState<ReviewItem[]>([]);
  const [showAll, setShowAll] = useState(false);
  const { user } = useAuthStore();
  console.log(user, 'user');

  useEffect(() => {
    try {
      const loadDataReview = async () => {
        const res: ReviewListResponse = await handleProduct.getReviewsProduct(productID);
        setComment((prev) => [...res.reviews, ...prev]);
      };
      loadDataReview();
    } catch (error) {
      console.log(error);
    }
  }, [productID]);

  const totalRating =
    comment.length > 0 &&
    comment.reduce((acc, item) => {
      return acc + item.rating;
    }, 0);
  const ratingTB = comment.length > 0 ? Number(totalRating) / comment.length : 0;

  const showCommentLimit = showAll ? comment : comment.slice(0, DISPLAY_LIMIT);

  return (
    <div className="px-4 py-6 bg-white rounded-xl border border-gray-200">
      {/* Rating summary */}
      <div className="flex items-center gap-4">
        <h2 className="text-4xl font-extrabold text-1c">{ratingTB.toFixed(1)}</h2>
        <div>
          <StarRating rating={ratingTB} />
          <p className="text-sm text-gray-500">{comment.length} đánh giá</p>
        </div>
      </div>

      {/* Write review */}
      <div className="flex gap-3 items-start">
        <div className="w-10 h-10 flex-shrink-0">
          <Image
            src="/images/default-avatar.png"
            alt="user avatar"
            width={40}
            height={40}
            unoptimized
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="mb-2">
            <StarRating rating={0} />
            <p className="text-xs text-gray-500 mt-1">Chọn số sao đánh giá</p>
          </div>

          <textarea
            placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
            rows={3}
            className="
        w-full
        p-3
        text-sm
        border border-gray-300
        rounded-md
        resize-none
        focus:outline-none
        focus:ring-1
        focus:ring-gray-400
      "
          />

          <div className="flex justify-end mt-3">
            <button
              className="
          px-4 py-2
          rounded-md
          text-sm font-semibold
          text-white
          bg-9c
          hover:opacity-90
          transition
        "
            >
              Gửi đánh giá
            </button>
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-1c mt-8">Nhận xét của khách hàng</h3>

      {/* Review list */}
      <ul className="flex flex-col gap-6 mt-4">
        {showCommentLimit.length > 0 ? (
          showCommentLimit.map((item, index) => (
            <li key={index} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
              <div className="flex gap-3 items-center">
                <Image
                  src="/images/default-avatar.png"
                  alt={item.customer.username}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-1c">{item.customer.username}</p>
                  <p className="text-xs text-gray-500">{formatDate(item.createdAt)}</p>
                </div>
              </div>

              <div className="mt-2">
                <StarRating rating={item.rating} />
              </div>

              <p className="mt-3 text-sm text-gray-700 leading-relaxed">{item.body}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Chưa có đánh giá nào</p>
        )}
      </ul>

      {/* Button Xem thêm / Thu gọn */}
      {comment.length > DISPLAY_LIMIT && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="
            px-6 py-2
            rounded-full
            border border-gray-300
            text-sm font-medium text-gray-700
            hover:bg-gray-100
            transition
          "
          >
            {showAll ? 'Thu gọn' : 'Xem thêm đánh giá'}
          </button>
        </div>
      )}
    </div>
  );
}
