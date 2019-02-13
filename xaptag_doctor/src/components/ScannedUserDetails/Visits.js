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

export class Visits extends Component {

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

    componentWillMount = () => {
        this.setState({
            tableData: this.props.navigation.getParam("visits")
        })
    }
    

    listItem(d_n, t) {
        return (
            <View style={{borderBottomColor: '#000', borderBottomWidth: 0.35, flex: 1, flexDirection: 'row', justifyContent: 'center', width: Dimensions.get("window").width - 25, alignSelf: 'center', alignItems: 'center', marginTop: 4, marginBottom: 4}}>
                <Text style={{fontSize: 15, color: '#111', textAlign: 'left', width: '50%', alignSelf: 'center'}}>{d_n}</Text>
                <Text style={{color: '#111', fontSize: 15, textAlign: 'left', width: '50%', alignSelf: 'center'}}>{t}</Text>
            </View>
        )
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
    },
    text: {
        margin: 6
    }
});

export default Visits;
