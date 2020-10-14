import {useTheme} from '@react-navigation/native';
import * as React from 'react';
import {View, StyleSheet, RefreshControl} from 'react-native';

import {Appearance} from 'react-native-appearance';

import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {getMovies} from '../api';
import FlatListItems from '../components/flatListItems';
import {colorsMode, datatype, GridViewType} from '../types/types';

interface GridViewProps {
  route: any;
  navigation: GridViewType;
}

const GridView = ({route, navigation}: GridViewProps) => {
  const {type} = route.params;
  const scheme = Appearance.getColorScheme();
  const {colors} = useTheme();
  const [fetchedData, setFetchedData] = React.useState([]);
  const [counter, setCounter] = React.useState(1);
  const [refreshing, setRefreshing] = React.useState(false);

  let NavigationConfig = {
    title: type.toUpperCase(),
    headerStyle: {
      backgroundColor: scheme == 'dark' ? colorsMode.dark : colorsMode.light,
      elevation: 0,
    },
  };

  React.useEffect(() => {
    let isMounted = true;
    navigation.setOptions(NavigationConfig);
    if (isMounted) {
      setRefreshing(true);
      getMovies(type, counter)
        .then((res) => {
          setFetchedData(res);
          setRefreshing(false);
        })
        .catch((e) => {
          setRefreshing(false);
          console.log(e);
        });
    }

    return () => {
      setRefreshing(false);
      isMounted = false;
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setCounter(counter + 1);
    getMovies(type, counter)
      .then((res: []) => {
        setFetchedData((prev) => [...prev, ...res]);
        setRefreshing(false);
      })
      .catch((e) => {
        setRefreshing(false);
        console.log(e);
      });
  };
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: scheme == 'dark' ? colorsMode.dark : colorsMode.light,
      }}>
      <FlatList<datatype>
        data={fetchedData}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        keyExtractor={(_, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={onRefresh}
        // ListFooterComponent={() =>
        //   refreshing ? (
        //    <View style={{justifyContent:'flex-end'}}> <ActivityIndicator size="large" color="red" /></View>
        //   ) : (
        //     <Text>Footer</Text>
        //   )
        // }

        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flex: 1 / 3,
                marginVertical: 10,
                marginHorizontal: 5,
              }}>
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate('DetailScreen', {
                    id: item.id,
                  })
                }>
                <FlatListItems
                  items={item}
                  index={index}
                  colors={colors}
                  theme={scheme === 'dark' ? 'dark' : 'light'}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default GridView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
