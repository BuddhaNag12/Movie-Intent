import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import MovieList from '../components/movieList';
import SearchMovies from '../components/search';
import MyBottomSheet from '../components/BottomSheet';
import HrCardsProps from '../components/horizontalCard';
import {useTheme} from '@react-navigation/native';
import API_TOKEN from '../../envExport';
import {ScrollView} from 'react-native-gesture-handler';

const Home = ({navigation}: any) => {
  const {colors} = useTheme();
  const [text, setText] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [UpcomingMovies, setUpcomingMovies] = React.useState([]);
  const [popularMovies, setPopularMovies] = React.useState([]);
  const [isGrid, setGrid] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_TOKEN}&language=en-US`,
    )
      .then((data) => data.json())
      .then((res) => {
        setLoading(false);
        setUpcomingMovies(res.results);
      });

    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_TOKEN}&language=en-US`,
    )
      .then((data) => data.json())
      .then((res) => {
        setLoading(false);
        setPopularMovies(res.results);
      });
  }, []);

  const toggleBottomSheet = () => {
    setIsVisible(!isVisible);
  };

  const searchMovies = () => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&query=${text}&language=en-US`,
    )
      .then((data) => data.json())
      .then((res) => {
        setLoading(false);
        setUpcomingMovies(res.results);
      });
  };

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
        <SearchMovies
          movieName="Intersteller"
          search={searchMovies}
          setText={setText}
          text={text}
        />
        <MyBottomSheet
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          toggleBottomSheet={toggleBottomSheet}
        />

        <Text
          style={{
            fontFamily: 'HindVadodara-Bold',
            fontSize: 25,
            paddingHorizontal: 10,
          }}>
          Upcoming Movies
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HrCardsProps Movies={UpcomingMovies} navigation={navigation} />
        </ScrollView>
        <Text
          style={{
            fontFamily: 'HindVadodara-Bold',
            fontSize: 25,
            paddingHorizontal: 10,
          }}>
          Popular Movies
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HrCardsProps Movies={popularMovies} navigation={navigation} />
        </ScrollView>
      </ScrollView>
      {/* 
      <MovieList
        searchItems={UpcomingMovies}
        navigation={navigation}
        color={'#FCF8FF'}
        darkTheme={'light'}
        loading={loading}
      /> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
});
