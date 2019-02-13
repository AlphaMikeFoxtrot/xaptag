import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    Image,
    AsyncStorage,
    FlatList,
    Dimensions,
    StatusBar
} from 'react-native'
import {
    Card,
    CardItem,
    Left, 
    Body,
    Button, 
    Spinner
} from 'native-base'
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons'
import ActionButton from 'react-native-action-button';
import Orientation from 'react-native-orientation-locker'

export default class PreUploadDocument extends Component {

    static navigationOptions = {
        title: 'Reports',
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
            images: [],
            doneRefining: false,
            doneUploading: false,
            isLoading: false,
            imagesUploaded: 0,
            userId: '',
            response: [],
            uploadResponse: '',
            uploadError: false,
            prescriptions: false
        }
        this.getLoadingComponent = this.getLoadingComponent.bind(this)
        this.getBigUploadButtonComponent = this.getBigUploadButtonComponent.bind(this)
        this.getPostRefiningComponent = this.getPostRefiningComponent.bind(this)
        this.uploadSelectedImages = this.uploadSelectedImages.bind(this)
        this.getPostUploadComponent = this.getPostUploadComponent.bind(this)
    }

    componentWillMount() {
        this.getUserData();
    }

    componentDidMount() {
        Orientation.lockToPortrait(); //this will lock the view to Portrait
    }

    async getUserData() {
        let user = await AsyncStorage.getItem('user');
        let parsedUserInfo = JSON.parse(user);
        this.setState({ userId: parsedUserInfo['id'] })
    }

    refineImages() {
        let images = this.state.images;
        console.warn(JSON.stringify(images[0]['path']))
    }

    createImageObjects() {
        var images = this.state.images;
        var refinedImages = []
        for (var i = 0; i < images.length; i++) {
            var imagePath = images[i]['path']
            var imagePathArr = imagePath.split('/')
            var imageName = imagePathArr[imagePathArr.length - 1]
            var image = {
                size: images[i]['size'],
                mime: images[i]['mime'],
                height: images[i]['height'],
                widht: images[i]['width'],
                path: images[i]['path'],
                imageName: imageName,
                imageBase64Data: images[i]['data'],
                userId: this.state.userId
            }
            refinedImages.push(image)
        }
        this.setState({
            refinedImages: refinedImages
        })
        this.setState({
            doneRefining: true
        })
    }

    FlatListItemSeparator = () => {
        return (
            <View style={{marginTop: 4, marginBottom: 4, height: .5, width: "100%", backgroundColor: "#000"}}/>
        );
    }

    uploadSelectedImages() {
        if(this.state.prescriptions) {
            fetch('http://www.fardeenpanjwani.com/xaptag/src/routes/prescription_upload.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: this.state.refinedImages
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (JSON.stringify(responseJson).includes('success')) {
                        this.setState({
                            uploadResponse: responseJson,
                            isLoading: false,
                            images: [],
                            refinedImages: [],
                            doneUploading: true,
                        })
                    } else if (JSON.stringify(responseJson).includes('error')) {
                        this.setState({
                            uploadResponse: responseJson,
                            isLoading: false,
                            images: [],
                            refinedImages: [],
                            doneUploading: true,
                            uploadError: true
                        })
                    }
                })
                .catch((error) => this.setState({
                    response: JSON.stringify(error),
                    isLoading: false,
                    images: [],
                    refinedImages: [],
                    doneUploading: true
                }))
        } else {
            fetch('http://www.fardeenpanjwani.com/xaptag/src/routes/image_upload.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: this.state.refinedImages
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if(JSON.stringify(responseJson).includes('success')){
                        this.setState({
                            uploadResponse: responseJson,
                            isLoading: false, 
                            images: [], 
                            refinedImages: [],
                            doneUploading: true,
                        })
                    } else if (JSON.stringify(responseJson).includes('error')){
                        this.setState({
                            uploadResponse: responseJson,
                            isLoading: false,
                            images: [],
                            refinedImages: [],
                            doneUploading: true,
                            uploadError: true
                        })
                    }
                })
                .catch((error) => this.setState({
                    response: JSON.stringify(error),
                    isLoading: false,
                    images: [],
                    refinedImages: [],
                    doneUploading: true
            }))
        }
    }

    cancelUpload() {
        this.setState({
            doneRefining: false,
            refinedImages: [],
            images: []
        })
    }

    reselectImages() {
        this.setState({
            doneRefining: false,
            images: [],
            refinedImages: []
        })
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
            includeBase64: true
        }).then(images => {

            this.setState({ images: images })
            this.createImageObjects()

        }).catch((error) => {

            return;
        });
    }

    fabMainButton() {
        return (
            <Icon name='done' size={24} color='white' />
        )
    }

    postUploadFabMainButton() {
        return (
            <Icon name='home' size={24} color='white' />
        )
    }
    
    getLoadingComponent(message){
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor="#B71C1C" barStyle="light-content" />
                <Spinner />
                <Text style={styles.loadingText}>{message}</Text>
            </View>
        )
    }

    getPostUploadComponent() {
        if(this.state.uploadError) {
            return(
                <View style={styles.container}>
                    <StatusBar backgroundColor="#B71C1C" barStyle="light-content" />
                    <Icon name='clear' size={100} color='red' style={styles.uploadCompleteIcon} />
                    <Text style={styles.loadingText}>{this.state.uploadResponse}</Text>
                    <ActionButton buttonColor='#d50000' degrees={0} renderIcon={this.postUploadFabMainButton.bind(this)} onPress={() => {
                        this.setState({
                            doneUploading: false, 
                        })}} />
                </View>    
            )
        }
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor="#B71C1C" barStyle="light-content" />
                <Icon name='done' size={100} color='green' style={styles.uploadCompleteIcon}/>
                <Text style={styles.loadingText}>{this.state.uploadResponse}</Text>
                <ActionButton buttonColor='#d50000' degrees={0} renderIcon={this.postUploadFabMainButton.bind(this)} onPress={() => {
                    this.setState({
                        doneUploading: false,
                    })
                }} />
            </View>
        )
    }

    getPostRefiningComponent() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#B71C1C" barStyle="light-content" />
                <FlatList
                    data={this.state.refinedImages}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({ item }) =>
                        <View>
                            <Image resizeMode="contain" source={{ uri: item.path }} style={styles.imageView} />
                        </View>
                        // <Image source={{ uri: item.path }} style={styles.imageView} />
                    }
                    keyExtractor={(item, index) => index.toString()} />
                <ActionButton buttonColor='#d50000' degrees={0} renderIcon={this.fabMainButton.bind(this)}>
                    <ActionButton.Item buttonColor='#4bb543' title="Upload selected" onPress={() => {
                        this.setState({
                            isLoading: true,
                            doneRefining: false,
                            prescriptions: true
                        })
                        this.uploadSelectedImages()
                        }}>
                        <Icon size={25} name="cloud-upload" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='orange' title="Re-Select images" onPress={this.reselectImages.bind(this)}>
                        <Icon size={25} name="collections" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='red' title="Cancel Upload" onPress={this.cancelUpload.bind(this)}>
                        <Icon size={25} name="cancel" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }

    getBigUploadButtonComponent() {
        return(
            <TouchableOpacity
                style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {
                    ImagePicker.openPicker({
                        multiple: true,
                        mediaType: 'photo',
                        includeBase64: true
                    }).then(images => {

                        this.setState({ images: images })
                        this.createImageObjects()

                    }).catch((error) => {

                        return;
                    });
                }}
            >
                <Icon name="cloud-upload" size={150} color="#D50000" />
                <Text style={styles.heading}>Upload Documents</Text>
            </TouchableOpacity>
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                this.getLoadingComponent('Uploading Images.....')
            )
        }
        if (this.state.doneRefining) {
            return (
                this.getPostRefiningComponent()
            )
        }
        if (this.state.doneUploading) {
            return (
                this.getPostUploadComponent()
            )
        }
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#B71C1C" barStyle="light-content" />
                <TouchableOpacity onPress={() => {
                    ImagePicker.openPicker({
                        multiple: true,
                        mediaType: 'photo',
                        includeBase64: true
                    }).then(images => {

                        this.setState({ images: images })
                        this.createImageObjects()

                    }).catch((error) => {

                        return;
                    });
                }}>
                    <Card style={styles.container_card}>
                        <CardItem style={styles.container_card_item}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/cloud.png')} style={styles.card_item_image} />
                            <Text style={styles.card_item_text}>Upload Reports</Text>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> {this.props.navigation.navigate('MyReports', {
                    type: 'reports'
                })}}>
                    <Card style={styles.container_card}>
                        <CardItem style={styles.container_card_item}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/documents.png')} style={styles.card_item_image} />
                            <Text style={styles.card_item_text}>View Uploaded Reports</Text>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => {this.props.navigation.navigate('FormattedDocument')}}>
                    <Card style={styles.container_card}>
                        <CardItem style={styles.container_card_item}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/formatted_document.png')} style={styles.card_item_image} />
                            <Text style={styles.card_item_text}>View Formatted Reports</Text>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
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
    container_card: {
        width: 265,
        marginBottom: 16
    },
    container_card_item: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    card_item_image: {
        height: 34,
        width: 34,
        alignSelf: 'center',
        marginRight: 14
    },
    card_item_text: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontSize: 16,
        color: 'black',
        margin: 8
    },
    imageView: {
        width: Dimensions.get("window").width - 50,
        height: ((32000 / Dimensions.get("window").height) / 100) * Dimensions.get("window").height,
        margin: 8,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        margin: 12,
        padding: 12,
        color: '#212121'
    },
    loadingText: {
        fontSize: 16,
        margin: 12, 
        color: 'gray',
        alignSelf: 'center',
    },
    uploadCompleteIcon: {
        alignSelf: 'center',
        margin: 12
    }
})