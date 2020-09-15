import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  useColorScheme,
} from 'react-native';
import API_TOKEN from '../../envExport';
import MovieDetails from '../components/MovieDetailsList';
const {width, height} = Dimensions.get('screen');

interface DetailsScreenProps {
  route: any;
}

const DetailsScreen = ({route}: DetailsScreenProps) => {
  const scheme = useColorScheme();
  
  type theme = 'black' | 'white';
  let theme: theme;
  if (scheme == 'dark') {
    theme = 'white';
  } else if (scheme == 'light') {
    theme = 'black';
  } else {
    theme = 'black';
  }

  const {id} = route.params;
  const api = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_TOKEN}&language=en-US`;

  const [loading, setLoading] = React.useState(false);
  const [data, setMoviesFetched] = React.useState({
    movieBanner: '',
    poster_path: '',
    title: '',
    overview: '',
    popularity: 0,
    status: '',
  });

  React.useEffect(() => {
    setLoading(true);
    fetch(api)
      .then((data) => data.json())
      .then((res) => {
        setLoading(false);
        setMoviesFetched(res);
      });
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            height: height / 2,
            paddingVertical: 20,
          }}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: data.poster_path
                ? 'http://image.tmdb.org/t/p/w780/' + data.poster_path
                : 'https://static.dribbble.com/users/3281732/screenshots/12688476/media/cf19d222859aab75ed995365338d4c32.jpg',
            }}
          />
        </View>

        <MovieDetails
          title={data.title}
          overView={data.overview}
          status={data.status}
          popularity={data.popularity}
          theme={theme == 'black' ? 'dark' : 'light'}
        />
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: height,
    width: width,
  },
});
