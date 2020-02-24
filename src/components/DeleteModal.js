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
            foodId : '',
            status: false,
            message: '',
        }
    }
    showDeleteFoodModal = (id) => {
        this.setState({
            foodId : id,
        });
        this.refs.myModal.open(id);
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
                }}>You wanna delete it : {this.state.foodId}</Text>
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