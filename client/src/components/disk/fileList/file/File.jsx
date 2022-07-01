import { React, useState, useEffect } from 'react';
import style from './file.module.scss'

import { addNav, popupMenuState, setCurrentDir } from '../../../../reducers/fileSlice';
import { setContextMenu, setMenu } from "../../../../reducers/userSlice";

import { useDispatch, useSelector } from 'react-redux';
import ContextMenu from '../../../../utils/contextmenu/ContextMenu';
import { deleteFile, dowloadFile, renameFile } from '../../../../actions/file';
import { sizeOfFiles } from '../../../../utils/sizeOfFiles.js';
import FileOpen from './file-open/FileOpen'
import { setShowFile } from '../../../../reducers/settingsSlice';
import { uploads } from '../../../../utils/uploads';
import { API_URL } from '../../../../utils/urls';
import PopupMenu from '../../../popupMenu/PopupMenu';


const FileList = ({ name, type, size, date, _id, openMenu, setMenu, staticPath,menu }) => {
    const dispatch = useDispatch()
    const view = useSelector(state => state.settings.view)
    const showFile = useSelector(state => state.settings.showFile)
    const splitFile = name.split('.', -1).pop()

    const [points, setPoints] = useState({ x: 0, y: 0 })

    const [state, setstate] = useState(false);
    const changePage = (e) => {
        let fileType = type.toLowerCase()
        if (fileType === 'dir') {
            dispatch(setCurrentDir(_id))
            const pushItem = { name, _id }
            dispatch(addNav(pushItem))
        }
        if (fileType === 'jpg' || fileType === 'png') {
            setstate(true)
            dispatch(setShowFile(true))
        }
    }


    const download = (e) => {
        e.stopPropagation()
        dowloadFile(_id, name)
        console.log(_id);
    }

    const detele = (e) => {
        e.stopPropagation()
        dispatch(deleteFile(_id))
    }

    const compareImg = () => {
        const set = staticPath.split('.', 2).pop().toLowerCase()
        if(set === 'jpg' || set === 'png') {
            return true
            // return `http://localhost:5000/${path}`
        }
    }
    const compareFiles = () => {
        const set = staticPath.split('.', 2).pop()
        if(set === 'txt') {
            return <pre>{`http://localhost:5000/62b4381b44cf10f7eee4ac5e/static/github.TXT`}</pre>
        }
        if(set === 'jpg' || set === 'png') {
            return <img src={`http://localhost:5000/${staticPath}`} alt="" />
        }
    }

    const openContextMenu = (e) => {
        e.preventDefault()
        openMenu(e)
        dispatch(setContextMenu({_id, name, staticPath}))

        // dispatch(popupMenuState(false))
    }
    ///popup
    const { popupMenu } = useSelector(state => state.file)

    const closePopup = () => {
        dispatch(popupMenuState(false))
    }

    const renamePopup = (name, id) => {
        renameFile(name, id)
    }

    if (view === 'list') {
        return (
            <div>
                {state
                    ? <FileOpen img={staticPath} setstate={setstate} state={state} />
                    : <div className={style.list}
                        onClick={changePage}
                        onContextMenu={openContextMenu}
                    >
                        {/* {compareFiles()} */}
                        <img src={compareImg() 
                            ? API_URL + staticPath 
                            : uploads(splitFile)} alt={name} />
                        <span>{name}</span>
                        <span>{date.slice(0, 10)}</span>
                        <span>{type}</span>
                        <span>{sizeOfFiles(size)}</span>
                    </div>
                }
            </div>
        );
    }

    if (view === 'grid') {
        return (
            <div>
                {state
                    ? <FileOpen img={staticPath} setstate={setstate}
                        state={state} />
                    : <div className={style.grid}
                        onClick={changePage}
                        onContextMenu={openContextMenu}
                    >
                        <img src={compareImg() 
                            ? API_URL + staticPath 
                            : uploads(splitFile)} alt={name} />
                        <span>{name}</span>
                    </div>
                }
              <PopupMenu 
              popupName={'Change name'} 
              popupDisplay={popupMenu}
              create={renamePopup}
              cansel={closePopup}
               />
            </div>
        );
    }

}

export default FileList;
