import * as type from '../_redux/types'
import axios from 'axios'


export const insertTransactions = (data) => ({
      type: type.iNSERT_TRANSACTIONS,
      payload: axios.post('http://localhost:5000/api/v1/Transactions')
})