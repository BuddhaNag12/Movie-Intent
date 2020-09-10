import * as React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {DarkTheme} from '@react-navigation/native';

interface HeaderProps {
  backButton?: 'true' | 'false' | boolean;
  navigation?: any;
  title: string;
  darkTheme: 'dark' | 'light';
}

const MyHeader = (props: HeaderProps) => {
  const backgroundColor = props.darkTheme == 'dark' ? 'black' : '#FF8066';

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fefefe" />
      <Header
        containerStyle={{
          backgroundColor: '#fefefe',
          borderBottomColor: 'transparent',
        }}
        style={{borderBottomColor: 'transparent'}}
        leftComponent={
          props.backButton ? (
            <Icon
              name="arrow-back"
              type="material-icon"
              color="black"
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
