import React, { Component } from 'react'
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


export class BottomNav extends Component {
    
    render() {
        switch(this.props.dark) {
            case 0: return (
                <View style={styles.bottomContainer}>
                    <View style={styles.bottomContainerRow}>
                        <TouchableOpacity onPress={() => this.props.onClick(0)} style={styles.bottomContainerRowItemDark}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_details.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemTextDark}>Report summary</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(1)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_reports.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Patient's reports</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(2)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_prescription.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Patient's visits</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomContainerRow}>
                        <TouchableOpacity onPress={() => this.props.onClick(3)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_doctor.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Patient's Prescriptions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(4)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_visits.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Add prescription</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(5)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_logout.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            break;

            case 1: return (
                <View style={styles.bottomContainer}>
                    <View style={styles.bottomContainerRow}>
                        <TouchableOpacity onPress={() => this.props.onClick(0)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_details.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Report summary</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(1)} style={styles.bottomContainerRowItemDark}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_reports.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemTextDark}>Patient's reports</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(2)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_prescription.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Patient's visits</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomContainerRow}>
                        <TouchableOpacity onPress={() => this.props.onClick(3)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_doctor.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Patient's Prescriptions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(4)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_visits.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Add prescription</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(5)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_logout.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            break;

            case 2: return (
                <View style={styles.bottomContainer}>
                    <View style={styles.bottomContainerRow}>
                        <TouchableOpacity onPress={() => this.props.onClick(0)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_details.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Report summary</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(1)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_reports.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Patient's reports</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(2)} style={styles.bottomContainerRowItemDark}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_prescription.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemTextDark}>Patient's visits</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomContainerRow}>
                        <TouchableOpacity onPress={() => this.props.onClick(3)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_doctor.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Patient's Prescriptions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(4)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_visits.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Add prescription</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(5)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_logout.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            break;

            case 3: return (
                <View style={styles.bottomContainer}>
                    <View style={styles.bottomContainerRow}>
                        <TouchableOpacity onPress={() => this.props.onClick(0)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_details.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Report summary</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(1)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_reports.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Patient's reports</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(2)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_prescription.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Patient's visits</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomContainerRow}>
                        <TouchableOpacity onPress={() => this.props.onClick(3)} style={styles.bottomContainerRowItemDark}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_doctor.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemTextDark}>Patient's Prescriptions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(4)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_visits.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Add prescription</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(5)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_logout.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            break;

            case 4: return (
                <View style={styles.bottomContainer}>
                    <View style={styles.bottomContainerRow}>
                        <TouchableOpacity onPress={() => this.props.onClick(0)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_details.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Report summary</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(1)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_reports.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Patient's reports</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(2)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_prescription.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Patient's visits</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomContainerRow}>
                        <TouchableOpacity onPress={() => this.props.onClick(3)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_doctor.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Patient's Prescriptions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(4)} style={styles.bottomContainerRowItemDark}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_visits.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemTextDark}>Add prescription</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(5)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_logout.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            break;

            case 5: return (
                <View style={styles.bottomContainer}>
                    <View style={styles.bottomContainerRow}>
                        <TouchableOpacity onPress={() => this.props.onClick(0)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_details.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Report summary</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(1)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_reports.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Patient's reports</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(2)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_prescription.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Patient's visits</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomContainerRow}>
                        <TouchableOpacity onPress={() => this.props.onClick(3)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_doctor.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Patient's Prescriptions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(4)} style={styles.bottomContainerRowItem}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_visits.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemText}>Add prescription</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick(5)} style={styles.bottomContainerRowItemDark}>
                            <Image source={require('../../assets/images/home_bottom_nav_icons/c_logout.png')} resizeMode="contain" style={styles.bottomContainerRowItemImage}/>
                            <View style={styles.bottomContainerRowItemSeperator}/>
                            <Text style={styles.bottomContainerRowItemTextDark}>Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            break;
        }
    }

}

const styles = StyleSheet.create({
    
    bottomContainer: {
        height: '37.5%', 
        backgroundColor: '#fff',
        padding: 4,
    },
    bottomContainerRow: {
        height: '46%', 
        flexDirection: 'row', 
        marginBottom: 6,
        alignItems: 'center',
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
    bottomContainerRowItemText: {
        width: '90%',
        height: '25%',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 12,
        color: '#111',
        margin: 8,
    },
    bottomContainerRowItemTextDark: {
        width: '90%',
        height: '25%',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 12,
        color: '#fff',
        margin: 8,
    },
    bottomContainerRowItemDark: {
        height: '100%',
        width: '30%',
        margin: 4,
        backgroundColor: "#333",
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        borderWidth: 0.25,
        borderColor: '#333',
        borderRadius: 3,
    }
});

export default BottomNav
