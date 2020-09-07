import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface SearchScreenProps {
  route:any;
  navigation:any;
}

const SearchScreen = ({route,navigation}:SearchScreenProps) => {

  const {title} = route.params;

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {}
});
