import {createSlice} from "@reduxjs/toolkit"



const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        loader: false,
        view: 'list',
        showFile: false,
        popupLink: false,
        popupLinkstate: false,
        popupMove: false,
        markFiles: [],
        directories: [],
        allFiles: [],
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
        setPopupMove(state, actions) {
            state.popupMove = actions.payload
        },
        setDirectories(state, actions) {
            state.directories = actions.payload
        },
        setAllFiles(state, actions) {
            state.allFiles = actions.payload
        },



        setMarkFiles(state, actions) {
            state.markFiles.push(actions.payload) 
            // localStorage.setItem('mark', JSON.stringify(state.markFiles))

            // const array = JSON.parse(localStorage.getItem('mark'))
            // let arr = [...array]
            // if(array) {
            //     debugger
            //     state.markFiles = array
            //     state.markFiles.push(actions.payload) 
            // }else {
            //     state.markFiles.push(actions.payload) 
            //     localStorage.setItem('mark', JSON.stringify(state.markFiles))
            // }

        },
        deleteMarkFiles(state, actions) {
            state.markFiles.map((file, index) => file === actions.payload ? state.markFiles.splice(index, 1) : file)
            localStorage.setItem('mark', JSON.stringify(state.markFiles))
        },

    }
})

export default settingsSlice.reducer
export const {
    loading, 
    setView, 
    setShowFile, 
    setPopupLink, 
    setPopupState, 
    setMarkFiles, 
    deleteMarkFiles, 
    setPopupMove, 
    setDirectories,
    setAllFiles
} = settingsSlice.actions
