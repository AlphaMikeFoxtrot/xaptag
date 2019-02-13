import React, { Component } from 'react'
import {
    View, 
    Text, 
    StyleSheet
} from 'react-native'

export default class ForgotPasswordScreen extends Component {

    static navigationOptions = {
        header: null,
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>alksdjf</Text>
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
    }
})