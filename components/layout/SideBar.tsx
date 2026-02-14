'use client';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { category_menu, order_menu, orderBy_menu } from '@/constants/category';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function SideBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sort = searchParams.get('order') || '';
  const orderBy = searchParams.get('orderBy') || '';
  const select = searchParams.get('category');
  const minPrice = Number(searchParams.get('minPrice')) || 1;
  const maxPrice = Number(searchParams.get('maxPrice')) || 10000;

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, type, name } = e.target;
    const params = new URLSearchParams(searchParams.toString());
    if (type === 'checkbox') {
      const currenCategory = params.get('category');
      if (currenCategory === value) {
        params.delete('category');
        params.delete('page');
      } else {
        params.set('category', String(value));
        params.set('page', String(1));
      }
      router.replace(`/products/?${params.toString()}`);
    }

    if (type === 'radio' && name === 'chose') {
      if (!value) return;
      params.set('orderBy', String(value));
      router.replace(`/products?${params.toString()}`);
    }

    if (type === 'radio' && name === 'chose-order') {
      if (!value) return;
      params.set('order', String(value));
      params.set('page', String(1));
      router.replace(`/products?${params.toString()}`);
    }
  };

  const handleAfterChange = (value: number | number[]) => {
    if (!Array.isArray(value)) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('minPrice', String(value[0]));
    params.set('maxPrice', String(value[1]));
    params.set('page', String(1));
    router.replace(`/products?${params.toString()}`);
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
              key={`${minPrice}-${maxPrice}`}
              range
              min={1}
              max={10000}
              defaultValue={[minPrice, maxPrice]}
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
                    checked={orderBy === item.value}
                    className="w-5 h-5 bg-f2"
                    onChange={handleOnchange}
                  />
                  <p className="text-1c text-14 font-medium leading-height-21">{item.name}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h3 className="mt-4 mb-2 text-1c text-18 font-bold leading-height-23">Order</h3>
        <ul className="my-4 flex flex-col gap-3">
          {order_menu.length > 0 &&
            order_menu.map((item, index) => (
              <li key={index} className="flex flex-col gap-5">
                <div className="px-[15px] py-[15.5px] flex gap-4 items-center rounded-[8px] border border-[#CFD9E8]">
                  <input
                    type="radio"
                    name="chose-order"
                    value={item.value}
                    checked={sort === item.value}
                    className="w-5 h-5 bg-f2"
                    onChange={handleOnchange}
                  />
                  <p className="text-1c text-14 font-medium leading-height-21">{item.name}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
