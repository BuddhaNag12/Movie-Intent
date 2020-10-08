import API_TOKEN from '../envExport';
import {datatype} from './types/types';

const genres = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
};

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_TOKEN}&sort_by=popularity.desc`;
const UPCOMING_URI = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_TOKEN}&language=en-US`;

const getImagePath = (path: string) =>
  `https://image.tmdb.org/t/p/w500/${path}`;
const getBackdropPath = (path: string) =>
  `https://image.tmdb.org/t/p/w500/${path}`;

export const getUpcomingMovies = async () => {
  const {results} = await fetch(UPCOMING_URI).then((x) => x.json());
  const movies = results.map(
    ({
      id,
      title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }: datatype) => ({
      key: String(id),
      title: title,
      id: id,
      poster_path: getImagePath(poster_path),
      backdrop_path: getBackdropPath(backdrop_path),
      vote_average: vote_average,
      description: overview,
      release_date: release_date,
      genres: genre_ids.map((genre) => genres[genre]),
    }),
  );

  return movies;
};

export const getMovies = async () => {
  const {results} = await fetch(API_URL).then((x) => x.json());
  const movies = results.map(
    ({
      id,
      title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }: datatype) => ({
      key: String(id),
      title: title,
      id: id,
      poster_path: getImagePath(poster_path),
      backdrop_path: getBackdropPath(backdrop_path),
      vote_average: vote_average,
      description: overview,
      release_date: release_date,
      genres: genre_ids.map((genre) => genres[genre]),
    }),
  );

  return movies;
};


// Might use later

  // const getUpcomingMovies = async () => {
  //   const [upcomingRes, popularRes] = await Promise.all([
  //     fetch(
  //       `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_TOKEN}&language=en-US`,
  //     ),
  //     fetch(
  //       `https://api.themoviedb.org/3/movie/popular?api_key=${API_TOKEN}&language=en-US`,
  //     ),
  //   ]);

  //   const popularMovies = await popularRes.json();
  //   const upcomingMovies = await upcomingRes.json();

  //   return {
  //     popularMovies,
  //     upcomingMovies,
  //   };
  // };
