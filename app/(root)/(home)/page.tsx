'use client';
import { useCartStore } from '@/zustand/useCartStore';
import Banner from './_components/Banner';
import FeatureCollection from './_components/FeatureCollection';
import TrendingProducts from './_components/TrendingProducts';
import { useEffect } from 'react';

export default function Home() {
  const { fetchDataCart } = useCartStore();
  useEffect(() => {
    fetchDataCart();
  }, []);
  return (
    <main className="container-custom mt-5">
      <Banner />
      <FeatureCollection />
      <TrendingProducts />
    </main>
  );
}
