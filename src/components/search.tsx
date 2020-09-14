import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, colors} from 'react-native-elements';
interface SearchMoviesProps {
  movieName: string;
  movieCategory?: string;
  search?: () => void;
  setText: any;
  text: string;
}
const SearchMovies = (props: SearchMoviesProps) => {
  return (
    <View style={styles.container}>
      <Input
        inputContainerStyle={{
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 60,
          padding: 5,
          marginVertical: 5,
          paddingHorizontal: 10,
          backgroundColor: '#fefefe',
          elevation: 2,
        }}
        placeholder="Search..."
        onChangeText={(text: string) => props.setText(text)}
        enablesReturnKeyAutomatically={true}
        returnKeyType="search"
        returnKeyLabel="search"
        onSubmitEditing={props.search}
        value={props.text}
        leftIcon={{
          type: 'font-awesome',
          name: 'search',
          color: colors.error,
        }}
      />
    </View>
  );
};

export default SearchMovies;

const styles = StyleSheet.create({
  container: {},
});
