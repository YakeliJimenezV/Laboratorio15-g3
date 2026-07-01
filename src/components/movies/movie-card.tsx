import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import type { Movie } from "@/types/movie";
import { getPosterUrl } from "@/lib/tmdb-image";
import { useFavoritesStore } from "@/store/use-favorites-store";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(movie.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <article>
      <Card className="overflow-hidden">
        <div className="relative">
          <img
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title}
            className="aspect-2/3 w-full object-cover"
          />

          <button
            type="button"
            onClick={() => toggleFavorite(movie.id)}
            className="
              absolute right-2 top-2
              rounded-full bg-black/60 p-2
              hover:bg-black/80
            "
          >
            <Heart
              className={cn(
                "h-4 w-4",
                isFavorite ? "fill-red-500 text-red-500" : "text-white"
              )}
            />
          </button>
        </div>

        <CardHeader>
          <CardTitle>{movie.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
            {movie.overview || "Sin sinopsis disponible."}
          </p>

          <Link
            to={`/movies/${movie.id}`}
            className="
              text-sm
              font-medium
              text-blue-600
              hover:underline
            "
          >
            View details
          </Link>
        </CardContent>
      </Card>
    </article>
  );
};

export default MovieCard;