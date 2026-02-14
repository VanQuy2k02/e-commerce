'use client';
import { menu } from '@/constants/menu';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuthStore from '@/zustand/useAuthStore';
import { Auth } from '@/service/authencation';
import { signoutRes } from '@/types/typeAuth';
import { toast } from 'sonner';
import { useCartStore } from '@/zustand/useCartStore';
import { useEffect } from 'react';
import useWishListStore from '@/zustand/useWishListStore';
export default function Header() {
  const { carts, fetchDataCart } = useCartStore();
  const { fetchDataWishList, wishlistItems } = useWishListStore();
  const { user, logout } = useAuthStore();
  const authen = !!user;
  const router = useRouter();
  const id = user?.id;

  useEffect(() => {
    fetchDataCart();
    fetchDataWishList();
  }, [user]);

  const handleLogout = async () => {
    try {
      const res: signoutRes = await Auth.logout();
      if (res.status === 200) {
        logout();
        toast.success('Đăng xuất thành công', { duration: 2000 });
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className=" max-w-[1280px] w-full mx-auto border-b border-gray-300 ">
      <div className="flex justify-between items-center px-10 py-4 ">
        <div onClick={() => router.push('/')} className="flex gap-4 items-center cursor-pointer">
          <Image src="/images/logo.png" alt="logo_img" width={16} height={16} />
          <h3 className="text-18 text-1c font-bold leading-height-23">StyleHub</h3>
        </div>
        <div className="flex gap-8 items-center">
          <ul className="flex gap-9 items-center">
            {menu.length > 0 &&
              menu.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.src}
                    className="text-14 text-1c font-medium leading-height-21 py-[9.5px] cursor-pointer hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
          </ul>
          <div className="flex gap-2">
            <div className="relative">
              <button
                onClick={() => router.push('/products/wishlist')}
                className="bg-f5 w-10 h-10 rounded-lg flex items-center justify-center"
              >
                <Image src="/images/wislist.png" alt="wishlist_icon" width={20} height={20} />
              </button>

              {/* Badge */}
              <span
                className="
      absolute
      -top-1
      -right-1
      min-w-[16px]
      h-[16px]
      px-1
      rounded-full
      bg-green-500
      text-white
      text-[10px]
      font-bold
      flex
      items-center
      justify-center
      leading-none
    "
              >
                {wishlistItems.length}
              </span>
            </div>

            <div className="relative">
              <button
                onClick={() => router.push('/cart')}
                className="bg-f5 w-10 h-10 rounded-lg flex items-center justify-center"
              >
                <Image src="/images/cart.png" alt="cart_icon" width={20} height={20} />
              </button>

              {/* Badge cart */}
              <span
                className="
      absolute
      -top-1
      -right-1
      min-w-[16px]
      h-[16px]
      px-1
      rounded-full
      bg-red-500
      text-white
      text-[10px]
      font-bold
      flex
      items-center
      justify-center
      leading-none
    "
              >
                {carts.length}
              </span>
            </div>
          </div>
          <div>
            {authen ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="outline-none">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-48" align="end" sideOffset={8}>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Tài khoản
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => router.push(`/profile/${id}`)}
                  >
                    👤 Hồ sơ
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => router.push('/orders')}
                  >
                    📦 Đơn hàng của tôi
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="cursor-pointer text-red-500 focus:text-red-500"
                    onClick={handleLogout}
                  >
                    🚪 Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="bg-f5 w-10 h-10 rounded-lg flex items-center justify-center ">
                    <Image src="/images/user.png" alt="wishlist_icon" width={20} height={20} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="start">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Authentication</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => router.push('/login')}>
                      Login
                      <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push('/register')}>
                      Signup
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
