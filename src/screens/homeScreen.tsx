import * as React from 'react';
import {View, StyleSheet, Text, useColorScheme} from 'react-native';
import MovieList from '../components/movieList';
import SearchMovies from '../components/search';
import MyBottomSheet from '../components/BottomSheet';
import {useTheme} from '@react-navigation/native';

const Home = ({navigation}: any) => {
  const {colors} = useTheme();
  const [text, setText] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d722',
      title: 'Third sItem',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d725',
      title: 'Third saItem',
    },
  ]);
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
        searchItems={searchResults}
        navigation={navigation}
        color={colors.background}
        darkTheme={"light"}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
