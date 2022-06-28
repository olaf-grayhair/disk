import {createSlice} from "@reduxjs/toolkit"



const fileSlice = createSlice({
    name: 'file',
    initialState: {
        files: [],
        currentDir: null,
        popupDisplay: false,
        dirStack: [{
            name: "My disk",
            _id: null,
        }],
        dirCount: 0,
    },

    reducers: {
        setFiles(state, action) {
            state.files = action.payload
        },
        setCurrentDir(state, action) {
            state.currentDir = action.payload
        },
        addFile(state, action) {
            state.files.push(action.payload)
        },
        popupState(state, action) {
            state.popupDisplay = action.payload
        },
        addNav(state, action) {
            state.dirStack.push(action.payload)
            state.dirCount = state.dirCount + 1
        },
        remNav(state, action) {
            state.dirStack.pop(action.payload)
            state.dirCount = state.dirCount - 1
        },
        delFile(state, action) {
            state.files = state.files.filter(file => file._id !== action.payload)
        }
    }
})

export default fileSlice.reducer
export const {setFiles, setCurrentDir, addFile, popupState, addNav, remNav, delFile} = fileSlice.actions
// cold@777.mail.ru