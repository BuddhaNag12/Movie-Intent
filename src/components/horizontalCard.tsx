import * as React from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {Card, Avatar, Rating, Badge} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface HrCardsProps<t> {
  Movies: Array<t>;
  navigation: any;
}

const HrCards = (props: HrCardsProps<string>) => {
  return (
    <View style={styles.container}>
      {props.Movies.map(
        (items: any, index: number): any => (
          (
            <TouchableOpacity
              key={index}
              onPress={() =>
                props.navigation.navigate('SearchScreen', {
                  title: items.title,
                  id: items.id,
                })
              }>
              <Card
                key={index}
                containerStyle={{
                  width: 190,
                  height: 190,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 2,
                  borderWidth: 0,
                  borderBottomWidth: 2,
                }}>
                <Avatar
                  avatarStyle={{borderRadius: 40}}
                  containerStyle={{width: 60, height: 60}}
                  source={{
                    uri: items.poster_path
                      ? 'http://image.tmdb.org/t/p/w185/' + items.poster_path
                      : 'https://static.dribbble.com/users/904433/screenshots/3152644/planet_dribbble.png',
                  }}
                />
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Rating
                    showRating
                    fractions={1}
                    ratingCount={5}
                    startingValue={items.popularity}
                    imageSize={10}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'HindVadodara-SemiBold',
                      fontSize: 15,
                      textAlign: 'center',
                    }}>
                    {items.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'HindVadodara-SemiBold',
                      fontSize: 15,
                      textAlign: 'center',
                    }}>
                    {items.release_date}
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
          )
        ),
      )}
    </View>
  );
};

export default HrCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});
