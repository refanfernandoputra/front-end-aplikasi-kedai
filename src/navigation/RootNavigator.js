import { createStackNavigator, createAppContainer,createSwitchNavigator } from 'react-navigation';

import Login from '../screens/Login'
import Payment from '../screens/Payment'
import Cart from '../screens/Cart'
import Home from '../screens/Home'

const MainNavigator = createStackNavigator({
    Main : {
        screen:Login,
        navigationOptions:{
            header:null
        }
    },
    Home:{
        screen:Home,
        navigationOptions:{
            header:null
        }
    },
    Cart:{
        screen:Cart,
        navigationOptions:{
            title:'Pesanan anda',
            
        }
    },
    // toPayment:{
    //     screen:Payment,
    //     navigationOptions:{
    //         header:null
    //     }
    // }
})

const _Payment = createStackNavigator({
    index:{
        screen:Payment,
        navigationOptions:{
            header:null
        }
    }
})

const SwitchComponent = createAppContainer(createSwitchNavigator({
    _Main : MainNavigator,
    toPayment: _Payment
}))


export default SwitchComponent;