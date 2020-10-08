import * as React from 'react';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import LottieView from 'lottie-react-native';
import API_TOKEN from '../../envExport';
import MovieDetails from '../components/MovieDetailsList';
import {datatype} from '../types/types';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
interface DetailsScreenProps {
  route: {
    params: any;
  };
  navigation: any;
}

const DetailsScreen = ({navigation, route: {params}}: DetailsScreenProps) => {
  const scheme = useColorScheme();
  const {colors} = useTheme();
  const {id} = params;
  const api = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_TOKEN}&language=en-US`;

  const [loading, setLoading] = React.useState<boolean>(false);
  const [MovieData, setMoviesFetched] = React.useState<datatype>();

  React.useEffect(() => {
    setLoading(true);
    let isMounted: boolean = true;

    fetch(api)
      .then((data) => data.json())
      .then((res) => {
        if (isMounted) {
          setLoading(false);
          setMoviesFetched(res);
        }
      });

    return () => {
      isMounted = false;
    };
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
    <ScrollView>
      <LinearGradient
        start={{x: 1, y: 1}}
        end={{x: 1, y: 0}}
        colors={
          scheme == 'dark'
            ? ['#53515E', '#10545E', '#872350']
            : ['#53515E', '#F85555', '#BAFCDC']
        }
        style={styles.container}>
        {MovieData && !loading ? (
          <MovieDetails
            transitionId={id}
            navigation={navigation}
            colors={colors}
            data={MovieData}
            theme={scheme == 'dark' ? 'dark' : 'light'}
          />
        ) : (
          <></>
        )}
      </LinearGradient>
    </ScrollView>
  );
};

DetailsScreen.sharedElementsConfig = (route: any) => {
  const {id} = route.params;
  return [
    {
      id: `item.${id}.text`,
      animation: 'fade',
    },
  ];
};
export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
