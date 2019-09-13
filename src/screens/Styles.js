import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fef3f2'
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
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#bbb',
        margin: 10,
        width: 150,
        shadowColor: "#ddd",
        elevation: 1,
    },
    imageMenu: {
        flex: 1,
        resizeMode: 'stretch'
    },
    containerImageMenu: {
        flex: 1,
    },
    textContentMenu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    imageBg: {
        height: 200,
    },
    containerAddItemMenu: {
        flex: 1,
        height: 20,
        flexDirection: 'row',
        backgroundColor: 'red'
    },
    addItemMenu: {
        width: 70,
        height: 20,
        backgroundColor: 'red',
        borderRadius: 10
    },
    buttonAdd: {
        color: 'white',
        alignSelf: 'center'
    },
    containerTextContentMenu: {
        flex: 0.40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerQty: {
        alignItems: 'center',
        justifyContent:'center',
        marginLeft: '85%',
        position: 'absolute',
        backgroundColor: '#f40003',
        width: 30,
        height: 25,
        borderRadius: 50
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
        borderRadius: 10
    },
    headerModalConfirm: {
        flex: 0.60,
        flexDirection: 'row',
        borderBottomColor: '#ddd',
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
        justifyContent: 'center',

    },
    containerButtonConfirm: {
        flex: 0.50,
        flexDirection: 'row'
    },
    buttonConfirm: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButtonConfirm: {
        fontSize: 15,
    }
})



export default styles