import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigation from '../navigation/RootNavigator';
import categories from './categories'
import menus from './menus'
import itemMenus from './itemMenus'

const router = createNavigationReducer(RootNavigation);

const appReducer = combineReducers({
    router,
    categories,
    menus,
    itemMenus
})

export default appReducer



