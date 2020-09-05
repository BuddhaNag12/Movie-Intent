/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import Home from './src/screens/homeScreen';
import MyHeader from './src/components/header';

const App = () => {
  return (
    <>
      <MyHeader />
      <Home />
    </>
  );
};

export default App;
