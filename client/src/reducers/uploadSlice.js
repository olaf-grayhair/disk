import {createSlice} from "@reduxjs/toolkit"



const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        isHide: true,
        isClose: true,
    },

    reducers: {
        setHide(state, actions) {
            state.isHide = actions.payload
        },
        setClose(state, actions) {
            state.isClose = actions.payload
        },
    }
})

export default uploadSlice.reducer
export const {
    setHide, 
    setClose,

} = uploadSlice.actions
