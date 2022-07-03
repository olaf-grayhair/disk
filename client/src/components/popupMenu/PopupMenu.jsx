import {React, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renameFile } from '../../actions/file';
import style from './popupmenu.module.scss'

const PopupMenu = ({popupDisplay, cansel, path, popupName, parent}) => {
    const [dirName, setDirName] = useState('');
    const { name, _id, staticPath } = useSelector(state => state.user.contextMenu)

    const user = useSelector(state => state.user.user)

    const dispatch = useDispatch()

    const inputName = (e) => {
        setDirName(e.target.value)
    }
    
    const createDir = () => {
        dispatch(renameFile(dirName, _id, user.id, parent, staticPath, path))
        setDirName('')
        cansel()
    }

    return (
        <div 
            className={!popupDisplay ? style.popup__wrap : style.active}
            onClick={cansel}
        >
            <div className={style.popup} onClick={e => e.stopPropagation()}>
                <h2>{popupName}</h2>
                <input type="text" 
                    placeholder={name} 
                    value={dirName}
                    onChange={inputName}
                    />
                <div className={style.btn__block}>
                    <button onClick={cansel}>Cancel</button>
                    <button onClick={createDir}>Create</button>
                </div>
            </div>
        </div>
    );
}

export default PopupMenu;
