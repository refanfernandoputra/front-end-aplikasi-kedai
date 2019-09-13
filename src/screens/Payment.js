import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,AsyncStorage } from 'react-native'
import { connect } from 'react-redux';
import Spinner from "./Spinner"

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 60,
            minute: 1
        }
    }

    componentDidMount() {
        this.interval = setInterval(
            () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
            1000
        );
    }

    componentDidUpdate() {
        if (this.state.timer === 1) {
            if (this.state.minute > 0) {
                this.state.minute -= 1
                this.state.timer = 60
            } else {
                clearInterval(this.interval);
                this.props.navigation.navigate('Main')
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const itemMenus = this.props.itemMenus
        const time = this.state.timer
        const minute = this.state.minute
        const { box, textCenter, container, header, content, footer } = stylesPayment
        if (this.props.transactions.isLoading === true ) {
            return (
                <Spinner />
            )
        } else {
            return (
                <View style={container}>
                    <View style={box}>
                        <View style={header}>
                            <Text>PLEASE BRING THE HANDPHONE TO THE </Text>
                            <Text>CASHIR TO PROCEED WITH THE PAYMENT</Text>
                        </View>
                        <View style={content}>
                            <Text style={textCenter}>{itemMenus.data[0].numTable}</Text>
                            <Text style={[textCenter, { color: 'skyblue' }]}>THANK YOU</Text>
                        </View>
                        <View style={footer}>
                            <Text>Time Speent</Text>
                            <Text>0{minute}:{time < 10 ? <Text>0{time}</Text> : time}</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        itemMenus: state.itemMenus,
        transactions: state.transactions
    }
}

export default connect(mapStateToProps)(Payment)

const stylesPayment = StyleSheet.create({
    container: {
        flex: 1
    },
    box: {
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 80,
        backgroundColor: '#f1f1f1',
        borderWidth: 2,
        borderColor: 'skyblue',
        flex: 1
    },
    header: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10

    },
    textCenter: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ddd'
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})