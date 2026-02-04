import ListProduct from '@/components/common/ListProduct';
import SideBar from '@/components/layout/SideBar';

export default function ProductPage() {
  return (
    <div className="max-w-[1280px] mx-auto w-full">
      <div className="px-6 py-5 flex gap-1">
        <SideBar />
        <ListProduct />
      </div>
    </div>
  );
}

// 'use client';

// import ListProduct from '@/components/common/ListProduct';
// import { handleProduct } from '@/service/product';
// import { useRouter } from 'next/navigation';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
// import { useState } from 'react';
// export default function PriceRange() {
//   const router = useRouter();
//   const PAGE_DEFAULT = 1;
//   const LIMIT_DEFAULT = 10;
//   const [valuee, setValuee] = useState({
//     value1: 1,
//     value2: 10000,
//   });

//   const handleAfterChange = (value: number | number[]) => {
//     if (!Array.isArray(value)) return;
//     setValuee({ value1: value[0], value2: value[1] });
//     router.replace(
//       `/products?page=${PAGE_DEFAULT}&limit=${LIMIT_DEFAULT}&minPrice=${value[0]}&maxPrice=${value[1]}`,
//       { scroll: false },
//     );
//   };
//   const handleSunmit = async () => {
//     const res = await handleProduct.getProduct({
//       minPrice: valuee.value1,
//       maxPrice: valuee.value2,
//       page: PAGE_DEFAULT,
//       limit: LIMIT_DEFAULT,
//     });
//     console.log(res, 'data');
//   };

//   return (
//     <main>
//       <div className="w-[288px]">
//         <Slider
//           range
//           min={1}
//           max={10000}
//           defaultValue={[1, 10000]}
//           onChangeComplete={handleAfterChange}
//         />
//         <div className="w-full flex justify-between">
//           <p>$1</p>
//           <p>$10000</p>
//         </div>
//       </div>
//       <button className="px-4 py-3 bg-9c text-white rounded-md" onClick={handleSunmit}>
//         Click
//       </button>
//       <ListProduct minPrice={valuee.value1} maxPrice={valuee.value2} limit={5} />
//     </main>
//   );
// }
