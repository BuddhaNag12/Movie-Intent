import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../src/screens/homeScreen';
import SearchScreen from '../src/screens/searchScreen';
// components
import MyHeader from './components/header';

const Stack = createStackNavigator();

function App({navigation}:any) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{header: () => <MyHeader navigation={navigation} />}}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{header: () => <MyHeader navigation={navigation} />}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
