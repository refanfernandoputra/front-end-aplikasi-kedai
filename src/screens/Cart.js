import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Button } from 'react-native'
import { connect } from 'react-redux';
import * as getMenusActions from '../_actions/menus'
import * as getTransactionsActions from '../_actions/Transactions'
import Modal from "react-native-modal";
import _styles from './Styles'
import { NavigationEvents } from 'react-navigation';


class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            objItemMenu: [],
            isModalConfirmVisible: false,
        }
    }

    toggleModalConfirm = () => {
        this.setState({ isModalConfirmVisible: !this.state.isModalConfirmVisible });
    };

    componentDidMount() {
        this.props.getMenus()
        const itemMenu = this.props.itemMenus.data
        let objItemMenu = this.state.objItemMenu
        this.setState({ objItemMenu: this.props.itemMenus.data })
        console.log('props menu ' + this.props.itemMenus.data)
        // itemMenu.map((e,i)=>{
        //     objjItemMenu = objItemMenu.push({e})
        // })
        console.log('state lokal ' + itemMenu)
    }

    addQty(itemMenu, id) {
        const obj = this.state.objItemMenu
        const length = obj.length
        for (let i = 0; i < length; i++) {
            if (obj[i].id == id) {
                this.state.objItemMenu[i].qty += 1
                return this.setState({ objItemMenu:obj })
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
                        return this.setState({ objItemMenu:obj })
                    } else {
                        this.destroy(id)
                        return this.setState({ objItemMenu:obj })
                    }
                }
            } 
    }

    destroy = (id) => {
        console.log('id masuk : ' + id)
        const getItemMenu = this.state.objItemMenu
        console.log(getItemMenu.length)
        for (let i = 0; i < getItemMenu.length; i++) {
            if (getItemMenu[i].id == id) {
                console.log('item yg akan dihapus ' + getItemMenu[i].id)
                const objItemMenu = getItemMenu.splice(i, 1)
                return this.setState({ objItemMenu: this.props.itemMenus.data })
            }
        }

    }


    render() {
        
        const { navigation } = this.props
        let numTable = navigation.getParam('numTable', 0)
        const itemMenu = this.props.itemMenus.data
        if (itemMenu.length <= 0) {
            this.props.navigation.navigate('Home')
        }
        const menu = this.props.menus.data
        let countPrice = 0
        console.log(itemMenu.length)
        return (
            <View style={styles.container}>
                {/* {console.log(this.state.objItemMenu[0].numTable)} */}
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.containerMenus}>
                        {itemMenu.map((e, i) => {
                            return (
                                <View style={{ flex: 1 }} key={i}>
                                    {menu.map((item, index) => (
                                        e.id == item.id ?

                                            <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: '#aaa', borderColor: '#ddd', elevation: 2, margin: 5 }} key={index}>
                                                <View style={{ padding: 10, flex: 0.30 }}>
                                                    <Image source={{ uri: (item.image) }} style={{ borderWidth: 1, borderColor: '#ddd', height: 120, width: '100%', resizeMode: 'stretch' }} />
                                                </View>
                                                <Text style={{ display: 'none' }}>{countPrice += item.price * e.qty}</Text>
                                                <View style={{ flex: 1, paddingLeft: 10, flexDirection: 'row' }}>
                                                    <View style={{ flex: 1, justifyContent: 'center' }}><Text>{item.name}{'\n'}Rp. {item.price} {'\n'}Jumlah : {e.qty} </Text>

                                                        <View style={{ alignSelf: 'flex-end', marginTop: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', height: 30, width: 75, flexDirection: 'row' }}>

                                                            <TouchableOpacity onPress={() => { this.minQty(itemMenu, item.id) }}>
                                                                <Text style={{ fontSize: 35 }}> - </Text>
                                                            </TouchableOpacity>
                                                            <View>
                                                                <Text>{e.qty} </Text>
                                                            </View>
                                                            <TouchableOpacity onPress={() => { this.addQty(itemMenu, item.id) }}>
                                                                <Text style={{ fontSize: 25 }}> + </Text>
                                                            </TouchableOpacity>

                                                        </View>

                                                    </View>
                                                    <View style={{ alignItems: 'flex-end' }}>
                                                        <TouchableOpacity style={{ flex: 1, marginTop: -10 }}
                                                            onPress={() => { this.destroy(e.id) }}>
                                                            <Text style={{ fontSize: 25, color: '#aaa' }}>x</Text>
                                                        </TouchableOpacity>
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

                <TouchableOpacity style={styles.footer} onPress={() => this.toggleModalConfirm()}>
                    <Text style={{ color: 'white' }}>Konfirmasi</Text>
                </TouchableOpacity>


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
                                onPress={() => { this.props.insertTransactions(countPrice,numTable), this.toggleModalConfirm(),this.props.navigation.navigate('toPayment',{numTable}) }}
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


const mapStateToProps = state => {
    return {
        itemMenus: state.itemMenus,
        menus: state.menus
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        getMenus: () => dispatch(getMenusActions.getMenus()),
        insertTransactions : (countPrice,numTable) => dispatch(getTransactionsActions.insertTransactions(countPrice,numTable))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Cart)


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
        backgroundColor: 'green',
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 10
    }
})

//catatan :


{/* <Text>{this.props.itemMenus.data[0].name}</Text> */ }