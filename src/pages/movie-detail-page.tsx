import { useParams } from "react-router-dom";
import { Heart, Star } from "lucide-react";

import PageContainer from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMovieDetail } from "@/hooks/use-movie-detail";
import { useFavoritesStore } from "@/store/use-favorites-store";
import { getBackdropUrl, getPosterUrl } from "@/lib/tmdb-image";
import { cn } from "@/lib/utils";

export function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const { data: movie, isLoading, isError } = useMovieDetail(movieId);

  const isFavorite = useFavoritesStore((state) =>
    movie ? state.isFavorite(movie.id) : false
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  if (isLoading) {
    return (
      <PageContainer>
        <div className="py-10">
          <Skeleton className="mb-8 h-80 w-full rounded-xl" />
          <Skeleton className="mb-4 h-8 w-1/2 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
      </PageContainer>
    );
  }

  if (isError || !movie) {
    return (
      <PageContainer>
        <div className="py-10">
          <p className="text-sm text-destructive">
            No se pudo cargar la información de esta película.
          </p>
        </div>
      </PageContainer>
    );
  }

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <div>
      <div className="relative h-80 w-full overflow-hidden sm:h-96">
        <img
          src={getBackdropUrl(movie.backdrop_path)}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <PageContainer>
        <div className="-mt-32 grid grid-cols-1 gap-8 pb-16 sm:grid-cols-[240px_1fr]">
          <img
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title}
            className="aspect-2/3 w-full max-w-[240px] rounded-xl object-cover shadow-lg"
          />

          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="mt-1 text-muted-foreground italic">
                    {movie.tagline}
                  </p>
                )}
              </div>

              <Button
                variant={isFavorite ? "default" : "outline"}
                onClick={() => toggleFavorite(movie.id)}
              >
                <Heart
                  className={cn(
                    "mr-2 h-4 w-4",
                    isFavorite && "fill-current"
                  )}
                />
                {isFavorite ? "In favorites" : "Add to favorites"}
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1 text-sm font-medium">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {movie.vote_average.toFixed(1)}
                <span className="text-muted-foreground">
                  ({movie.vote_count} votes)
                </span>
              </span>

              <span className="text-sm text-muted-foreground">
                {releaseYear}
              </span>

              {movie.runtime && (
                <span className="text-sm text-muted-foreground">
                  {movie.runtime} min
                </span>
              )}
            </div>

            {movie.genres.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            <div className="mt-8">
              <h2 className="mb-2 text-lg font-semibold">Overview</h2>
              <p className="text-muted-foreground">
                {movie.overview || "Sin sinopsis disponible."}
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}