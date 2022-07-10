import { useSelector } from 'react-redux';
import { useState } from 'react';

import { addFile, delFile, mvFile, renameAction, setFiles } from '../reducers/fileSlice';
import { loading, setDirectories, setView } from '../reducers/settingsSlice';
import { setProgress, setUploadFiles } from '../reducers/uploadSlice';
import { instance, SetState } from '../utils/instance';
import { slicePath } from '../utils/slicePath';


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
            dispatch(setView(localStorage.getItem('setView')))
            const response = await instance.get(url)
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
    const response = await fetch(`http://localhost:5000/api/files/download?id=${id}`,{
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
            console.log(response.data);
        }catch(e) {
            console.log(e.response, 'CATCH')
        }
    }
}

export const renameFile = (name, id, userId, parent, staticPath, path) => {
    return async (dispatch) => {
        let file = {}
        let fullPath = slicePath(staticPath)
        let fullName = slicePath(path)
        console.log(fullName, 'staticPath');
        console.log(fullPath, 'fullPath');

        if(parent) {
            console.log('???');
            file = {
                name: name,
                path: fullName + '\\' + name,
                staticPath: fullPath + '\\' + name,
                _id: id
            }
        }else {
            file = {
                name, 
                path: name, // 1/name???
                staticPath: userId + '\\' + name, 
                _id: id
            }
        }

        try{
            const response = await instance.put(`files`, 
            file)                               
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
        let file = {}
        if(parent === null) {
            file = {
                path: name,
                parent: null,
                staticPath: userId + '\\' + name,
                _id: id
            }
        }else {
            file = {
                path: path + '\\' + name,
                parent,
                staticPath: userId + '\\' + path + '\\' + name,
                _id: id
            }
        }

        console.log(file, 'FETCH');
        try{
            const response = await instance.put(`files`, 
            file)                               
            dispatch(mvFile(response.data))
            console.log(response.data);
        }catch(e) {
            console.log(e.response, 'CATCH')
        }
    }
}
