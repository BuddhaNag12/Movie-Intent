import API_TOKEN from '../envExport';

export const genres = [
  {
    id: 12,
    name: 'Adventure',
  },
  {id: 14, name: 'Fantasy'},
  {id: 16, name: 'Animation'},
  {id: 18, name: 'Drama'},
  {id: 27, name: 'Horror'},
  {id: 28, name: 'Action'},
  {id: 35, name: 'Comedy'},
  {id: 36, name: 'History'},
  {id: 37, name: 'Western'},
  {id: 53, name: 'Thriller'},
  {id: 80, name: 'Crime'},
  {id: 99, name: 'Documentary'},
  {id: 878, name: 'Science Fiction'},
  {id: 9648, name: 'Mystery'},
  {id: 10402, name: 'Music'},
  {id: 10749, name: 'Romance'},
  {id: 10751, name: 'Family'},
  {id: 10752, name: 'War'},
  {id: 10770, name: 'TV Movie'},
];

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_TOKEN}&sort_by=popularity.desc&page=`;
const UPCOMING_URI = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_TOKEN}&language=en-US&page=`;

// Might use later
export const getMovies = async (type: string, page: number) => {
  const MovieFetch = `https://api.themoviedb.org/3/movie/${type}?api_key=${API_TOKEN}&language=en-US&page=${page}`;
  const res = await fetch(MovieFetch);
  const results=await res.json();

  return results.results;

};

export const getUpcomingMovies = async (counter: number) => {
  const [upcomingRes, popularRes] = await Promise.all([
    fetch(API_URL + counter),
    fetch(UPCOMING_URI + counter),
  ]);

  const popularMovies = await popularRes.json();
  const upcomingMovies = await upcomingRes.json();

  return {
    popularMovies,
    upcomingMovies,
  };
};

export const getImagePath = (path: string) =>
  `https://image.tmdb.org/t/p/w500/${path}`;
export const getBackdropPath = (path: string) =>
  `https://image.tmdb.org/t/p/w500/${path}`;

// export const getUpcomingMovies = async () => {
//   const {results} = await fetch(UPCOMING_URI).then((x) => x.json());
//   const movies = results.map(
//     ({
//       id,
//       title,
//       poster_path,
//       backdrop_path,
//       vote_average,
//       overview,
//       release_date,
//       genre_ids,
//     }: datatype) => ({
//       key: String(id),
//       title: title,
//       id: id,
//       poster_path: getImagePath(poster_path),
//       backdrop_path: getBackdropPath(backdrop_path),
//       vote_average: vote_average,
//       description: overview,
//       release_date: release_date,
//       genres: genre_ids.map((genre) => genres[genre]),
//     }),
//   );

//   return movies;
// };

// export const getMovies = async () => {
//   const {results} = await fetch(API_URL).then((x) => x.json());
//   const movies = results.map(
//     ({
//       id,
//       title,
//       poster_path,
//       backdrop_path,
//       vote_average,
//       overview,
//       release_date,
//       genre_ids,
//     }: datatype) => ({
//       key: String(id),
//       title: title,
//       id: id,
//       poster_path: getImagePath(poster_path),
//       backdrop_path: getBackdropPath(backdrop_path),
//       vote_average: vote_average,
//       description: overview,
//       release_date: release_date,
//       genres: genre_ids.map((genre) => genres[genre]),
//     }),
//   );

//   return movies;
// };
