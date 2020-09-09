import * as React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {ListItem, Avatar, AirbnbRating, colors} from 'react-native-elements';

interface movieTitle {
  id?: string;
  title?: string;
  searchItems: Array<object>;
  navigation: any;
  color:any;
  darkTheme: 'dark' | 'light';
}

const MovieList = (props: movieTitle) => {
  const [loading, isLoading] = React.useState(true);
  const textColor = props.darkTheme == 'dark' ? 'white' : 'grey';

  setTimeout(() => {
    isLoading(false);
  }, 3000);
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  const renderItem = ({item}: any) => {
    return (
      <ListItem
        bottomDivider
        key={item.id}
        containerStyle={{
          borderRadius: 30,
          marginVertical: 2,
          marginHorizontal: 5,
          borderBottomColor: 'transparent',
          elevation: 1,
          backgroundColor: props.color,
        }}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('SearchScreen', {
              title: item.title,
            })
          }
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 10,
              flex: 1,
            }}>
            <Avatar
              avatarStyle={{borderRadius: 40}}
              containerStyle={{width: 60, height: 60}}
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <ListItem.Content>
              <ListItem.Title style={{paddingBottom: 20,color:textColor}}>
                {item.title}
              </ListItem.Title>
              <ListItem.Subtitle style={{color:textColor}}>{item.title}</ListItem.Subtitle>
            </ListItem.Content>
          </View>
          <View style={{flex: 1}}>
            <AirbnbRating
              starStyle={{backgroundColor: '#FBEAFF', borderRadius: 30}}
              isDisabled
              showRating={true}
              count={3}
              reviews={['bad', 'average', 'good']}
              defaultRating={2}
              size={15}
            />
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
