import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {colorsType} from '../types/types';
import {Divider} from 'react-native-elements';

interface HelpScreenProps {
  colors: colorsType;
}
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    padding: 2,
  },
  backgroundImage: {
    resizeMode: 'contain',
    height: 400,
    width: width,
  },
  headingText: {
    justifyContent: 'center',
    marginVertical: 4,
    elevation: 1,
    borderRadius: 20,
    padding: 2,
  },

  info: {
    textAlign: 'left',
    fontFamily: 'Nunito-Light',
    fontSize: 18,
    textTransform: 'capitalize',
    paddingHorizontal: 5,
  },
  helpArea: {
    marginVertical: 4,
  },
  h3: {
    textTransform: 'capitalize',
    textAlign: 'left',
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  h2: {
    textTransform: 'capitalize',
    textAlign: 'left',
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
});
const Images = require('../../assets/help.png');

const HeadingImg = () => {
  return (
    <View>
      <Image
        source={Images}
        style={{
          ...styles.backgroundImage,
        }}
      />
    </View>
  );
};

const ContextView = ({colors}: HelpScreenProps) => {
  return (
    <View>
      <View style={{...styles.headingText}}>
        <Text style={{...styles.h3, color: colors.text}}>Steps:</Text>
      </View>
      <Divider />
      <View style={{...styles.helpArea}}>
        <Text style={{...styles.h2, color: colors.text}}>How to search?</Text>
        <Divider />
        <Text style={{...styles.info, color: colors.text}}>
          Open search screen by tapping search icon on the header
        </Text>
        <Text style={{...styles.info, color: colors.text}}>
          Then type name of any movies
        </Text>

        <Text style={{...styles.h2, color: colors.text}}>
          View All option what it do?
        </Text>
        <Divider />
        <Text style={{...styles.info, color: colors.text}}>
          click on view all
        </Text>
        <Text style={{...styles.info, color: colors.text}}>
          Then keep scrolling to see more movie details
        </Text>

        <Text style={{...styles.h2, color: colors.text}}>---Remember---</Text>
        <Divider />
        <Text style={{...styles.info, color: colors.text}}>
          This app is not for movie streaming it is only for movie details
        </Text>
      </View>
    </View>
  );
};
const HelpScreen = () => {
  const {colors} = useTheme();
  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: colors.background}}>
      <ScrollView>
        <View style={styles.container}>
          <HeadingImg />
          <View style={{...styles.content}}>
            <ContextView colors={colors} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpScreen;
