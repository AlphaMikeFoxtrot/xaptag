import React, { Component } from 'react'
import {
    View, 
    Text, 
    Image, 
    StyleSheet,
    Dimensions,
    ScrollView,
    AsyncStorage, 
    TouchableOpacity,
    BackHandler
} from 'react-native'
import {
    Button,
    Card,
    Container,
    Content
} from 'native-base'
import ImageOverlay from 'react-native-image-overlay';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tabs from './Tabs'

export default class UserProfileNew extends Component{

    static navigationOptions = {
        title: 'User Profile',
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
        this.saveSession = this.saveSession.bind(this)
        this.state = {
            phone: '',
            id: '',
            name: '',
            email: '',
            id: '',
            misc_info: '',
        }
    }
    
    componentWillMount() {
        this.getUserData()
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.navigation.navigate('HomeScreen');
    };

    async getUserData() {
        let user = await AsyncStorage.getItem('user');
        let parsedUserInfo = JSON.parse(user);
        this.setState({id: parsedUserInfo['id']})
        this.setState({name: parsedUserInfo['name']})
        this.setState({email: parsedUserInfo['email']})
        this.setState({phone: parsedUserInfo['phone']})
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
        }
    }

    FlatListItemSeparator = () => {
        return (
            <View style={{height: .5, width: "100%", backgroundColor: "#000"}}/>
        );
    }

    render() {
        return(
            <Container>
                <ScrollView>
                    <ImageOverlay
                        source={require('../../assets/images/back.jpg')}
                        height={0.3 * Dimensions.get('window').height}
                        width='100%'>
                        <View>
                            <Image style={{alignSelf: 'center', height: 0.5 * 0.3 * Dimensions.get('window').height, width: 0.5 * 0.3 * Dimensions.get('window').height}} source={{uri: "https://cdn2.iconfinder.com/data/icons/people-round-icons/128/man_avatar-512.png"}} />
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, margin: 8, textAlign: 'center', alignSelf: 'center'}}>{this.state.name}</Text>
                        </View>
                    </ImageOverlay>
                    <Content style={{padding: 12}}>
                        <Tabs address={this.props.navigation.state.params.address} aadhar={this.props.navigation.state.params.aadhar} c_address={this.props.navigation.state.params.c_address} email={this.state.email} phone={this.state.phone}/>
                    </Content>
                    {/* <Button full success style={{margin: 12, borderRadius: 25, borderWidth: 2, borderColor: 'black', backgroundColor: 'white'}} onPress={() => this.saveSession('false')}>
                        <Text style={{color: 'black'}}>Logout</Text>
                    </Button> */}
                </ScrollView>
                <View style={styles.bottomContainer}>
                    {/* <TouchableOpacity style={styles.bottomContainerRowItem}>
                        <Image source={require('../../assets/images/home_bottom_nav_icons/c_reports.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                        <View style={styles.bottomContainerRowItemSeperator}/>
                        <Text style={styles.bottomContainerRowItemText}>Reports</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.bottomContainerRowItem}>
                        <Image source={require('../../assets/images/home_bottom_nav_icons/history.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                        <View style={styles.bottomContainerRowItemSeperator}/>
                        <Text style={styles.bottomContainerRowItemText}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomContainerRowItem} onPress={() => {this.saveSession('false')}}>
                        <Image source={require('../../assets/images/home_bottom_nav_icons/c_logout.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                        <View style={styles.bottomContainerRowItemSeperator}/>
                        <Text style={styles.bottomContainerRowItemText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white',
    },
    bottomContainer: {
        height: '16.75%', 
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
    bottomContainerRowItemText: {
        width: '90%', 
        height: '25%', 
        textAlign: 'center', 
        alignSelf: 'center',
        fontSize: 12, 
        color: '#111', 
        margin: 8,
    },
})