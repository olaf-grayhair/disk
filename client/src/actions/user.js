import axios from 'axios'
import { baseURL, instance, setAuthToken } from '../utils/instance';
import { log, reg } from '../reducers/userSlice'

export const registration = async (email, password) => {

    try{
        const response = await axios.post(`${baseURL}auth/registration`, {
            email,
            password
        })
        alert(response.data.message, 'you can login')
        

    }catch(e) {
        console.log(e.response.data.message);
        alert(e.response.data.message)
    }
}

export const login = (email, password) => {
    localStorage.removeItem('token')
    return async (dispatch) => {
        try{
            const response = await axios.post(`${baseURL}auth/login`, {
                email,
                password
            });

            dispatch(log(response.data.user))
            localStorage.setItem('token',response.data.token)

            // setAuthToken(response.data.token)
            console.log(response.data.token, 'token');
            console.log(localStorage.getItem('token'), 'localStorage');
        }catch(e) {
            // alert(e.response.data.message)
            console.log(e.response.data.message, 'CATCH')
        }
    }
}

export const auth = () => {
    return async (dispatch) => {
        try{
            const response = await instance(`auth/auth`)
            dispatch(log(response.data.user))
            localStorage.setItem('token',response.data.token)
        }catch(e) {
            console.log(e.response.data.message, 'CATCH')
            localStorage.removeItem('token')
        }
    }
}

export const uploadAvatar = (file) => {
    return async (dispatch) => {
        try{
            const formData = new FormData()
            formData.append('file', file)

            const response = await instance.post(`files/avatar`, formData)
            dispatch(log(response.data))
        }catch(e) {
            console.log(e.response.data.message, 'CATCH')
        }
    }
}

export const deleteAvatar = () => {
    return async (dispatch) => {
        try{
            const response = await instance.delete(`files/avatar`)
            dispatch(log(response.data))
        }catch(e) {
            console.log(e.response.data.message, 'CATCH')
        }
    }
}