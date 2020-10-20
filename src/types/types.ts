import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type mode = 'dark' | 'light';
export type size = 'large' | 'medium';


export enum colorsMode {
  dark = '#00001B',
  light = 'white',
  detailColor = '#FCF8FF',
  cancelButtomLight='#FF6F91',
  cancelButtomDark="#C34A36",
  grey='#E3E0F3'
}

export type colorsType = {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  // notification: string;
};

export type datatype = {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  tagline: string;
  overview: string;
  status: string;
  release_date: string;
  genres: [];
  vote_average: number;
  popularity: number;
  original_title: string;
  genre_ids: []
  budget: number;
  vote_count: number;
}



export type RootStackParamList = {
  Home: undefined;
  DetailScreen: { id: number };
  Search: undefined;
  ImageView: {
    imagePath: string
  };
  GridView: {
    type: string | undefined;
  },
  About:undefined;
  Help:undefined
};
export type HomeScreenType = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type DetailScreenType = StackNavigationProp<
  RootStackParamList,
  'DetailScreen'
>;
export type SearchType = StackNavigationProp<
  RootStackParamList,
  'Search'
>;
export type ImageViewType = StackNavigationProp<
  RootStackParamList,
  'ImageView'
>;
export type GridViewType = StackNavigationProp<
  RootStackParamList,
  'GridView'
>;
export type ViewType = 'Popular' | 'upcoming';


export type DetailScreenProp = RouteProp<RootStackParamList, 'DetailScreen'>;
export type ImageViewScreenProp = RouteProp<RootStackParamList, 'ImageView'>;
export type GridViewScreenProp = RouteProp<RootStackParamList, 'GridView'>;


