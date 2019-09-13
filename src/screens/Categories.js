import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ImageBackground, ScrollView, YellowBox } from 'react-native'
import * as getCategoriesActions from '../_actions/categories'
import * as getMenusActions from '../_actions/menus'
import Modal from "react-native-modal";

YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Module RCTImageLoader requires',
]);

class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nav: 'Promo',
            isModalVisible: false,
            isModalConfirmVisible: false,
            isModalMenuItem: false,
            showComponent: false,
            obj: [{}]
        }
        this.getMenuItem = this.getMenuItem.bind(this)
    }



    getMenuItem(itemMenu, id, index) {
        const obj = this.state.obj
        const length = obj.length
        const find = 0
        if (obj.length > 1) {
            for (let i = 0; i < length; i++) {
                if (obj[i].id == id) {
                    const newQty = obj[i].qty + 1
                    obj.splice(i, 1)
                    const counter = obj.push({ name: itemMenu, id: id, qty: newQty })
                    this.setState({ counter })
                    return console.log(this.state.obj)

                } else if (i == length - 1) {
                    const counter = obj.push({ name: itemMenu, id: id, qty: 1 })
                    this.setState({ counter })
                    return console.log(this.state.obj)
                }
            }
        } else {
            const counter = obj.push({ name: itemMenu, id: id, qty: 1 })
            this.setState({ counter })
            this.setState({ showComponent: !this.state.showComponent });
            return console.log(this.state.obj)
        }
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    
    tesModal = () => {
        this.setState({ isModalMenuItem : !this.state.isModalMenuItem });
    };

    toggleModalConfirm = () => {
        this.setState({ isModalConfirmVisible: !this.state.isModalConfirmVisible });
    };

    destroyItemMenu = (ind) => {
        const data = this.state.obj
        data.splice(ind, 1)
        this.setState({ obj: data });
        if (data.length == 1) {
            this.setState({ showComponent: !this.state.showComponent });
        }
    }

    componentDidMount() {
        this.props.getCategories(),
            this.props.getMenus()
        //axios.get('http://localhost:5000/api/v1/categories').then(result=>console.log(result)).catch(r=>console.log(r))   
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this.setState({ nav: item.name })}
                style={this.state.nav == item.name ? styles.bgAktif : styles.item} >
                <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const itemsMenus = this.state.itemMenu
        const menu = this.props.menus.data
        const formatData = (data, numColumns) => {
            const numberOfFullRows = Math.floor(data.length / numColumns);

            let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
            while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
                data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
                numberOfElementsLastRow++;
            }

            return data;
        };

        const { navigation } = this.props
        const numTable = navigation.getParam('noTable', 0)
        const numColumns = 3
        const { container, containerCategories, categories, textCategories, menus, bgAktif } = styles
        return (
            <View style={style.container}>
                <View>
                    <Text>No Meja : {numTable}</Text>
                </View>
                <FlatList
                    data={this.props.categories.data}
                    numColumns={numColumns}
                    style={styles.containerCategories}
                    extraData={this.state.nav}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()} />

                {/* <View style={containerCategories} >
                    {categorie.map((item, key) => (
                            <TouchableOpacity style={this.state.nav == item.name ? bgAktif : categories} key={key}
                                onPress={() => this.setState({ nav: item.name })} >
                                <Text style={textCategories}>{this.state.enter} {item.name}</Text>
                            </TouchableOpacity>      
                    ))}
                </View> */}


                {/* <View style={menus}>
                    <Text>{this.state.nav} </Text>
                    {menu.map((item, key) => (
                        item.categories_name == this.state.nav ?
                            <TouchableOpacity style={categories} key={key} >
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                            : null
                    ))}
                </View> */}
                <View style={styles.menus} >

                    <ScrollView>
                        <FlatList
                            // data={formatData(menu, numColumns)}
                            data={menu}
                            numColumns={2}
                            extraData={[this.state.nav, this.state.obj]}
                            renderItem={({ item, index }) => {
                                if (item.empty === true) {
                                    return <View style={[styles.item, styles.itemInvisible]} />;
                                }
                                if (item.categories_name == this.state.nav) {
                                    return (
                                        <TouchableOpacity
                                            // style={styles.itemMenu}
                                            // onPress={() => this.getMenuItem(item.name, item.id, index)}
                                            onPres={() => this.tesModal()}
                                        >

                                            <View style={styles.imageBg} >
                                                <ImageBackground source={{ uri: (item.image) }} style={styles.imageBg} />
                                                <View style={styles.textContentMenu}>
                                                    <Text style={styles.itemTextMenu}>{item.name}</Text>
                                                </View>

                                                {/* equal qty */}
                                                {this.state.obj.map((e, i) => {
                                                    if (e.name == undefined) {
                                                        return null
                                                    } else if (item.id == e.id) {
                                                        return (
                                                            <View key={i} style={styles.containerQty}>
                                                                <Text style={styles.qty}>{e.qty} </Text>
                                                            </View>
                                                        )
                                                    }
                                                })}
                                            </View>
                                        </TouchableOpacity>
                                    );
                                } else {
                                    null
                                }
                            }}

                            keyExtractor={(item, index) => index.toString()} />

                    </ScrollView>
                </View>
                {/* footer */}
                <View style={styles.footer}>
                    <ScrollView style={{ flex: 1, borderWidth: 1, borderColor: 'blue', backgroundColor: 'white' }}>
                        <View style={styles.box}>
                            {/* {this.state.obj.map((item, index) => (
                            <TouchableOpacity style={styles.getItemMenu} key={index}
                            onPress={console.log(index)}>
                                <Text>{item.name} </Text>
                            </TouchableOpacity>
                        ))} */}


                            {this.state.obj.map((item, index) => {
                                if (item.name == undefined) {
                                    return null
                                } else {
                                    return (
                                        <TouchableOpacity style={styles.getItemMenu} key={index}
                                            onPress={() => this.destroyItemMenu(index)}>
                                            <Text>{item.name} </Text>
                                        </TouchableOpacity>)
                                }
                            })}

                            {/* 
                    <FlatList
                            // data={formatData(menu, numColumns)}
                            data={itemsMenus}
                            numColumns={2}
                            extraData={this.state.itemMenu}
                            renderItem={({ item, index }) => {
                            return(
                            <TouchableOpacity style={styles.getItemMenu} key={index}>
                            <Text>{item}</Text>
                            </TouchableOpacity>
                            )}}
                            keyExtractor={(item, index) => index.toString()} /> */}

                        </View>
                    </ScrollView>
                    <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.button} onPress={this.toggleModalConfirm}>
                            <Text style={styles.textButton}>Confirm</Text>
                        </TouchableOpacity >
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.textButton}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.toggleModal} >
                            <Text style={styles.textButton}>Bill</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* end footer */}

                {/* modal Bill*/}
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={styles.containerModal}>
                        <View style={styles.headerModal}>
                            <View style={styles.boxHeaderModal}>
                                <Text style={styles.textHeader}>03-09-2019</Text>
                            </View>
                            <TouchableOpacity onPress={this.toggleModal}
                                style={styles.boxClose}><Text style={styles.textClose}>X</Text></TouchableOpacity>
                        </View>
                        <View style={styles.containerOrder}>
                            <View style={styles.order}>
                                <View style={styles.itemOrder}>
                                    <Text style={styles.textStatusWaitingOrder}>Waiting</Text>
                                </View>
                                <View style={styles.itemOrder}>
                                    <Text style={styles.textNameOrder}>Alpukat</Text>
                                </View>
                                <View style={styles.itemOrder}>
                                    <Text style={styles.textPriceOrder}>Rp. 1.200.000</Text>
                                </View>
                            </View>

                            <View style={styles.order}>
                                <View style={styles.itemOrder}>
                                    <Text style={styles.textStatusSentOrder}>Sent</Text>
                                </View>
                                <View style={styles.itemOrder}>
                                    <Text style={styles.textNameOrder}>Jus wortel</Text>
                                </View>
                                <View style={styles.itemOrder}>
                                    <Text style={styles.textPriceOrder}>Rp 200.000</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 2 }} />
                        <View style={styles.contentModal}>
                            <View style={styles.bill}>
                                <View style={styles.contentBill}>
                                    <View style={styles.namePrice}>
                                        <Text style={styles.textBill} >Sub total</Text>
                                    </View>
                                    <View style={styles.price}>
                                        <Text style={styles.textBill}>Rp 192,000,00</Text>
                                    </View>
                                </View>

                                <View style={styles.contentBill}>
                                    <View style={styles.namePrice}>
                                        <Text style={styles.textBill} >Discount</Text>
                                    </View>
                                    <View style={styles.price}>
                                        <Text style={styles.textBill}>0%</Text>
                                    </View>
                                </View>

                                <View style={styles.contentBill}>
                                    <View style={styles.namePrice}>
                                        <Text style={styles.textBill} >Services Charge (55%)</Text>
                                    </View>
                                    <View style={styles.price}>
                                        <Text style={styles.textBill}>0%</Text>
                                    </View>
                                </View>


                                <View style={styles.contentBill}>
                                    <View style={styles.namePrice}>
                                        <Text style={styles.textBill} >Tax</Text>
                                    </View>
                                    <View style={styles.price}>
                                        <Text style={styles.textBill}>10%</Text>
                                    </View>
                                </View>


                                <View style={styles.contentBill}>
                                    <View style={styles.namePrice}>
                                        <Text style={styles.textTotal} >Total</Text>
                                    </View>
                                    <View style={styles.price}>
                                        <Text style={styles.textTotal}>Rp. 2.750.000</Text>
                                    </View>
                                </View>

                            </View>

                            <TouchableOpacity style={styles.callBill}>
                                <Text style={{ color: 'white', fontSize: 20 }}>CALL BILL</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


                {/* modal Confirm*/}
                <Modal isVisible={this.state.isModalConfirmVisible}>
                    <View style={styles.containerModalConfirm}>
                        <View style={styles.headerModalConfirm}>
                            <View style={styles.boxHeaderModalConfirm}>
                                <Text style={styles.textHeaderConfirm}>
                                    Confirm order
                                </Text>
                                <Text style={styles.textHeaderConfirm}>
                                    Are you sure to order this?
                                </Text>
                            </View>
                        </View>
                        <View style={styles.containerButtonConfirm}>
                            <TouchableOpacity style={styles.buttonConfirm}
                                onPress={this.toggleModalConfirm} >
                                <Text style={styles.textButtonConfirm}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonConfirm}
                                onPress={() => { this.props.navigation.navigate('Payment'), this.toggleModalConfirm() }}>
                                <Text style={styles.textButtonConfirm}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* modal menu item*/}
                <Modal isVisible={this.state.isModalMenuItem}>
                    <View style={styles.containerModalConfirm}>
                        <View style={styles.headerModalConfirm}>
                            <View style={styles.boxHeaderModalConfirm}>
                                <Text style={styles.textHeaderConfirm}>
                                    Confirm order
                                </Text>
                                <Text style={styles.textHeaderConfirm}>
                                    Are you sure to order this?
                                </Text>
                            </View>
                        </View>
                        <View style={styles.containerButtonConfirm}>
                            <TouchableOpacity style={styles.buttonConfirm}
                                onPress={this.toggleModalConfirm} >
                                <Text style={styles.textButtonConfirm}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonConfirm}
                                onPress={() => { this.props.navigation.navigate('Payment'), this.toggleModalConfirm() }}>
                                <Text style={styles.textButtonConfirm}>Yes</Text>
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
        categories: state.categories,
        menus: state.menus
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        getCategories: () => dispatch(getCategoriesActions.getCategories()),
        getMenus: () => dispatch(getMenusActions.getMenus()),
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Categories)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fef3f2'
    },
    containerCategories: {
        flex: 1,
    },
    item: {
        backgroundColor: '#4D243D',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: 50
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemText: {
        color: '#fff',
    },
    bgAktif: {
        flex: 1,
        backgroundColor: '#aaa',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    getItemMenu: {
        backgroundColor: '#ddd',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 20,
    },
    menus: {
        flex: 2,
        flexDirection: 'row',
    },
    itemMenu: {
        backgroundColor: '#acc5e7',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 10,
        height: 130
    },
    imageMenu: {
        flex: 1,
        backgroundColor: 'red'
    },
    textContentMenu: {
        flex: 0.20,
        backgroundColor: 'red'
    },
    imageBg: {
        flex: 1,
        height: '100%',
        width: '100%',

    },
    containerQty: {
        alignItems: 'center',
        marginLeft: '90%',
        position: 'absolute',
        backgroundColor: 'red',
        width: 30,
        height: 30,
        borderRadius: 20
    },
    qty: {
        color: 'white',
        fontSize: 20
    },
    itemTextMenu: {
        width: '100%',
        paddingBottom: 5,
        backgroundColor: 'white',
        textAlign: 'center',
        textAlignVertical: 'bottom'
    },
    nullData: {
        flex: 1,
        alignItems: 'center',
    },
    textNullData: {
        fontSize: 25,
        color: 'red'
    },
    footer: {
        flex: 1,
        backgroundColor: '#d6c5d1',
        borderColor: '#ddd',
        borderWidth: 1,
    },
    boxScrollView: {
        backgroundColor: 'white',
        flex: 1,
        borderWidth: 1,
        borderColor: 'blue'
    },
    box: {
        backgroundColor: 'white',
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    containerButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        borderRadius: 50,
        height: 50,
        width: 100,
        borderWidth: 1,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    textButton: {
        alignSelf: 'center',
        color: 'white',

    },

    //modal
    containerModal: {
        flex: 1,
        backgroundColor: 'white'
    },
    textClose: {
        fontSize: 25,
        color: 'white'
    },
    headerModal: {
        flex: 0.60,
        flexDirection: 'row',
        borderBottomColor: '#ddd',
        borderBottomWidth: 2,
    },
    contentModal: {
        flex: 3,
        backgroundColor: '#ddd'
    },
    footerModal: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    boxHeaderModal: {
        flex: 9,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxClose: {
        backgroundColor: 'red',
        flex: 1,
        height: 40,
        alignItems: 'center',
        borderRadius: 50
    },
    textHeader: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    containerOrder: {
        marginTop: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 2,
    },
    order: {
        flexDirection: 'row',
        marginBottom: 10
    },
    textStatusWaitingOrder: {
        color: 'red',
        fontSize: 20
    },

    textStatusSentOrder: {
        color: 'red',
        fontSize: 20
    },
    itemOrder: {
        flex: 1,
        alignItems: 'center'
    },
    bill: {
        flex: 1,
    },
    contentBill: {
        flexDirection: 'row',
    },
    namePrice: {
        flex: 1,
        alignItems: 'flex-end'
    },
    price: {
        flex: 1,
        alignItems: 'flex-end'
    },
    textBill: {
        fontSize: 15,
        color: '#aaa',
        paddingBottom: 10
    },
    callBill: {
        flex: 0.15,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2
    },
    textClBill: {
        color: 'white',
        fontSize: 20,
    },
    textTotal: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    //modal confirm
    containerModalConfirm: {
        flex: 0.18,
        backgroundColor: 'white',
        borderRadius: 20
    },
    headerModalConfirm: {
        flex: 0.60,
        flexDirection: 'row',
        borderBottomColor: '#ddd',
        borderBottomWidth: 2,
    },
    contentModalConfirm: {
        flex: 3,
        backgroundColor: '#ddd'
    },
    boxHeaderModalConfirm: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textHeaderConfirm: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center'

    },
    containerButtonConfirm: {
        flex: 0.50,
        borderBottomEndRadius: 10,
        flexDirection: 'row'
    },
    buttonConfirm: {
        flex: 1,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButtonConfirm: {
        fontSize: 15,
    }
})
