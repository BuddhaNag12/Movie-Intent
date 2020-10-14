import * as React from 'react';
import {View, Text, StyleSheet, Platform, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {getBackdropPath, getImagePath} from '../api';
import { HomeScreenType } from '../types/types';
const {width} = Dimensions.get('window');

interface HeroCarouselProp<T> {
  CarouselData: Array<T>;
  navigation: HomeScreenType;
}
const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}),
    backgroundColor: 'white',
    borderRadius: 16,
  },
  itemTitle: {
    fontFamily: 'Nunito-Bold',
    color: 'black',
    fontSize: 18,
    paddingHorizontal: 5,
  },
});

class HeroCarousel extends React.PureComponent<HeroCarouselProp<string>> {
  constructor(props: HeroCarouselProp<string>) {
    super(props);
  }
  _renderItem = ({item}: any, parallaxProps?: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('DetailScreen', {
            id: item.id,
          })
        }>
        <View
          style={{
            height: 180,
            width: 260,
          }}>
          <ParallaxImage
            containerStyle={styles.imageContainer}
            parallaxFactor={0.6}
            {...parallaxProps}
            source={{
              uri: item.backdrop_path
                ? getBackdropPath(item.backdrop_path)
                : getImagePath(item.poster_path),
            }}
            style={styles.image}
          />
          <View
            style={{
              position: 'absolute',
              top: 130,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255,255,255,0.6)',
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            }}>
            <Text numberOfLines={2} style={styles.itemTitle}>
              {item.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
          marginVertical: 10,
        }}>
        <Carousel
          autoplay={true}
          autoplayInterval={3000}
          enableSnap={true}
          loop={true}
          loopClonesPerSide={5}
          layoutCardOffset={10}
          data={this.props.CarouselData}
          renderItem={this._renderItem}
          sliderWidth={width}
          itemWidth={width - 140}
          hasParallaxImages={true}
        />
      </View>
    );
  }
}
export default HeroCarousel;
