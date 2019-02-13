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
    BackHandler,
    StatusBar
} from 'react-native'
import {
    Button,
    Card,
    Container,
    Content
} from 'native-base'
import ImageOverlay from "react-native-image-overlay";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tabs from './Tabs'
import Orientation from 'react-native-orientation-locker'

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
        Orientation.lockToPortrait(); //this will lock the view to Portrait
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
                <StatusBar backgroundColor="#B71C1C" barStyle="light-content" />
                <ScrollView>
                    <ImageOverlay
                        source={require('../../assets/images/back.jpg')}
                        height={0.3 * Dimensions.get('window').height}
                        width='100%'>
                        <View>
                            <Image style={{alignSelf: 'center', height: 0.5 * 0.3 * Dimensions.get('window').height, width: 0.5 * 0.3 * Dimensions.get('window').height}} source={{uri: "https://cdn2.iconfinder.com/data/icons/people-round-icons/128/man_avatar-512.png"}} />
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, margin: 8, alignSelf: 'center'}}>{this.state.name}</Text>
                        </View>
                    </ImageOverlay>
                    <Content style={{padding: 12}}>
                        <Tabs address={this.props.navigation.state.params.address} em_phone={this.props.navigation.state.params.em_phone} em_name={this.props.navigation.state.params.em_name} email={this.state.email} phone={this.state.phone}/>
                    </Content>
                    {/* <Button full success style={{margin: 12, borderRadius: 25, borderWidth: 2, borderColor: 'black', backgroundColor: 'white'}} onPress={() => this.saveSession('false')}>
                        <Text style={{color: 'black'}}>Logout</Text>
                    </Button> */}
                </ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    }
})