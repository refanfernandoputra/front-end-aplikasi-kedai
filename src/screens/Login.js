import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput,Image } from 'react-native'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    konfirmasi = ()=>{
        return alert('Masukkan no meja terebih dahulu!!!')
    }
    render() {
        return (
            <View style={styles.container}>
                
                <Image source={{uri:('https://cdn.techinasia.com/data/images/LzvV52o01nNnKw9jBzEU9yTsdLLLNINayjwdwxV3.png')}} style={styles.img} />
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Mami Kedai</Text>
                </View>
                <View style={styles.containerMenu}>
                    <View style={styles.box}>
                        <Text>Masukkan nomor meja</Text>
                        <TextInput
                            keyboardType={'numeric'}
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                        />
                        <TouchableOpacity style={styles.submit} onPress={()=>{
                            {this.state.text =='' ?this.konfirmasi():this.props.navigation.navigate('Home',{noTable:this.state.text})}
                        }}>
                            <Text style={{ color: 'white' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerTitle: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        alignSelf: 'center',
        fontSize: 30,
        color: 'red'
    },
    containerMenu: {
        flex: 3,
        alignItems: 'center',
        elevation: 1,
    },
    img:{
        alignSelf:'center', 
        width: 200, 
        height: 200, 
        marginTop:10
    },
    box: {
        height: 140,
        width: 300,
        borderWidth: 2,
        borderColor: 'red',
        alignItems: 'center',
        borderRadius:10,
        padding:10,
    },
    textInput:{
        marginTop:10,
        height: 40, 
        width:200,
        textAlign:'center',
        borderColor: 'gray', 
        borderWidth: 1,
        marginBottom:10,
        shadowColor: "#ddd",
        elevation: 1,
    },
    submit: {
        height:30,
        borderRadius:10,
        width: 100,
        backgroundColor: 'red',
        borderWidth:1,
        alignItems:'center',
    }

})


