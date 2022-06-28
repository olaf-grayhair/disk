import { createAction, createReducer } from "@reduxjs/toolkit"



const initialState = {
    user: {},
    isAuth: false,
    count: null,
}

export const loginAction = createAction('LOGIN')
export const increment = createAction('INCREMENT')

export default createReducer(initialState, {
    [loginAction]: function (state, action) {
        
        state.user = action
        state.isAuth = true
    },
    [increment]: function (state) {
        debugger
        state.count = 20
    }
})
console.log(loginAction, 'redux');
