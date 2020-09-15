import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SearchMovies from '../components/search';
import API_TOKEN from '../../envExport';
import MovieList from '../components/movieList';

interface SearchScreenProps {
  navigation: any;
}

const SearchScreen = (props: SearchScreenProps) => {
  const [searchResults, setSearchResults] = React.useState([]);
  const [error, setError] = React.useState('');
  const [searchText, setText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
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
      });
    
  };

  return (
    <View style={styles.container}>
      <SearchMovies
        search={searchMovies}
        setText={setText}
        autofocus={true}
        disabled={false}
      />
      {searchText == '' || error ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: 'HindVadodara-SemiBold', fontSize: 20}}>
            Opps no result found
          </Text>
          <Text style={{fontFamily: 'HindVadodara-Light', fontSize: 16}}>
            Try Searching with movie name {error}
          </Text>
        </View>
      ) : (
        <MovieList
          searchItems={searchResults}
          navigation={props.navigation}
          loading={loading}
          theme="light"
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
