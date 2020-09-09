import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://osapi.seinnletlethninn.me/api/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
})

export default{
  // store (Order)
  createOrder(data){
    return apiClient.post('/orders',data)
  },

  // index (Order)
  getOrders(){
    return apiClient.get('/orders')
  },

  // detail (Detail)
  getOrder(id){
    return apiClient.get('/orders/'+id)
  }
}