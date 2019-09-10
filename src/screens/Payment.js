import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Payment extends Component {

    render() {
        const { navigation } = this.props
        const numTable = navigation.getParam('numTable', 0)
        const {box,textCenter, container, header, content, footer } = stylesPayment
        return (
            <View style={container}>
                <View style={box}>
                    <View style={header}>
                        <Text>PLEASE BRING THE HANDPHONE TO THE </Text>
                        <Text>CASHIR TO PROCEED WITH THE PAYMENT</Text>
                    </View>
                    <View style={content}>
                        <Text style={textCenter}>{numTable}</Text>
                        <Text style={[textCenter,{color:'skyblue'}]}>THANK YOU</Text>
                    </View>
                    <View style={footer}>
                        <Text>Time Speent</Text>
                        <Text>00.54</Text>
                    </View>
                </View>
            </View>
        )
    }
}
export default Payment

const stylesPayment = StyleSheet.create({
    container: {
        flex: 1
    },
    box:{
        borderRadius:20,
        marginHorizontal:20,
        marginVertical:80,
         backgroundColor:'#f1f1f1',
         borderWidth:2,
         borderColor:'skyblue',
         flex:1
    },
    header: {
        paddingVertical:20,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:10

    },
    textCenter: {
        fontSize:30,
        fontWeight:'bold',
        color:'#ddd'
    },
    content: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    },
    footer: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    }
})