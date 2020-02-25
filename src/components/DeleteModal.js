import React from 'react';
import {
    AppRegisrtry, StyleSheet, Text, View,
    TouchableOpacity, Dimensions,
    TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
var screen = Dimensions.get('window');
export default class DeleteFoodModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foodId: '',
            status: false,
            message: '',
        }
    }
    showDeleteFoodModal = (item) => {
        this.setState({
            foodId: item.id,
            foodName: item.food_name,
        });
        this.refs.myModal.open(item);
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
                    marginTop: 30
                }}>Mày định xóa hả : </Text>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 5
                }}>{this.state.foodName}</Text>
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
                        fetch('http://10.0.2.2:8000/api/delete-food', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id:this.state.foodId,
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
                                if(this.state.status==true){
                                    alert("Xóa thành công "+ this.state.message);
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                                alert("Xóa thất bại "+ this.state.message);
                            });
                    }}
                >
                    <Text style={{ fontSize: 18, color: 'white', flex: 1 }}>Ừ</Text>
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