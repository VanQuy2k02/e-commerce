'use client';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { category_menu, orderBy_menu } from '@/constants/category';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function SideBar() {
  const router = useRouter();
  const [select, setSelect] = useState<string | null>(null);
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    router.replace(`/products?category=${value}`);
    setSelect((prev) => (prev === value ? null : value));
  };

  const handleAfterChange = (value: number | number[]) => {
    if (!Array.isArray(value)) return;
    console.log(value[0]);
    console.log(value[1]);
  };

  return (
    <div className="max-w-[320px] px-4">
      <div>
        <h3 className="mt-4 mb-2 text-1c text-18 font-bold leading-height-23">Categories</h3>
        <ul>
          {category_menu.length > 0 &&
            category_menu.map((item, index) => (
              <li key={index} className="flex gap-3 items-center py-3">
                <input
                  type="checkbox"
                  value={item}
                  checked={item === select}
                  className="w-5 h-5 bg-[#CFD9E8] rounded-sm"
                  onChange={handleOnchange}
                />
                <p className="text-1c leading-6 font-normal">{item}</p>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h3 className="mt-4 mb-2 text-1c text-18 font-bold leading-height-23">Price Range</h3>
        <div className="px-4 py-4">
          <p className="text-1c leading-6 font-medium">Price</p>
          <div className="w-[288px] mt-3">
            <Slider
              range
              min={1}
              max={10000}
              defaultValue={[1, 10000]}
              onChangeComplete={handleAfterChange}
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="mt-4 mb-2 text-1c text-18 font-bold leading-height-23">Sort By</h3>
        <ul className="my-4 flex flex-col gap-3">
          {orderBy_menu.length > 0 &&
            orderBy_menu.map((item, index) => (
              <li key={index} className="flex flex-col gap-5">
                <div className="px-[15px] py-[15.5px] flex gap-4 items-center rounded-[8px] border border-[#CFD9E8]">
                  <input
                    type="radio"
                    name="chose"
                    value={item.value}
                    className="w-5 h-5 bg-f2"
                    onChange={handleOnchange}
                  />
                  <p className="text-1c text-14 font-medium leading-height-21">{item.name}</p>
                </div>
              </li>
            ))}
          <select
            name=""
            id=""
            className="px-[15px] py-[15.5px] flex gap-4 items-center rounded-[8px] border border-[#CFD9E8]"
          >
            <option value="" className="text-1c text-14 font-medium leading-height-21">
              Sắp xếp theo
            </option>
            <option value="asc" className="text-1c text-14 font-medium leading-height-21">
              Low to High
            </option>
            <option value="desc" className="text-1c text-14 font-medium leading-height-21">
              High to Low
            </option>
          </select>
        </ul>
      </div>
    </div>
  );
}
