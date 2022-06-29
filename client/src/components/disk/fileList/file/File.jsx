import { React, useState, useEffect } from 'react';
import style from './file.module.scss'

import { addNav, setCurrentDir } from '../../../../reducers/fileSlice';
import { setContextMenu, setMenu } from "../../../../reducers/userSlice";

import { useDispatch, useSelector } from 'react-redux';
import ContextMenu from '../../../../utils/contextmenu/ContextMenu';
import { deleteFile, dowloadFile } from '../../../../actions/file';
import { sizeOfFiles } from '../../../../utils/sizeOfFiles.js';
import FileOpen from './file-open/FileOpen'
import { setShowFile } from '../../../../reducers/settingsSlice';
import { uploads } from '../../../../utils/uploads';


const FileList = ({ name, type, size, date, _id, openMenu, setMenu, staticPath,menu }) => {
    const dispatch = useDispatch()
    const view = useSelector(state => state.settings.view)
    const showFile = useSelector(state => state.settings.showFile)
    const splitFile = name.split('.', -1).pop()

    const [points, setPoints] = useState({ x: 0, y: 0 })
    // const openContextMenu = (e) => {
    //     e.preventDefault()
    //     setMenu(_id, name)
    //     dispatch(setMenu(true))
    //     setPoints({ x: e.pageX, y: e.pageY })
    // }

    const [state, setstate] = useState(false);
    const changePage = (e) => {
        if (type === 'dir') {
            dispatch(setCurrentDir(_id))
            const pushItem = { name, _id }
            dispatch(addNav(pushItem))
        }
        if (type === 'jpg' || type === 'png') {
            setstate(true)
            dispatch(setShowFile(true))
        }
    }

    // const openMenu = (e) => {
    //     if(type !== 'dir') {
    //         e.preventDefault()
    //         // dispatch(setContextMenu(true))
    //         if (e.type === "contextmenu") {
    //             console.log("Right click");
    //             setMenu(!menu)
    //             dispatch(setContextMenu(true))
    //         }
    //         setPoints({ x: e.pageX, y: e.pageY })
    //     }
    //     console.log(menu, 'menu', contextMenu, 'contextMenu');
    // }

    // const closeMenu = (e) => {
    //     console.log(e.type, 'e.type');
    //     setMenu(false)
    //   }

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
        const set = staticPath.split('.', 2).pop()
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
                        <img src={uploads(splitFile)} alt="" />
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
                        {/* {splited()} */}
                        <img src={compareImg() 
                            ? `http://localhost:5000/${staticPath}` 
                            : uploads(splitFile)} alt="" />
                        <span>{name}</span>
                    </div>
                }
            </div>
        );
    }

}

export default FileList;
