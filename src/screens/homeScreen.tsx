import * as React from 'react';
import {View, StyleSheet, Text, ScrollView, RefreshControl} from 'react-native';
import {Appearance} from 'react-native-appearance';
import HrCardsProps from '../components/horizontalCard';
import LottieView from 'lottie-react-native';
import {useTheme} from '@react-navigation/native';
import HeroCarousel from '../components/carousel';
import {getUpcomingMovies} from '../api';
import NetInfo from '@react-native-community/netinfo';

import {HeroText} from '../components/HeroText';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Home = ({navigation}: any) => {
  const {colors} = useTheme();
  const [error, setError] = React.useState<string>('');
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [UpcomingMovies, setUpcomingMovies] = React.useState([]);
  const [popularMovies, setPopularMovies] = React.useState([]);
  const [HotNow, setHotNow] = React.useState([]);
  const [Internet, setInternet] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [counter, setCounter] = React.useState(1);
  const scheme = Appearance.getColorScheme();

  
  React.useEffect(() => {
    setLoading(true);
    let isMounted: boolean = true;
    if (isMounted) {
      NetInfo.fetch()
        .then((state) => {
          setInternet(state.isConnected);
          if (state.isConnected) {
            getUpcomingMovies(counter)
              .then(({popularMovies, upcomingMovies}) => {
                setUpcomingMovies(upcomingMovies.results);
                setPopularMovies(popularMovies.results);
                const TopAverage = popularMovies.results.filter(
                  (item: any) => item.vote_average >= 7,
                );
                setHotNow(TopAverage);
                setLoading(false);
                setRefreshing(false);
              })
              .catch((e) => {
                setLoading(false);
                setError(e);
              });
          }
        })
        .catch((e) => {
          setLoading(false);
          setError(e);
        });
    }
    return () => {
      setInternet(false);
      setLoading(false);
      isMounted = false;
    };
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
    setCounter(counter + 1);
  };

  if (!Internet) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center'}}>Internet Not Connected</Text>
      </View>
    );
  }
  if (loading) {
    return (
      <View style={{flex: 1}}>
        <LottieView
          source={require('../../assets/loading2.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: scheme == 'dark' ? colors.background : 'white',
      }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HeroCarousel CarouselData={HotNow} navigation={navigation} />
        <HeroText
          TextProp="Upcoming Movies"
          color={scheme === 'dark' ? 'white' : 'black'}
          ViewAll="upcoming"
          delay={300}
          navigation={navigation}
        />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          fadingEdgeLength={30}
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
        <HeroText
          delay={400}
          TextProp="Popular Movies"
          color={scheme === 'dark' ? 'white' : 'black'}
          ViewAll="popular"
          navigation={navigation}
        />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          fadingEdgeLength={30}
          contentContainerStyle={{
            paddingVertical: 10,
            paddingRight: 10,
          }}>
          <HrCardsProps
            colors={colors}
            Movies={popularMovies}
            navigation={navigation}
            cardSize="large"
            theme={scheme === 'dark' ? 'dark' : 'light'}
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default Home;
