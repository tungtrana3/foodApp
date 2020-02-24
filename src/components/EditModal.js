import React from 'react';
import {
    AppRegisrtry, StyleSheet, Text, View,
    TouchableOpacity, Dimensions,
    TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
var screen = Dimensions.get('window');
export default class EditFoodModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foodName: '',
            foodDescription: '',
            foodPrice: '',
            foodImg: '',
            foodId: '',
            status: false,
            message: '',
        }
    }
    showEditFoodModal = (item) => {
        this.setState({
            foodName: item.food_name,
            foodDescription: item.food_description,
            foodPrice: item.food_price,
            foodImg: item.food_img,
            foodId: item.id,
        });
        this.refs.myModal.open();
    }
    render() {
        return (
            <Modal
                ref={"myModal"}
                style={{
                    justifyContent: 'center',
                    borderRadius: 30,
                    width: screen.width - 80,
                    height: 300
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    //alert(this.state.message);
                }}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 40
                }}>food information</Text>
                <TextInput style={styles.txt_food}
                    onChangeText={(text) => this.setState({ foodName: text })}
                    placeholder="Enter food's name"
                    value={this.state.foodName}
                />
                <TextInput style={styles.txt_food}
                    onChangeText={(text) => this.setState({ foodDescription: text })}
                    placeholder="Enter description"
                    value={this.state.foodDescription}
                />
                <TextInput style={styles.txt_food}
                    onChangeText={(text) => this.setState({ foodPrice: text })}
                    placeholder="Enter price"
                    value={this.state.foodPrice}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: 'blue',
                        padding: 8,
                        marginLeft: 70,
                        marginRight: 70,
                        height: 40,
                        borderRadius: 6,
                        backgroundColor: 'mediumseagreen',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        if (this.state.foodName.length == 0 || this.state.foodDescription.length == 0 || this.state.newFoodPrice.length == 0) {
                            alert("Are you missing enter something? Try again!");
                            return;
                        }
                        fetch('http://10.0.2.2:8000/api/update-food', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                food_name: this.state.foodName,
                                food_description: this.state.foodDescription,
                                food_price: this.state.foodPrice,
                                type_id: this.state.id,
                                food_img: this.state.foodImg,
                            })
                        })
                            .then((response) => response.json())
                            .then((responseJson) => {
                                this.setState({
                                    isLoading: false,
                                    status: responseJson.status,
                                    message: responseJson.message,
                                }, function () {
                                });
                                if (this.state.status == false) {
                                    alert("Sửa thất bại " + this.state.message);
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }}
                >
                    <Text style={{ fontSize: 18, color: 'white', flex: 1 }}>Save</Text>
                </TouchableOpacity>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    txt_food: {
        height: 40,
        borderBottomColor: 'gray',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        marginBottom: 10,
        borderBottomWidth: 1
    },
});