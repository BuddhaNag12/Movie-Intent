import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface SearchScreenProps {
  route: any;
}

const SearchScreen = ({route}: SearchScreenProps) => {
  const {title} = route.params;

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {},
});
