import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {Icon} from 'react-native-elements';

interface SearchMoviesProps {
  movieName: string;
  movieCategory?: string;
  search?: ()=>void;
  searchText?: string;
}

const SearchMovies = (props: SearchMoviesProps) => {
  return (
    <View style={styles.container}>
      <Input
        placeholder="Search..."
        leftIcon={{type: 'font-awesome', name: 'search'}}
      />
    </View>
  );
};

export default SearchMovies;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
