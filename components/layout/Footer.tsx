import { menu_footer } from '@/constants/menu';
import Image from 'next/image';
import React from 'react';

export default function Footer() {
  return (
    <div className="container-custom px-5 py-10">
      <div className="flex flex-col gap-6">
        <ul className="flex gap-[30px]">
          {menu_footer.length > 0 &&
            menu_footer.map((item, key) => (
              <li key={key} className="text-9c leading-6 font-normal w-40 text-center">
                {item}
              </li>
            ))}
        </ul>
        <div className="flex gap-4 items-center justify-center">
          <Image src="/images/tw.png" alt="Twitter_icon" width={24} height={24} />
          <Image src="/images/ig.png" alt="Instagram_icon" width={24} height={24} />
          <Image src="/images/fb.png" alt="Facebook_icon" width={24} height={24} />
        </div>
        <p className="text-center text-9c leading-6 font-normal">
          @2024 StyleHub. All rights reserved.
        </p>
      </div>
    </div>
  );
}
