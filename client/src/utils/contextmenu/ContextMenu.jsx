import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteFile, dowloadFile } from '../../actions/file';
import Popup from '../../components/popup/Popup';
import PopupMenu from '../../components/popupMenu/PopupMenu';
import { popupMenuState, popupState } from '../../reducers/fileSlice';
import { showMenu } from '../../reducers/userSlice';
import { API_URL } from '../urls';
import style from './contextmenu.module.scss'

const ContextMenu = ({ top, left }) => {
    const dispatch = useDispatch()
    const { name, _id, staticPath } = useSelector(state => state.user.contextMenu)
    const { popupMenu } = useSelector(state => state.file)

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
        const a = API_URL + staticPath
        dispatch(showMenu(false))
        console.log(a);
    }

    const styleSetting = {
        top: top - 165,
        left
    }

    const openPopup = () => {
        dispatch(popupMenuState(true))
        // dispatch(popupState(true))
    }
    return (
        <>
            <div className={style.contextmenu}
                style={styleSetting}
            >
                <span onClick={download}>Download</span>
                <span onClick={detele}>Delete</span>
                <span onClick={getLink}>Get link</span>
                <span onClick={openPopup}>Rename file</span>
                <span>Mark file</span>
            </div>
        </>

    );
}

export default ContextMenu;
