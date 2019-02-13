import React, { Component } from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    AsyncStorage,
    FlatList,
    Dimensions,
    TouchableOpacity,
    StatusBar
} from 'react-native'
import { 
    Spinner 
} from "native-base";

export default class FormattedDocument extends Component {

    static navigationOptions = {
        title: 'Reports Summary',
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
        this.state = {
            isLoading: false, 
            data: [],
            isExist: false,
            id: '',
            test: ''
        }
    }

    componentWillMount() {
        this.setState({
            isLoading: true
        })
        this.getUserData()
    }

    async getUserData() {
        let user = await AsyncStorage.getItem('user');
        let parsedUserInfo = JSON.parse(user);
        this.setState({
            id: parsedUserInfo['id']
        })

        fetch(`http://api.fardeenpanjwani.com/check_json_exist`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: parsedUserInfo['id']
                })
            })
            .then((response) => response.text())
            .then((responseJson) => {
                // this.setState({
                //     isLoading: false
                // })
                // console.warn(responseJson);
                if (responseJson.includes('false')) {
                    // do not exist
                    this.setState({
                        isLoading: false,
                        isExist: false
                    })
                } else if (responseJson.includes('true')) {
                    this.setState({
                        isLoading: false,
                        isExist: true
                    })
                    this.getFormattedDocs()
                } else {
                    this.setState({
                        isLoading: false,
                        isExist: false
                    })
                    console.warn(responseJson);
                }
            })
            .catch((error) => {
                console.error(error)
                this.setState({
                    isLoading: false
                })
            })
    }

    getFormattedDocs() {

        // console.warn(this.state.id);

        fetch(`http://api.fardeenpanjwani.com/read_json`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.state.id
                })
            })
            .then((response) => response.json())
            .then((responseJson) => this.setState({data: responseJson}))
            .catch((error) => {
                console.error(error)
                this.setState({
                    isLoading: false
                })
            })
        
    }

    parseObj = (stringJson) => {
        var obj = JSON.parse(stringJson.text());
        return obj
    }

    FlatListItemSeparator = () => {
        return (
            <View style={{height: .5, backgroundColor: "#000"}}/>
        );
    }

    listItem(key, value) {
        return (
            <TouchableOpacity>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', width: Dimensions.get("window").width - 25, alignSelf: 'center', alignItems: 'center', marginTop: 4, marginBottom: 4}}>
                    <Text style={{fontSize: 18, color: 'black', textAlign: 'right', width: '30%', alignSelf: 'flex-start'}}>{key}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 22, color: 'black', textAlign: 'center', width: '10%', alignSelf: 'flex-start'}}>:</Text>
                    <Text style={{fontSize: 18, textAlign: 'left', width: '60%', alignSelf: 'center'}}>{value}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {

        if(this.state.isLoading) {
            return (
                <View style={styles.spinner_container}>
                    <StatusBar backgroundColor="#B71C1C" barStyle="light-content" />
                    <Spinner large/>
                    <Text style={{textAlign: 'center', margin: 12}}>checking for formatted documents...</Text>
                </View>
            )
        } 
        if (!this.state.isExist) {
            // formatted docs not available
            return (
                <View style={styles.container}>
                    <StatusBar backgroundColor="#B71C1C" barStyle="light-content" />
                    <Text>
                        Formatted Documents not yet available.
                    </Text>
                </View>
            )
        }
        if(this.state.isExist) {
            return (
                <View style={styles.list_container}>
                    <StatusBar backgroundColor="#B71C1C" barStyle="light-content" />
                    <FlatList
                    data={this.state.data}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({ item }) =>
                        this.listItem(item.name, item.address)
                    }
                    keyExtractor={(item, index) => index.toString()} />
                </View>
            )
        }

        return(
            <View style={styles.container}>
                <StatusBar backgroundColor="#B71C1C" barStyle="light-content" />
                <Text>Formatted Documents not available at the moment</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    spinner_container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    list_container: {
        flex: 1, 
        backgroundColor: 'white', 
        padding: 2, 
        alignItems: 'center',
        justifyContent: 'center',
    }
});