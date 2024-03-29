
import axios from 'axios';
import { addFile, delFile, mvFile, renameAction, setFiles } from '../reducers/fileSlice';
import { loading, setAllFiles, setDirectories, setView } from '../reducers/settingsSlice';
import { setProgress, setUploadFiles } from '../reducers/uploadSlice';
import { baseURL, instance, SetState } from '../utils/instance';



export const getFiles = (dirId, sort) => {
    return async (dispatch) => {
        
        let url = `files`

        if (dirId) {
            url = `files?parent=${dirId}`
        }
        if (sort) {
            url = `files?sort=${sort}`
        }
        if (dirId && sort) {
            url = `files?parent=${dirId}&sort=${sort}`
        }
        try{
            dispatch(loading(true))

            if(localStorage.getItem('setView') !== null) {
                dispatch(setView(localStorage.getItem('setView')))
            }else {
                dispatch(setView('list'))
            }

            const response = await axios.get(`${baseURL + url}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });

            dispatch(setFiles(response.data))
        }catch(e) {
            console.log(e.response.data.message, 'CATCH')
        }
        finally{
            dispatch(loading(false))
        }
    }
}

export const createDir = (name, dirId) => {
    return async (dispatch) => {
        try{
            const response = await instance.post(`files/`, {name, type: 'dir', parent: dirId,})

            console.log(localStorage.getItem('token'), 'localStorage, file');
            dispatch(addFile(response.data))
        }catch(e) {
            console.log(e.response.data.message, 'CATCH')
        }
    }
}

export const uploadFile = (file, dirId) => {
    return async (dispatch) => {
        try{
            const formData = new FormData()
            formData.append('file', file)
            if(dirId) {
                formData.append('parent', dirId)
            }

            let upload = {name: file.name, progress: 0, id: Date.now()}
            dispatch(setUploadFiles(upload))

            const response = await instance.post(`files/upload`, formData, {
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if (totalLength) {
                        const res = Math.round((progressEvent.loaded * 100) / totalLength)
                        const arr = {...upload}
                        arr.progress = res
                        dispatch(setProgress(arr))
                    }
                }
            })

            dispatch(addFile(response.data))
        }catch(e) {
            console.log(e.response.data.message, 'CATCH')
        }
    }
}

export async function dowloadFile(id, name) {
    const response = await fetch(`${baseURL}/files/download?id=${id}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}

export const deleteFile = (id) => {
    return async (dispatch) => {
        try{
            const response = await instance.delete(`files?id=${id}`)
            dispatch(delFile(id))
            alert(response.data.message)
        }catch(e) {
            console.log(e.response.data.message, 'CATCH')
        }
    }
}

export const searchFile = (name) => {
    return async (dispatch) => {
        console.log(name, 'search');
        let url = `files/search?search=${name}`
        if(name == '') url = 'files'
        try{
            const response = await instance.get(url)                               
            dispatch(setFiles(response.data))
            console.log(response.data);
        }catch(e) {
            console.log(e.response, 'CATCH')
        }
    }
}

export const searchDir = (name) => {
    return async (dispatch) => {
        console.log(name, 'search');
        let url = `files/type?search=dir`
        try{
            const response = await instance.get(url)                               
            dispatch(setDirectories(response.data))
        }catch(e) {
            console.log(e.response, 'CATCH')
        }
    }
}

export const getAllFiles = () => {
    return async (dispatch) => {
        let url = `files/all`
        try{
            const response = await instance.get(url)                               
            dispatch(setAllFiles(response.data))
            console.log(response.data);
        }catch(e) {
            console.log(e.response, 'CATCH')
        }
    }
}

export const renameFile = (name, id, userId, parent, staticPath, path) => {
    return async (dispatch) => {
        ///delete userId, parent, staticPath, path in componet !!
        try{
            const response = await instance.put(`files`, 
            {id, name})                               
            dispatch(renameAction(response.data))
            console.log(response.data);
        }catch(e) {
            console.log(e.response, 'CATCH')
        }
    }
}

export const changeDirectory = (obj) => {
    return async (dispatch) => {
        const {id, name, path, userId, parent} = obj
        console.log(id, name, path, userId, parent);
        ////problem in change dir(wron 'parent')
        try{
            const response = await instance.put(`files/move`, 
            {parent, id})                               
            dispatch(mvFile(response.data))
            console.log(response.data);
        }catch(e) {
            console.log(e.response, 'CATCH')
        }
    }
}
