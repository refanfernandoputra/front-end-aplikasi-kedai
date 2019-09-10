import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import Payment from '../screens/Payment'

export default class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Payment: '0',
        };
    }

    componentDidMount() {
        this._retrieveData();
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('Payment');
            if (value !== null) {
                this.props.navigation.navigate('Payment')
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    render() {
        const { navigation} = this.props;
        const routes = navigation.state.routes;
        const { Payment } = this.state;

        return (
            <View >
                    <Payment /> // here your tabbar component
                    
            </View>
        );
    }

    navigationHandler = name => {
        const { navigation } = this.props;
        navigation.navigate(name);
    };
}