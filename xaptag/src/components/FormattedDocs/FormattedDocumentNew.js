import React, { Component } from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    FlatList,
    Dimensions,
    StatusBar
} from 'react-native';

var index = 0

export default class FormattedDocumentNew extends Component {

    constructor() {
        super()
        this.state = {
            dataString: "{\"data\":[{\"key\":\"value\"},{\"key\":\"value\"},{\"key\":\"value\"},{\"key\":\"value\"},{\"key\":\"value\"},{\"key\":\"value\"},{\"key\":\"value\"},{\"key\":\"value\"},{\"key\":\"value\"},{\"key\":\"value\"}]}",
            dataArray: []
        }
    }

    componentDidMount() {
        this.setState({
            dataArray: JSON.parse(this.state.dataString).data
        })
    }

    FlatListItemSeparator = () => {
        return (
            <View style={{height: .5, width: "100%", backgroundColor: "#000"}}/>
        );
    }

    render() {

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#B71C1C" barStyle="light-content" />
                <FlatList
                    data={this.state.dataArray}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({ item }) =>
                        <View style={{flex: 1, margin: 12, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get("window").width - 25, alignSelf: 'center', alignItems: 'center'}}>
                            <Text style={{textAlign: 'center', alignSelf: 'center'}}>Key</Text>
                            <Text style={{textAlign: 'center', alignSelf: 'center'}}>:</Text>
                            <Text style={{textAlign: 'center', alignSelf: 'center'}}>Value</Text>
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()} />
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
    }
})