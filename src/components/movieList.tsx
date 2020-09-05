import * as React from 'react';
import {StyleSheet,View} from 'react-native';
import {ListItem} from 'react-native-elements';

interface movieTitle {
  id?: string;
  title?: string;
  searchItems:Array<object>;
}


const MovieList = (props:movieTitle) => {
  return (
    <View style={styles.container}>
      {props.searchItems.map((l:any, i:any) => (
        <ListItem key={l.id} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{l.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
