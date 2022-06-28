import {createSlice} from "@reduxjs/toolkit"



const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        loader: false,
    },

    reducers: {
        loading(state, actions) {
            state.loader = actions.payload
        },
    }
})

export default settingsSlice.reducer
export const {loading} = settingsSlice.actions
