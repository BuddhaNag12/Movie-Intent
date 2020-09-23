import * as React from 'react';
import {Text, View, StyleSheet, StatusBar, Image} from 'react-native';
import {Header} from 'react-native-elements';
import {colorsType, mode} from '../types/types';
import SearchButton from './searchButton';

interface HeaderProps {
  theme: mode;
  isDetailsScreen: boolean;
  color: colorsType;
}

const MyHeader = ({color, theme, isDetailsScreen}: HeaderProps) => {
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
            borderBottomColor: color.border,
          }}
          leftComponent={
            <View
              style={{
                paddingVertical: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/logo2.png')}
                style={styles.logo}
              />
            </View>
          }
          centerComponent={
            <Text
              style={{
                fontFamily: 'Nunito-Bold',
                fontSize: 20,
                fontStyle: 'normal',
                color: theme == 'dark' ? 'whitesmoke' : 'black',
              }}>
              Movie Intent
            </Text>
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
