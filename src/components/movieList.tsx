import * as React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {ListItem, AirbnbRating} from 'react-native-elements';
import {mode, SearchType} from '../types/types';
interface movieTitle {
  id?: string;
  title?: string;
  searchItems: Array<Object>;
  navigation: SearchType;
  color?: any;
  theme: mode;
  loading: boolean;
}

const MovieList = (props: movieTitle) => {
  const textColor = props.theme == 'dark' ? 'white' : '#574B3E';
  if (props.loading) {
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
        key={item.id.toString()}
        containerStyle={{
          borderRadius: 30,
          marginVertical: 2,
          marginHorizontal: 5,
          borderBottomColor: 'transparent',
          elevation: 2,
          backgroundColor: props.theme == 'dark' ? '#303030' : '#FCF8FF',
          maxHeight: 100,
        }}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('DetailScreen', {
              id: item.id,
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
              flex: 1,
              width: 80,
              height: 80,
             
            }}>
            <Image
              style={{...StyleSheet.absoluteFillObject, borderRadius:10}}
              resizeMode="contain"
              source={{
                uri: item.poster_path
                  ? 'https://image.tmdb.org/t/p/w185/' + item.poster_path
                  : 'https://static.dribbble.com/users/904433/screenshots/3152644/planet_dribbble.png',
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <ListItem.Content>
              <ListItem.Title
                style={{...styles.title, color: textColor}}
                numberOfLines={1}>
                {item.title}
              </ListItem.Title>
              <ListItem.Subtitle
                style={{...styles.subtitle, color: textColor}}
                numberOfLines={2}>
                {item.title}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={{...styles.subtitle, color: textColor}}>
                {item.release_date}
              </ListItem.Subtitle>
            </ListItem.Content>
          </View>
          <View style={{flex: 1}}>
            <AirbnbRating
              starStyle={{backgroundColor: '#FBEAFF', borderRadius: 30}}
              isDisabled
              showRating={true}
              count={5}
              reviews={['Bad', 'Average', 'Good', 'very Good', 'Excellent']}
              defaultRating={item.vote_count}
              size={15}
            />
          </View>
        </TouchableOpacity>
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.searchItems}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
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
    fontFamily: 'HindVadodara-SemiBold',
    fontSize: 15,
  },
  subtitle: {
    fontFamily: 'HindVadodara-Light',
    fontSize: 18,
  },
});
