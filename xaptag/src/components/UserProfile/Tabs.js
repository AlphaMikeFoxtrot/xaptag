import React, { Component } from 'react';
import {
    View, 
    Text,
} from 'react-native'
import {
    Card,
    CardItem, 
    Body, 
    Content, 
    Container, 
    Left
} from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Tabs extends Component {

    constructor(props) {
        super(props)
    }

    getCardItem(iconName, textItem) {
        return(
            <CardItem>
                <Left>
                    <Icon name={iconName} size={32} color="black" />
                    <Body>
                        <Text style={{ fontSize: 16, color: 'black', textAlign: 'left', marginLeft: 12 }}>{textItem}</Text>
                    </Body>
                </Left>
            </CardItem>
        )
    }

    getSeperator(width, color, margin) {

        return(
            <View
                style={{
                    borderBottomColor: color,
                    borderBottomWidth: 0.8,
                    margin: margin
                }}
            />
        )
    }

    render() {

        if(this.props.address == '' || String(this.props.address).length == 0) {
            // no additional info provided
            return (
                <Container style={{height: '30%'}}>
                    <Content>
                        <Card>
                            {this.getSeperator(0.5, 'white', 6)}
                            {this.getCardItem("call", "+91 " + this.props.phone)}
                            {this.getSeperator(0.8, 'black', 12)}
                            {this.getCardItem("mail", this.props.email)}
                            {this.getSeperator(0.8, 'white', 12)}
                        </Card>
                    </Content>
                </Container>    
            )
        }

        return(
            <Container style={{height: '30%'}}>
                <Content>
                    <Card>
                        {this.getSeperator(0.5, 'white', 6)}
                        {this.getCardItem("call", "+91 " + this.props.phone)}
                        {this.getSeperator(0.8, 'black', 12)}
                        {this.getCardItem("mail", this.props.email)}
                        {this.getSeperator(0.8, 'black', 12)}
                        {this.getCardItem("home", this.props.address)}
                        {this.getSeperator(0.8, 'black', 12)}
                        {this.getSeperator(0.8, 'white', 12)}
                        <Text style={{fontWeight: 'bold', fontSize: 17, color: 'black', alignSelf: 'center', textAlign: 'center'}}>Emergency Contact Details</Text>
                        {this.getSeperator(0.8, 'black', 12)}
                        {/* <Text style={{fontSize: 14, color: 'black', textAlign: 'left', marginLeft: 12, alignSelf: 'flex-start'}}>Person Name</Text> */}
                        {this.getCardItem("person", this.props.em_name)}
                        {/* <Text style={{fontSize: 14, color: 'black', textAlign: 'left', marginLeft: 12, alignSelf: 'flex-start'}}>Person Phone Number</Text> */}
                        {this.getCardItem("contact-phone", "+91 " + this.props.em_phone)}
                        {this.getSeperator(0.8, 'white', 12)}
                    </Card>
                </Content>
            </Container>
        )
    }
}