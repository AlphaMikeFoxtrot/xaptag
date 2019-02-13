import React, { Component } from 'react'
import {
    View, 
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    AsyncStorage,
    Dimensions,
    Vibration
} from 'react-native'
import {PlaySound} from 'react-native-play-sound';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Title
} from 'native-base';
// import Toolbar from './Toolbar'
import {
    BarCodeScanner,
    Permissions
} from 'expo';

export default class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor() {
        super()
        this.state = {
            showScanner: false,
            hasCameraPermission: null,
            id: '',
            name: '',
            phone: '', 
            email: '', 
            misc_info: '',
            c_address: '', 
            address: '', 
            aadhar: '', 
        }
    }
    
    async getUserData() {
        let user = await AsyncStorage.getItem('user');
        let parsedUserInfo = JSON.parse(user);
        this.setState({id: parsedUserInfo['id']})
        this.setState({name: parsedUserInfo['name']})
        this.setState({phone: parsedUserInfo['phone']})
        this.setState({misc_info: parsedUserInfo['misc_info']})
        this.setState({email: parsedUserInfo['email']})
        if (parsedUserInfo['misc_info'] == "0") {
            // this.props.navigation.navigate("InfoForm")
            this.props.navigation.navigate("InfoForm")
        } else {
            fetch(`http://api.fardeenpanjwani.com/get_misc_info/doctor/xaptag_api_key_root/${parsedUserInfo['id']}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        c_address: responseJson[0]['clinic_address'],
                        aadhar: responseJson[0]['aadhar_card_number'],
                        address: responseJson[0]['residential_address'],
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

    componentWillMount() {
        this.getUserData();
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        BackHandler.exitApp();
    };

    userProfile() {
        this.props.navigation.navigate("UserProfile", {
            c_address: this.state.c_address,
            address: this.state.address, 
            aadhar: this.state.aadhar
        })
    }

    
    async getPermission() {
        const {
            status
        } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
            showScanner: true
        });
    }

    _handleQRCodeRead = async ({ type, data }) => {

        var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    
        if(String(data).length == 32 && !format.test(String(data))) {
            //valid id
            const soundObject = new Expo.Audio.Sound();
            try {
                await soundObject.loadAsync(require('../../assets/sound/beep.mp3'));
                await soundObject.playAsync();
                Vibration.vibrate(75);
                // Your sound is playing!
            } catch (error) {
                // An error occurred!
            }

            alert(`User ID: ${String(data)}`)
            this.setState({
                showScanner: false
            })
        } else {

            const soundObject = new Expo.Audio.Sound();
            try {
                await soundObject.loadAsync(require('../../assets/sound/beep.mp3'));
                await soundObject.playAsync();
                Vibration.vibrate(75);
                // Your sound is playing!
            } catch (error) {
                // An error occurred!
            }

            alert(`Invalid data: ${String(data)}`)
            this.setState({
                showScanner: false
            })
        }

    }

    getScanButton() {
        if(this.state.showScanner) {
            const hasCameraPermission = this.state.hasCameraPermission;

            if (hasCameraPermission === null) {

                return <Text>Requesting for camera permission</Text>;

            } else if (hasCameraPermission === false) {

                return <Text>No access to camera</Text>;

            } else {
                return (
                    <View>
                        <BarCodeScanner
                            onBarCodeRead={this._handleQRCodeRead}
                            style={styles.scannerContainer} />
                        <TouchableOpacity style={styles.cancel} onPress={() => {
                            this.setState({
                                showScanner: false
                            })
                        }}>
                            <Text style={styles.cancelText}>cancel</Text>
                        </TouchableOpacity>
                    </View>
                );
            }
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    if(this.state.hasCameraPermission) {
                        this.setState({
                            showScanner: true
                        })
                    } else {
                        this.getPermission();
                    }
                }}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Scan</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <Text style={styles.toolbarHeading}>Xaptag</Text>
                    <View style={styles.rightNav}>
                        <TouchableOpacity>
                            <Icon name='account-circle' size={32} color="#D50000" onPress={this.userProfile.bind(this)} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.welcome}>Welcome, Dr. {this.state.name}</Text>
                <View style={styles.qrContainer}>
                    {this.getScanButton()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    qrContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    welcome: {
        fontSize: 22,
        fontWeight: 'bold',
        margin: 12,
        padding: 12,
        color: 'black'
    },
    buttonContainer: {
        width: ((24000 / Dimensions.get("window").width) / 100) * Dimensions.get("window").width,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderColor: 'black', 
        borderWidth: 2,
        borderRadius: 1,
        backgroundColor: 'white',  
    },
    navItem: {
        marginLeft: 15
    },
    rightNav: {
        flexDirection: 'row'
    },
    toolbar: {
        marginTop: ((2350 / Dimensions.get("window").height) / 100) * Dimensions.get("window").height,
        height: ((5500 / Dimensions.get("window").height) / 100) * Dimensions.get("window").height,
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
    },
    scan_button: {
        alignSelf: 'center',
        borderColor: 'black', 
        borderWidth: 2,
        borderRadius: 1,
        backgroundColor: 'white',  
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scannerContainer: {
        width: 0.5 * Dimensions.get("window").height, 
        height: 0.5 * Dimensions.get("window").height,
    },
    cancel: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6, 
        margin: 12,
    },
    cancelText: {
        fontSize: 16,
        fontWeight: 'bold', 
        color: 'black', 
        textAlign: 'center'
    }
})