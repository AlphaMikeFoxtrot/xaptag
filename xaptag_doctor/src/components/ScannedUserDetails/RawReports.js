import React, { PureComponent } from 'react'
import { 
    View, 
    Text,
    StyleSheet,
    AsyncStorage
} from 'react-native'
import {
    Spinner 
} from 'native-base'
import Gallery from 'react-native-image-gallery';

export default class RawReports extends PureComponent {

    static navigationOptions = {
        title: 'Uploaded Reports',
        headerStyle: {
            backgroundColor: '#d50000',
        },
        headerTintColor: "#fff", 
        headerTitleStyle: {
            color: "#fff", 
            fontWeight: 'bold'
        }
    }

    render() {
        console.disableYellowBox = true;
        if (this.props.navigation.getParam('images').length == 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.reportsFalseMessage}>{`You have'nt uploaded any reports yet.\nTap "Upload Reports" to upload you reports.`}</Text>
                </View>
            )
        }
        return (
            <Gallery
            style={{ flex: 3, backgroundColor: 'white' }}
            images={this.props.navigation.state.params.images}
            />
            // <View style={styles.container}>
            //     {/* <Text>{JSON.stringify(this.props.navigation.getParam('images'))}</Text> */}
            //     <Text>lakdsjflka js</Text>
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'white'
    },
    reportsFalseMessage: {
        fontSize: 18, 
        color: '#222', 
        textAlign: 'center'
    }
});