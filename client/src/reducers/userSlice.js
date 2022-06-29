import {createSlice} from "@reduxjs/toolkit"



const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        isAuth: false,
        showContextMenu: false,
        contextMenu: {id: null, name: null, staticPath: null}
    },

    reducers: {
        log(state, action) {
            state.user = action.payload
            state.isAuth = true
        },
        logout(state, action) {
            localStorage.removeItem('token')
            state.user = {}
            state.isAuth = false
        },
        showMenu(state, action) {
            state.showContextMenu = action.payload
        },
        setContextMenu(state, actions) {
            state.contextMenu = actions.payload
        },
    }
})

export default userSlice.reducer
export const {log, increment, logout, showMenu, setContextMenu} = userSlice.actions
