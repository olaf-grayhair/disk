import {createSlice} from "@reduxjs/toolkit"



const fileSlice = createSlice({
    name: 'file',
    initialState: {
        files: [],
        currentDir: null,
        popupDisplay: false,
        popupMenu: false,
        dirStack: [{
            name: "My disk",
            _id: null,
            id: 0,
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
        popupMenuState(state, action) {
            state.popupMenu = action.payload
        },
        addNav(state, action) {
            state.dirStack.push(action.payload)
            state.dirCount = state.dirCount + 1
        },
        remNav(state, action) {
            state.dirStack.pop(action.payload)
            state.dirCount = state.dirCount - 1
        },
        backNav(state, action) {
            state.dirStack.map(dir => dir._id === action.payload 
                ? state.dirStack.length = dir.id + 1
                : dir)
            state.dirCount = state.dirStack.length -1
        },

        clearNav(state) {
            state.dirStack.length = 1
            state.dirCount = 0
        },
        delFile(state, action) {
            state.files = state.files.filter(file => file._id !== action.payload)
        },
        renameAction(state, action) {
            state.files = state.files.map(file => file._id === action.payload._id ? file = action.payload : file)
        },
        mvFile(state, action) {
            state.files = state.files.map(file => file._id === action.payload._id ? file = action.payload : file)
        },
    }
})

export default fileSlice.reducer
export const {setFiles, setCurrentDir, addFile, popupState, addNav, remNav, delFile, popupMenuState, renameAction, mvFile, clearNav, backNav} = fileSlice.actions
// cold@777.mail.ru