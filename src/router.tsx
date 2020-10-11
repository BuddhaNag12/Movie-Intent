import * as React from 'react';
// import {
//   createStackNavigator,
//   CardStyleInterpolators,
// } from '@react-navigation/stack';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';

import {RootStackParamList} from './types/types';

// screens & components
import Home from '../src/screens/homeScreen';
import DetailsScreen from './screens/detailsScreen';
import SearchScreen from './screens/searchScreen';
import MyHeader from './components/header';
import PreviewImg from './screens/previewImage';
import GridView from './screens/gridView';

const Stack = createSharedElementStackNavigator<RootStackParamList>();
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
            animationEnabled: true,
            // gestureEnabled: true,
            // gestureDirection: 'horizontal',
            // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerStyle: {
              backgroundColor: 'transparent',
              elevation: 0,
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
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="GridView" component={GridView} />
          <Stack.Screen
            name="ImageView"
            component={PreviewImg}
            options={{
              headerTransparent: true,
              headerTintColor: 'white',
              headerTitle: '',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}
