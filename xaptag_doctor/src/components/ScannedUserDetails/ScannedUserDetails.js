import React, { Component } from 'react';
import {
    View, 
    StyleSheet, 
    Text,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native'
import { 
    Constants 
} from 'expo'

import data from '../../mockups/JSON/scan_details.json'

export default class ScannedUserDetails extends Component {

    static navigationOptions = {
        header: null
    }

    FlatListItemSeparator = () => {
        return (
            <View style={{height: .5, width: "100%", backgroundColor: "#000"}}/>
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
        return(
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={styles.patientName}>{data['user_details']['name']}.{`\nReport summary:`}</Text>
                </View>
                <View style={styles.centerContainer}>
                    <View style={styles.list_container}>
                        <FlatList
                        data={data['f_reports']}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) =>
                            this.listItem(item.name, item.address)
                        }
                        keyExtractor={(item, index) => index.toString()} />
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.bottomContainerRowItem}>
                        <Image source={require('../../assets/images/home_bottom_nav_icons/history.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                        <View style={styles.bottomContainerRowItemSeperator}/>
                        <Text style={styles.bottomContainerRowItemText}>Patient's visits</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomContainerRowItem}>
                        <Image source={require('../../assets/images/home_bottom_nav_icons/c_reports.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                        <View style={styles.bottomContainerRowItemSeperator}/>
                        <Text style={styles.bottomContainerRowItemText}>View reports</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomContainerRowItem}>
                        <Image source={require('../../assets/images/home_bottom_nav_icons/c_prescription.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                        <View style={styles.bottomContainerRowItemSeperator}/>
                        <Text style={styles.bottomContainerRowItemText}>assign prescription</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Constants.statusBarHeight
    },
    topContainer: {
        borderTopWidth: 0.25,
        borderTopColor: 'black',
        height: '8%', 
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
    },
    centerContainer: {
        flex: 1,
        height: '74%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: 'black', 
        borderTopWidth: 0.25
    },
    bottomContainer: {
        height: '18%',
        backgroundColor: '#fff',
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    list_container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    patientName: {
        fontSize: 17,
        width: '100%',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        marginLeft: 8
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
    bottomContainerRowItemSeperator: {
        height: .75,
        width: '100%',
        backgroundColor: '#eee'
    },
    bottomContainerRowItem: {
        height: '80%',
        width: '30%',
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
});
