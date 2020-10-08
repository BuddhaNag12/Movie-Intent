import * as React from 'react';
import {Text, View, StyleSheet, ScrollView, Button} from 'react-native';
import SearchMovies from '../components/search';
import API_TOKEN from '../../envExport';
import MovieList from '../components/movieList';
import {useColorScheme} from 'react-native-appearance';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MyBottomSheet from '../components/BottomSheet';

interface SearchScreenProps {
  navigation: any;
  route: any;
}

const SearchScreen = (props: SearchScreenProps) => {
  const [searchResults, setSearchResults] = React.useState<Array<object>>([]);
  const [genres, setGenres] = React.useState<Array<object>>([]);
  const [error, setError] = React.useState<string>('');
  const [searchText, setText] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [pageNumber, setPageNumber] = React.useState<Number>(1);
  const scheme = useColorScheme();
  
  // const {genre} = props.route.params;

  React.useEffect(() => {
    fetchGenre()
      .then((res) => {
        setGenres(res.genres);
      })
      .catch((e) => {
        setError(e);
      });
  }, []);

  // sort by popularity and paging and filter through react useEffect

  // React.useEffect(() => {
  //   fetchByGenres();
  // }, [pageNumber]);

  async function fetchGenre() {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_TOKEN}&language=en-US`,
    );

    const data = res.json();
    return data;
  }
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
        setLoading(false)
      });
  };
  const fetchByGenres = (id: number) => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_TOKEN}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${id}&page=${pageNumber}`,
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

  
  // const filterSearch = (id: number) => {
  //   setScifi(true);
  //   fetch(
  //     `https://api.themoviedb.org/3/discover/movie?api_key=${API_TOKEN}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${id}&page=1`,
  //   )
  //     .then((response) => response.json())
  //     .then((results) => {
  //       const TopAverage = results.results.filter(
  //         (item: datatype) => item.popularity >= 0.6,
  //       );
  //       setHotNow(TopAverage);
  //       setIsVisible(false);
  //     })
  //     .catch((e) => setError(e));
  // };
  // const toggleBottomSheet = () => {
  //   setIsVisible(!isVisible);
  // };
  return (
    <View style={styles.container}>
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
        {/* <MyBottomSheet
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          toggleBottomSheet={toggleBottomSheet}
          filterSearch={filterSearch}
          setDefault={setDefault}
          theme={scheme == 'dark' ? 'dark' : 'light'}
          colors={colors}
        /> */}
      </View>
      <MovieList
        searchItems={searchResults}
        navigation={props.navigation}
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
