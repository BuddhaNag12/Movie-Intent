import * as React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {
  DefaultTheme,
} from '@react-navigation/native';
interface HelpScreenProps {}

const HelpScreen = (props: HelpScreenProps) => {
  return (
<SafeAreaView style={{...styles.container,backgroundColor:DefaultTheme.colors.background}}>
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>Help Screen under Development</Text>
      </View>
    </SafeAreaView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
