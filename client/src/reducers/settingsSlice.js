import {createSlice} from "@reduxjs/toolkit"



const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        loader: false,
        view: 'list',
        showFile: false,
        popupLink: false,
        popupLinkstate: false,
    },

    reducers: {
        loading(state, actions) {
            state.loader = actions.payload
        },
        setView(state, actions) {
            state.view = actions.payload
        },
        setShowFile(state, actions) {
            state.showFile = actions.payload
        },
        setPopupState(state, actions) {
            state.popupLinkstate = actions.payload
        },
        setPopupLink(state, actions) {
            state.popupLink = actions.payload
        },

    }
})

export default settingsSlice.reducer
export const {loading, setView, setShowFile, setPopupLink, setPopupState} = settingsSlice.actions
