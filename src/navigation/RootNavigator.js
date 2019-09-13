import { createStackNavigator, createAppContainer,createSwitchNavigator } from 'react-navigation';

import Login from '../screens/Login'
import Payment from '../screens/Payment'
import Cart from '../screens/Cart'
import Ordered from '../screens/Ordered'
import Home from '../screens/Home'
import Asyn from '../screens/Asyn'

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
})

const _Payment = createStackNavigator({
    index:{
        screen:Payment,
        navigationOptions:{
            header:null
        }
    }
})


const _Ordered = createStackNavigator({
    index:{
        screen:Ordered,
        navigationOptions:{
            header:null
        }
    }
})

const SwitchComponent = createAppContainer(createSwitchNavigator({
    _Asyn:Asyn,
    _Main : MainNavigator,
    toPayment: _Payment,
    order:_Ordered
}))


export default SwitchComponent;