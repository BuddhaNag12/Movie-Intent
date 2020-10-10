import React from 'react';
import {View, Dimensions, Animated, StyleSheet} from 'react-native';
import { colors } from 'react-native-elements';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import {SharedElement} from 'react-navigation-shared-element';
const {width, height} = Dimensions.get('window');

const PreviewImg = ({route}: any) => {
  const {imagePath} = route.params;
  let scale = new Animated.Value(1);
  let onZoomEvent = Animated.event(
    [
      {
        nativeEvent: {scale: scale},
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const onZoomStateChange = (event: any): any => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <View style={{flex: 1,backgroundColor:colors.grey5}}>
      <SharedElement id={`item.${imagePath}.photo`} style={{flex: 1,backgroundColor:colors.grey5}}>
        <PinchGestureHandler
          onGestureEvent={onZoomEvent}
          onHandlerStateChange={onZoomStateChange}>
          <Animated.Image
            source={{uri: 'https://image.tmdb.org/t/p/w1280' + imagePath}}
            style={{
              width:width,height,
              transform: [{scale: scale}],
            }}
            resizeMode='stretch'
          />
        </PinchGestureHandler>
      </SharedElement>
    </View>
  );
};

PreviewImg.sharedElements = (route: any) => {
  const {imagePath} = route.params;
  return [`item.${imagePath}.photo`];
};
export default PreviewImg;
