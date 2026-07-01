import { useQuery } from "@tanstack/react-query";

import { moviesService } from "@/services/movies-service";

export function useSearchMovies(query: string, page = 1) {
  return useQuery({
    queryKey: ["movies", "search", query, page],
    queryFn: () => moviesService.search(query, page),
    enabled: query.trim().length > 0,
  });
}