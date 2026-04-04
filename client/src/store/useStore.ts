import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface StoreEntity {
  id: string;
  name: string;
  createdAt: number;
}

interface MarketState {
  stores: StoreEntity[];
  addStore: (name: string) => void;
  updateStoreName: (id: string, newName: string) => void;
  removeStore: (id: string) => void;
}

export const useMarketStore = create<MarketState>()(
  persist(
    (set) => ({
      stores: [
        { id: '1', name: 'Toko Sumber Rejeki', createdAt: Date.now() },
        { id: '2', name: 'Minimarket Amanah', createdAt: Date.now() - 100000 }
      ],
      addStore: (name) => set((state) => ({
        stores: [...state.stores, { id: crypto.randomUUID(), name, createdAt: Date.now() }]
      })),
      updateStoreName: (id, newName) => set((state) => ({
        stores: state.stores.map((s) => s.id === id ? { ...s, name: newName } : s)
      })),
      removeStore: (id) => set((state) => ({
        stores: state.stores.filter((s) => s.id !== id)
      }))
    }),
    {
      name: 'market-storage'
    }
  )
);
