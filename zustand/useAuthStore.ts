import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  joinDate: string;
  phone: string | null;
  billingAddressId: number | null;
  shippingAddressId: number | null;
  avatar: string | null;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', // key trong localStorage
    },
  ),
);

export default useAuthStore;
