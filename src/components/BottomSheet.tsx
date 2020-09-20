import * as React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {BottomSheet, ListItem, Card, Button, Icon} from 'react-native-elements';
// import { Appearance, useColorScheme } from 'react-native-appearance';
interface BottomSheetProp {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  readonly modal?: any;
  toggleBottomSheet: () => void;
  filterSearch: (number: number) => void;
  setDefault: (isDefault: boolean) => void;
}

const MyBottomSheet = (props: BottomSheetProp) => {
  const list: Array<Object> = [
    {
      title: 'Scifi movies',
      containerStyle: {backgroundColor: 'white', borderRadius: 5},
      style: {borderRadius: 5},
      titleStyle: {color: 'black', fontFamily: 'Nunito-Light'},
      onPress: () => props.filterSearch(878),
    },
    {
      title: 'Romantic Movies',
      containerStyle: {backgroundColor: 'white', borderRadius: 5},
      style: {borderRadius: 5},
      titleStyle: {color: 'black', fontFamily: 'Nunito-Light'},
      onPress: () => props.filterSearch(10749),
    },
    {
      title: 'Default Results',
      containerStyle: {backgroundColor: 'white', borderRadius: 5},
      style: {borderRadius: 5},
      titleStyle: {color: 'black', fontFamily: 'Nunito-Light'},
      onPress: () => props.setDefault(true),
    },
    {
      title: 'Cancel',
      containerStyle: {backgroundColor: 'red', borderRadius: 5},
      titleStyle: {color: 'white', fontFamily: 'Nunito-Light'},
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
          titleStyle={{fontFamily: 'Nunito-Light'}}
          onPress={props.toggleBottomSheet}
          buttonStyle={{backgroundColor: 'green'}}
          containerStyle={{
            elevation: 2,
          }}
          icon={
            <Icon
              name="filter-outline"
              type="material-community"
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
            <Card.Title style={{fontFamily: 'Nunito-Bold'}}>
              Filter Movies
            </Card.Title>
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
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
