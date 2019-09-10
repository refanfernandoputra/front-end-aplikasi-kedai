import * as type from '../_redux/types';
const initialState = {
    data: [],
    isLoading: false
  }
  
export default function TRANSACTIONS (state = initialState, action){
    switch (action.type) {
      case type.iNSERT_TRANSACTIONS:
        return {
          ...state,
          data: 'data kosong',
          isLoading: false
        } 
        case type.iNSERT_TRANSACTIONS_FULFILLED:
        return {
          ...state,
          data: action.payload.data,
          isLoading: false
        }  
        case type.iNSERT_TRANSACTIONS_REJECTED:
        return {
          ...state,
          data: action.payload.data,
          isLoading: false
        }  
        
      default:
        return state;
    }
  
  }
 
 