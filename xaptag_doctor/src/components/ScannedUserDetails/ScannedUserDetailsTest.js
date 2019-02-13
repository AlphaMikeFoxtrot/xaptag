import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Image,
    AsyncStorage
} from 'react-native';
import {
    Constants
} from 'expo'
import {
    Spinner
} from 'native-base'
import BottomNav from './BottomNav'

// const {state} = props.navigation;

export class ScannedUserDetailsTest extends PureComponent {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false, 
            data: [],
            u_r_r: [], 
            u_f_r: [],
            u_d: [],
            u_v: [], 
            d_id: '',
            u_id: '',
            d_n: '', 
            case: 0
        }
        this.handleBottomNavClick = this.handleBottomNavClick.bind(this);
    }

    componentWillMount = () => {
        this.setState({
            isLoading: true
        })
        this.getUserData();
    }
    

    async getUserData() {
        let user = await AsyncStorage.getItem('user');
        let parsedUserInfo = JSON.parse(user);
        const { navigation } = this.props
        this.setState({
            d_id: parsedUserInfo['id'],
            d_n: parsedUserInfo['name'],
            u_id: navigation.getParam('u_id', '')
        })
        this.handleScan();
    }

    handleScan() {
        fetch('http://api.fardeenpanjwani.com/scan', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                u_id: this.state.u_id, 
                d_id: this.state.d_id,
                d_n: this.state.d_n
            })
        })
        .then((response) => response.json())
        .then((responseJson) => this.setState({
            data: responseJson, 
            u_f_r: responseJson['f_r'],
            u_r_r: responseJson['r_r'],
            u_d: responseJson['u_d'],
            u_v: responseJson['u_v'],
            isLoading: false
        }))
        .catch((error) => console.warn(`${JSON.stringify(responseJson)}: ${error}`))
    }

    handleBottomNavClick(tapCase) {

        switch(tapCase) {

            case 1: 
                this.props.navigation.navigate('RawReports', {
                    images: this.state.u_r_r
                })
                break;

            case 2: 
                this.props.navigation.navigate('Visits', {
                    visits: this.state.u_v
                })
                break;

            case 5: 
                this.props.navigation.navigate('HomeScreenNew')
                break;  
        }
        // this.setState({
        //     case: tapCase
        // })
    }

    FlatListItemSeparator = () => {
        return (
            <View style={{height: .5, width: "100%", backgroundColor: "#000"}}/>
        );
    }

    listItem(key, value) {
        return (
            <TouchableOpacity>
                <View style={{borderBottomColor: '#000', borderBottomWidth: 0.35, flex: 1, flexDirection: 'row', justifyContent: 'center', width: Dimensions.get("window").width - 25, alignSelf: 'center', alignItems: 'center', marginTop: 4, marginBottom: 4}}>
                    <Text style={{fontSize: 15, color: '#333', textAlign: 'right', width: '30%', alignSelf: 'flex-start'}}>{key}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 19, color: 'black', textAlign: 'center', width: '10%', alignSelf: 'flex-start'}}>:</Text>
                    <Text style={{color: '#444', fontSize: 15, textAlign: 'left', width: '60%', alignSelf: 'center'}}>{value}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    visits() {
        
    }

    render() {

        if(this.state.isLoading) {
            return (
                <View style={styles.spinner_container}>
                    <Spinner />
                </View>
            )
        }

        if(this.state.u_r_r.length < 1 && this.state.case==1) {
            return (
                <View style={styles.container}>
                    <View style={styles.statusBar}/>
                    <View style={styles.topContainer}>
                        <Text style={styles.patientName}>{this.state.u_d['name']}</Text>
                    </View>
                    <View style={styles.centerContainer}>
                        <View style={styles.list_container}>
                            <Text>User's reports are not available at the moment</Text>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.bottomContainerRow}>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(0)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_details.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Report summary</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(1)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_reports.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Patient's reports</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(2)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_prescription.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Patient's visits</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomContainerRow}>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(3)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_doctor.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Patient's Prescriptions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(4)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_visits.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Add prescription</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(5)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_logout.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Home</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }

        if(this.state.u_f_r.length < 1 && this.state.case==0) {
            return (
                <View style={styles.container}>
                    <View style={styles.statusBar}/>
                    <View style={styles.topContainer}>
                        <Text style={styles.patientName}>{this.state.u_d['name']}</Text>
                    </View>
                    <View style={styles.centerContainer}>
                        <View style={styles.list_container}>
                            <Text>User's report summary not available at the moment</Text>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.bottomContainerRow}>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(0)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_details.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Report summary</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(1)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_reports.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Patient's reports</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(2)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_prescription.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Patient's visits</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomContainerRow}>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(3)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_doctor.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Patient's Prescriptions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(4)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_visits.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Add prescription</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(5)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_logout.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Home</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }

        if(this.state.case == 0) {
            return (
                <View style={styles.container}>
                    <View style={styles.statusBar}/>
                    <View style={styles.topContainer}>
                        <Text style={styles.welcomeMessage}>Patient name: {this.state.u_d['name']}</Text>
                    </View>

                    <View style={styles.centerContainer}>
                        <FlatList
                            onRefresh={() => {console.log(' ')}}
                            refreshing={false }
                            data={this.state.u_f_r}
                            renderItem={({ item }) =>
                                this.listItem(item.name, item.address)
                            }
                            keyExtractor={(item, index) => index.toString()} />
                    </View>

                    <View style={styles.bottomContainer}>
                        <View style={styles.bottomContainerRow}>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(0)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_details.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Report summary</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(1)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_reports.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Patient's reports</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(2)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_prescription.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Patient's visits</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomContainerRow}>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(3)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_doctor.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Prescriptions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(4)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_visits.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Add prescription</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleBottomNavClick(5)} style={styles.bottomContainerRowItem}>
                                <Image source={require('../../assets/images/home_bottom_nav_icons/c_logout.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                                <View style={styles.bottomContainerRowItemSeperator}/>
                                <Text style={styles.bottomContainerRowItemText}>Home</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    spinner_container: {
        flex: 1, 
        backgroundColor: '#fff', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBar: {
        backgroundColor: "#d50000",
        height: Constants.statusBarHeight,
    },
    container: {
        flex: 1,
        // paddingTop: Constants.statusBarHeight
    },
    toolbar: {
        height: '8.5%',
        backgroundColor: '#fff',
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 6.5,
        borderBottomWidth: 0.25,
        borderBottomColor: '#333'
    },
    topContainer: {
        height: '7.5%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderBottomColor: '#000',
        borderBottomWidth: 1.5
    },
    centerContainer: {
        height: '56%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        height: '37.5%',
        backgroundColor: '#fff',
        padding: 4,
    },
    bottomContainerRow: {
        height: '41%',
        flexDirection: 'row',
        marginBottom: 6,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    bottomContainerRowItem: {
        height: '100%',
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
    bottomContainerRowItemSeperator: {
        height: .75,
        width: '100%',
        backgroundColor: '#eee'
    },
    bottomContainerRowItemImage: {
        height: '50%',
        width: '90%',
        margin: 8,
    },
    toolbarTitle: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    welcomeMessage: {
        fontSize: 18,
        color: '#000',
        textAlign: 'left', 
        width: '100%'
    },
    qrMessage: {
        fontSize: 14.5,
        color: '#111',
        padding: 12
    },
    bottomContainerRowItemText: {
        width: '100%',
        height: '27.5%',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 12,
        color: '#000',
        margin: 8,
    }
})
export default ScannedUserDetailsTest;
