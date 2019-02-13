import React, { Component } from 'react'
import {
    View, 
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    BackAndroid,
    ToastAndroid,
    StatusBar
} from 'react-native';
import Orientation from 'react-native-orientation-locker'
import Toast, {DURATION} from 'react-native-easy-toast'
// import {
//     Icon
// } from 'react-native-vector-icons';
import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    Label,
    Spinner,
    Button,
    Icon
} from 'native-base';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class RegisterTest extends Component {

    constructor(){
        super();
        this.state = {
            name: '', 
            phone: '', 
            email: '', 
            password: '', 
            confirm_password: '',
            isLoading: false,
            name_error: false,
            password_error: false,
        }
    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return this.ColorLuminance(color);
    }

    ColorLuminance(hex, lum) {
        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        var rgb = "#",
            c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }

        return rgb;
    }

    static navigationOptions = {
        title: 'Register',
        headerStyle: {
            backgroundColor: '#d50000',
        },
        headerTintColor: "#fff", 
        headerTitleStyle: {
            color: "#fff", 
            fontWeight: 'bold'
        }
    }

    checkPhoneNumber() {
        var phoneNumber = this.state.phone
        var phoneNumberArray = phoneNumber.split("")
        var isPhoneValid = false
        if (phoneNumberArray.length == 10 && !(phoneNumber.includes(' '))) {
            isPhoneValid = true;
        }
        return isPhoneValid;
    }

    checkPasswords() {
        var isPasswordCorrect = false
        var passwordOne = this.state.password
        var passwordTwo = this.state.confirm_password
        var passwordOneArr = passwordOne.split("")
        var passwordTwoArr = passwordTwo.split("")
        if (passwordOneArr.length > 6 && passwordTwoArr.length > 6){
            if(passwordOne == passwordTwo) {
                isPasswordCorrect = true
            }
        }

        return isPasswordCorrect;
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    checkName() {
        var name = this.state.name
        var isNameCorrect = false
        if(name != ""){
            isNameCorrect = true
        }
        return isNameCorrect
    }

    submit() {
        this.setState({
            isLoading: true
        })
        var pass = this.checkPasswords()
        var phone = this.checkPhoneNumber()
        var name = this.checkName()
        var email = this.validateEmail(this.state.email)
        if(pass && phone && name && email){
            fetch('http://api.fardeenpanjwani.com/add/user/xaptag_api_key_root', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    phone: this.state.phone,
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then((response) => response.text())
            .then((responseJson) => {
                // console.warn(responseJson)
                if (responseJson.includes("success")) {
                    this.setState({ isLoading: false })
                    ToastAndroid.show('successfully registered', ToastAndroid.SHORT)
                    this.props.navigation.navigate('LoginScreen');
                } else {
                    this.setState({ isLoading: false })
                    ToastAndroid.show("something went wrong when uploading user data.\n" + responseJson, ToastAndroid.LONG)
                }
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error, ToastAndroid.LONG);
                this.setState({
                    isLoading: false
                })
                this.props.navigation.navigate('LoginScreen')
            })
        } else {
            ToastAndroid.show(`pass: ${pass}\nphone: ${phone}\nname: ${name}\nemail: ${email}`, ToastAndroid.SHORT)
            this.setState({isLoading: false})
        }
    }

    _focusNextField(nextField) {
        this.refs[nextField].focus()
    }

    render() {

        if(this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <StatusBar backgroundColor="#B71C1C" barStyle="light-content" />
                    <Spinner />
                </View>
            )
        }

        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <StatusBar backgroundColor="#B71C1C" barStyle="light-content" />
                <View style={styles.container}>
                    <View style={styles.searchSection}>
                        <Icon color='black' name='person' style={styles.searchIcon} />
                        <TextInput onSubmitEditing={() => this._focusNextField('phone')} ref="name"  onChangeText={(text) => {this.setState({name: text})}} placeholder="full name" underlineColorAndroid='transparent' style={styles.input} />
                    </View>
                    <View style={styles.searchSection}>
                        <Icon color='black' name='call' style={styles.searchIcon} />
                        <TextInput onSubmitEditing={() => this._focusNextField('password')}  ref="phone"  keyboardType="numeric" onChangeText={(text) => {this.setState({phone: text})}} placeholder="phone number" underlineColorAndroid='transparent' style={styles.input} />
                    </View>
                    <View style={styles.searchSection}>
                        <Icon color='black' name='lock' style={styles.searchIcon} />
                        <TextInput onSubmitEditing={() => this._focusNextField('confirm_password')}  ref="password"  secureTextEntry={true} onChangeText={(text) => {this.setState({password: text})}} placeholder="password" underlineColorAndroid='transparent' style={styles.input} />
                    </View>
                    <View style={styles.searchSection}>
                        <Icon color='black' name='lock' style={styles.searchIcon} />
                        <TextInput onSubmitEditing={() => this._focusNextField('email')}  ref="confirm_password"  secureTextEntry={true} onChangeText={(text) => {this.setState({confirm_password: text})}} placeholder="confirm password" underlineColorAndroid='transparent' style={styles.input} />
                    </View>
                    <View style={styles.searchSection}>
                        <Icon color='black' name='mail' style={{padding: 10, margin: 5.6}} />
                        <TextInput ref="email"  keyboardType='email-address' onChangeText={(text) => {this.setState({email: text})}} placeholder="email-id" underlineColorAndroid='transparent' style={styles.input} />
                    </View>
                    <Button success full style={{borderRadius: 25, borderColor: 'black', borderWidth: 1, backgroundColor: 'white', marginTop: 20}} onPress={this.submit.bind(this)}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </Button>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'white',
    },
    editText: {
        marginBottom: 12,
        borderRadius: 5,
        height: '9%',
        width: '100%',
        borderWidth: 3,
        borderColor: 'black',
        padding: 7
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },
    button: {
        marginTop: 12,
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
        margin: 8,
    },
    input: {
        flex: 5,
        margin: 12,
        borderWidth: 2,
        borderColor: 'gray',
        paddingLeft: 10,
        backgroundColor: '#fff',
        color: '#424242',
    },
})
