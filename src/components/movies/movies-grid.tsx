import { usePopularMovies } from "@/hooks/use-popular-movies";
import { Skeleton } from "@/components/ui/skeleton";

import MovieCard from "./movie-card";

const MoviesGrid = () => {
  const { data, isLoading, isError } = usePopularMovies();

  return (
    <section className="py-4">
      <header className="mb-8">
        <h2 className="text-3xl font-bold">Featured Movies</h2>

        <p className="mt-2 text-muted-foreground">
          Most popular releases right now.
        </p>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          No se pudo cargar la información de películas. Intenta de nuevo.
        </p>
      )}

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          lg:grid-cols-3
        "
      >
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-2/3 w-full rounded-xl" />
          ))}

        {data?.results.slice(0, 6).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MoviesGrid;