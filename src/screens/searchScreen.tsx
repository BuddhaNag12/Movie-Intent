import * as React from 'react';
import {Text, View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import SearchMovies from '../components/search';
import API_TOKEN from '../../envExport';
import MovieList from '../components/movieList';
import {useColorScheme} from 'react-native-appearance';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {genres, GetMoreSearchResults} from '../api';
import {SearchType, colorsMode, datatype} from '../types/types';
import {DefaultTheme} from '@react-navigation/native';
interface SearchScreenProps {
  navigation: SearchType;
}

const SearchScreen = ({navigation}: SearchScreenProps) => {
  const [searchResults, setSearchResults] = React.useState([]);
  const [error, setError] = React.useState<string>('');
  const [searchText, setText] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [counter, setCounter] = React.useState(1);
  const [MovieId, setId] = React.useState<number>();
  const [refreshing, setRefreshing] = React.useState(false);
  const scheme = useColorScheme();

  const searchMovies = () => {
    setError('');
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&query=${searchText}&language=en-US`,
    )
      .then((data) => data.json())
      .then((res) => {
        if (res) {
          setLoading(false);
          setSearchResults(res.results);
        } else {
          setLoading(false);
          setError('Enter some Text...');
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const onRefresh = () => {
    console.log('refreshing');
    setRefreshing(true);
    setCounter(counter + 1);
    GetMoreSearchResults(MovieId, counter)
      .then((res: []) => {
        setSearchResults((prev) => [...prev, ...res]);
        setRefreshing(false);
      })
      .catch((err) => {
        setError(err);
      });
  };
  const fetchByGenres = (id: number) => {
    setLoading(true);
    setId(id);
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_TOKEN}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${id}&page=${counter}`,
    )
      .then((data) => data.json())
      .then((res) => {
        setLoading(false);
        setSearchResults(res.results);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor:
          scheme == 'dark' ? colorsMode.dark : DefaultTheme.colors.background,
      }}>
      <StatusBar hidden />
      <SearchMovies search={searchMovies} setText={setText} autofocus={true} />
      <View style={{paddingVertical: 10, borderRadius: 30}}>
        <Text
          style={{
            fontFamily: 'Nunito-Bold',
            fontSize: 20,
            paddingHorizontal: 10,
            marginVertical: 5,
            color: scheme == 'dark' ? 'grey' : 'black',
          }}>
          Genres
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'space-evenly',
            padding: 10,
          }}>
          {genres.map((i: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  width: 120,
                  borderRadius: 25,
                  backgroundColor: i.id % 2 !== 0 ? '#009D77' : '#FF5159',
                  elevation: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 5,
                  marginHorizontal: 5,
                }}
                onPress={() => fetchByGenres(i.id)}>
                <Text
                  style={{
                    color: scheme == 'dark' ? '#fefefe' : '#fefefe',
                    fontFamily: 'Nunito-Light',
                    fontSize: 18,
                  }}>
                  {i.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <MovieList
        onRefreshing={onRefresh}
        refreshing={refreshing}
        searchItems={searchResults}
        navigation={navigation}
        loading={loading}
        theme={scheme == 'dark' ? 'dark' : 'light'}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
