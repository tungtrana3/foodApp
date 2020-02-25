import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
//import FoodItem from './src/components/FoodItem';
import AddFoodModal from './src/components/AddFoodModal';
import EditModal from './src/components/EditModal'
import DeleteModal from './src/components/DeleteModal';
export default class FetchExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
    this._addFoodPress = this._addFoodPress.bind(this);
    this._deleteFoodPress = this._deleteFoodPress.bind(this);
    this._editFoodPress = this._editFoodPress.bind(this);
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
  _addFoodPress() {
    this.refs.addFoodModal.showAddFoodModal();
  }
  _editFoodPress(item) {
    this.refs.editModal.showEditFoodModal(item);
  }
  _deleteFoodPress(item) {
    this.refs.deleteModal.showDeleteFoodModal(item);
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
      <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0 }}>
        <View style={{
          backgroundColor: 'tomato',
          height: 64,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <TouchableHighlight
            style={{ marginRight: 10 }}
            underlayColor='tomato'
            onPress={this._addFoodPress}
          >
            <Image
              style={{ width: 35, height: 35 }}
              source={require('./src/img/addIcon.png')}
            >
            </Image>
          </TouchableHighlight>
        </View>
        <View style={{
          backgroundColor: 'blue',
          height: 64,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <TouchableHighlight
            style={{ marginRight: 10 }}
            underlayColor='tomato'
            onPress={() => {
              var requestOptions = {
                method: 'POST',
                redirect: 'follow'
              };
              
              fetch("http://10.0.2.2:8000/api/update-food?food_name=apple&type_id=5&food_description=My zfgd&food_img=https://i.pinimg.com/236x/6d/44/df/6d44df91414e9adaa37cb373ce60fc8a.jpg&food_price=50&food_id=10", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
          }}
          >
            <Image
              style={{ width: 35, height: 35 }}
              source={require('./src/img/addIcon.png')}
            >
            </Image>
          </TouchableHighlight>
        </View>
        
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item, index }) =>
            <View >
              <View item={item} index={index} style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{
                  flex: 1,
                  backgroundColor: 'mediumseagreen',
                  //backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen' : 'tomato',
                  flexDirection: 'row'
                }}>
                  <Image
                    source={{ uri: item.food_img }}
                    style={{ width: 100, height: 100, margin: 5 }}
                  >
                  </Image>
                  <View style={{ flex: 3, flexDirection: 'column' }}>
                    <Text style={styles.foodItem}>{item.food_name}</Text>
                    <Text style={styles.foodItem}>{item.food_description}</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                    <TouchableOpacity onPress={() => {this._editFoodPress(item)}} style={styles.btn_foodItem}>
                      <Image
                        style={{ width: 40, height: 40 }}
                        source={require('./src/img/editIcon.png')}>
                      </Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this._deleteFoodPress(item)}} style={styles.btn_foodItem}>
                      <Image
                        style={{ width: 40, height: 40 }}
                        source={require('./src/img/deleteIcon.png')}>
                      </Image>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ height: 1, BackgroundColor: 'white' }}></View>
              </View>
            </View>
          }
          keyExtractor={({ id }, index) => id}
        />
        <AddFoodModal ref={'addFoodModal'} parentFlatList={this}>
        </AddFoodModal>
        <DeleteModal ref={'deleteModal'} parentFlatList={this}></DeleteModal>
        <EditModal ref={'editModal'} parentFlatList={this}></EditModal>
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
  btn_foodItem: {
    padding: 10,
    fontSize: 16,
  },
});