import * as React from 'react';
import {Text, View, BackHandler, Share, ToastAndroid} from 'react-native';
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

  const onShare = () => {
    const shareOptions = {
      title: 'Share via',
      message:
        'https://github.com/BuddhaNag12/Movie-Intent/releases/tag/v1.0-stable',
      url: `https://github.com/BuddhaNag12/Movie-Intent/releases/tag/v1.0-stable`,
    };
    Share.share(shareOptions)
      .then((response) => {
        if (response.action == 'sharedAction') {
          ToastAndroid.showWithGravity(
            'Thanks for sharing the app',
            ToastAndroid.CENTER,
            ToastAndroid.SHORT,
          );
        } else if (response.action == 'dismissedAction') {
          ToastAndroid.showWithGravity(
            'Cancelled Sharing',
            ToastAndroid.CENTER,
            ToastAndroid.SHORT,
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
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
        fontSize: 18,
      },
      containerStyle: {
        backgroundColor: theme == 'dark' ? colorsMode.dark : colorsMode.light,
      },
      onPress: () => navigateAbout(),
    },
    {
      title: 'Share',
      titleStyle: {
        fontFamily: 'HindVadodara-SemiBold',
        color: theme == 'dark' ? colorsMode.light : colorsMode.dark,
        fontSize: 18,
      },
      containerStyle: {
        backgroundColor: theme == 'dark' ? colorsMode.dark : colorsMode.light,
      },
      onPress: () => onShare(),
    },
    {
      title: 'Exit',
      titleStyle: {
        fontFamily: 'HindVadodara-SemiBold',
        color: theme == 'dark' ? colorsMode.dark : colorsMode.light,
        fontSize: 22,
      },
      containerStyle: {
        backgroundColor:
          theme == 'dark'
            ? colorsMode.cancelButtomDark
            : colorsMode.cancelButtomLight,
      },
      onPress: () => BackHandler.exitApp(),
    },
  ];
  return (
    <View style={{flex: 1}}>
      <Text style={{textAlign: 'center', fontFamily: 'HindVadodara-SemiBold'}}>
        Swipe Down to Close
      </Text>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
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
    </View>
  );
}
