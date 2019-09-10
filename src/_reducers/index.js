import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigation from '../navigation/RootNavigator';
import categories from './categories'
import menus from './menus'
import transactions from './transactions'
import itemMenus from './itemMenus'

const router = createNavigationReducer(RootNavigation);

const appReducer = combineReducers({
    router,
    categories,
    menus,
    itemMenus,
    transactions
})

export default appReducer



