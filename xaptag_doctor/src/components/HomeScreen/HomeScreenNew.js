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
    Vibration,
    StatusBar
} from 'react-native';
import {PlaySound} from 'react-native-play-sound';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Title,
    Root
} from 'native-base';
import {
    Font,
    AppLoading,
    Constants,
    BarCodeScanner,
    Permissions
} from "expo";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class HomeScreenNew extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
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
        };
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

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({
            loading: false
        });
        this.getUserData();
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
            Vibration.vibrate(75);

            // alert(`User ID: ${String(data)}`)
            this.props.navigation.navigate('ScannedUserDetailsTest', {u_id: data})
            this.setState({
                showScanner: false
            })
        } else {
            Vibration.vibrate(75);

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

        if (this.state.loading) {
            return (
                <Root>
                    {/* <StatusBar backgroundColor="#B71C1C" barStyle="light-content" /> */}
                    <AppLoading />
                </Root>
            );
        }
        return(
            <View style={styles.container}>
                {/* <StatusBar backgroundColor="#B71C1C" barStyle="light-content" /> */}
                <View style={styles.statusBar}/>
                <View style={styles.toolbar}>
                    <Text style={styles.toolbarHeading}>Xaptag</Text>
                    <View style={styles.rightNav}>
                        <TouchableOpacity>
                            <Icon name='account-circle' size={32} color="#fff" onPress={this.userProfile.bind(this)} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.topContainer}>
                    <Text style={styles.welcomeMessage}>Welcome, {this.state.name}!</Text>
                </View>

                <View style={styles.centerContainer}>
                    {this.getScanButton()}
                </View>

                {/* <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.bottomContainerRowItem}>
                        <Image source={require('../../assets/images/home_bottom_nav_icons/c_reports.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                        <View style={styles.bottomContainerRowItemSeperator}/>
                        <Text style={styles.bottomContainerRowItemText}>Reports</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomContainerRowItem}>
                        <Image source={require('../../assets/images/home_bottom_nav_icons/history.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                        <View style={styles.bottomContainerRowItemSeperator}/>
                        <Text style={styles.bottomContainerRowItemText}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomContainerRowItem}>
                        <Image source={require('../../assets/images/home_bottom_nav_icons/c_logout.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                        <View style={styles.bottomContainerRowItemSeperator}/>
                        <Text style={styles.bottomContainerRowItemText}>Logout</Text>
                    </TouchableOpacity>
                </View> */}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white'
    },
    statusBar: {
        backgroundColor: "#d50000",
        height: Constants.statusBarHeight,
    },
    toolbar: {
        // marginTop: ((2310 / Dimensions.get("window").height) / 100) * Dimensions.get("window").height,
        // height: ((5500 / Dimensions.get("window").height) / 100) * Dimensions.get("window").height,
        // marginTop: Constants.statusBarHeight,
        // height: ((5600 / Dimensions.get("window").height) / 100) * Dimensions.get("window").height,
        height: '7%', 
        backgroundColor: "#D50000", 
        width: '100%',
        borderBottomColor: 'black',
        borderBottomWidth: 0.25,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    topContainer: {
        height: '10.5%', 
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    centerContainer: {
        height: '63.25%', 
        backgroundColor: '#fff', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        height: '18.75%', 
        backgroundColor: '#fff',
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    bottomContainerRowItem: {
        height: '80%', 
        width: '48%', 
        margin: 4,
        backgroundColor: "#fff",
        elevation: 5,
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 6,
        borderWidth: 0.25,
        borderColor: '#333', 
        borderRadius: 3,
    },
    bottomContainerRowItemSeperator: {
        height: .75, 
        width: '100%', 
        backgroundColor: '#eee'
    },
    bottomContainerRowItemImage: {
        height: '34%',
        width: '60%', 
        margin: 8, 
    },
    toolbarTitle: {
        fontSize: 16,
        color: '#fff', 
        fontWeight: 'bold',
    },
    welcomeMessage: {
        fontSize: 18, 
        color: '#000', 
        fontWeight: 'bold',
    },
    qrMessage: {
        fontSize: 14.5, 
        color: '#111', 
        padding: 12
    },
    bottomContainerRowItemText: {
        width: '90%', 
        height: '25%', 
        textAlign: 'center', 
        alignSelf: 'center',
        fontSize: 12, 
        color: '#111', 
        margin: 8,
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
    toolbarHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#fff'
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
        width: 0.35 * Dimensions.get("window").height, 
        height: 0.35 * Dimensions.get("window").height,
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