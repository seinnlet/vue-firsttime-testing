import axios from 'axios'

const apiClient = axios.create({
  // baseURL: 'http://osapi.seinnletlethninn.me/api/v1',
  baseURL: 'http://localhost:8001/api/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
})

export default{
  // index (Item)
  getItems(){
    return apiClient.get('/items')
  },

  // detail (Detail)
  getItem(id){
    return apiClient.get('/items/'+id)
  }
}