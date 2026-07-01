import { useQuery } from "@tanstack/react-query";

import { moviesService } from "@/services/movies-service";

export function useMovieDetail(movieId: string | undefined) {
  return useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => moviesService.getById(movieId!),
    enabled: !!movieId,
  });
}