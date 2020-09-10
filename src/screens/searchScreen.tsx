import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Card, Rating, Badge, Divider} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import API_TOKEN from '../../envExport';

const {width, height} = Dimensions.get('screen');
interface SearchScreenProps {
  route: any;
}

const SearchScreen = ({route}: SearchScreenProps) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setMoviesFetched] = React.useState({
    movieBanner: '',
    title: '',
    overview: '',
    popularity: 0,
    status: '',
  });
  const {title, id} = route.params;
  const [buttonHeight, setHeight] = React.useState(60);
  const toggleShowMore = () => {
    buttonHeight === 60 ? setHeight(160) : setHeight(60);
  };
  const api = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_TOKEN}&language=en-US`;
  React.useEffect(() => {
    setLoading(true);
    fetch(api)
      .then((data) => data.json())
      .then((res) => {
        setLoading(false);
        setMoviesFetched(res);
        console.log(data);
      });
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{
          uri: data.movieBanner
            ? data.movieBanner
            : 'https://static.dribbble.com/users/3281732/screenshots/12688476/media/cf19d222859aab75ed995365338d4c32.jpg',
        }}
      />

      <View
        style={{
          width: width,
          height: height / 2,
          position: 'absolute',
          top: '48%',
          alignItems: 'center',
        }}>
        <Card
          containerStyle={{
            borderWidth: 0,
            marginHorizontal: 10,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            elevation: 2,
            height: height,
            width: width,
          }}>
          <View style={{alignItems: 'flex-start', padding: 5}}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={styles.MovieTitle}>{data.title}</Text>
              <Badge
                status="warning"
                badgeStyle={{
                  width: 50,
                  marginVertical: 12,
                  marginHorizontal: 10,
                }}
                value={<Text style={{color: 'white'}}>Top 10</Text>}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Rating
                showRating
                fractions={1}
                ratingCount={5}
                startingValue={data.popularity}
                imageSize={20}
              />
              <Badge
                status={data.status == 'Released' ? 'success' : 'warning'}
                badgeStyle={{
                  width: 50,
                  marginVertical: 12,
                  marginHorizontal: 10,
                }}
                value={<Text style={{color: 'white'}}>{data.status}</Text>}
              />
            </View>

            <Text style={{fontFamily: 'HindVadodara-SemiBold', fontSize: 20}}>
              Movie Plot
            </Text>
            <Divider
              style={{backgroundColor: 'blue', borderWidth: 1, width: 100}}
            />
            <TouchableOpacity
              style={{height: buttonHeight}}
              onPress={() => toggleShowMore()}>
              <Text style={{fontFamily: 'HindVadodara-Bold', fontSize: 18}}>
                {buttonHeight == 60 ? 'Show more' : 'Read less..'}
              </Text>
              <Text style={styles.Subtitle}>{data.overview}</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  image: {
    height: height / 2,
    width: width,
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
});
