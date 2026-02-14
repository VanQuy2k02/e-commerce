import Image from 'next/image';

interface StarRatingProps {
  rating: number; // 1 → 5
}

export default function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex gap-1 mt-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= rating ? (
            <Image src="/images/star-black.png" alt="star_image" width={20} height={20} />
          ) : (
            <Image src="/images/star-white.png" alt="star_image" width={20} height={20} />
          )}
        </span>
      ))}
    </div>
  );
}
