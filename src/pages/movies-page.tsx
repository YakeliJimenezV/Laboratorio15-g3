import { useState } from "react";

import PageContainer from "@/components/layout/page-container";
import MovieCard from "@/components/movies/movie-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePopularMovies } from "@/hooks/use-popular-movies";
import { useSearchMovies } from "@/hooks/use-search-movies";

export function MoviesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const isSearching = search.trim().length > 0;

  const popularQuery = usePopularMovies(page);
  const searchQuery = useSearchMovies(search, page);

  const { data, isLoading, isError } = isSearching
    ? searchQuery
    : popularQuery;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <PageContainer>
      <div className="py-10">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Movies</h1>
          <p className="mt-2 text-muted-foreground">
            Browse popular movies or search for something specific.
          </p>
        </header>

        <Input
          placeholder="Search movies..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="mb-8 max-w-md"
        />

        {isError && (
          <p className="text-sm text-destructive">
            No se pudo cargar la información de películas. Intenta de nuevo.
          </p>
        )}

        <div
          className="
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {isLoading &&
            Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-2/3 w-full rounded-xl" />
            ))}

          {!isLoading && data?.results.length === 0 && (
            <p className="col-span-full text-sm text-muted-foreground">
              No se encontraron películas para "{search}".
            </p>
          )}

          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {data && data.total_pages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              Page {page} of {data.total_pages}
            </span>

            <Button
              variant="outline"
              disabled={page >= data.total_pages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </PageContainer>
  );
}