import React, { Component } from 'react'
import { View,Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import * as getMenusActions from '../_actions/menus'
import * as getTransactionsActions from '../_actions/Transactions'
import { connect } from 'react-redux'

class Asyn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    screen =() =>{

        AsyncStorage.getItem('noTable', (error, result) => {
            if (result) {
                this.setState({
                    text: result
                });
                this.props.navigation.navigate('Home', { noTable: this.state.text })
            } else {
                AsyncStorage.getItem('order', (error, res) => {
                    if (res) {
                        var objMenus = {};
                        if(res&&typeof res ==='string'){
                            var objStrMenus = res.match(/\{(.)+\}/g);
                            eval("objMenus ="+objStrMenus);
                        }
                        console.log( [objMenus])
                        this.props.Transactions.data = [objMenus]
                        this.props.itemMenus.isLoading =false
                        AsyncStorage.getItem('transactions', (error, result) => {
                            if (result) {
                                var obj = {};
                                if(result&&typeof result ==='string'){
                                    var objStr = result.match(/\{(.)+\}/g);
                                    eval("obj ="+objStr);
                                }
                                console.log([obj])
                                this.props.Transactions.data = [obj]
                                this.props.Transactions.isLoading =false
                                this.props.navigation.navigate('order')
                            }else{

                                this.props.navigation.navigate('Main')
                            }
                        })
                    }else{
                        this.props.navigation.navigate('Main')
                    }
                })
            }
        })
    }

    render(){
            return (
                <View>
                    {this.screen()}
                </View>
            )
        }
    }
const mapStateToProps = state => {
    return {
        itemMenus: state.itemMenus,
        Transactions: state.transactions
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        sendItemMenus: (data) => dispatch(getMenusActions.sendItemMenus(data)),
        sendTransactions: (data) => dispatch(getTransactionsActions.sendTransactions(data))
    }
}
export default connect(mapStateToProps, mapDispatchtoProps)(Asyn)