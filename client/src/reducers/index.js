import {combineReducers, configureStore} from "@reduxjs/toolkit"
import fileSlice from "./fileSlice"
import settingsSlice from "./settingsSlice"
import uploadSlice from "./uploadSlice"
import userSlice from "./userSlice"


const rootReducer = combineReducers({
    file: fileSlice,
    user: userSlice,
    settings: settingsSlice,
    upload: uploadSlice,
})

export const store = configureStore({
    reducer: rootReducer,
})