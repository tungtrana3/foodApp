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
            typeId: '',
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
            typeId: item.type_id,
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
                }}>food information {this.state.foodPrice}</Text>
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
                        var requestOptions = {
                            method: 'POST',
                            redirect: 'follow'
                        };

                        fetch("http://10.0.2.2:8000/api/update-food?food_name=" +
                            this.state.foodName +
                            "&type_id=" +
                            this.state.typeId +
                            "&food_description=" +
                            this.state.foodDescription +
                            "&food_img=" + this.state.foodImg +
                            "&food_price=" + this.state.foodPrice +
                            "&food_id=" + this.state.foodId, requestOptions)
                            /*fetch('http://10.0.2.2:8000/api/update-food', {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    food_name: 'Apple',
                                    food_description: 'My Apple is Blue',
                                    food_price: '50',
                                    type_id: '5',
                                    food_id: '52',
                                    food_img: "app.jpg",
                                })
                            })*/
                            .then((response) => response.json())
                            .then((responseJson) => {
                                this.setState({
                                    status: responseJson.status,
                                    message: responseJson.message,
                                }, function () {
                                });
                                if (this.state.status == false) {
                                    alert("False:  " + this.state.message);
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