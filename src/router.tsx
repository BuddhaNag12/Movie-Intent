import * as React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {AppearanceProvider, useColorScheme,Appearance} from 'react-native-appearance';

// components
import Home from '../src/screens/homeScreen';
import DetailsScreen from './screens/detailsScreen';
import SearchScreen from './screens/SearchScreen';
import MyHeader from './components/header';

const Stack = createStackNavigator();
export default function App() {
  const scheme = useColorScheme();
  //  const scheme = "dark"
  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme == 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          headerMode="screen"
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            header: (props) => (
              <MyHeader
                title="Scifi Movies"
                {...props}
                theme={scheme == 'dark' ? 'dark' : 'light'}
              />
            ),
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              header: (props) => (
                <MyHeader
                  searchButton="true"
                  title="Movie Intent"
                  {...props}
                  theme={scheme == 'dark' ? 'dark' : 'light'}
                />
              ),
            }}
          />
          <Stack.Screen
            name="DetailScreen"
            component={DetailsScreen}
            options={{
              header: (props) => (
                <MyHeader
                  backButton="true"
                  {...props}
                  theme={scheme == 'dark' ? 'dark' : 'light'}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{
              header: (props) => (
                <MyHeader
                  backButton="true"
                  {...props}
                  theme={scheme === 'dark' ? 'dark' : 'light'}
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}
