import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { Divider } from 'react-native-elements'

function RenderContact() {

    return(
        <Card>
            <Text style={ { fontWeight: 'bold',  textAlign: "center" }}    >Contact Information{"\n"}
                </Text>
                <Divider style={{ backgroundColor: 'gainsboro' }} />
            <Text style={{margin: 10}}>
            {"\n"}
            121, Clear Water Bay Road {"\n"}{"\n"}
            Clear Water Bay, Kowloon{"\n"}{"\n"}
            HONG KONG{"\n"}{"\n"}
            Tel: +852 1234 5678{"\n"}{"\n"}
            Fax: +852 8765 4321{"\n"}{"\n"}
            Email:confusion@food.net
            </Text>
        </Card>
    );

}

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    };

    render() {

        const { navigate } = this.props.navigation;
        
        return(
            <RenderContact />
        );
    }
}

export default Contact;