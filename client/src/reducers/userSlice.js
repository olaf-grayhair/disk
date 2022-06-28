import {createSlice} from "@reduxjs/toolkit"



const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        isAuth: false,
        count: null,
        contextMenu: false,
    },

    reducers: {
        log(state, action) {
            state.user = action.payload
            state.isAuth = true
        },
        increment(state) {
            state.count = state.count + 1
        },
        logout(state, action) {
            localStorage.removeItem('token')
            state.user = {}
            state.isAuth = false
        },
        setContextMenu(state, action) {
            state.contextMenu = action.payload
        }
    }
})

export default userSlice.reducer
export const {log, increment, logout, setContextMenu} = userSlice.actions
