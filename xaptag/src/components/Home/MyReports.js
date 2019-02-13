import React, { Component } from 'react'
import { 
    View, 
    Text,
    StyleSheet,
    AsyncStorage
} from 'react-native'
import ImageResizer from 'react-native-image-resizer';
import {
    Spinner 
} from 'native-base'
import Gallery from 'react-native-image-gallery';
import axios from 'axios'

export default class MyReports extends Component {

    static navigationOptions = {
        title: 'Uploaded Reports/Prescriptions',
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
            images: [],
            userId: '',
            reports: true
        }
    }

    componentWillMount() {
        this.getUserData();
        console.warn('will mount')
    }
    
    async getUserData() {
        let user = await AsyncStorage.getItem('user');
        let parsedUserInfo = JSON.parse(user);
        this.setState({
            userId: parsedUserInfo['id']
        })
        if(this.props.navigation.getParam('type') == 'reports') {
            this.getReports(parsedUserInfo['id'])
        } else if(this.props.navigation.getParam('type') == 'presci') {
            this.getPrescriptions(parsedUserInfo['id'])
        }
    }

    // componentDidMount() {
    //     console.warn(`did mount: ${this.state.userId}`)
    //     this.getReports.bind(this)
    // }

    getReports(id) {
        this.setState({
            isLoading: true
        })
        fetch('http://api.fardeenpanjwani.com/get_reports', {
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
            if(responseJson.length > 1){
                this.setState({
                    images: responseJson,
                    isLoading: false,

                })
            } else {
                this.setState({
                    images: [],
                    isLoading: false,
                    reports: false
                })
            }
        })
        .catch((error) => {
            console.error(error)
            this.setState({
                isLoading: false
            })
        })
    }

    getPrescriptions(id) {
        this.setState({
            isLoading: true
        })
        fetch('http://api.fardeenpanjwani.com/get_prescriptions', {
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
                // console.warn(JSON.stringify(responseJson))
                // alert(JSON.stringify(responseJson[0].source.uri))
                if (responseJson.length > 1) {
                    // compressedImages = [];
                    // console.warn(JSON.stringify(responseJson))
                    // for (i = 0; i < responseJson.length; i++) {
                    //     ImageResizer.createResizedImage(responseJson[i].source.uri, 350, 350, 50).then((response) => {
                    //         image = {"source": {"uri": response.uri}}
                    //         compressedImages.push(image);
                    //         // response.uri is the URI of the new image that can now be displayed, uploaded...
                    //         // response.path is the path of the new image
                    //         // response.name is the name of the new image with the extension
                    //         // response.size is the size of the new image
                    //     }).catch((err) => {
                    //         console.error(error);
                    //         // Oops, something went wrong. Check that the filename is correct and
                    //         // inspect err to get more details.
                    //     });
                    // }
                    this.setState({
                        images: responseJson,
                        isLoading: false,
                    })
                } else {
                    this.setState({
                        images: [],
                        isLoading: false,
                        reports: false
                    })
                }
            })
            .catch((error) => {
                console.error(error)
                this.setState({
                    isLoading: false
                })
            })
    }

    render() {
        // console.disableYellowBox = true;
        if(this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Spinner />
                </View>
            )
        }
        if(this.state.images.length == 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.reportsFalseMessage}>{`You have'nt uploaded any prescriptions yet.\nTap "Upload Prescriptions" to upload you reports.`}</Text>
                </View>
            )
        }
        return (
            // <View style={styles.container}>
            //     <Text>{JSON.stringify(this.state.images)}</Text>
            // </View>
            <Gallery
            style={{ flex: 3, backgroundColor: 'white' }}
            images={this.state.images}
            />
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