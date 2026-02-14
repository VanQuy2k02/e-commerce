import { handleWishList } from '@/service/wishlist';
import { create } from 'zustand';
import useAuthStore from './useAuthStore';
import { useToastStore } from './useToastStore';

export interface WishlistProduct {
  id: number;
  name?: string;
  description?: string;
  price?: string; // backend trả string
  stock?: number;
  categoryName?: string;
  supplierName?: string;
  thumbnail?: string;
}

export interface WishlistItem {
  product: WishlistProduct;
}

export interface WishlistResponse {
  wishlistItems: WishlistItem[];
  fetchDataWishList: () => void;
  toggle: (productId: number) => void;
}

const useWishListStore = create<WishlistResponse>((set, get) => ({
  wishlistItems: [],
  fetchDataWishList: async () => {
    const res = await handleWishList.getWishList();
    set({ wishlistItems: res });
  },
  toggle: async (productId) => {
    const customerId = useAuthStore.getState()?.user?.id;
    const toast = useToastStore.getState();
    if (!customerId) return;
    const prev = get().wishlistItems;
    const existed = prev.some((item) => item.product.id === productId);
    let newArray;
    if (existed) {
      newArray = prev.filter((item) => item.product.id !== productId);
      toast.show('success', 'Xóa yêu thích thành công', { duration: 2000 });
    } else {
      newArray = [...prev, { product: { id: productId } }];
      toast.show('success', 'Thêm yêu thích thành công', { duration: 2000 });
    }

    set({ wishlistItems: newArray });
    try {
      const data = newArray.map((item) => {
        return {
          customerId: 12,
          productId: item.product.id,
        };
      });
      await handleWishList.updateWishList(data);
    } catch (error) {
      set({ wishlistItems: prev });
    }
  },
}));

export default useWishListStore;
