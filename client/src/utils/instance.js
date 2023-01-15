import axios from 'axios'

export const instance = axios.create(
  {
    baseURL: 'https://disk.oleh-oskin.shop/',
    // baseURL: 'http://localhost:3004/',
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
  })

export const baseURL = 'https://disk.oleh-oskin.shop/'
