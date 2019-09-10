import * as type from '../_redux/types';
const initialState = {
    data: ['data kosong'],
    isLoading: false
  }
  
export default function categories (state = initialState, action){
    switch (action.type) {
      case type.GET_CATEGORIES:
        return {
          ...state,
          data: 'data kosong',
          isLoading: false
        } 
        case type.GET_CATEGORIES_FULFILLED:
        return {
          ...state,
          data: action.payload.data,
          isLoading: false
        }  
        case type.GET_CATEGORIES_REJECTED:
        return {
          ...state,
          data: action.payload.data,
          isLoading: false
        }  
      default:
        return state;
    }
  }
  