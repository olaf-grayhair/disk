import {combineReducers, configureStore} from "@reduxjs/toolkit"
import fileSlice from "./fileSlice"
import settingsSlice from "./settingsSlice"
import userSlice from "./userSlice"


const rootReducer = combineReducers({
    file: fileSlice,
    user: userSlice,
    settings: settingsSlice,
})

export const store = configureStore({
    reducer: rootReducer,
})