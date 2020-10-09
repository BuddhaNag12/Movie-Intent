import * as React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {getBackdropPath, getImagePath} from '../api';
import {size, mode, colorsType} from '../types/types';
import * as Animatable from 'react-native-animatable';
import {SharedElement} from 'react-navigation-shared-element';
interface HrCardsProps<T> {
  Movies: Array<T>;
  navigation: any;
  cardSize?: size;
  theme?: mode;
  colors: colorsType;
}

const HrCards = ({
  Movies,
  navigation,
  cardSize,
  theme,
  colors,
}: HrCardsProps<string>) => {
  return (
    <View style={styles.container}>
      {Movies.map((items: any, index: number) => (
        <Animatable.View
          useNativeDriver
          animation="fadeInRight"
          duration={400}
          delay={600 + index * 60}
          key={index}
          style={{
            marginHorizontal: 5,
            width: cardSize == 'large' ? 130 : 110,
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 30,
            }}
            key={index}
            onPress={() =>
              navigation.navigate('DetailScreen', {
                id: items.id,
              })
            }>
            {/* <SharedElement id={`item.${items.id}.photo`}> */}
            <View
              style={{
                width: cardSize == 'large' ? 130 : 110,
                height: cardSize == 'large' ? 180 : 160,
                alignItems: 'center',
                elevation: 3,
                borderRadius: 5,
              }}>
              <Image
                style={{
                  width: '100%',
                  ...StyleSheet.absoluteFillObject,
                  borderRadius: 5,
                }}
                resizeMode="cover"
                source={{
                  uri: items.backdrop_path
                    ? getBackdropPath(items.backdrop_path)
                    : getImagePath(items.poster_path),
                }}
              />

              <View style={{position: 'absolute', top: 10, right: 30}}>
                <Text
                  style={{
                    fontFamily: 'HindVadodara-Bold',
                    fontSize: 15,
                    textAlign: 'center',
                    color: theme == 'dark' ? 'white' : '#F2F2F2',
                    // color:colors.text
                  }}>
                  {items.vote_average}
                </Text>
              </View>
            </View>
            {/* </SharedElement> */}
            <View>
              <Text
                numberOfLines={2}
                allowFontScaling={true}
                textBreakStrategy="highQuality"
                style={{
                  fontFamily: 'HindVadodara-Bold',
                  fontSize: 15,
                  textAlign: 'left',
                  color: colors.text,
                  marginVertical: 5,
                }}>
                {items.title}
              </Text>

              <Text
                style={{
                  fontFamily: 'HindVadodara-Light',
                  fontSize: 12,
                  textAlign: 'left',
                  color: colors.text,
                }}>
                Release Date
              </Text>
              <Text
                style={{
                  fontFamily: 'HindVadodara-Light',
                  fontSize: 12,
                  textAlign: 'left',
                  marginVertical: 2,
                  color: colors.text,
                  // color: theme == 'dark' ? 'white' : 'black',
                }}>
                {items.release_date}
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
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
