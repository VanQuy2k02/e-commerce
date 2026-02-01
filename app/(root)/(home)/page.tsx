import Banner from './_components/Banner';
import FeatureCollection from './_components/FeatureCollection';
import TrendingProducts from './_components/TrendingProducts';

export default function Home() {
  return (
    <main className="container-custom mt-5">
      <Banner />
      <FeatureCollection />
      <TrendingProducts />
    </main>
  );
}
