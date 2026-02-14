import { create } from 'zustand';
import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  duration?: number; // ms
}

interface ToastState {
  show: (type: ToastType, message: string, options?: ToastOptions) => void;
}

export const useToastStore = create<ToastState>(() => ({
  show: (type, message, options) => {
    if (type === 'success') toast.success(message, options);
    if (type === 'error') toast.error(message, options);
    if (type === 'info') toast(message, options);
  },
}));
