import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    Image,
    AsyncStorage,
    FlatList
} from 'react-native'
import {
    Button,
    Spinner
} from 'native-base'
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons'
import ActionButton from 'react-native-action-button';
import Orientation from 'react-native-orientation-locker'

export default class UploadDocumentsNew extends Component {

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
            uploadError: false
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
            <View style={{height: .5, width: "100%", backgroundColor: "#000"}}/>
        );
    }

    uploadSelectedImages() {
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
                <Spinner />
                <Text style={styles.loadingText}>{message}</Text>
            </View>
        )
    }

    getPostUploadComponent() {
        if(this.state.uploadError) {
            return(
                <View style={styles.container}>
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
                <FlatList
                    data={this.state.refinedImages}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 12 }}>
                            <Image source={{ uri: item.path }} style={styles.imageView} />
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()} />
                <ActionButton buttonColor='#d50000' degrees={0} renderIcon={this.fabMainButton.bind(this)}>
                    <ActionButton.Item buttonColor='#4bb543' title="Upload selected" onPress={() => {
                        this.setState({
                            isLoading: true,
                            doneRefining: false
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
        if(this.state.isLoading) {
            return (
                this.getLoadingComponent('Uploading Images.....')
            )
        }
        if(this.state.doneRefining) {
            return(
                this.getPostRefiningComponent()
            )
        }
        if(this.state.doneUploading){
            return(
                this.getPostUploadComponent()
            )
        }
        return(
            <View style={styles.container}>
                {this.getBigUploadButtonComponent()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignContent: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'white'
    },
    imageView: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '60%',
        height: 320,
        resizeMode: 'contain',
        margin: 7,
        borderRadius: 7
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