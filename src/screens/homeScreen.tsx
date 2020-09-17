import * as React from 'react';
import {View, StyleSheet, Text, Dimensions, StatusBar} from 'react-native';
import {Appearance} from 'react-native-appearance';
import MyBottomSheet from '../components/BottomSheet';
import HrCardsProps from '../components/horizontalCard';
import API_TOKEN from '../../envExport';
import {ScrollView} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';

const {width} = Dimensions.get('screen');

const Home = ({navigation}: any) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [UpcomingMovies, setUpcomingMovies] = React.useState([]);
  const [popularMovies, setPopularMovies] = React.useState([]);
  const scheme = Appearance.getColorScheme();

  React.useEffect(() => {
    setLoading(true);
    getUpcomingMovies()
      .then(({popularMovies, upcomingMovies}) => {
        setUpcomingMovies(upcomingMovies.results);
        setPopularMovies(popularMovies.results);        
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
      });
  }, []);

  const getUpcomingMovies = async () => {
    const [upcomingRes, popularRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_TOKEN}&language=en-US`,
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_TOKEN}&language=en-US`,
      ),
    ]);

    const popularMovies = await popularRes.json();
    const upcomingMovies = await upcomingRes.json();
    return {
      popularMovies,
      upcomingMovies,
    };
  };

  const toggleBottomSheet = () => {
    setIsVisible(!isVisible);
  };

  if (loading) {
    return (
      <LottieView
        source={require('../../assets/loading3.json')}
        colorFilters={[
          {
            keypath: 'button',
            color: '#F00000',
          },
          {
            keypath: 'Sending Loader',
            color: '#F00000',
          },
        ]}
        autoPlay
        loop
      />
    );
  }
  return (
    <View style={styles.container}>
      {/* <MyBottomSheet
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleBottomSheet={toggleBottomSheet}
      /> */}
      <StatusBar
        barStyle={scheme == 'dark' ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor="transparent"
      />
      <ScrollView>
        <Text
          style={{
            fontFamily: 'HindVadodara-Bold',
            fontSize: 25,
            paddingHorizontal: 10,
            color: scheme === 'dark' ? 'white' : 'black',
          }}>
          Upcoming Movies
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          fadingEdgeLength={30}
          bounces={true}
          decelerationRate="fast"
          snapToInterval={width - 150}
          snapToAlignment={'center'}
          contentContainerStyle={{
            paddingVertical: 10,
          }}>
          <HrCardsProps
            Movies={UpcomingMovies}
            navigation={navigation}
            cardSize="large"
            theme={scheme === 'dark' ? 'dark' : 'light'}
          />
        </ScrollView>
        <Text
          style={{
            fontFamily: 'HindVadodara-Bold',
            fontSize: 25,
            paddingHorizontal: 10,
            color: scheme === 'dark' ? 'white' : 'black',
          }}>
          Popular Movies
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          fadingEdgeLength={30}
          bounces={true}
          contentContainerStyle={{
            paddingVertical: 10,
          }}>
          <HrCardsProps
            Movies={popularMovies}
            navigation={navigation}
            theme={scheme === 'dark' ? 'dark' : 'light'}
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
