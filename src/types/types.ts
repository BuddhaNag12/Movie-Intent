export type mode = 'dark' | 'light';
export type size = 'large' | 'medium' ;

export type colorsType = {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  // notification: string;
  };

 export type datatype={
    id:number;
    backdrop_path:string;
    poster_path:string;
    title:string;
    tagline:string;
    overview:string;
    status:string;
    release_date:string;
    genres:[];
    vote_average:number;
    popularity:number;
    original_title:string;
    genre_ids:[]
  }

  export type RootStackParamList = {
    Home: undefined;
    DetailScreen: { id: number };
    Search:undefined;
  };
