import * as React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Divider} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

interface heroTextProps {
  TextProp: string;
  ViewAll: string;
  color: string;
  delay: number;
  navigation: any;
}

export const HeroText = ({
  TextProp,
  ViewAll,
  color,
  delay,
  navigation,
}: heroTextProps) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 3,
      }}>
      {TextProp.split('').map((i: string, index: number) => (
        <Animatable.Text
          key={index}
          useNativeDriver
          animation="fadeInRight"
          duration={500}
          delay={delay + index * 50}
          style={{
            fontFamily: 'HindVadodara-Bold',
            fontSize: 25,
            color: color,
          }}>
          {i}
        </Animatable.Text>
      ))}
      <Divider
        style={{
          height: 2,
          backgroundColor: 'red',
          width: 150,
          marginVertical: 15,
        }}
      />
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
    </View>
  );
};
