import * as React from 'react';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {mode} from '../types/types';
import {TouchableOpacity} from 'react-native';

interface SearchButtonProps {
  theme: mode;
}

const SearchButton = ({theme}: SearchButtonProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
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
    </TouchableOpacity>
  );
};

export default SearchButton;
