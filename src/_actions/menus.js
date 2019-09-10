import * as type from '../_redux/types'
import axios from 'axios'

export const getMenus = () => ({
      type: type.GET_LIST_MENU,
      payload: axios.get('http://localhost:5000/api/v1/menus')
})

export const getItemMenus = () => {
      return {
            type: type.GET_ITEM_MENUS
      }
}

export const sendItemMenus = (data) => {
      return {
            type: type.SEND_ITEM_MENUS,
            payload: data
      }
}
