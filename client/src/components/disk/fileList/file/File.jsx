import { React, useState, useEffect } from 'react';
import style from './file.module.scss'

import { addNav, popupMenuState, setCurrentDir } from '../../../../reducers/fileSlice';
import { setContextMenu, setMenu } from "../../../../reducers/userSlice";

import { useDispatch, useSelector } from 'react-redux';
import { changeDirectory, renameFile } from '../../../../actions/file';
import { sizeOfFiles } from '../../../../utils/sizeOfFiles.js';
import FileOpen from './file-open/FileOpen'
import { setPopupMove, setPopupState } from '../../../../reducers/settingsSlice';
import { splitFile, uploads } from '../../../../utils/uploads';
import Popup from '../../../popup/Popup';
import { FcBookmark } from 'react-icons/fc';
import Modal from '../../../modal/Popup';
import { baseURL } from '../../../../utils/instance';


const File = ({ name, type, size, date, _id, openMenu, path, staticPath, parent }) => {
    const dispatch = useDispatch()
    const view = useSelector(state => state.settings.view)
    const showFile = useSelector(state => state.settings.showFile)
    ///set type files
    const [popup, setPopup] = useState(false);
    ///chandgePAge
    const { files, currentDir, dirCount } = useSelector((state) => state.file)

    const changePage = (e) => {
        let fileType = type.toLowerCase()
        if (fileType === 'dir') {
            dispatch(setCurrentDir(_id))
            const pushItem = { name, _id, id: dirCount + 1 }
            dispatch(addNav(pushItem))
        }

        else setPopup(true)
    }
    ///chandgePAge
    const compareImg = () => {
        const set = staticPath.split('.', 2).pop().toLowerCase()
        if (set === 'jpg' || set === 'png' || set === 'jpeg' || set === 'gif') {
            return true
        }
    }

    const openContextMenu = (e) => {
        e.preventDefault()
        openMenu(e)
        dispatch(setContextMenu({ _id, name, staticPath, type }))
    }

    ///popup
    const { popupMenu } = useSelector(state => state.file)
    const user = useSelector(state => state.user.user)
    const contextMenu = useSelector(state => state.user.contextMenu)

    const closePopup = () => {
        dispatch(popupMenuState(false))
        dispatch(setPopupState(false))
        //popupMove_file
        dispatch(setPopupMove(false))
    }

    const rename = (dirName) => {
        dispatch(renameFile(dirName, contextMenu._id, user.id, parent, contextMenu.staticPath, path))
        dispatch(popupMenuState(false))
        dispatch(setPopupState(false))
    }

    //////popupLink
    const { popupLinkstate } = useSelector(state => state.settings)
    const link = useSelector(state => state.settings.popupLink)

    const copyLink = async () => {
        await navigator.clipboard.writeText(link);
        console.log(link, 'dirName');
        alert('Text copied');
    }

    //////markFile
    const array = JSON.parse(localStorage.getItem('mark')) || []
    const mark = array.map(file => file === _id
        ? <FcBookmark size={'1.4em'} key={_id} /> : '')

    //popupMove
    const popupMove = useSelector(state => state.settings.popupMove)

    const moveOneFile = (id, name, path, userId, parent) => {
        dispatch(changeDirectory(id, name, path, userId, parent))
    }

    const file = baseURL + staticPath
    const docs = [
        { uri: file }, // Local File
    ];

    if (view === 'list') {
        return (
            <>

                {popup && <FileOpen
                    type={type}
                    filePath={staticPath}
                    setstate={setPopup} />
                }

                <div className={style.list}
                    onClick={changePage}
                    onContextMenu={openContextMenu}
                >
                    <img src={compareImg()
                        ? baseURL + staticPath
                        : uploads(splitFile(name))} alt={name} />
                    <span>{name}</span>
                    <span className={style.mark}>
                        {mark}
                    </span>
                    <span>{date.slice(0, 10)}</span>
                    <span>{type}</span>
                    <span>{sizeOfFiles(size)}</span>
                </div>
                <Popup
                    popupName={'Change name'}
                    cansel={closePopup}
                    popupDisplay={popupMenu}
                    name={contextMenu.name}
                    action={rename}
                    btnName={'rename'}
                />
                <Popup
                    popupName={'Get link'}
                    popupDisplay={popupLinkstate}
                    cansel={closePopup}
                    action={copyLink}
                    name={link}
                    btnName={'copy'}
                />
                <Modal
                    popupName={'Move files'}
                    popupDisplay={popupMove}
                    cansel={closePopup}
                    action={copyLink}
                    btnName={'move'}
                    move={moveOneFile}
                />
            </>
        );
    }

    if (view === 'grid') {
        return (
            <>
                {popup && <FileOpen
                    type={type}
                    filePath={staticPath}
                    setstate={setPopup} />
                }

                <div className={style.grid}
                    onClick={changePage}
                    onContextMenu={openContextMenu}
                >
                    <img src={compareImg()
                        ? baseURL + staticPath
                        : uploads(splitFile(name))} alt={name} />
                    <span>{name}</span>
                    <span className={style.mark}>
                        {mark}
                    </span>
                </div>
                <Popup
                    popupName={'Change name'}
                    cansel={closePopup}
                    popupDisplay={popupMenu}
                    name={contextMenu.name}
                    action={rename}
                    btnName={'rename'}
                />
                <Popup
                    popupName={'Get link'}
                    popupDisplay={popupLinkstate}
                    cansel={closePopup}
                    action={copyLink}
                    name={link}
                    btnName={'copy'}
                />
                <Modal
                    popupName={'Move files'}
                    popupDisplay={popupMove}
                    cansel={closePopup}
                    action={copyLink}
                    btnName={'copy'}
                    move={moveOneFile}
                />
            </>
        );
    }

}

export default File;
