import * as React from 'react';
import {View} from 'react-native';
import {BottomSheet, ListItem} from 'react-native-elements';
import {colorsMode, HomeScreenType, mode} from '../types/types';

interface MyBottomSheetProps {
  visible: boolean;
  setIsVisible: () => void;
  readonly modal?: any;
  navigation: HomeScreenType;
  theme: mode;
}
export default function MyBottomSheet({
  visible,
  setIsVisible,
  modal,
  navigation,
  theme,
}: MyBottomSheetProps) {
  const navigateHelp = () => {
    navigation.navigate('Help');
    setIsVisible();
  };

  const navigateAbout = () => {
    navigation.navigate('About');
    setIsVisible();
  };
  const list = [
    {
      title: 'Help',
      titleStyle: {
        fontFamily: 'Nunito-Light',
      },
      containerStyle: {
        backgroundColor: theme == 'dark' ? colorsMode.dark : colorsMode.light,
      },
      onPress: () => navigateHelp(),
    },
    {
      title: 'About',
      titleStyle: {
        fontFamily: 'Nunito-Light',
      },
      containerStyle: {
        backgroundColor: theme == 'dark' ? colorsMode.dark : colorsMode.light,
      },
      onPress: () => navigateAbout(),
    },
    {
      title: 'Cancel',

      containerStyle: {
        backgroundColor:
          theme == 'dark'
            ? colorsMode.cancelButtomDark
            : colorsMode.cancelButtomLight,
      },
      titleStyle: {color: 'white', fontFamily: 'Nunito-Light'},
      onPress: () => setIsVisible(),
    },
  ];
  return (
    <View style={{flex: 1}}>
      <BottomSheet modalProps={modal} isVisible={visible}>
        <View
          style={{
            flex: 1,
            backgroundColor:
              theme == 'dark' ? colorsMode.dark : colorsMode.light,
          }}>
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
      </BottomSheet>
    </View>
  );
}
