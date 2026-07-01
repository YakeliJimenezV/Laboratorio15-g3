import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Purchase {
  ticketId: string;
  movieId: number;
  movieTitle: string;
  posterPath: string | null;
  price: number;
  buyerName: string;
  buyerEmail: string;
  purchasedAt: string;
}

interface PurchasesState {
  purchases: Purchase[];
  addPurchase: (purchase: Purchase) => void;
  hasPurchased: (movieId: number) => boolean;
}

export const usePurchasesStore = create<PurchasesState>()(
  persist(
    (set, get) => ({
      purchases: [],

      addPurchase: (purchase) => {
        set({ purchases: [purchase, ...get().purchases] });
      },

      hasPurchased: (movieId) =>
        get().purchases.some((p) => p.movieId === movieId),
    }),
    {
      name: "cinespoilers-purchases",
    }
  )
);