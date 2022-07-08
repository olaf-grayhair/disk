import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFile, dowloadFile, searchDir } from '../../actions/file';
import { popupMenuState, popupState } from '../../reducers/fileSlice';
import { showMenu } from '../../reducers/userSlice';
import { API_URL } from '../urls';
import style from './contextmenu.module.scss'
import { deleteMarkFiles, setMarkFiles, setPopupLink, setPopupMove, setPopupState } from '../../reducers/settingsSlice';

import { AiOutlineCloudDownload, AiOutlineLink, AiFillDelete } from 'react-icons/ai';
import { MdDriveFileRenameOutline, MdDriveFileMoveOutline } from 'react-icons/md';
import { FaBookmark } from 'react-icons/fa';
import { FcBookmark } from 'react-icons/fc';


const ContextMenu = ({ top, left }) => {
    const styleSetting = {
        top: top - 165,
        left
    }

    const dispatch = useDispatch()
    const { name, _id, staticPath, type } = useSelector(state => state.user.contextMenu)

    ////move
    const moveFile = () => {
        console.log(_id, 'id');
        dispatch(searchDir())
        dispatch(setPopupMove(true))
    }

    const detele = (e) => {
        e.stopPropagation()
        dispatch(deleteFile(_id))
        dispatch(showMenu(false))
    }

    const download = (e) => {
        e.stopPropagation()
        dowloadFile(_id, name)
        dispatch(showMenu(false))
    }

    const getLink = (e) => {
        e.stopPropagation()
        dispatch(setPopupState(true))
        dispatch(setPopupLink(API_URL + staticPath))
        dispatch(showMenu(false))
    }

    const rename = () => {
        dispatch(popupMenuState(true))
        // dispatch(popupState(true))
    }
///MARKFILE
    const mark = useSelector(state => state.settings.markFiles)
    const markFile = () => {
        dispatch(setMarkFiles(_id))
        // dispatch(setMarkFiles({name, _id, staticPath, state: true}))
    }

    const unMarkFile = () => {
        dispatch(deleteMarkFiles(_id))
        // dispatch(setMarkFiles({name, _id, staticPath, state: true}))
    }

    let arr = mark.map((file, index) => file === _id 
        ? <span key={index + _id} onClick={unMarkFile}><b><FcBookmark size={'1.4em'}/></b> Unmark file</span>  
        : <span key={index + _id} onClick={markFile}><b><FaBookmark size={'1.4em'}/></b> Mark file</span> 
        )

    arr.filter((el, index) => arr.indexOf(el) === index)
    console.log(arr, 'mark');
///MARKFILE

    return (
        <>
            <div className={style.contextmenu}
                style={styleSetting}
            >
                <span onClick={download}>
                    <b><AiOutlineCloudDownload size={'1.4em'}/></b> 
                    Download
                </span>
                <span onClick={detele}>
                    <b><AiFillDelete size={'1.4em'}/></b> 
                    Delete
                </span>
                <span onClick={getLink}>
                    <b><AiOutlineLink size={'1.4em'}/></b> 
                    Get link
                </span>
                <span onClick={rename}>
                    <b><MdDriveFileRenameOutline size={'1.4em'}/></b> 
                    Rename file
                </span>
                {type !== 'dir' &&                 
                    <span onClick={moveFile}>
                        <b><MdDriveFileMoveOutline size={'1.4em'}/></b> 
                        move file
                    </span>
                }

                {/* MARK */}
                {arr.length >= 1 
                ? arr 

                : <span onClick={markFile}><b><FaBookmark size={'1.4em'}/></b> Mark file</span>}
            </div>
        </>

    );
}

export default ContextMenu;
