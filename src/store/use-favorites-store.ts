import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favoriteIds: number[];
  toggleFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      toggleFavorite: (movieId) => {
        const { favoriteIds } = get();
        const exists = favoriteIds.includes(movieId);

        set({
          favoriteIds: exists
            ? favoriteIds.filter((id) => id !== movieId)
            : [...favoriteIds, movieId],
        });
      },

      isFavorite: (movieId) => get().favoriteIds.includes(movieId),
    }),
    {
      name: "cinespoilers-favorites",
    }
  )
);