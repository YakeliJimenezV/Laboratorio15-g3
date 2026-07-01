import { useQuery } from "@tanstack/react-query";

import { moviesService } from "@/services/movies-service";

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: ["movies", "popular", page],
    queryFn: () => moviesService.getPopular(page),
  });
}