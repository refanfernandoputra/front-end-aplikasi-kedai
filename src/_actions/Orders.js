import * as type from '../_redux/types'
import axios from 'axios'


export const sendOrder = (menuId,price,qty,transactionsId) => {
      return {
            type: type.SEND_ORDERS,
            payload: 
            axios({
                  method: 'post',
                  url: 'http://localhost:5000/api/v1/Orders',
                  headers: {},
                  data: {
                      "menuId":menuId,
                      "price":price,
                      "qty":qty,
                      "status":1,
                      "transactionsId":transactionsId
                  }
              })
      }
}