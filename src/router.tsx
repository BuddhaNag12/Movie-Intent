import * as React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme, useTheme
} from '@react-navigation/native';

import {AppearanceProvider, useColorScheme} from 'react-native-appearance';

// components
import Home from '../src/screens/homeScreen';
import DetailsScreen from './screens/detailsScreen';
import SearchScreen from './screens/searchScreen';
import MyHeader from './components/header';

const Stack = createStackNavigator();
export default function App() {
  const scheme = useColorScheme();
  const {colors} = useTheme();
  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme == 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          initialRouteName="Home"
          headerMode="screen"
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerStyle: {
              elevation: 0,
              backgroundColor: 'transparent',
            },
            headerTitleStyle: {
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'HindVadodara-Bold',
              fontSize: 20,
            },
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              header: (props) => (
                <MyHeader
                  {...props}
                  isDetailsScreen={false}
                  color={colors}
                  theme={scheme == 'dark' ? 'dark' : 'light'}
                />
              ),
            }}
          />
          <Stack.Screen
            name="DetailScreen"
            component={DetailsScreen}
            options={{
              headerTransparent: true,
              headerTitle: '',
              headerTintColor: '#FF5159',
            }}
          />
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}
