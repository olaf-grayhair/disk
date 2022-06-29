import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFile, dowloadFile } from '../../actions/file';
import { showMenu } from '../../reducers/userSlice';
import { API_URL } from '../urls';
import style from './contextmenu.module.scss'

const ContextMenu = ({top, left}) => {
    const dispatch = useDispatch()
    const {name, _id, staticPath} = useSelector(state => state.user.contextMenu)
    const path = useSelector(state => state.file.files)

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
    }

    const styleSetting = {
        top: top - 165,
        left
    }
    return (
        <div className={style.contextmenu} 
        style={styleSetting}
        >
            <span onClick={download}>Download</span>
            <span onClick={detele}>Delete</span>
            <span>Get link</span>
            <span>Rename file</span>
            <span>Mark file</span>
        </div>
    );
}

export default ContextMenu;
