import React, {Component} from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import Orientation from 'react-native-orientation-locker'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ActionButton from 'react-native-action-button';
import {
    Button,
    Spinner
} from 'native-base'
import Toast from '../../../node_modules/react-native-easy-toast';

export default class ForgotPassword extends Component {

    static navigationOptions = {
        header: null
    }

    constructor() {
        super()
        this.state = {
            phoneNumber: '',
            verifyingPhone: false, 
            donePhoneVer: false, 
            userExists: false,
            samePassword: true,
            password: '', 
            confirmPassword: '', 
        }
    }

    componentDidMount() {
        Orientation.lockToPortrait(); //this will lock the view to Portrait
    }

    fabMainButton() {
        return (
            <Icon name='done' size={48} color='black' />
        )
    }

    verifyPhone() {
        if(this.state.phoneNumber.length == 10) {
            this.setState({
                verifyingPhone: true
            })
            fetch(`http://api.fardeenpanjwani.com/verify/user/xaptag_api_key_root`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    number: this.state.phoneNumber
                })
            })
            .then((response) => response.text())
            .then((responseJson) => {
                this.setState({
                    verifyingPhone: false,
                    donePhoneVer: true
                })
                if(responseJson.includes('okay')){
                    this.setState({
                        userExists: true
                    })
                }
            })
            .catch((error) => {
                console.error(error)
                this.setState({
                    isLoading: false
                })
                this.props.navigation.navigate('LoginScreen')
            })
        } else {
            ToastAndroid.show('Please enter a valid phone number!', ToastAndroid.LONG);
        }
    }

    resetPassword() {
        if(this.state.password == this.state.confirmPassword){
            this.setState({
                verifyingPhone: true,
            })
            fetch(`http://api.fardeenpanjwani.com/reset_password/user/xaptag_api_key_root`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    number: this.state.phoneNumber,
                    password: this.state.password
                })
            })
            .then((response) => response.text())
            .then((responseJson) => {
                this.setState({
                    verifyingPhone: false,
                })
                if(responseJson.includes('success')){
                    ToastAndroid.show("Password successfully updated", ToastAndroid.LONG);
                    this.props.navigation.navigate('LoginScreen')
                } else if(responseJson.includes('fail')){
                    ToastAndroid.show('Something went wrong when reseting password. Please try again after sometime.')
                }
            })
            .catch((error) => {
                console.error(error)
                this.setState({
                    isLoading: false
                })
                this.props.navigation.navigate('LoginScreen')
            })
        } else {
            this.setState({
                samePassword: false
            })
        }
    }

    render() {

        if(this.state.verifyingPhone) {
            return(
                <View style={{backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Spinner />
                </View>
            )
        }
        
        if(this.state.userExists && this.state.donePhoneVer && !this.state.samePassword) {
            return(
                <View style={styles.container}>
                    <TextInput secureTextEntry={true} placeholder="new password" style={styles.input} onChangeText={(text) => {this.setState({
                        password: text
                    })}}/>
                    <TextInput secureTextEntry={true} placeholder="new password" style={styles.input} onChangeText={(text) => {this.setState({
                        confirmPassword: text
                    })}}/>
                    <Text style={styles.errorPassword}>*passwords do not match</Text>
                    <Button full success style={{borderRadius: 25, marginTop: 15}} onPress={this.resetPassword.bind(this)}>
                        <Text style={{color: 'white', alignSelf: 'center', padding: 2}}>Reset password</Text>
                    </Button>
                </View>
            )
        }

        if(this.state.userExists && this.state.donePhoneVer){
            return(
                <View style={styles.container}>
                    <TextInput secureTextEntry={true} placeholder="new password" style={styles.input} onChangeText={(text) => {this.setState({
                        password: text
                    })}}/>
                    <TextInput secureTextEntry={true} placeholder="new password" style={styles.input} onChangeText={(text) => {this.setState({
                        confirmPassword: text
                    })}}/>
                    <Button full success style={{borderRadius: 25, marginTop: 15}} onPress={this.resetPassword.bind(this)}>
                        <Text style={{color: 'white', alignSelf: 'center', padding: 2}}>Reset password</Text>
                    </Button>
                </View>
            )
        }

        if(!this.state.userExists && this.state.donePhoneVer){
            return(
                <View style={styles.container}>
                    <Text style={styles.instruction}>To continue, enter your registerd phone number: </Text>
                    <TextInput keyboardType="numeric" value={this.state.phoneNumber} style={styles.input} onChangeText={(text) => {this.setState({
                        phoneNumber: text
                    })}}/>
                    <Text style={styles.error}>*User does not exists. Please check the phone number you entered or try again after sometime</Text>
                    <ActionButton buttonColor='transarent' degrees={0} renderIcon={this.fabMainButton.bind(this)} onPress={this.verifyPhone.bind(this)}/>
                </View>
            )
        }

        return(
            <View style={styles.container}>
                <Text style={styles.instruction}>To continue, enter your registerd phone number: </Text>
                <TextInput keyboardType="numeric" placeholder="phone number" style={styles.input} onChangeText={(text) => {this.setState({
                    phoneNumber: text
                })}}/>
                <ActionButton buttonColor="transparent" degrees={0} renderIcon={this.fabMainButton.bind(this)} onPress={this.verifyPhone.bind(this)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'white',
        paddingTop: 30
    },
    input: {
        width: '100%', 
        padding: 12, 
        margin: 12, 
        borderColor: 'black', 
        borderWidth: 1, 
        borderRadius: 5,
    },
    instruction: {
        alignSelf: 'center',
        margin: 4, 
        padding: 4, 
        fontSize: 16,
        color: 'black'
    },
    error: {
        color: 'red',
        margin: 12,
        fontSize: 16,
        alignSelf: 'center'
    },
    errorPassword: {
        color: 'red',
        marginBottom: 8, 
        fontSize: 12,
        alignSelf: 'flex-start',
    }
})