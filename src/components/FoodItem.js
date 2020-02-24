import React from 'react';
import {
    FlatList,
    ActivityIndicator,
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
    TouchableHighlight
} from 'react-native';
import AddFoodModal from './AddFoodModal';
import EditFoodModal from './EditModal';
export default class FoodItem extends React.Component {
    constructor(props) {
        super(props);
        this._editFoodPress = this._editFoodPress.bind(this);
      }
    _editFoodPress() {
        this.refs.editFoodModal.showEditFoodModal(this.props.item);
      }
    render() {
        var imgFood = this.props.item.food_img;
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
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
                    <View style={{ flex: 3, flexDirection: 'column' }}>
                        <Text style={styles.foodItem}>{this.props.item.food_name}</Text>
                        <Text style={styles.foodItem}>{this.props.item.food_description}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <TouchableOpacity onPress={this._editFoodPress} style={styles.btn_foodItem}>
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={require('../img/editIcon.png')}>
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._editFoodPress} style={styles.btn_foodItem}>
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={require('../img/deleteIcon.png')}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: 1, BackgroundColor: 'white' }}></View>
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