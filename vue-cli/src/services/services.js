import axios from 'axios'

let token = localStorage.getItem('token')

const apiClient = axios.create({
  // baseURL: 'http://osapi.seinnletlethninn.me/api/v1',
  baseURL: 'http://localhost:8001/api/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`
  }
})

export default{
  // For Items
  getItems(){
    return apiClient.get('/items')
  },
  getItem(id){
    return apiClient.get('/items/'+id)
  },

  // For Orders
  createOrder(data){
    return apiClient.post('/orders',data)
  },
  getOrders(){
    return apiClient.get('/orders')
  },
  getOrder(id){
    return apiClient.get('/orders/'+id)
  },

  // For User
  registerUser(data){
    return apiClient.post('/users',data)
  },
}