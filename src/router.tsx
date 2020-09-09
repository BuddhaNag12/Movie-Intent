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
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';

// components
import Home from '../src/screens/homeScreen';
import SearchScreen from '../src/screens/searchScreen';
import MyHeader from './components/header';

const Stack = createStackNavigator();
export default function App() {
  const scheme = useColorScheme();
  // const scheme = "dark"

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            header: (props) => (
              <MyHeader
                title="Scifi Movies"
                {...props}
                darkTheme={scheme === 'dark' ? 'dark' : 'light'}
              />
            ),
          }}
          headerMode="float">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{
              header: (props) => (
                <MyHeader
                  title="Search result"
                  backButton="true"
                  {...props}
                  darkTheme={scheme === 'dark' ? 'dark' : 'light'}
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}
