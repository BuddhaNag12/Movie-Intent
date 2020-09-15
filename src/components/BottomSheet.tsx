import * as React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {BottomSheet, ListItem, Card, Button, Icon} from 'react-native-elements';
// import { Appearance, useColorScheme } from 'react-native-appearance';
interface BottomSheetProp {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  readonly modal?: any;
  toggleBottomSheet: () => void;
}

const MyBottomSheet = (props: BottomSheetProp) => {
  // const toggleDarkMode=()=>{
  //   const subscription = Appearance.addChangeListener(({ colorScheme }) => {
  //     colorScheme.
  //   });

  //   // Remove the subscription at some point
  //   subscription.remove();
  // }

  const list: Array<Object> = [
    {title: 'Upcoming Scifi movies'},
    {title: 'Most rated'},
    {
      title: 'Cancel',
      containerStyle: {backgroundColor: 'red', borderRadius: 5},
      titleStyle: {color: 'white'},
      onPress: () => props.setIsVisible(false),
    },
  ];
  return (
    <View style={styles.container}>
      <View
        style={{
          width: 100,
          paddingHorizontal: 10,
          marginVertical: 5,
        }}>
        <Button
          title="filter"
          onPress={props.toggleBottomSheet}
          buttonStyle={{backgroundColor: 'green'}}
          containerStyle={{
            elevation: 3,
          }}
          icon={
            <Icon
              name="filter-outline"
              type="ionicon"
              size={20}
              color="white"
              style={{paddingHorizontal: 5}}
            />
          }></Button>
      </View>
      <View style={{width: '100%'}}>
        <BottomSheet isVisible={props.isVisible} modalProps={props.modal}>
          <Card
            containerStyle={{
              width: '100%',
              alignSelf: 'center',
            }}>
            <Card.Title>Filter Movies</Card.Title>
            <Card.Divider />
            {list.map((l: any, i: number) => (
              <ListItem
                key={i}
                containerStyle={l.containerStyle}
                onPress={l.onPress}>
                <ListItem.Content>
                  <ListItem.Title style={l.titleStyle}>
                    {l.title}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </Card>
        </BottomSheet>
      </View>
    </View>
  );
};

export default MyBottomSheet;

const styles = StyleSheet.create({
  container: {
    justifyContent:"center",
    alignItems:"flex-end"
  },
});
