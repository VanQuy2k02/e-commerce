import { menu } from '@/constants/menu';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
export default function Header() {
  return (
    <main className=" max-w-[1280px] w-full mx-auto border-b border-gray-300 ">
      <div className="flex justify-between items-center px-10 py-4 ">
        <div className="flex gap-4 items-center">
          <Image src="/images/logo.png" alt="logo_img" width={16} height={16} />
          <h3 className="text-18 text-1c font-bold leading-height-23">StyleHub</h3>
        </div>
        <div className="flex gap-8 items-center">
          <ul className="flex gap-9 items-center">
            {menu.length > 0 &&
              menu.map((item, index) => (
                <li
                  key={index}
                  className="text-14 text-1c font-medium leading-height-21 py-[9.5px] cursor-pointer"
                >
                  {item}
                </li>
              ))}
          </ul>
          <div className="flex gap-2">
            <button className="bg-f5 w-10 h-10 rounded-lg flex items-center justify-center ">
              <Image src="/images/wislist.png" alt="wishlist_icon" width={20} height={20} />
            </button>
            <button className="bg-f5 w-10 h-10 rounded-lg flex items-center justify-center ">
              <Image src="/images/cart.png" alt="wishlist_icon" width={20} height={20} />
            </button>
          </div>
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </main>
  );
}
