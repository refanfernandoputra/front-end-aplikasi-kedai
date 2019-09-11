import React, { Component } from 'react';
import { connect } from 'react-redux'
import { TextInput, View, StyleSheet, Text, TouchableOpacity, FlatList, ImageBackground, ScrollView, YellowBox, Image } from 'react-native'
import * as getCategoriesActions from '../_actions/categories'
import * as getMenusActions from '../_actions/menus'
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from "./Styles"
import Spinner from "./Spinner"


YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Module RCTImageLoader requires',
]);

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: 'makanan',
            menuAktif: stylesHome.backgroundAktif,
            nav: 'Makanan',
            isModalVisible: false,
            isModalMenuItem: false,
            isModalConfirmVisible: false,
            showComponent: false,
            obj: [],
            getQty: 0,
            getPrice: 0
        }
        this.handleOnNavigateBack = this.handleOnNavigateBack.bind(this)
    }


    getMenuItem(itemMenu, id, index, price, numTable) {
        const obj = this.state.obj
        const length = obj.length
        const find = 0
        if (obj.length > 0) {
            for (let i = 0; i < length; i++) {
                if (obj[i].id == id) {
                    const newQty = obj[i].qty + 1
                    obj.splice(i, 1)
                    const counter = obj.push({ name: itemMenu, id: id, qty: newQty, numTable: numTable })
                    this.setState({ counter })

                } else if (i == length - 1) {
                    const counter = obj.push({ name: itemMenu, id: id, qty: 1, numTable: numTable })
                    this.setState({ counter })
                }
            }
        } else {

            const counter = obj.push({ name: itemMenu, id: id, qty: 1, numTable: numTable })
            this.setState({ counter })
            this.setState({ showComponent: !this.state.showComponent });

        }
        console.log(this.state.obj)
    }

    toggleModalMenuItem = () => {
        this.setState({ isModalMenuItem: !this.state.isModalMenuItem });
    };

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
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

    handleOnNavigateBack = (data) => {
        this.setState({
            obj: data
        })
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
        let getQty = 0
        let getPrice = 0

        const _itemMenus = this.props.itemMenus.data

        const sendItemMenu = _itemMenus.length <= 0 ? this.props.sendItemMenus(this.state.obj) : null

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
        if (this.props.menus.isLoading === true || this.props.categories.isLoading === true) {
            return (
                <Spinner/>
            )
        } else {
            return (
                <View style={stylesHome.container}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Meja {numTable}</Text>
                    </View>
                    <View style={stylesHome.containerCategorie}>
                        {this.props.categories.data.map((item, key) => (
                            <TouchableOpacity style={this.state.nav == item.name ? stylesHome.backgroundAktif : stylesHome.menu}
                                onPress={() => {
                                    this.setState({
                                        nav: item.name
                                    })
                                }} key={key} >
                                <Text>{key == 1 ? <Ionicons name="md-wine" size={20} color={'green'} /> : <Ionicons name="md-pizza" size={20} color={'green'} />} {item.name} </Text>
                            </TouchableOpacity>


                        )
                        )}
                    </View>
                    <View style={stylesHome.content} >
                        <View style={styles.menus} >
                            <View style={{ flex: 1 }}>

                                {/* area FlatList menu */}

                                <ScrollView style={{ flex: 1 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                                        {menu.map((item, index) => {
                                            if (item.categories.name == this.state.nav) {

                                                return (
                                                    <View
                                                        style={styles.itemMenu}
                                                        key={index}
                                                    // onPress={() => this.getMenuItem(item.name, item.id, index)}
                                                    >
                                                        <TouchableOpacity style={styles.imageBg} onPress={() => this.getMenuItem(item.name, item.id, index, item.price, numTable)} >
                                                            <View style={styles.containerImageMenu}>
                                                                <Image source={{ uri: (item.image) }} style={styles.imageMenu} />
                                                            </View>
                                                            <View style={styles.containerTextContentMenu}>
                                                                <View style={styles.textContentMenu}>
                                                                    <Text style={styles.itemTextMenu}>Rp. {item.price} {'\n'}{item.name}</Text>
                                                                </View>

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
                                                        </TouchableOpacity>
                                                    </View>
                                                );
                                            } else {
                                                null
                                            }

                                        }
                                        )}
                                    </View>
                                </ScrollView>

                                {/* akhir area */}

                            </View>
                        </View>
                        {_itemMenus.length == 0 ? this.state.showComponent == false :
                            this.state.showComponent == true || _itemMenus.length > 0 ?

                                <View style={{ backgroundColor: 'green', height: 40, margin: 10, flex: 0.20 }}>
                                    <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                                        //onPress={() => { this.props.navigation.navigate('Card') }}
                                        onPress={() =>
                                            [sendItemMenu,
                                                this.props.navigation.navigate('Cart', { numTable, onNavigateBack: this.handleOnNavigateBack })]
                                        }>
                                        {this.state.obj.map((e, i) => {
                                            { getQty += e.qty }
                                            {
                                                menu.map((element, index) => {
                                                    if (e.id == element.id) {
                                                        getPrice += element.price * e.qty
                                                    }
                                                })
                                            }
                                        })}

                                        <Ionicons name='md-basket' size={15} color='white' >
                                            <Text style={{ color: 'white' }} > {getQty} item | Rp.{getPrice}</Text>
                                        </Ionicons>

                                    </TouchableOpacity>
                                </View>
                                : null
                        }


                        {/* footer */}

                        {/* end footer */}

                    </View>
                </View>
            )
        }
    }
}


const mapStateToProps = state => {
    return {
        categories: state.categories,
        menus: state.menus,
        itemMenus: state.itemMenus
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        getCategories: () => dispatch(getCategoriesActions.getCategories()),
        getMenus: () => dispatch(getMenusActions.getMenus()),
        sendItemMenus: (data) => dispatch(getMenusActions.sendItemMenus(data)),
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Home)

const stylesHome = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerCategorie: {
        flex: 1,
        flexDirection: 'row',

    },
    menu: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    content: {
        flex: 8,
    },
    backgroundAktif: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomColor: 'green',
        borderBottomWidth: 1
    }
})