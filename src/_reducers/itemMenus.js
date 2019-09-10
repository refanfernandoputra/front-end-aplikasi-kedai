import * as type from '../_redux/types';
const initialState = {
    data: [],
    isLoading: false
  }
  
export default function itemMenus (state = initialState, action){
    switch (action.type) {
      case type.SEND_ITEM_MENUS:
        state.data.length==0? state.data=action.payload:
        state.data=[...state.data,action.payload]
        return state
      
      default:
        return state;
    }
  
  }
 
 