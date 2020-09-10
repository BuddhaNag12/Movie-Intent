import * as React from 'react';
import {View, StyleSheet, Text, useColorScheme} from 'react-native';
import MovieList from '../components/movieList';
import SearchMovies from '../components/search';
import MyBottomSheet from '../components/BottomSheet';
import {useTheme} from '@react-navigation/native';
import API_TOKEN from '../../envExport';

const Home = ({navigation}: any) => {
  const {colors} = useTheme();
  const [text, setText] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [Movies, setMoviesFetched] = React.useState([
    // {
    //   id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    //   title: 'First Item',
    // },
    // {
    //   id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    //   title: 'Second Item',
    // },
    // {
    //   id: '58694a0f-3da1-471f-bd96-145571e29d72',
    //   title: 'Third Item',
    // },
    // {
    //   id: '58694a0f-3da1-471f-bd96-145571e29d722',
    //   title: 'Third sItem',
    // },
    // {
    //   id: '58694a0f-3da1-471f-bd96-145571e29d725',
    //   title: 'Third saItem',
    // },
  ]);

  React.useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&query=Scifi&language=en-US`,
    )
      .then((data) => data.json())
      .then((res) => {
        setLoading(false);
        setMoviesFetched(res.results);
      });
  }, []);

  const toggleBottomSheet = () => {
    setIsVisible(!isVisible);
  };
  return (
    <View style={styles.container}>
      <SearchMovies movieName="Intersteller" />
      <MyBottomSheet
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleBottomSheet={toggleBottomSheet}
      />
      <MovieList
        searchItems={Movies}
        navigation={navigation}
        color={colors.background}
        darkTheme={'light'}
        loading={loading}
      />
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
