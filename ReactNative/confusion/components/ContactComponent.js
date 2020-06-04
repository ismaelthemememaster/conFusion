import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { Divider } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    };

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

    render() {

        const { navigate } = this.props.navigation;
        
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>                
                <Card title='Contact Information'>
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
                    <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                        />
                </Card>
            </Animatable.View>
        );
    }
}

export default Contact;