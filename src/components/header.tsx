import * as React from 'react';
import {View, StyleSheet, StatusBar, Image} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colorsMode, colorsType, mode} from '../types/types';
import SearchButton from './searchButton';

interface HeaderProps {
  theme: mode;
  isDetailsScreen: boolean;
  color: colorsType;
  setVisible: () => void;
}

const MyHeader = ({color, theme, isDetailsScreen, setVisible}: HeaderProps) => {
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
            backgroundColor:
              theme == 'dark' ? colorsMode.dark : color.background,
            borderBottomColor:
              theme == 'dark' ? colorsMode.dark : color.background,
          }}
          leftComponent={
            <TouchableOpacity
              onPress={() => setVisible()}
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
            <Image
              source={require('../../assets/LOGO.png')}
              style={{width: 150, height: 30}}
            />
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
});
