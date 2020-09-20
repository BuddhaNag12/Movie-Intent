import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomSheet, ListItem, Card, Button, Icon} from 'react-native-elements';
import {mode,colorsType} from '../types/types';

interface BottomSheetProp {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  readonly modal?: any;
  toggleBottomSheet: () => void;
  filterSearch: (number: number) => void;
  setDefault: (isDefault: boolean) => void;
  theme:mode;
  colors:colorsType;
}

const MyBottomSheet = (props: BottomSheetProp) => {
  const list: Array<Object> = [
    {
      title: 'Scifi movies',
      containerStyle: {backgroundColor:props.theme=='dark' ? 'grey' :'white',},
      style: {borderRadius: 5},
      titleStyle: {color: props.colors.text, fontFamily: 'Nunito-Light'},
      onPress: () => props.filterSearch(878),
    },
    {
      title: 'Romantic Movies',
      containerStyle: {backgroundColor:props.theme=='dark' ? 'grey' :'white' ,},
      style: {borderRadius: 5},
      titleStyle: {color: props.colors.text, fontFamily: 'Nunito-Light'},
      onPress: () => props.filterSearch(10749),
    },
    {
      title: 'Default Results',
      containerStyle: {backgroundColor:props.theme=='dark' ? 'grey' :'white' ,},
      style: {borderRadius: 5},
      titleStyle: {color: props.colors.text, fontFamily: 'Nunito-Light'},
      onPress: () => props.setDefault(true),
    },
    {
      title: 'Cancel',
      style: {borderRadius: 5},
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
              backgroundColor: props.theme=='dark'? 'black' : 'white',
            }}>
            <Card.Title style={{fontFamily: 'Nunito-Bold',color:props.colors.text}}>
              Filter Movies
            </Card.Title>
            <Card.Divider />
            {list.map((l: any, i: number) => (
              <ListItem
                key={i}
                style={l.style}
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
