import {createSlice} from "@reduxjs/toolkit"



const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        loader: false,
        view: 'list',
        showFile: false,
        popupLink: false,
        popupLinkstate: false,
        markFiles: []
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
        setMarkFiles(state, actions) {
            // state.markFiles.push(actions.payload) 
            state.markFiles = state.markFiles.map(file => file._id !== actions.payload 
                ? state.markFiles.push(actions.payload)
                : state.markFiles.push(actions.payload)
                )
        },
        deleteMarkFiles(state, actions) {
            state.markFiles = state.markFiles.filter(file => file._id === actions.payload)
        },

    }
})

export default settingsSlice.reducer
export const {loading, setView, setShowFile, setPopupLink, setPopupState, setMarkFiles, deleteMarkFiles} = settingsSlice.actions
