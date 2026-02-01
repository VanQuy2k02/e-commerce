'use client';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { trending_products } from '@/constants/products';
import Image from 'next/image';
export default function TrendingProducts() {
  return (
    <main className="mb-5">
      <p className="text-22 text-1c font-bold leading-7 px-4 pt-5 pb-3">Trending Products</p>
      <div className="px-4 py-4">
        <Swiper spaceBetween={12} slidesPerView={3.5}>
          {trending_products.length > 0 &&
            trending_products.map((item, index) => (
              <SwiperSlide key={index} className="!w-60">
                <div className="w-60 h-[381px] ">
                  <Image src={item.image} alt="trending-product_image" width={240} height={320} />
                  <p className="mt-4 text-1c leading-6 font-normal">{item.name}</p>
                  <p className="text-9c text-14 leading-height-21 font-normal">{item.price}</p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </main>
  );
}
