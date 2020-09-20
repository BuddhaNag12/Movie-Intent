import * as React from 'react';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import LottieView from 'lottie-react-native';
import API_TOKEN from '../../envExport';
import MovieDetails from '../components/MovieDetailsList';
import {datatype} from '../types/types';
interface DetailsScreenProps {
  route: {
    params: any;
  };
  navigation: any;
}

const DetailsScreen = ({navigation, route: {params}}: DetailsScreenProps) => {
  const scheme = useColorScheme();

  const {id} = params;
  const api = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_TOKEN}&language=en-US`;

  const [loading, setLoading] = React.useState(false);
  const [MovieData, setMoviesFetched] = React.useState<datatype>();

  React.useEffect(() => {
    setLoading(true);
    fetch(api)
      .then((data) => data.json())
      .then((res) => {
        setLoading(false);
        // data.push(res)
        setMoviesFetched(res);
      });
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LottieView
          source={require('../../assets/loading.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {MovieData ? (
            <MovieDetails
              navigation={navigation}
              data={MovieData}
              theme={scheme == 'dark' ? 'dark' : 'light'}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
