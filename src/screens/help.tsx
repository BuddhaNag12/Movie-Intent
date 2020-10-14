import * as React from 'react';
import {Text, View, StyleSheet,SafeAreaView } from 'react-native';

interface HelpScreenProps {}

const HelpScreen = (props: HelpScreenProps) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Help</Text>
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
