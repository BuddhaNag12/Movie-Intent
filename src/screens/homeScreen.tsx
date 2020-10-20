import * as React from 'react';
import {View, StyleSheet, ScrollView, StatusBar, Text} from 'react-native';
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
import RBSheet from 'react-native-raw-bottom-sheet';
import MyBottomSheet from '../components/BottomSheetList';

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

  const scheme = Appearance.getColorScheme();
  const refRBSheet = React.useRef<any>();

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

  const toggleVisible = () => {
    refRBSheet.current.open();
  };
  const closeBottomSheet = () => {
    refRBSheet.current.close();
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

   if (!Internet) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center'}}>Internet Not Connected</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: scheme == 'dark' ? colorsMode.dark : colors.background,
      }}>
      <MyHeader
        isDetailsScreen={false}
        color={colors}
        theme={scheme == 'dark' ? 'dark' : 'light'}
        setVisible={toggleVisible}
      />

      <RBSheet
        ref={refRBSheet}
        animationType="fade"
        closeOnDragDown={true}
        closeOnPressMask={true}
        openDuration={400}
        height={150}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
            borderRadius: 24,
            height: 150,
          },
          draggableIcon: {
            borderRadius: 24,
            backgroundColor:
              scheme == 'dark' ? colorsMode.light : colorsMode.dark,
          },
          container: {
            backgroundColor:
              scheme == 'dark' ? colorsMode.dark : colorsMode.light,
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
          },
        }}>
        <MyBottomSheet
          navigation={navigation}
          theme={scheme === 'dark' ? 'dark' : 'light'}
          onPressHandler={closeBottomSheet}
        />
      </RBSheet>
      <ScrollView>
        <HeroCarousel CarouselData={HotNow} navigation={navigation} colors={colors} />
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
