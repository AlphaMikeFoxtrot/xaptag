import React, {
    Component
} from 'react'
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    Image,
    ToastAndroid,
    Dimensions,
    KeyboardAvoidingView,
    StatusBar
} from 'react-native';
import {
    Button,
    Spinner,
    Icon
} from 'native-base'

export default class LoginScreen extends Component {
    
    static navigationOptions = {
        header: null
    }

    constructor() {
        super()
        this.state = {
            username: '', 
            password: '', 
            isLoading: false,
            authFail: false,
            name: '',
            phone: '',
            id: '',
            email: '',
            password: '',
            misc_info: '',
            qual: '',
        }
    }

    componentWillMount() {
        this.isLoggedIn();
    }

    async isLoggedIn() {
        try {
            this.setState({isLoading: true})
            const loggedIn = await AsyncStorage.getItem('session');
            this.setState({isLoading: false})
            switch(loggedIn) {
                case 'true':
                    // user is already logged in 
                    this.props.navigation.navigate('HomeScreenNew')
                    break;
            }
        } catch(error) {
            alert("something went wrong when fetching asyncstorage value: \n" + error)
        }
    }

    async saveSession(session) {
        try {
            switch (session) {
                case 'true':
                    await AsyncStorage.setItem('session', 'true')
                    break

                case 'false':
                    await AsyncStorage.setItem('session', 'false')
                    break
            }
        } catch (error) {
            alert("Something went wrong when storing user session: \n" + error)
        }
    }

    async _login() {
        if(this.state.username == "" || this.state.password == "") {
            ToastAndroid.show('username or password cannot be empty!', ToastAndroid.SHORT);
            return;
        }
        this.setState({isLoading: true})
        this.setState({authFail: false})
        return fetch(`http://api.fardeenpanjwani.com/login/doctor/xaptag_api_key_root`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
        })
        .then((response) => response.text())
        .then((responseJson) => {
            if(responseJson.includes("does not exist") || responseJson.includes("auth_fail") || responseJson.includes('logged')) {
                this.setState({authFail: true})
                ToastAndroid.show('invalid credentials!', ToastAndroid.SHORT);
            } else if(responseJson.includes('id')) {
                let res = JSON.parse(responseJson);
                this.setState({
                    name: res[0]['name'],
                    phone: res[0]['phone'],
                    id: res[0]['id'],
                    email: res[0]['email'],
                    password: res[0]['password'],
                    misc_info: res[0]['misc_info'],
                    qual: res[0]['qual']
                })
                let user = {
                    name: res[0]['name'],
                    phone: res[0]['phone'],
                    id: res[0]['id'],
                    email: res[0]['email'],
                    password: res[0]['password'],
                    misc_info: res[0]['misc_info'],
                    qual: res[0]['qual']
                }
                try {
                    AsyncStorage.setItem('user', JSON.stringify(user))   
                } catch (error) {
                    alert("Something went wrong when storing user data: \n" + error)
                }
                this.saveSession('true')
                this.props.navigation.navigate('HomeScreenNew');
            }
            this.setState({isLoading: false})
        })
        .catch((error) => console.error(error))
    }

    register = () => {
        this.props.navigation.navigate('SignUpScreen')
    }

    forgotPassword = () => {
        this.props.navigation.navigate('ForgotPasswordScreen')
    }
    
    render() {

        if(this.state.isLoading) {
            return(
                <View style={styles.container}>
                    <Spinner />
                </View>
            )
        }

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Image source={require('../../assets/images/logo.png')} resizeMode='contain' style={{marginBottom: 24, height: '40%', width: '40%'}}/>
                <View style={styles.searchSection}>
                    <Icon name='call' style={styles.searchIcon} />
                    <TextInput keyboardType='numeric' onChangeText={(text) => {this.setState({username: text})}} placeholder="phone number" underlineColorAndroid='transparent' style={styles.input} />
                </View>
                <View style={styles.searchSection}>
                    <Icon name='lock' style={{padding: 10, margin: 10}} />
                    <TextInput onChangeText={(text) => {this.setState({password: text})}} placeholder="password" secureTextEntry={true} underlineColorAndroid='transparent' style={styles.input} />
                </View>
                <Button success full style={{borderRadius: 25, marginTop: 30}} onPress={this._login.bind(this)}>
                    <Text style={styles.buttonText}>Login</Text>
                </Button>
                {/* <Button transparent full success onPress={this.register.bind(this)} style={{borderWidth: 2, borderRadius: 25, borderColor: 'black', marginTop: 15}}>
                    <Text style={{color: 'black'}}>Sign Up</Text>
                </Button> */}
                {/* <View style={styles.signUp}>
                    <TouchableOpacity onPress={this.forgotPassword.bind(this)}>
                        <Text style={styles.signUpText}>Forgot password?</Text>
                    </TouchableOpacity>
                </View> */}
            </KeyboardAvoidingView> 
        )
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
        color: 'white',
        fontWeight: 'bold'
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
        height: ((4600 / Dimensions.get("window").height) / 100) * Dimensions.get("window").height,
        flex: 5,
        margin: 12,
        borderWidth: 2,
        borderColor: 'gray',
        paddingLeft: 10,
        backgroundColor: '#fff',
        color: '#424242',
    },
    signUp: {
        flexDirection: 'row',
        padding: 6,
        marginTop: 14
    },
    signUpText: {
        color: '#000000',
        fontSize: 12,
        fontWeight: 'bold',
    }
})
