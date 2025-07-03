import type { CartType } from '@/types/cart-type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
    carts: CartType[];
    addCart: (cart: CartType) => void;
}

const useCartStore = create(persist<CartStore>((set) => ({
    carts: [],
    addCart: (cart) => set((state) => ({ carts: [cart, ...state.carts] }))
}), {
    name: 'carts'
}));

export { useCartStore };