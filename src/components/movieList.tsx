import * as React from 'react';
import {StyleSheet, View, FlatList, Text, TouchableOpacity} from 'react-native';
import {ListItem, Avatar, Rating} from 'react-native-elements';

interface movieTitle {
  id?: string;
  title?: string;
  searchItems: Array<object>;
}

const MovieList = (props: movieTitle) => {
  const renderItem = ({item}: any) => {
    return (
      <ListItem
        bottomDivider
        key={item.id}
        containerStyle={{borderRadius: 30, elevation: 3, marginVertical: 5}}>
        <TouchableOpacity
          onPress={() => null}
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}>
          <View style={{flex: 1, paddingVertical: 15}}>
            <Avatar
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{item.title}</ListItem.Subtitle>
            </ListItem.Content>
          </View>
          <View style={{flex: 1}}>
            <Rating ratingCount={3} imageSize={20} showRating readonly={true} />
          </View>
        </TouchableOpacity>
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={props.searchItems} renderItem={renderItem} />
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Ionicons',
    fontWeight: 'normal',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Ionicons',
    fontWeight: 'normal',
  },
});
