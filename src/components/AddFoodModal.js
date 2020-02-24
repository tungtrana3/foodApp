import React from 'react';
import {
    AppRegisrtry, StyleSheet, Text, View,
    TouchableOpacity, Dimensions,
    TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
var screen = Dimensions.get('window');
export default class AddFoodModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newFoodName: '',
            newFoodDescription: '',
            newFoodPrice: '',
            status: false,
            message: '',
        }
    }
    showAddFoodModal = () => {
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
                }}>New food information</Text>
                <TextInput style={styles.txt_food}
                    onChangeText={(text) => this.setState({ newFoodName: text })}
                    placeholder="Enter new food's name"
                    value={this.state.newFoodName}
                />
                <TextInput style={styles.txt_food}
                    onChangeText={(text) => this.setState({ newFoodDescription: text })}
                    placeholder="Enter description"
                    value={this.state.newFoodDescription}
                />
                <TextInput style={styles.txt_food}
                    onChangeText={(text) => this.setState({ newFoodPrice: text })}
                    placeholder="Enter price"
                    value={this.state.newFoodPrice}
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
                        if (this.state.newFoodName.length == 0 || this.state.newFoodDescription.length == 0 || this.state.newFoodPrice.length == 0) {
                            alert("Are you missing enter something? Try again!");
                            return;
                        }
                        fetch('http://10.0.2.2:8000/api/add-food', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                food_name: this.state.newFoodName,
                                food_description: this.state.newFoodDescription,
                                food_price: this.state.newFoodPrice,
                                type_id: 1,
                                food_img: "https://i.pinimg.com/236x/fc/42/07/fc420732c8fd825fef78f2833217233b.jpg",
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
                                if(this.state.status==false){
                                    alert("Thêm thất bại "+ this.state.message);
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