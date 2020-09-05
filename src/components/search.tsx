import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {Icon} from 'react-native-elements';

interface SearchMoviesProps {
  movieName: string;
  movieCategory?: string;
  search: any;
  searchText?: string;
}

const SearchMovies = (props: SearchMoviesProps) => {
  return (
    <View style={styles.container}>
      <Input
        placeholder="Search..."
        onChangeText={text=>props.search(text)}
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
