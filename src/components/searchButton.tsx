import * as React from 'react';
import {Pressable} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {mode} from '../types/types';

interface SearchButtonProps {
  theme: mode;
}

const SearchButton = ({theme}: SearchButtonProps) => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('Search')}>
      <Icon
        name="search"
        type="Material"
        color={theme == 'dark' ? 'white' : 'black'}
        size={25}
        iconStyle={{
          marginHorizontal: 10,
          elevation: 2,
        }}
      />
    </Pressable>
  );
};

export default SearchButton;
