import React, { Component } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    AsyncStorage,
    Dimensions
} from 'react-native'
import axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialIcons'
import QRCode from 'react-native-qrcode';
import {
    Button,
    Header,
    Card,
    CardItem
} from 'native-base';
import Orientation from 'react-native-orientation-locker';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Possible Unhandled Promise Rejection (id: 1):', 'Module AsyncStorage']);

export default class SingleCardItem extends Component {

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
        }
    }

    _handlePress() {
        switch(this.props.title) {
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
                console.warn("Prescriptions")
                break;

            case "My Visits":
                console.warn("My Visits")
                break;

            case "Doctors":
                console.warn("Doctors")
                break;
        }
    }

    render() {
        var icon = this.props.imageUrl
        return (
            <TouchableOpacity onPress={this._handlePress.bind(this)}>
                <Card style={styles.bottom_container_card}>
                    <CardItem style={styles.bottom_container_card_item}>
                        <Image source={icon} resizeMode="contain" style={styles.bottom_container_card_image}/>
                    </CardItem>
                    <CardItem style={styles.bottom_container_card_item}>
                        <Text style={styles.bottom_container_card_text}>{this.props.title}</Text>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    top_container: {
        height: '55%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    bottom_container: {
        height: '45%',
        width: '100%',
        backgroundColor: 'white',
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
        height: ((5500 / Dimensions.get("window").width) / 100) * Dimensions.get("window").width,
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
    qr_text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
        marginBottom: ((1200 / Dimensions.get("window").width) / 100) * Dimensions.get("window").width,
        alignSelf: 'center'
    },
    bottom_container_row: {
        height: ((12175 / Dimensions.get("window").height) / 100) * Dimensions.get("window").height,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 2
    },
    bottom_container_card: {
        width: 125,
        height: 100,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    bottom_container_card_item: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom_container_card_image: {
        height: 45,
        width: null,
        flex: 1
    },
    bottom_container_card_text: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 14,
        color: '#000'
    }
});