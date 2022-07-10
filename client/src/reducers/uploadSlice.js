import {createSlice} from "@reduxjs/toolkit"



const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        isHide: true,
        isClose: false,
        files: [],
    },

    reducers: {
        setHide(state, actions) {
            state.isHide = actions.payload
        },
        setClose(state, actions) {
            state.isClose = actions.payload
        },
        setUploadFiles(state, actions) {
            state.files.push(actions.payload)
            state.isClose = true
        },
        setDeletUploadFiles(state) {
            state.files = []
        },
        setProgress(state, actions) {
            state.files.map(file => file.id === actions.payload.id
                ? file.progress = actions.payload.progress
                : file
                )
        },
    }
})

export default uploadSlice.reducer
export const {
    setHide, 
    setClose,
    setProgress,
    setUploadFiles,
    setDeletUploadFiles,

} = uploadSlice.actions
