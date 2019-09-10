import * as type from '../_redux/types'
import axios from 'axios'

export const getCategories = () => ({
      type: type.GET_CATEGORIES,
      payload: axios.get('http://localhost:5000/api/v1/categories')
})