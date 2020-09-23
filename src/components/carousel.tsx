import * as React from 'react';
import {View, Text, StyleSheet, Platform, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
const {width} = Dimensions.get('window');

interface HeroCarouselProp<T> {
  CarouselData: Array<T>;
  navigation: any;
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
    borderRadius: 8,
  },
  itemTitle: {
    fontFamily: 'Nunito-Bold',
    color: 'black',
    fontSize: 20,
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
            height: 250,
            width: 250,
          }}>
          <ParallaxImage
            containerStyle={styles.imageContainer}
            parallaxFactor={0.4}
            {...parallaxProps}
            source={{
              uri: item.backdrop_path
                ? 'https://image.tmdb.org/t/p/w780/' + item.backdrop_path
                : 'https://image.tmdb.org/t/p/w500/' + item.poster_path,
            }}
            style={styles.image}
          />
          <View
            style={{
              position: 'absolute',
              top: 160,
              left: 4,
              right: 10,
              backgroundColor: 'rgba(255,255,255,0.8)',
              borderRadius: 8,
              padding: 8,
              paddingRight: 10,
            }}>
            <Text style={styles.itemTitle}>{item.title}</Text>
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
        }}>
        <Carousel
          decelerationRate="fast"
          autoplay={true}
          activeAnimationType="decay"
          autoplayInterval={3000}
          enableSnap={true}
          enableMomentum={true}
          loop={true}
          loopClonesPerSide={5}
          layoutCardOffset={10}
          data={this.props.CarouselData}
          renderItem={this._renderItem}
          sliderWidth={width - 50}
          itemWidth={width - 140}
          hasParallaxImages={true}
        />
      </View>
    );
  }
}
export default HeroCarousel;
