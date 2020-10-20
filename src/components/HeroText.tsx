import * as React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Divider} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { HomeScreenType } from '../types/types';

interface heroTextProps {
  TextProp: string;
  ViewAll?: string;
  color: string;
  delay?: number;
  navigation?: HomeScreenType;
  fontSize?: number;
}

export const HeroText = ({
  TextProp,
  ViewAll,
  color,
  delay,
  navigation,
  fontSize,
}: heroTextProps) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 3,
      }}>
      {TextProp.split('').map((i: string, index: number) => (
        <Animatable.Text
          key={index}
          useNativeDriver
          animation={delay?"fadeInRight":''}
          duration={500}
          delay={delay ? delay + index * 50 : 0}
          style={{
            fontFamily: 'HindVadodara-Bold',
            fontSize: fontSize ? fontSize : 25,

            color: color,
            marginBottom: 10,
            letterSpacing: 0.6,
          }}>
          {i}
        </Animatable.Text>
      ))}

      <Divider
        style={{
          height: 1,
          backgroundColor: 'red',
          width: 150,
          marginVertical: 15,
          marginHorizontal: 10,
        }}
      />
      {navigation ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('GridView', {
              type: ViewAll,
            })
          }>
          <Text
            style={{
              fontFamily: 'HindVadodara-Light',
              fontSize: 15,
              paddingHorizontal: 10,
              marginVertical: 6,
              color: color,
            }}>
            View All
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};
