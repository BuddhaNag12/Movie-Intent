import * as React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Appearance} from 'react-native-appearance';
import MyBottomSheet from '../components/BottomSheet';
import HrCardsProps from '../components/horizontalCard';
import API_TOKEN from '../../envExport';
import LottieView from 'lottie-react-native';
import {useTheme} from '@react-navigation/native';
import HeroCarousel from '../components/carousel';

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

  const [isVisible, setIsVisible] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [isDefault, setDefault] = React.useState(false);
  const [scifi, setScifi] = React.useState(false);
  const [UpcomingMovies, setUpcomingMovies] = React.useState([]);
  const [popularMovies, setPopularMovies] = React.useState([]);
  const [HotNow, setHotNow] = React.useState([]);
  const scheme = Appearance.getColorScheme();

  const reset = () => {
    setScifi(false);
    setIsVisible(false);
    setDefault(false);
  };
  React.useEffect(() => {
    setLoading(true);
    reset();
    getUpcomingMovies()
      .then(({popularMovies, upcomingMovies}) => {
        setUpcomingMovies(upcomingMovies.results);
        setPopularMovies(popularMovies.results);
        const TopAverage = popularMovies.results.filter(
          (item: any) => item.vote_average >= 7,
        );
        setHotNow(TopAverage);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
      });
  }, [isDefault]);

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

  const filterSearch = (id: number) => {
    setScifi(true);
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_TOKEN}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${id}&page=1`,
    )
      .then((response) => response.json())
      .then((results) => {
        const TopAverage = results.results.filter(
          (item: any) => item.popularity >= 0.6,
        );
        setHotNow(TopAverage);
        setIsVisible(false);
      })
      .catch((e) => setError(e));
  };
  const toggleBottomSheet = () => {
    setIsVisible(!isVisible);
  };

  if (loading) {
    return (
      <LottieView
        source={require('../../assets/loading2.json')}
        autoPlay
        loop
      />
    );
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: scheme == 'dark' ? colors.background : 'white',
      }}>
      <ScrollView>
        <MyBottomSheet
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          toggleBottomSheet={toggleBottomSheet}
          filterSearch={filterSearch}
          setDefault={setDefault}
          theme={scheme == 'dark' ? 'dark' : 'light'}
          colors={colors}
        />
        <Text
          style={{
            fontFamily: 'HindVadodara-Bold',
            fontSize: 25,
            paddingHorizontal: 10,
            paddingVertical: 10,
            color: scheme === 'dark' ? 'white' : 'black',
            textTransform: 'capitalize',
          }}>
          {scifi ? 'Filtered hot now' : 'Hot now'}
        </Text>
        <HeroCarousel CarouselData={HotNow} navigation={navigation} />
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
          contentContainerStyle={{
            paddingVertical: 10,
          }}>
          <HrCardsProps
            colors={colors}
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
            colors={colors}
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
