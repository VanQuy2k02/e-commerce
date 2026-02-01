import { featured_collection } from '@/constants/products';
import Image from 'next/image';

export default function FeatureCollection() {
  return (
    <div>
      <p className="text-22 text-1c font-bold leading-7 px-4 pt-5 pb-3">Featured Collections</p>
      <ul className="flex gap-3 px-4 py-4">
        {featured_collection.length > 0 &&
          featured_collection.map((item, index) => (
            <li key={index} className="w-[301px] h-[218px]">
              <Image src={item.image} alt="featured-collection_image" width={301} height={169} />
              <p className="my-3 text-1c font-medium leading-6">{item.name}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
