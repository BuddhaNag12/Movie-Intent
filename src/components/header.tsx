import * as React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';

const MyHeader = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <Header centerComponent={{text: 'Scifi movies', style: {color: '#fff'}}} />
    </>
  );
};

export default MyHeader;

const styles = StyleSheet.create({
  container: {},
});
