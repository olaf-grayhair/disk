import React from 'react';
import { useDispatch } from 'react-redux';
import { setShowFile } from '../../../../../reducers/settingsSlice';
import style from './fileopen.module.scss'

const FileOpen = ({img, setstate, state}) => {
    const dispatch = useDispatch()
    const hide = () => {
        dispatch(setShowFile(false))
        setstate(false)
        console.log(state, 'fileopen');
    }
    console.log(img, 'setstate');
    return (
        <div className={style.inactive}  
            onClick={hide}>
            <div className={style.img} onClick={e => e.stopPropagation()}>
                <img src={`http://localhost:5000/${img}`} alt="" />
            </div>
        </div>
    );
}

export default FileOpen;
