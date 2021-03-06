import * as type from '../_redux/types';
const initialState = {
    data: ['data kosong'],
    isLoading: true
  }
  
export default function menus (state = initialState, action){
    switch (action.type) {
      case type.GET_LIST_MENU:
        return {
          ...state,
          data: 'data kosong',
          isLoading: true
        } 
        case type.GET_LIST_MENU_FULFILLED:
        return {
          ...state,
          data: action.payload.data,
          isLoading: false
        }  
        case type.GET_LIST_MENU_REJECTED:
        return {
          ...state,
          data: 'Periksa jaringan anda',
          isLoading: false
        }  
        
      default:
        return state;
    }
  
  }
 
 