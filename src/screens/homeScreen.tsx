import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MovieList from '../components/movieList';
import SearchMovies from '../components/search';


const Home = () => {
  const [text, setText] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d722',
      title: 'Third sItem',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d725',
      title: 'Third saItem',
    },
  ]);
  const searchMovies = (val: string) => {
    setText(val);
    const filteredList = searchResults.filter((i):any => {
      return i.title.trim().toUpperCase() == val.trim().toUpperCase()
    });
    console.log(filteredList);
    if(filteredList.length>0){
      setSearchResults(filteredList);
    }else{
      setSearchResults((prev)=>prev);
    }
  };

  return (
    <View style={styles.container}>
      <SearchMovies movieName="Intersteller" search={searchMovies} />
      <Text>{text}</Text>
      <MovieList searchItems={searchResults} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
