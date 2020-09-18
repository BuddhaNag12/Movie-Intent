import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {size,mode} from '../types/types';
interface HrCardsProps<t> {
  Movies: Array<t>;
  navigation: any;
  cardSize?: size;
  theme?: mode;
}

const HrCards = ({
  Movies,
  navigation,
  cardSize,
  theme,
}: HrCardsProps<string>) => {
  return (
    <View style={styles.container}>
      {Movies.map((items: any, index: number) => (
        <TouchableOpacity
          style={{borderRadius: 30, paddingHorizontal: 10, paddingVertical: 10}}
          key={index}
          onPress={() =>
            navigation.navigate('DetailScreen', {
              id: items.id,
            })
          }>
          <View
            style={{
              width: cardSize == 'large' ? 250 : 200,
              height: cardSize == 'large' ? 200 : 200,

              alignItems: 'center',
              elevation: 2,
              backgroundColor: theme == 'dark' ? '#303030' : '#F2F2F2',
              borderBottomColor: theme == 'dark' ? '#F2F2F2' : undefined,
              borderRadius: 30,
            }}>
            <Image
              style={{
                width: '100%',
                height: '60%',
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              }}
              resizeMode="cover"
              source={{
                uri: items.poster_path
                  ? 'https://image.tmdb.org/t/p/w500/' + items.poster_path
                  : 'https://static.dribbble.com/users/904433/screenshots/3152644/planet_dribbble.png',
              }}
              
            />

            <View style={{position: 'absolute', top: 10, right: 30}}>
              <Text
                style={{
                  fontFamily: 'HindVadodara-Bold',
                  fontSize: 15,
                  textAlign: 'center',
                  color: theme == 'dark' ? 'white' : '#F2F2F2',
                }}>
                {items.vote_average}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontFamily: 'HindVadodara-Bold',
                  fontSize: 15,
                  textAlign: 'center',
                  color: theme == 'dark' ? 'white' : 'black',
                  marginVertical: 5,
                }}>
                {items.title}
              </Text>
              <Text
                style={{
                  fontFamily: 'HindVadodara-Light',
                  fontSize: 15,
                  textAlign: 'center',
                  color: theme == 'dark' ? 'white' : 'black',
                }}>
                Release Date
              </Text>
              <Text
                style={{
                  fontFamily: 'HindVadodara-Light',
                  fontSize: 15,
                  textAlign: 'center',
                  marginVertical: 2,
                  color: theme == 'dark' ? 'white' : 'black',
                }}>
                {items.release_date}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
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
