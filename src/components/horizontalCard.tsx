import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Image} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

type size = 'large' | 'medium' | 'small';
type mode = 'dark' | 'light';
interface HrCardsProps<t> {
  Movies: Array<t>;
  navigation: any;
  cardSize?: size;
  theme?: mode;
}

const HrCards = (props: HrCardsProps<string>) => {
  return (
    <View style={styles.container}>
      {props.Movies.map((items: any, index: number) => (
        <TouchableOpacity
          style={{borderRadius: 30, paddingHorizontal: 10, paddingVertical: 10}}
          key={index}
          onPress={() =>
            props.navigation.navigate('DetailScreen', {
              id: items.id,
            })
          }>
          <View
            style={{
              width: props.cardSize == 'large' ? 250 : 190,
              height: props.cardSize == 'large' ? 180 : 180,
              alignItems: 'center',
              elevation: 2,
              backgroundColor: props.theme == 'dark' ? '#303030' : '#F2F2F2',
              // borderWidth: props.theme == 'dark' ? 1 : undefined,
              borderBottomColor: props.theme == 'dark' ? '#F2F2F2' : undefined,
              borderRadius: 30,
            }}>
            <Image
              containerStyle={{
                width: '100%',
                height: '50%',
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              }}
              PlaceholderContent={
                <ActivityIndicator size="small" color="red" />
              }
              resizeMethod="resize"
              resizeMode="cover"
              source={{
                uri: items.poster_path
                  ? 'http://image.tmdb.org/t/p/w500/' + items.poster_path
                  : 'https://static.dribbble.com/users/904433/screenshots/3152644/planet_dribbble.png',
              }}
            />
            <View style={{position: 'absolute', top: 10, right: 30}}>
              <Text
                style={{
                  fontFamily: 'HindVadodara-Bold',
                  fontSize: 15,
                  textAlign: 'center',
                  color: props.theme == 'dark' ? 'white' : '#F2F2F2',
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
                  color: props.theme == 'dark' ? 'white' : 'black',
                  marginVertical: 10,
                }}>
                {items.title}
              </Text>
              <Text
                style={{
                  fontFamily: 'HindVadodara-Light',
                  fontSize: 15,
                  textAlign: 'center',

                  color: props.theme == 'dark' ? 'white' : 'black',
                }}>
                Release Date
              </Text>
              <Text
                style={{
                  fontFamily: 'HindVadodara-Light',
                  fontSize: 15,
                  textAlign: 'center',
                  marginVertical: 5,
                  color: props.theme == 'dark' ? 'white' : 'black',
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
