import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, Image } from 'react-native';

class FoodItem extends React.Component {
  render() {
    var imgFood = this.props.item.food_img;
    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <View style={{
          flex: 1,
          backgroundColor: 'mediumseagreen',
          //backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen' : 'tomato',
          flexDirection: 'row'
        }}>
          <Image
            source={{ uri: imgFood }}
            style={{ width: 100, height: 100, margin: 5 }}
          >
          </Image>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={styles.foodItem}>{this.props.item.food_name}</Text>
            <Text style={styles.foodItem}>{this.props.item.food_description}</Text>
          </View>
        </View>
        <View style={{height: 1,BackgroundColor:'white'}}></View>
      </View>
    );
  }
}
export default class FetchExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    return fetch('http://10.0.2.2:8000/api/food')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.food,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item, index }) =>
            <FoodItem item={item} index={index}></FoodItem>
          }
          keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  foodItem: {
    color: 'white',
    padding: 10,
    fontSize: 16,
  },
});
