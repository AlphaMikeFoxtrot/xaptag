import React, { Component } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    AsyncStorage
} from 'react-native'
import axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialIcons'
import QRCode from 'react-native-qrcode';
import {
    Button,
    Header
} from 'native-base';
import Orientation from 'react-native-orientation-locker';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Possible Unhandled Promise Rejection (id: 1):', 'Module AsyncStorage']);

class Toolbar extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>Header</Text>
            </View>
        )
    }
}

export default class HomeScreen extends Component {

    static navigationOptions = {
        header: (<Toolbar />)
    }

    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            phone: '', 
            email: '', 
            misc_info: '',
            emergency_contact_name: '',
            emergency_contact_number: '', 
            aadhar_card_number: '',
            residential_address: '',
            show_dialog: false,
        }
    }

    componentWillMount() {
    this.getUserData();
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        Orientation.lockToPortrait(); //this will lock the view to Portrait
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        BackHandler.exitApp();
    };

    async getUserData() {
        let user = await AsyncStorage.getItem('user');
        let parsedUserInfo = JSON.parse(user);
        this.setState({id: parsedUserInfo['id']})
        this.setState({name: parsedUserInfo['name']})
        this.setState({phone: parsedUserInfo['phone']})
        this.setState({misc_info: parsedUserInfo['misc_info']})
        this.setState({email: parsedUserInfo['email']})
        if(parsedUserInfo['misc_info'] == "0"){
            this.props.navigation.navigate("InfoForm")
        } else {
                fetch(`http://api.fardeenpanjwani.com/get_misc_info/user/xaptag_api_key_root/${parsedUserInfo['id']}`)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            emergency_contact_name: responseJson[0]['emergency_contact_name'],
                            emergency_contact_number: responseJson[0]['emergency_contact_number'],
                            aadhar_card_number: responseJson[0]['aadhar_card_number'],
                            residential_address: responseJson[0]['residential_address'],
                        })
                        // let user = {
                        //     emergency_contact_name: responseJson[0]['emergency_contact_name'],
                        //     emergency_contact_number: responseJson[0]['emergency_contact_number'],
                        //     aadhar_card_number: responseJson[0]['aadhar_card_number'],
                        //     residential_address: responseJson[0]['residential_address'],
                        //     id: responseJson[0]['user_hash'],
                        //     name: parsedUserInfo['name'],
                        //     phone: parsedUserInfo['phone'],
                        //     misc_info: parsedUserInfo['misc_info'],
                        //     email: parsedUserInfo['email']
                        // }
                        // AsyncStorage.removeItem('user');
                        // AsyncStorage.setItem('user', JSON.stringify(user));
                    })
                    .catch((error) => {
                        console.error(error);
                    });
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
                    this.props.navigation.navigate('LoginScreen');
                    break
            }
        } catch (error) {
            alert("Something went wrong when storing user session: \n" + error)
            return;
        }
    }

    userProfile() {
        this.props.navigation.navigate('UserProfileNew', {
            em_name: this.state.emergency_contact_name, 
            em_phone: this.state.emergency_contact_number, 
            address: this.state.residential_address, 
            aadhar: this.state.aadhar_card_number
        })
    }

    render () {

        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    {/* <Image resizeMode="contain" source={require('../../assets/images/logo_qr_only.png')} style={{height: 44, width: 44}}/> */}
                    <Text style={styles.toolbarHeading}>Xaptag</Text>
                    <View style={styles.rightNav}>
                        {/* <TouchableOpacity>
                        <Icon style={styles.navItem} name="videocam" size={25}/>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => this.userProfile()}>
                            <Icon name='account-circle' size={32} color="#D50000" />
                        </TouchableOpacity>
                        <TouchableOpacity></TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.welcome}>Welcome, {this.state.name}</Text>
                <View style={styles.qrContainer}>
                    <QRCode value={this.state.id} size={300} style={{margin: 12}}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        backgroundColor: 'white',
        alignItems: 'center', 
    },
    qrContainer: {
        flex: 2, 
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    buttonText: {
        color: 'black', 
        fontSize: 18, 
        fontWeight: 'bold',
        margin: 12
    },
    welcome: {
        fontSize: 22, 
        fontWeight: 'bold',
        margin: 12,
        padding: 12,
        color: 'black'
    },
    buttonContainer: {
        height: '22%',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 5
    },
    navItem: {
        marginLeft: 15
    },
    rightNav: {
        flexDirection: 'row'
    },
    toolbar: {
        height: 55,
        width: '100%',
        elevation: 3,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    toolbarHeading: {
        fontSize: 18, 
        fontWeight: 'bold', 
        alignSelf: 'center', 
        color: '#212121'
    }
})