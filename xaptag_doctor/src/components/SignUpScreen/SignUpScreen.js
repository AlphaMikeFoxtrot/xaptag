import React, { Component } from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    ScrollView,
    TextInput,
    BackAndroid,
    ToastAndroid,
    Dimensions,
    KeyboardAvoidingView
} from 'react-native'
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
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class SignUpScreen extends Component {

    static navigationOptions = {
        title: 'Sign Up',
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
        super();
        this.state = {
            name: '',
            phone: '',
            email: '',
            password: '',
            confirm_password: '',
            qual: '', 
            isLoading: false,
            name_error: false,
            password_error: false,
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
        if (passwordOneArr.length > 6 && passwordTwoArr.length > 6) {
            if (passwordOne == passwordTwo) {
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
        if (name != "") {
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
        if (pass && phone && name && email) {
            fetch('http://api.fardeenpanjwani.com/add/doctor/xaptag_api_key_root', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    phone: this.state.phone,
                    email: this.state.email,
                    password: this.state.password,
                    qual: this.state.qual
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
            this.setState({ isLoading: false })
        }
    }

    _focusNextField(nextField) {
        this.refs[nextField].focus()
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.spinner_container}>
                    <Spinner />
                </View>
            )
        }

        return (
            // <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={styles.container}>
                    <View style={styles.searchSection}>
                        <Icon color='black' size={36} name='person' style={styles.searchIcon} />
                        <TextInput ref="name" onChangeText={(text) => { this.setState({ name: text }) }} placeholder="full name" underlineColorAndroid='transparent' style={styles.input} />
                    </View>
                    <View style={styles.searchSection}>
                        <Icon color='black' size={36} name='call' style={styles.searchIcon} />
                        <TextInput ref="phone" keyboardType="numeric" onChangeText={(text) => { this.setState({ phone: text }) }} placeholder="phone number" underlineColorAndroid='transparent' style={styles.input} />
                    </View>
                    <View style={styles.searchSection}>
                        <Icon color='black' size={36} name='lock' style={styles.searchIcon} />
                        <TextInput ref="password" secureTextEntry={true} onChangeText={(text) => { this.setState({ password: text }) }} placeholder="password" underlineColorAndroid='transparent' style={styles.input} />
                    </View>
                    <View style={styles.searchSection}>
                        <Icon color='black' size={36} name='lock' style={styles.searchIcon} />
                        <TextInput ref="confirm_password" secureTextEntry={true} onChangeText={(text) => { this.setState({ confirm_password: text }) }} placeholder="confirm password" underlineColorAndroid='transparent' style={styles.input} />
                    </View>
                    <View style={styles.searchSection}>
                        <Icon color='black' size={36} name='mail' style={styles.searchIcon} />
                        <TextInput ref="email" keyboardType='email-address' onChangeText={(text) => { this.setState({ email: text }) }} placeholder="email-id" underlineColorAndroid='transparent' style={styles.input} />
                    </View>
                    <View style={styles.searchSection}>
                        <Icon color='black' size={36} name='import-contacts' style={styles.searchIcon} />
                        <TextInput ref="qual" onChangeText={(text) => { this.setState({ qual: text }) }} placeholder="qualification" underlineColorAndroid='transparent' style={styles.input} />
                    </View>
                    <Button success full style={{ borderRadius: 25, borderColor: 'black', borderWidth: 1, backgroundColor: 'white', marginTop: 20 }} onPress={this.submit.bind(this)}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </Button>
                </View>
            // </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 12,
        backgroundColor: 'white',
    },
    spinner_container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
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
        width: '100%', 
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    // searchIcon: {
    //     padding: 10,
    //     margin: 8,
    // },
    input: {
        width: ((34500 / Dimensions.get("window").width) / 100) * Dimensions.get("window").width,
        height: ((4500 / Dimensions.get("window").height) / 100) * Dimensions.get("window").height,
        margin: 12,
        borderWidth: 2,
        borderColor: 'gray',
        paddingLeft: 10,
        backgroundColor: '#fff',
        color: '#424242',
    },
})
