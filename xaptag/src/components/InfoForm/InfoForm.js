import React, { Component } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    TextInput,
    ToastAndroid,
    AsyncStorage, 
    StatusBar
} from 'react-native';
import {
    Spinner,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
import ActionButton from 'react-native-action-button';
import Orientation from 'react-native-orientation-locker'

export default class InfoForm extends Component {

    static navigationOptions = {
        title: 'Profile',
        headerStyle: {
            backgroundColor: '#d50000',
        },
        headerTintColor: "#fff", 
        headerTitleStyle: {
            color: "#fff", 
            fontWeight: 'bold'
        }
    }

    constructor() {
        super()
        this.state = {
            em_phone: '',
            em_name: '',
            aadhar: '', 
            address: '',
            id: '', 
            isLoading: false,
        }
    }
    
    componentWillMount() {
        this.getUserData()
    }

    componentDidMount() {
        Orientation.lockToPortrait(); //this will lock the view to Portrait
    }

    fabMainButton() {
        return (
            <Icon name='check' size={48} color='black' />
        )
    }

    async getUserData() {
        let user = await AsyncStorage.getItem('user');
        let parsedUserInfo = JSON.parse(user);
        this.setState({id: parsedUserInfo['id']})
    }

    async updateMisc() {
        let user = await AsyncStorage.getItem('user');
        let parsedUserInfo = JSON.parse(user);
        let user_updated = {
            id: parsedUserInfo['id'],
            name: parsedUserInfo['name'],
            phone: parsedUserInfo['phone'],
            misc_info: "1",
            email: parsedUserInfo['email'],
            password: parsedUserInfo['password'],
            address: this.state.address, 
            aadhaar: this.state.aadhar, 
            em_name: this.state.em_name,
            em_phone: this.state.em_phone
        }
        try {
            AsyncStorage.removeItem('user');
            AsyncStorage.setItem('user', JSON.stringify(user_updated))
        } catch (error) {
            alert("Something went wrong when storing user data: \n" + error)
        }
    }

    checkAadhar() {
        if(this.state.aadhar.length == 12){
            return true;
        } else {
            return false;
        }
    }

    checkPhone() {
        if(this.state.em_phone.length == 10){
            return true;
        } else {
            return false;
        }
    }

    submit() {
        this.setState({
            isLoading: true
        })
        if(this.checkAadhar() && this.checkPhone() && this.state.address.length > 0 && this.state.em_name.length > 0) {
            // proceed
            fetch('http://api.fardeenpanjwani.com/add_misc_info/user/xaptag_api_key_root', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        address: this.state.address,
                        em_phone: this.state.em_phone,
                        em_name: this.state.em_name,
                        aadhar: this.state.aadhar,
                        id: this.state.id
                    })
                })
                .then((response) => response.text())
                .then((responseJson) => {
                    if (responseJson.includes('success')) {
                        this.setState({
                            isLoading: false
                        })
                        this.updateMisc();
                        ToastAndroid.show('information successfully updated!', ToastAndroid.SHORT)
                        this.props.navigation.navigate('HomePageNew');
                    } else {
                        this.setState({
                            isLoading: false
                        })
                        ToastAndroid.show("something went wrong when uploading user data.\n" + responseJson, ToastAndroid.LONG)
                    }
                })
                .catch((error) => {
                    console.error(error)
                    this.setState({
                        isLoading: false
                    })
                    this.props.navigation.navigate('HomePageNew')
                })
        } else {
            this.setState({
                isLoading: false
            })
            ToastAndroid.show('Please check the entered details and try again!', ToastAndroid.LONG);
        }
    }

    render() {

        if(this.state.isLoading) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                    <StatusBar backgroundColor="#B71C1C" barStyle="light-content" />
                    <Spinner />
                </View>
            )
        }

        return(
            <View style={styles.container}>
                <StatusBar backgroundColor="#B71C1C" barStyle="light-content" />
                <Text style={styles.heading}>Your profile is incomplete. In order to complete your profile, please fill in the following information</Text>
                <TextInput placeholder="Residential address" style={styles.input} onChangeText={(text) => {this.setState({
                    address: text
                })}}/>
                <TextInput keyboardType="numeric" placeholder="aadhaar card number" style={styles.input} onChangeText={(text) => {this.setState({
                    aadhar: text
                })}}/>
                <Text style={styles.sub_heading}>Emergency contact details: </Text>
                <TextInput placeholder="name" style={styles.input} onChangeText={(text) => {this.setState({
                    em_name: text
                })}}/>
                <TextInput keyboardType="numeric" placeholder="phone number" style={styles.input} onChangeText={(text) => {this.setState({
                    em_phone: text
                })}}/>
                <ActionButton buttonColor="transparent" degrees={0} renderIcon={this.fabMainButton.bind(this)} onPress={this.submit.bind(this)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white',
        padding: 12
    },
    heading: {
        fontWeight: 'bold', 
        color: 'black', 
        fontSize: 18, 
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: 24
    },
    input: {
        width: '100%',
        padding: 6,
        borderColor: 'black', 
        borderWidth: 1, 
        borderRadius: 5,
        marginBottom: 8, 
    },
    sub_heading: {
        fontSize: 16, 
        color: 'black', 
        textAlign: 'left',
        marginBottom: 6,
        marginTop: 12
    },
})