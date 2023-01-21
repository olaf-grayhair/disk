import axios from 'axios'

export const setAuthToken = token => {
  if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  else
      delete axios.defaults.headers.common["Authorization"];
}

export const instance = axios.create(
  {
    // baseURL: 'https://disk.oleh-oskin.shop/',
    baseURL: 'http://localhost:3004/',
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
  })

export const baseURL = 'http://localhost:3004/'
// export const baseURL = 'https://disk.oleh-oskin.shop/'
