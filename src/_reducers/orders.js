import * as type from '../_redux/types';
const initialState = {
    data: [],
    isLoading: true
  }
  
export default function orders (state = initialState, action){
    switch (action.type) {
      case type.SEND_ORDERS:
        return {
          ...state,
          data: 'data kosong',
          isLoading: true
        } 
        case type.SEND_ORDERS_FULFILLED:
        return {
          ...state,
          data: action.payload.data,
          isLoading: false
        }  
        case type.SEND_ORDERS_REJECTED:
        return {
          ...state,
          data: action.payload.data,
          isLoading: false
        }  
        
      default:
        return state;
    }
  
  }
 
 