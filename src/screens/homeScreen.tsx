import * as React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Appearance} from 'react-native-appearance';
import HrCardsProps from '../components/horizontalCard';
import LottieView from 'lottie-react-native';
import {useTheme} from '@react-navigation/native';
import HeroCarousel from '../components/carousel';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Divider} from 'react-native-elements';
import {datatype} from '../types/types';
import {getMovies, getUpcomingMovies} from '../api';
import NetInfo from '@react-native-community/netinfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    zIndex: 1000,
  },
});

const Home = ({navigation}: any) => {
  const {colors} = useTheme();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [UpcomingMovies, setUpcomingMovies] = React.useState([]);
  const [popularMovies, setPopularMovies] = React.useState([]);
  const [HotNow, setHotNow] = React.useState([]);
  const [Internet, setInternet] = React.useState(false);
  const scheme = Appearance.getColorScheme();

  React.useEffect(() => {
    setLoading(true);
    let isMounted: boolean = true;
    getMovies()
      .then((movies) => {
        if (isMounted) {
          setPopularMovies(movies);
          const TopAverage = movies.filter(
            (item: datatype) => item.vote_average >= 7,
          );
          setHotNow(TopAverage);
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(e);
      });
    getUpcomingMovies()
      .then((movies) => {
        setUpcomingMovies(movies);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
    NetInfo.fetch()
      .then((state) => {
        if (isMounted) {
          setInternet(state.isConnected);
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(e);
      });
    return () => {
      setInternet(false)
      setLoading(false)
      isMounted = false;
    };
  }, []);

  return (
    <>
      {loading ? (
        <View style={{flex: 1}}>
          <LottieView
            source={require('../../assets/loading2.json')}
            autoPlay
            loop
          />
        </View>
      ) : (
        <View
          style={{
            ...styles.container,
            backgroundColor: scheme == 'dark' ? colors.background : 'white',
          }}>
          {!Internet ? (
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}}>
                Internet Not Connected...
              </Text>
            </View>
          ) : (
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: 'HindVadodara-Bold',
                    fontSize: 25,
                    paddingHorizontal: 10,
                    color: scheme === 'dark' ? 'white' : 'black',
                  }}>
                  Hot Movies
                </Text>
                <Divider
                  style={{
                    height: 2,
                    backgroundColor: 'red',
                    width: 150,
                    marginVertical: 15,
                  }}
                />
              </View>
              <HeroCarousel CarouselData={HotNow} navigation={navigation} />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontFamily: 'HindVadodara-Bold',
                    fontSize: 25,
                    paddingHorizontal: 10,
                    color: scheme === 'dark' ? 'white' : 'black',
                  }}>
                  Upcoming Movies
                </Text>
                <Divider
                  style={{
                    height: 2,
                    backgroundColor: 'red',
                    width: 150,
                    marginVertical: 15,
                  }}
                />
                <TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: 'HindVadodara-Light',
                      fontSize: 15,
                      paddingHorizontal: 10,
                      marginVertical: 6,
                      color: scheme === 'dark' ? 'white' : 'black',
                    }}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                fadingEdgeLength={30}
                bounces={true}
                contentContainerStyle={{
                  paddingVertical: 10,
                  paddingRight: 10,
                }}>
                <HrCardsProps
                  colors={colors}
                  Movies={UpcomingMovies}
                  navigation={navigation}
                  cardSize="large"
                  theme={scheme === 'dark' ? 'dark' : 'light'}
                />
              </ScrollView>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontFamily: 'HindVadodara-Bold',
                    fontSize: 25,
                    paddingHorizontal: 10,
                    color: scheme === 'dark' ? 'white' : 'black',
                  }}>
                  Popular Movies
                </Text>
                <Divider
                  style={{
                    height: 2,
                    backgroundColor: 'red',
                    width: 150,
                    marginVertical: 15,
                  }}
                />
                <TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: 'HindVadodara-Light',
                      fontSize: 15,
                      paddingHorizontal: 10,
                      marginVertical: 6,
                      color: scheme === 'dark' ? 'white' : 'black',
                    }}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                fadingEdgeLength={30}
                bounces={true}
                contentContainerStyle={{
                  paddingVertical: 10,
                  paddingRight: 15,
                }}>
                <HrCardsProps
                  colors={colors}
                  Movies={popularMovies}
                  navigation={navigation}
                  theme={scheme === 'dark' ? 'dark' : 'light'}
                />
              </ScrollView>
            </ScrollView>
          )}
        </View>
      )}
    </>
  );
};

export default Home;
