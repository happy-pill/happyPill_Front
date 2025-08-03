import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { CheckoutProduct } from '@/types/products';

interface CheckoutStoreState {
  items: CheckoutProduct[];
  setItems: (items: CheckoutProduct[]) => void;
  addItem: (item: CheckoutProduct) => void; // 추가
  clearItems: () => void;
}

const useCheckoutStore = create<CheckoutStoreState>()(
  persist(
    (set) => ({
      items: [],
      setItems: (items) =>
        set(() => ({
          items,
        })),
      addItem: (item) =>
        set(() => ({
          items: [item],
        })),
      clearItems: () => set(() => ({ items: [] })),
    }),
    {
      name: 'purchase-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCheckoutStore;
