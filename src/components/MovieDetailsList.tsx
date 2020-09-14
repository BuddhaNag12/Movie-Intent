import * as React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Card, Badge, Rating, Divider} from 'react-native-elements';
const {width, height} = Dimensions.get('screen');

interface MovieDetailsProps {
  title: string;
  overView: string;
  status: string;
  popularity: number;
}

const MovieDetails = (props: MovieDetailsProps) => {
  return (
    <View
      style={{
        ...styles.container,
      }}>
      <Card
        containerStyle={{
          backgroundColor: '#fefefe',
          elevation: 3,
          borderWidth: 0,
          width: width,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          minHeight: 280,
        }}>
        <View style={{alignItems: 'flex-start', padding: 5}}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={styles.MovieTitle}>{props.title}</Text>
            <Badge
              status="warning"
              badgeStyle={{
                width: 50,
                marginVertical: 12,
                marginHorizontal: 10,
              }}
              value={<Text style={{color: 'white'}}>Top 10</Text>}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Rating
              showRating
              fractions={1}
              ratingCount={5}
              startingValue={props.popularity}
              imageSize={20}
            />
            <Badge
              status={props.status == 'Released' ? 'success' : 'warning'}
              badgeStyle={{
                width: 50,
                marginVertical: 12,
                marginHorizontal: 10,
              }}
              value={<Text style={{color: 'white'}}>{props.status}</Text>}
            />
          </View>

          <Text style={{fontFamily: 'HindVadodara-SemiBold', fontSize: 20}}>
            Movie Plot
          </Text>
          <Divider
            style={{backgroundColor: 'blue', borderWidth: 1, width: 100}}
          />
          <TouchableOpacity>
            <Text
              style={{fontFamily: 'HindVadodara-Bold', fontSize: 18}}></Text>
            <Text style={styles.Subtitle}>{props.overView}</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MovieTitle: {
    fontFamily: 'HindVadodara-Bold',
    fontSize: 25,
    paddingVertical: 5,
    textTransform: 'capitalize',
  },
  Subtitle: {
    fontFamily: 'Nunito-Light',
    fontSize: 18,
  },
});
