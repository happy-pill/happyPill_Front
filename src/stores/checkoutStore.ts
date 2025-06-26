import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CheckoutProduct {
  productId: string;
  name: string;
  price: number;
  period: number;
  thumbnailUrl: string;
}

interface CheckoutStoreState {
  items: CheckoutProduct[];
  setItems: (items: CheckoutProduct[]) => void;
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
      clearItems: () => set(() => ({ items: [] })),
    }),
    {
      name: 'checkout-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useCheckoutStore;
