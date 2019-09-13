import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import * as getMenusActions from '../_actions/menus'
import * as getTransactionsActions from '../_actions/Transactions'
import Modal from "react-native-modal";
import * as getOrdersActions from '../_actions/Orders'
import _styles from './Styles'
import Spinner from "./Spinner"
import AsyncStorage from '@react-native-community/async-storage'


class Ordered extends Component {
    constructor(props) {
        super(props)
        this.state = {
            objItemMenu: [],
            isModalConfirmVisible: false,
            disabled: true,
            timeInsertOrder: 5,
            addOrderItem: 0,
            buttonConfirm: false
        }

    }

    toggleModalConfirm = () => {
        this.setState({ isModalConfirmVisible: !this.state.isModalConfirmVisible });
    };

    componentDidMount() {
        AsyncStorage.removeItem('noTable');
        this.props.getMenus()
        this.setState({ objItemMenu: this.props.itemMenus.data })
        AsyncStorage.getItem('order', (error, result) => {
            if (result) {
                this.setState({ buttonConfirm: !this.state.buttonConfirm })
            }else{
                this.interval = setInterval(
                    () => this.setState((x) => ({ timeInsertOrder: x.timeInsertOrder - 1 })),
                    1000
                );
            }
        })
    }

    saveDataToAsyn() {
        const itemMenu = this.props.itemMenus
        const transactions = this.props.Transactions
        console.log(transactions)
        AsyncStorage.setItem('order', JSON.stringify(itemMenu));
        AsyncStorage.setItem('transactions', JSON.stringify(transactions));
    }

    componentDidUpdate() {
        if (this.state.timeInsertOrder === 0) {
            this.insertOrders()
        }
    }

    insertOrders = () => {
        if (this.props.menus.isLoading === true || this.props.Transactions.isLoading === true) {
            return (
                <Spinner />
            )
        } else {
            const transactionsId = this.props.Transactions.data.Transactions.id
            const itemMenu = this.props.itemMenus.data
            const rowItem = this.state.addOrderItem
            if (rowItem == itemMenu.length) {
                clearInterval(this.interval)
            } else {
                this.props.sendOrders(itemMenu[rowItem].id, itemMenu[rowItem].price, itemMenu[rowItem].qty, transactionsId)
                itemMenu[rowItem].status = 'SENT'
                this.state.addOrderItem += 1
                this.setState({ timeInsertOrder: 5 })
                if (rowItem == itemMenu.length - 1) {
                    this.setState({ buttonConfirm: !this.state.buttonConfirm })
                }
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    addQty(itemMenu, id) {
        const obj = this.state.objItemMenu
        const length = obj.length
        for (let i = 0; i < length; i++) {
            if (obj[i].id == id) {
                this.state.objItemMenu[i].qty += 1
                return this.setState({ objItemMenu: obj })
            }
        }
    }


    minQty(itemMenu, id) {
        const obj = this.state.objItemMenu
        const length = obj.length
        for (let i = 0; i < length; i++) {
            if (obj[i].id == id) {
                const newQty = obj[i].qty
                if (newQty > 1) {
                    this.state.objItemMenu[i].qty -= 1
                    return this.setState({ objItemMenu: obj })
                } else {
                    this.destroy(id)
                    return this.setState({ objItemMenu: obj })
                }
            }
        }
    }

    checkAsyn = () => {
        AsyncStorage.getItem('order', (error, result) => {
            if (result) {
                null
            }else{
                this.saveDataToAsyn()
            }
        })
    }

    destroy = (id) => {
        const getItemMenu = this.state.objItemMenu
        for (let i = 0; i < getItemMenu.length; i++) {
            if (getItemMenu[i].id == id) {
                const objItemMenu = getItemMenu.splice(i, 1)
                return this.setState({ objItemMenu: this.props.itemMenus.data })
            }
        }

    }


    render() {

        this.checkAsyn()
        const { navigation } = this.props
        let numTable = navigation.getParam('numTable', 0)
        if (this.props.menus.isLoading === true || this.props.Transactions.isLoading === true) {
            return (
                <Spinner />
            )
        } else {
            const itemMenu = this.props.itemMenus.data
            const menu = this.props.menus.data
            let countPrice = 0
            console.log(itemMenu)
            return (
                <View style={styles.container}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.containerMenus}>
                            {itemMenu.map((e, i) => {
                                return (
                                    <View style={{ flex: 1 }} key={i}>
                                        {menu.map((item, index) => (
                                            e.id == item.id ?

                                                <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: '#aaa', borderColor: '#ddd', elevation: 2, margin: 5 }} key={index}>
                                                    <View style={{ padding: 10, flex: 1 }}>
                                                        <Image source={{ uri: (item.image) }} style={{ borderWidth: 1, borderColor: '#ddd', height: 120, width: '100%', resizeMode: 'stretch' }} />
                                                    </View>
                                                    <Text style={{ display: 'none' }}>{countPrice += item.price * e.qty}</Text>
                                                    <View style={{ flex: 1, paddingLeft: 10, flexDirection: 'row' }}>
                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                            {e.status == 'WAITING' ?
                                                                <Text style={{ color: 'red' }}>{e.status} ..</Text>
                                                                :
                                                                <Text style={{ color: 'green' }}>{e.status}</Text>
                                                            }
                                                        </View>
                                                    </View>
                                                </View>
                                                : null

                                        )
                                        )}
                                    </View>
                                )

                            })}

                            <View style={{ flex: 1, marginTop: 10, borderColor: '#ddd', elevation: 2, }}>
                                <View style={{ flex: 1, padding: 5, borderColor: '#ddd', borderStyle: 'dotted', borderBottomWidth: 1 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'arial' }}>Detail pembayaran</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text>Harga(estimasi)</Text>
                                        <Text>Discount </Text>
                                        <Text>Services Charge</Text>
                                        <Text>Tax</Text>
                                        <Text style={{ fontWeight: 'bold' }}>Total</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', padding: 5 }}>
                                        <Text>Rp. {countPrice}</Text>
                                        <Text>0%</Text>
                                        <Text>0%</Text>
                                        <Text>0%</Text>
                                        <Text style={{ fontWeight: 'bold' }}>Rp. {countPrice}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    {this.state.buttonConfirm == true ?
                        <TouchableOpacity style={styles.footer} onPress={() => this.toggleModalConfirm()}>
                            <Text style={{ color: 'white' }}>Konfirmasi</Text>
                        </TouchableOpacity>
                        : null}


                    {/* modal Confirm*/}
                    <Modal isVisible={this.state.isModalConfirmVisible}>
                        <View style={_styles.containerModalConfirm}>
                            <View style={_styles.headerModalConfirm}>
                                <View style={_styles.boxHeaderModalConfirm}>
                                    <Text style={_styles.textHeaderConfirm}>
                                        Konfirmasi Pesanan
                                </Text>
                                    <Text style={_styles.textHeaderConfirm}>
                                        Apakah anda yakin?
                                </Text>
                                </View>
                            </View>
                            <View style={_styles.containerButtonConfirm}>
                                <TouchableOpacity style={_styles.buttonConfirm}
                                    onPress={this.toggleModalConfirm} >
                                    <Text style={_styles.textButtonConfirm}>Tidak</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={_styles.buttonConfirm}
                                    onPress={() => {
                                        this.props.insertTransactions(countPrice, numTable), this.toggleModalConfirm(), this.props.navigation.navigate('toPayment')

                                    }}
                                >
                                    <Text style={_styles.textButtonConfirm}>Iya</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>


                </View>
            )
        }
    }
}


const mapStateToProps = state => {
    return {
        itemMenus: state.itemMenus,
        menus: state.menus,
        Transactions: state.transactions,
        orders: state.orders
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        getMenus: () => dispatch(getMenusActions.getMenus()),
        sendOrders: (menuId, price, qty, idTran) => dispatch(getOrdersActions.sendOrder(menuId, price, qty, idTran)),
        insertTransactions: (countPrice, numTable) => dispatch(getTransactionsActions.insertTransactions(countPrice, numTable))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Ordered)


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerMenus: {
        flex: 1,
        justifyContent: 'center'
    },
    menus: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    itemMenu: {
        fontSize: 15,
    },
    footer: {
        flex: 0.10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 10
    }
})

//catatan :


{/* <Text>{this.props.itemMenus.data[0].name}</Text> */ }