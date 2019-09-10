import React, { Component } from 'react'
import RootNavigator from './src/navigation/RootNavigator'
import { Provider} from 'react-redux';
import {store} from './src/_redux/store'
class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <RootNavigator/>
      </Provider>
    )
  }
}

export default App