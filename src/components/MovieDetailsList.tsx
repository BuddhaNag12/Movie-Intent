import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Card, Badge, Divider, Image} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

import API_TOKEN from '../../envExport';
import {getBackdropPath, getImagePath} from '../api';
import {mode, datatype, colorsType} from '../types/types';
import HeroCarouselDetails from './DetailCarousel';
const {width, height} = Dimensions.get('window');

interface MovieDetailsProps {
  theme?: mode;
  data: datatype;
  navigation: any;
  colors: colorsType;
}
//theme,popularity,status,overView,title
const MovieDetails = ({colors, theme, data, navigation}: MovieDetailsProps) => {
  const api = `https://api.themoviedb.org/3/movie/${data.id}/images?api_key=${API_TOKEN}`;
  const [movieImages, setMovieImages] = React.useState([]);
  const imageHeight = height / 2 + 40;

  React.useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        let newData = data.backdrops.filter((i: string, index: number) => {
          return index <= 8;
        });
        setMovieImages(newData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <View
      style={{
        ...styles.container,
      }}>
      <View
        style={{
          height: imageHeight,
        }}>
        {movieImages.length > 0 ? (
          <HeroCarouselDetails
            CarouselData={movieImages}
            colors={colors}
            navigation={navigation}
          />
        ) : (
          <Image
            style={{...styles.image}}
            transition={true}
            PlaceholderContent={
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 30,
                  paddingVertical: 30,
                }}>
                <ActivityIndicator size="large" color="red" />
              </View>
            }
            resizeMode="cover"
            source={{
              uri: data.poster_path
                ? getImagePath(data.poster_path)
                : getBackdropPath(data.backdrop_path),
            }}
          />
        )}
      </View>
      <Card
        containerStyle={{
          backgroundColor: theme == 'dark' ? '#303030' : '#FCF8FF',
          width: width,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderWidth: 0,
          minHeight: height / 2 + 40,
        }}>
        <View
          style={{
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <Text
              style={{
                ...styles.MovieTitle,
                color: theme == 'dark' ? 'white' : 'black',
              }}>
              {data.title}
            </Text>

            <Badge
              status="warning"
              badgeStyle={{
                width: 50,
                marginVertical: 12,
                marginHorizontal: 10,
              }}
              value={
                <Text style={{color: theme == 'dark' ? 'white' : '#fefefe'}}>
                  Top 10
                </Text>
              }
            />
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingRight: 20,
            }}>
            {data.genres
              ? data.genres.map(({id, name}: any) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Search', {
                          genre: name,
                        })
                      }
                      key={id}
                      style={{
                        backgroundColor: id % 2 == 0 ? '#009D77' : '#FF5159',
                        marginRight: 10,
                        marginVertical: 10,
                        borderRadius: 30,
                        elevation: 2,
                      }}>
                      <Text
                        style={{
                          color: theme === 'dark' ? 'white' : '#FFF4ED',
                          fontSize: 20,
                          fontFamily: 'HindVadodara-Light',
                          paddingHorizontal: 10,
                        }}>
                        {name}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              : undefined}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: theme == 'dark' ? 'white' : 'grey',
                fontSize: 20,
                fontFamily: 'HindVadodara-Light',
                paddingRight: 20,
              }}>
              Rating : {data.vote_average}
            </Text>
            <Badge
              status={data.status == 'Released' ? 'success' : 'warning'}
              badgeStyle={{
                width: '100%',
                marginVertical: 12,
                marginHorizontal: 10,
              }}
              containerStyle={{
                elevation: 2,
              }}
              value={<Text style={{color: 'white'}}>{data.status}</Text>}
            />
          </View>
          <Text
            style={{
              fontFamily: 'HindVadodara-Light',
              fontSize: 20,
              color: theme == 'dark' ? 'white' : 'black',
            }}>
            Release Date: {data.release_date}
          </Text>
          <Text
            style={{
              fontFamily: 'HindVadodara-SemiBold',
              fontSize: 20,
              color: theme == 'dark' ? 'white' : 'black',
            }}>
            TagLine
          </Text>
          <Divider
            style={{
              backgroundColor: theme == 'dark' ? 'white' : 'black',
              borderWidth: 0.5,
              width: 65,
            }}
          />
          <Text
            style={{
              fontFamily: 'HindVadodara-Light',
              fontSize: 20,
              color: theme == 'dark' ? 'white' : 'black',
            }}>
            {data.tagline || 'No tagline found '}
          </Text>

          <Text
            style={{
              fontFamily: 'HindVadodara-SemiBold',
              fontSize: 20,
              color: theme == 'dark' ? 'white' : 'black',
            }}>
            Movie Plot
          </Text>
          <Divider
            style={{
              backgroundColor: theme == 'dark' ? 'white' : 'black',
              borderWidth: 0.5,
              width: 100,
            }}
          />
          <TouchableOpacity>
            <Text
              style={{
                ...styles.Subtitle,
                color: theme == 'dark' ? 'white' : 'black',
              }}>
              {data.overview || 'No plot found'}
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MovieTitle: {
    fontFamily: 'HindVadodara-Bold',
    fontSize: 25,
    paddingVertical: 5,
    textTransform: 'capitalize',
  },
  Subtitle: {
    fontFamily: 'Nunito-Light',
    fontSize: 18,
  },
  image: {
    height: height,
    width: width,
  },
});
