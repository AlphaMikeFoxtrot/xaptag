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
    StatusBar
} from 'react-native'
import QRCode from 'react-native-qrcode';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SingleCardItem from './SingleCardItem'
import Orientation from 'react-native-orientation-locker';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Possible Unhandled Promise Rejection (id: 1):', 'Module AsyncStorage']);

const colors = [
    "#f45b69",
    "#134611",
    "#62bbc1",
    "#ec058e",
    "#ba2d0b",
    "#02182b",
]

export default class HomePageNewTwo extends Component {

    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        console.disableYellowBox = true;
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
        this.setState({
            id: parsedUserInfo['id']
        })
        this.setState({
            name: parsedUserInfo['name']
        })
        this.setState({
            phone: parsedUserInfo['phone']
        })
        this.setState({
            misc_info: parsedUserInfo['misc_info']
        })
        this.setState({
            email: parsedUserInfo['email']
        })
        if (parsedUserInfo['misc_info'] == "0") {
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

    _handlePress(title) {
        switch(title) {
            case "Details": 
                console.warn("details")
                break;

            case "Logout":
                this.saveSession('false')
                break;

            case "Reports":
                this.props.navigation.navigate('PreUploadDocument');
                break;

            case "Prescriptions":
                // console.warn("Prescriptions")
                this.props.navigation.navigate('Prescription');
                break;

            case "My Visits":
                this.props.navigation.navigate("Visits");
                break;

            case "Doctors":
                console.warn("Doctors")
                break;
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
            // alert("Something went wrong when storing user session: \n" + error)
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

    render() {
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor="#B71C1C" barStyle="light-content" />
                <View style={styles.toolbar}>
                    <Text style={styles.toolbarTitle}>Xaptag</Text>
                    <TouchableOpacity onPress={() => {this.userProfile()}}>
                        <Icon name='account-circle' size={32} color="#fff" />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.topContainer}>
                    <Text style={styles.welcomeMessage}>Welcome, {this.state.name}!</Text>
                </View>

                <View style={styles.centerContainer}>
                    <Text style={styles.qrMessage}>Your QR code</Text>
                    <QRCode value={this.state.id} size={110} style={{margin: 12}}/>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.bottomContainerRow}>
                        <TouchableOpacity onPress={() => this._handlePress('Details')} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_details.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage} />
                            <View style={styles.bottomContainerRowItemSeperator} />
                            <Text style={styles.bottomContainerRowItemText}>Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handlePress('Reports')} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/bottomNavStock/reports.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage} />
                            <View style={styles.bottomContainerRowItemSeperator} />
                            <Text style={styles.bottomContainerRowItemText}>Reports</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handlePress('Prescriptions')} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/bottomNavStock/perscription.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage} />
                            <View style={styles.bottomContainerRowItemSeperator} />
                            <Text style={styles.bottomContainerRowItemText}>Prescription</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomContainerRow}>
                        <TouchableOpacity onPress={() => this._handlePress('Doctors')} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_doctor.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage} />
                            <View style={styles.bottomContainerRowItemSeperator} />
                            <Text style={styles.bottomContainerRowItemText}>Doctors</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handlePress('My Visits')} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_visits.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage} />
                            <View style={styles.bottomContainerRowItemSeperator} />
                            <Text style={styles.bottomContainerRowItemText}>My Visits</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handlePress('Logout')} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_logout.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage} />
                            <View style={styles.bottomContainerRowItemSeperator} />
                            <Text style={styles.bottomContainerRowItemText}>Logout</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => this._handlePress('Details')} style={
                            {
                                height: '100%', 
                                width: '30%', 
                                margin: 4,
                                backgroundColor: colors[0],
                                elevation: 5,
                                alignItems: 'center', 
                                justifyContent: 'center',
                                padding: 6,
                                borderWidth: 0.25,
                                borderColor: '#333', 
                                borderRadius: 3,
                            }
                        }>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_details.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handlePress('Reports')} style={{
                                height: '100%', 
                                width: '30%', 
                                margin: 4,
                                backgroundColor: colors[1],
                                elevation: 5,
                                alignItems: 'center', 
                                justifyContent: 'center',
                                padding: 6,
                                borderWidth: 0.25,
                                borderColor: '#333', 
                                borderRadius: 3,
                            }}>
                            <Image source={require('../../assets/images/bottomNavStock/w_reports.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Reports</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handlePress('Prescription')} style={{
                                height: '100%', 
                                width: '30%', 
                                margin: 4,
                                backgroundColor: colors[2],
                                elevation: 5,
                                alignItems: 'center', 
                                justifyContent: 'center',
                                padding: 6,
                                borderWidth: 0.25,
                                borderColor: '#333', 
                                borderRadius: 3,
                            }}>
                            <Image source={require('../../assets/images/bottomNavStock/perscription.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Prescription</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomContainerRow}>
                        <TouchableOpacity onPress={() => this._handlePress('Doctors')} style={{
                                height: '100%', 
                                width: '30%', 
                                margin: 4,
                                backgroundColor: colors[3],
                                elevation: 5,
                                alignItems: 'center', 
                                justifyContent: 'center',
                                padding: 6,
                                borderWidth: 0.25,
                                borderColor: '#333', 
                                borderRadius: 3,
                            }}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_doctor.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Doctors</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handlePress('My Visits')} style={{
                                height: '100%', 
                                width: '30%', 
                                margin: 4,
                                backgroundColor: colors[4],
                                elevation: 5,
                                alignItems: 'center', 
                                justifyContent: 'center',
                                padding: 6,
                                borderWidth: 0.25,
                                borderColor: '#333', 
                                borderRadius: 3,
                            }}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_visits.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>My Visits</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handlePress('Logout')} style={{
                                height: '100%', 
                                width: '30%', 
                                margin: 4,
                                backgroundColor: colors[5],
                                elevation: 5,
                                alignItems: 'center', 
                                justifyContent: 'center',
                                padding: 6,
                                borderWidth: 0.25,
                                borderColor: '#333', 
                                borderRadius: 3,
                            }}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_logout.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Logout</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </View>
        )
    }
}   

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    toolbar: {
        height: '8.5%', 
        backgroundColor: '#d50000', 
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 6.5,
        borderBottomWidth: 0.25, 
        borderBottomColor: '#333'
    },
    topContainer: {
        height: '14.5%', 
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 0.75,
    }, 
    centerContainer: {
        height: '40.5%', 
        backgroundColor: '#fff', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        height: '37.5%', 
        backgroundColor: '#fff',
        padding: 4,
    },
    bottomContainerRow: {
        height: '46%', 
        flexDirection: 'row', 
        marginBottom: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainerRowItem: {
        height: '100%', 
        width: '30%', 
        margin: 4,
        backgroundColor: '#fff',
        elevation: 5,
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 6,
        borderWidth: 0.25,
        borderColor: '#333', 
        borderRadius: 3,
    },
    bottomContainerRowItemSeperator: {
        height: .85, 
        width: '100%', 
        backgroundColor: '#000'
    },
    bottomContainerRowItemImage: {
        height: '60%',
        width: '90%', 
        margin: 8, 
        alignSelf: 'center',
    },
    toolbarTitle: {
        fontSize: 18,
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
        fontSize: 15, 
        color: '#000', 
        margin: 8,
        fontWeight: 'bold'
    }
})