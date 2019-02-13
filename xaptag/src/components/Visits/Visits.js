import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    ScrollView, 
    StatusBar,
    AsyncStorage
} from 'react-native';
import { 
    Spinner
} from 'native-base'
import {
    Table,
    Row,
    Rows
} from 'react-native-table-component';
import Orientation from 'react-native-orientation-locker'

export default class Visits extends Component {
    
    static navigationOptions = {
        title: 'Visits',
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
            tableHead: ['Doctor\'s Name', 'Date'],
            tableData: [],
            isLoading: false, 
            userId: '', 
        };
        // this.getUserVisits = this.getUserVisits.bind(this);
    }

    componentWillMount() {
        this.getUserData();
        // this.getUserVisits();
    }

    componentDidMount() {
        Orientation.lockToPortrait(); //this will lock the view to Portrait
        // this.getUserVisits();
        // this.test(this.state.userId);
        // this.getUserData();
    }

    async getUserData() {
        let user = await AsyncStorage.getItem('user');
        let parsedUserInfo = JSON.parse(user);
        this.setState({
            userId: parsedUserInfo['id']
        })
        console.warn(parsedUserInfo['id'])
        // this.getUserVisits();
        this.getUserVisits(parsedUserInfo['id']);
    }

    test(id) {
        console.warn(id);
    }

    getUserVisits(id) {
        this.setState({
            isLoading: true,
        })
        // alert(this.state.userId);
        // console.warn('getUserVisits() called')
        // alert('getUserVisits called');
        fetch('http://api.fardeenpanjwani.com/user/visits', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false, 
                tableData: responseJson
            })
            console.warn(JSON.stringify(responseJson))
            // alert(JSON.stringify(responseJson));
        })
        .catch((error) => {
            this.setState({
                isLoading: false, 
            })
            // alert(error);
            console.error(error);
        })
    }

    render() {
        if(this.state.isLoading) {
            return (
                <View style={styles.spinnerContainer}>
                    <Spinner />
                </View>
            )
        }
        return (
            <ScrollView style={{backgroundColor: "#fff"}} contentContainerStyle={{backgroundColor: "#fff"}}>
                <View style={styles.container}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#EF9A9A'}}>
                        <Row data={this.state.tableHead} style={styles.head} textStyle={styles.headTitle}/>
                        <Rows data={this.state.tableData} textStyle={styles.text}/>
                    </Table>
                    {/* <Text>{this.state.userId}</Text> */}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee', 
    },
    headTitle: {
        fontWeight: 'bold', 
        color: 'black', 
        textAlign: 'center', 
        alignSelf: 'center',
    },
    container: { 
        flex: 1, 
        backgroundColor: '#fff' 
    },
    head: { 
        height: 40, 
        backgroundColor: '#FFEBEE',
        textAlign: 'center', 
    },
    text: { 
        margin: 6 
    }
});