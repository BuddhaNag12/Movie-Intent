import * as React from 'react';
import {StatusBar, StyleSheet, Text} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {DarkTheme} from '@react-navigation/native';

type booleanType = true | false;
type mode = 'dark' | 'light';
interface HeaderProps {
  backButton?: booleanType;
  navigation?: any;
  title?: string;
  theme: mode;
  searchButton?: booleanType;
}

const MyHeader = (props: HeaderProps) => {
  return (
    <>
      <StatusBar
        barStyle={props.theme == 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />
      <Header
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomColor: 'transparent',
        }}
        style={{borderBottomColor: 'transparent'}}
        centerComponent={
          props.title ? (
            <Text
              style={{
                fontFamily: 'HindVadodara-Bold',
                fontSize: 20,
                color: props.theme == 'dark' ? '#fefefe' : 'black',
              }}>
              {props.title}
            </Text>
          ) : undefined
        }
        rightComponent={
          props.searchButton ? (
            <Icon
              name="search"
              type="material-icon"
              color={props.theme == 'dark' ? '#fefefe' : 'black'}
              size={30}
              onPress={() => props.navigation.navigate('Search')}
            />
          ) : undefined
        }
        leftComponent={
          props.backButton ? (
            <Icon
              name="arrow-back"
              type="material-icon"
              color={props.theme == 'dark' ? '#fefefe' : 'black'}
              size={30}
              onPress={() => props.navigation.navigate('Home')}
            />
          ) : undefined
        }
      />
    </>
  );
};

export default MyHeader;

const styles = StyleSheet.create({
  container: {},
});
