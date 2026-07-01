import { httpClient } from "@/services/http-client";
import type {
  Movie,
  MovieDetail,
  TMDBPaginatedResponse,
} from "@/types/movie";

export const moviesService = {
  getPopular: async (page = 1) => {
    const { data } = await httpClient.get<TMDBPaginatedResponse<Movie>>(
      "/movie/popular",
      { params: { page } }
    );
    return data;
  },

  getNowPlaying: async (page = 1) => {
    const { data } = await httpClient.get<TMDBPaginatedResponse<Movie>>(
      "/movie/now_playing",
      { params: { page } }
    );
    return data;
  },

  getTopRated: async (page = 1) => {
    const { data } = await httpClient.get<TMDBPaginatedResponse<Movie>>(
      "/movie/top_rated",
      { params: { page } }
    );
    return data;
  },

  getUpcoming: async (page = 1) => {
    const { data } = await httpClient.get<TMDBPaginatedResponse<Movie>>(
      "/movie/upcoming",
      { params: { page } }
    );
    return data;
  },

  search: async (query: string, page = 1) => {
    const { data } = await httpClient.get<TMDBPaginatedResponse<Movie>>(
      "/search/movie",
      { params: { query, page } }
    );
    return data;
  },

  getById: async (movieId: number | string) => {
    const { data } = await httpClient.get<MovieDetail>(`/movie/${movieId}`);
    return data;
  },
};