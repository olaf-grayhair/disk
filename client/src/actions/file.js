import { addFile, delFile, renameAction, setFiles } from '../reducers/fileSlice';
import { loading, setView } from '../reducers/settingsSlice';
import { instance } from '../utils/instance';


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
            const response = await instance.post(`files/upload`, formData)
            dispatch(addFile(response.data))
        }catch(e) {
            console.log(e.response.data.message, 'CATCH')
        }
    }
}

// export const dowloadFile = (id, name) => {
//     return async () => {
//         try{
//             const response = await instance.get(`files/download?id=${id}`, {responseType: 'blob',})
//             if(response.status === 200) {
//                 const blob = await response.blob()
//                 const downloadUrl = window.URL.createObjectURL(blob)
//                 const link = document.createElement('a')
//                 link.href = downloadUrl
//                 link.download = name
//                 document.body.appendChild(link)
//                 link.click()
//                 link.remove()
//             }
//         }catch(e) {
//             console.log(e.response.data.message, 'CATCH')
//         }
//     }
// }

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

export const renameFile = (name, id, userId) => {
    return async (dispatch) => {
        const file = {
            name, 
            path: name, // 1/name
            staticPath: userId + '\\' + name, 
            _id: id
        }
        console.log('fetch', file);
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

// export const renameFile = (name, id, userId) => {
//     console.log(name, id);
//     const file = {
//         name, 
//         path: name, 
//         staticPath: userId + '\\' + name, 
//         _id: id
//     }
//     const response = instance.put(`files`, file)
//     console.log(response);
// }