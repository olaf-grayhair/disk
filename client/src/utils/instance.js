import axios from 'axios'

export const instance = axios.create({
    baseURL: 'http://disk.oleh-oskin.shop/api/',
    // baseURL: 'http://localhost:5000/api/',
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
  })
