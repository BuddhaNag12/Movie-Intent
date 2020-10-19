import * as React from 'react';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {RootStackParamList} from './types/types';

// screens & components
import Home from '../src/screens/homeScreen';
import DetailsScreen from './screens/detailsScreen';
import SearchScreen from './screens/searchScreen';
import PreviewImg from './screens/previewImage';
import GridView from './screens/gridView';
import HelpScreen from './screens/help';
import AboutScreen from './screens/about';
import {
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

const Stack = createSharedElementStackNavigator<RootStackParamList>();

export default function App() {
  const scheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <AppearanceProvider>
        <NavigationContainer
          theme={scheme == 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator
            headerMode="screen"
            screenOptions={{
              animationEnabled: true,
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
                headerShown: false,
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
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
              }}
            />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />
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
    </SafeAreaProvider>
  );
}
