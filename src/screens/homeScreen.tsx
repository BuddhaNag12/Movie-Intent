import * as React from 'react';
import {View, StyleSheet, Text, useColorScheme, Dimensions} from 'react-native';
import MyBottomSheet from '../components/BottomSheet';
import HrCardsProps from '../components/horizontalCard';
import API_TOKEN from '../../envExport';
import {ScrollView} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
const {width} = Dimensions.get('screen');

const Home = ({navigation}: any) => {
  const scheme = useColorScheme();

  type theme = 'black' | 'white';
  let theme: theme;
  //  const scheme = "dark"

  if (scheme == 'dark') {
    theme = 'white';
  } else if (scheme == 'light') {
    theme = 'black';
  } else {
    theme = 'black';
  }

  const [isVisible, setIsVisible] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [UpcomingMovies, setUpcomingMovies] = React.useState([]);
  const [popularMovies, setPopularMovies] = React.useState([]);

  React.useEffect(() => {
    getUpcomingMovies();
    getPopularMovies();

    // return unsubscribe;
  }, [navigation]);

  const getUpcomingMovies = () => {
    setLoading(true);

    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_TOKEN}&language=en-US`,
    )
      .then((data) => data.json())
      .then((res) => {
        setLoading(false);
        setUpcomingMovies(res.results);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const getPopularMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_TOKEN}&language=en-US`,
    )
      .then((data) => data.json())
      .then((res) => {
        setLoading(false);
        setPopularMovies(res.results);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const toggleBottomSheet = () => {
    setIsVisible(!isVisible);
  };

  const toggleSearch = () => {
    navigation.navigate('Search');
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
      <MyBottomSheet
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleBottomSheet={toggleBottomSheet}
      />
      <ScrollView>
        <Text
          style={{
            fontFamily: 'HindVadodara-Bold',
            fontSize: 25,
            paddingHorizontal: 10,
            color: theme == 'black' ? 'white' : 'black',
          }}>
          Upcoming Movies
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          fadingEdgeLength={30}
          bounces={true}
          decelerationRate={0.5}
          snapToInterval={width - 150}
          snapToAlignment={'center'}
          contentContainerStyle={{
            paddingVertical: 10,
          }}>
          <HrCardsProps
            Movies={UpcomingMovies}
            navigation={navigation}
            cardSize="large"
            theme={theme == 'black' ? 'dark' : 'light'}
          />
        </ScrollView>
        <Text
          style={{
            fontFamily: 'HindVadodara-Bold',
            fontSize: 25,
            paddingHorizontal: 10,
            color: theme == 'black' ? 'white' : 'black',
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
            // theme={scheme == 'dark' ? 'dark' : 'light'}
            theme={theme == 'black' ? 'dark' : 'light'}
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
