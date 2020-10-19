import * as React from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {colorsMode, HomeScreenType, mode} from '../types/types';

interface MyBottomSheetProps {
  navigation: HomeScreenType;
  theme: mode;
  onPressHandler: () => void;
}
export default function MyBottomSheet({
  navigation,
  theme,
  onPressHandler,
}: MyBottomSheetProps) {
  const navigateHelp = () => {
    onPressHandler();
    navigation.navigate('Help');
  };

  const navigateAbout = () => {
    onPressHandler();
    navigation.navigate('About');
  };

  const list = [
    {
      title: 'Help',
      titleStyle: {
        fontFamily: 'HindVadodara-SemiBold',
        color: theme == 'dark' ? colorsMode.light : colorsMode.dark,
        fontSize: 18,
      },
      containerStyle: {
        backgroundColor: theme == 'dark' ? colorsMode.dark : colorsMode.light,
      },
      onPress: () => navigateHelp(),
    },
    {
      title: 'About',
      titleStyle: {
        fontFamily: 'HindVadodara-SemiBold',
        color: theme == 'dark' ? colorsMode.light : colorsMode.dark,
        fontSize: 20,
      },
      containerStyle: {
        backgroundColor: theme == 'dark' ? colorsMode.dark : colorsMode.light,
      },
      onPress: () => navigateAbout(),
    },
  ];
  return (
    <View style={{flex: 1}}>
      {list.map((l, i) => (
        <ListItem
          bottomDivider
          key={i}
          containerStyle={l.containerStyle}
          onPress={l.onPress}>
          <ListItem.Content>
            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}
