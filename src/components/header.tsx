import * as React from 'react';
import {Text, View, StyleSheet, StatusBar, Image} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {colorsType, mode} from '../types/types';
import SearchButton from './searchButton';

interface HeaderProps {
  theme: mode;
  isDetailsScreen: boolean;
  color: colorsType;
}

const MyHeader = ({color, theme, isDetailsScreen}: HeaderProps) => {
  const logoHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 15;

  return (
    <View style={{backgroundColor: color.background}}>
      <StatusBar
        barStyle={theme == 'dark' ? 'light-content' : 'dark-content'}
        translucent={isDetailsScreen == true ? true : false}
        backgroundColor="transparent"
        showHideTransition="fade"
      />
      {!isDetailsScreen ? (
        <Header
          barStyle={theme == 'dark' ? 'light-content' : 'dark-content'}
          containerStyle={{
            backgroundColor: theme == 'dark' ? 'black' : 'white',
            borderBottomColor: theme == 'dark' ? 'black' : 'white',
          }}
          leftComponent={
            <TouchableOpacity
              style={{
                paddingVertical: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="menu"
                size={25}
                type="material"
                color={theme == 'dark' ? 'whitesmoke' : 'black'}
              />
            </TouchableOpacity>
          }
          centerComponent={
            <LinearGradient
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}
              colors={['#F7E06E', '#FFDD33', '#F7EC6E']}
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: logoHeight / 2,
                marginBottom: logoHeight / 2,
                borderRadius: 5,
              }}>
              <Image
                source={require('../../assets/logo2.png')}
                style={{width: 25, height: 27, marginHorizontal: 2}}
              />
              <Text
                style={{
                  fontFamily: 'Nunito-Bold',
                  fontSize: 20,
                  fontStyle: 'normal',
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                  color: theme == 'dark' ? 'whitesmoke' : 'black',
                }}>
                Movie Intent
              </Text>
            </LinearGradient>
          }
          rightComponent={
            <SearchButton theme={theme == 'dark' ? 'dark' : 'light'} />
          }
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default MyHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginVertical: 10,
    backgroundColor: 'red',
  },
  logo: {
    width: 35,
    height: 40,
  },
  //   logoTitle: {
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     fontFamily: 'HindVadodara-Bold',
  //     fontSize: 15,
  //   },
});
