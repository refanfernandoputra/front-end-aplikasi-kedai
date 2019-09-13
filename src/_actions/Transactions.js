import * as type from '../_redux/types'
import axios from 'axios'


export const insertTransactions = (countPrice,numTable) => ({
    type: type.iNSERT_TRANSACTIONS,
    payload:
        // axios.post('http://localhost:5000/api/v1/Transactions')
        axios({
            method: 'post',
            //url: 'http://localhost:5000/api/v1/Transactions',
            url: 'http://sequelize-restorant.herokuapp.com/api/v1/Transactions',
            headers: {},
            data: {
                "tableNumber":numTable,
                "finishedTime":0,
                "subtotal":countPrice,
                "discount":0,
                "serviceCharge":0,
                "tax":0,
                "total":countPrice,
                "isPaid":0
            }
        })
})
export const sendTransactions = (data) => {
    return {
          type: type.iNSERT_TRANSACTIONS,
          payload: data
    }
}