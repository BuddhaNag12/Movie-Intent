import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, colors} from 'react-native-elements';
interface SearchMoviesProps {
  movieName?: string;
  movieCategory?: string;
  search?: () => void;
  setText?: any;
  text?: string;
  ToggleSearchScreen?: () => void;
  disabled?: boolean;
  autofocus:any;
}
const SearchMovies = (props: SearchMoviesProps) => {
  return (
    <View style={styles.container}>
      <Input
        inputContainerStyle={{
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 60,
          paddingBottom: 5,
          marginVertical: 5,
          paddingHorizontal: 10,
          backgroundColor: '#fefefe',
          elevation: 2,
        }}
        disabled={props.disabled}
        onTouchStart={props.ToggleSearchScreen}
        placeholder="Search for movies ..."
        onChangeText={(text: string) => props.setText(text)}
        enablesReturnKeyAutomatically={true}
        autoFocus={props.autofocus}
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
