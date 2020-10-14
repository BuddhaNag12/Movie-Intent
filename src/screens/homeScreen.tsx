import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import {Appearance} from 'react-native-appearance';
import HrCardsProps from '../components/horizontalCard';
import LottieView from 'lottie-react-native';
import {useTheme} from '@react-navigation/native';
import HeroCarousel from '../components/carousel';
import {getUpcomingMovies} from '../api';
import NetInfo from '@react-native-community/netinfo';
import {colorsMode, HomeScreenType} from '../types/types';
import {HeroText} from '../components/HeroText';
import MyHeader from '../components/header';
import MyBottomSheet from '../components/ButtomSheet';

interface HomeScreenProp {
  navigation: HomeScreenType;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Home = ({navigation}: HomeScreenProp) => {
  const {colors} = useTheme();
  const [error, setError] = React.useState<string>('');
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [UpcomingMovies, setUpcomingMovies] = React.useState([]);
  const [popularMovies, setPopularMovies] = React.useState([]);
  const [HotNow, setHotNow] = React.useState([]);
  const [Internet, setInternet] = React.useState(false);
  const [isVisible, setVisible] = React.useState(false);

  const scheme = Appearance.getColorScheme();

  React.useEffect(() => {
    setLoading(true);
    let isMounted: boolean = true;
    if (isMounted) {
      NetInfo.fetch()
        .then((state) => {
          setInternet(state.isConnected);
          if (state.isConnected) {
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
  }, []);

  // if (!Internet) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center'}}>
  //       <Text style={{textAlign: 'center'}}>Internet Not Connected</Text>
  //     </View>
  //   );
  // }

  const toggleVisible = () => {
    setVisible(!isVisible);
  };
  if (loading) {
    return (
      <View style={{flex: 1}}>
        <StatusBar hidden />
        <LottieView
          source={require('../../assets/loading2.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
  return (
    // <TouchableWithoutFeedback style={{flex: 1}} onPress={() => setVisible(false)}>
      <View
        style={{
          ...styles.container,
          backgroundColor: scheme == 'dark' ? colorsMode.dark : 'white',
        }}>
        <MyHeader
          isDetailsScreen={false}
          color={colors}
          theme={scheme == 'dark' ? 'dark' : 'light'}
          setVisible={toggleVisible}
        />
        <MyBottomSheet visible={isVisible} setIsVisible={toggleVisible} navigation={navigation} 
        theme={scheme == 'dark' ? 'dark' : 'light'}
        />
        <ScrollView>
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
    // </TouchableWithoutFeedback>
  );
};

export default Home;
