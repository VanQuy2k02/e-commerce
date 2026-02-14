import { WishlistItem } from '@/types/typeWishlist';

export const handleWishList = {
  getWishList: async () => {
    const res = await fetch('http://localhost:3000/api/wishlist');
    const result = await res.json();
    if (!res.ok) {
      console.log('Backend Error');
    }
    return result.wishlist.wishlistItems;
  },
  updateWishList: async (data: WishlistItem[]) => {
    const res = await fetch('http://localhost:3000/api/wishlist', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        authorization: 'swagger ui',
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      console.log('Backend Error');
    }
    return result.wishlist;
  },
};
