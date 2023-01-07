import {React, useState, useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeDirectory, deleteFile } from '../../actions/file';

import ButtonWhite from '../../UI/button-white/ButtonWhite';
import Button from '../../UI/button/Button';
import style from './popup.module.scss'
import { FaFolder } from 'react-icons/fa';
import { setPopupMove } from '../../reducers/settingsSlice';
import { delFile } from '../../reducers/fileSlice';

const Modal = ({popupDisplay, cansel, btnName}) => {
    const dispatch = useDispatch()

    const files = useSelector(state => state.settings.directories)
    const { name, _id } = useSelector(state => state.user.contextMenu)
    const user = useSelector(state => state.user.user.id)
    const dirStack = useSelector(state => state.file.dirStack)

    const [index, setIndex] = useState(0);

    let lastFolder = dirStack[dirStack.length - 1].name
    let folderName = dirStack.map(el => el.name + ' / ')
    ///foldername was '\\' ? 

    const [obj, setobj] = useState({
        id: null, 
        name: null, 
        path: null, 
        userId: null, 
        parent: null
    });

    const arr = files.map((el, i) => el.type === 'dir' && el.name !== lastFolder
    ? 
        <span key={el._id} 
            className={i !== index ? style.item : style.itemActive} 
            onClick={e => {setobj({
                id:_id, 
                name: name, 
                path: el.path, 
                userId: user, 
                parent: el._id
            }); setIndex(i); setcolor(false)}}

            ><FaFolder className={style.icon}/>{el.name}</span>
    : ''
    )

    const [color, setcolor] = useState(false);
    const myDisk = () => {
        setIndex(null)
        setcolor(true)
       
        setobj({
            id:_id, 
            name: name, 
            path: '', 
            userId: user, 
            parent: null
        })
    }

    const changeDir = () => {
        dispatch(changeDirectory(obj))
        dispatch(delFile(_id))
        setcolor(false)
        setIndex(0)
        cansel()
    }

    const closePopup = () => {
        dispatch(setPopupMove(false))
        setcolor(false)
        setIndex(0)
    }

    return (
        <div 
            className={!popupDisplay ? style.popup__wrap : style.active}
            onClick={cansel}
        >
            <div className={style.popup} onClick={e => e.stopPropagation()}>
                <h2>{folderName}</h2>
                <div className={style.array}>
                    {arr}

                    {lastFolder !== "My disk" && 
                    <span 
                        className={ color ? style.itemActive : style.item} 
                        onClick={myDisk} 
                        >
                        <FaFolder className={style.icon}/>My disk</span>}
                    
                </div>
                <div className={style.btn__block}>
                    <ButtonWhite name={'cansel'} action={closePopup}/>
                    <Button name={'Move'} action={changeDir}/>
                </div>
            </div>
        </div>
    );
}

export default Modal;
