import {React, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renameFile } from '../../actions/file';
import style from './popupmenu.module.scss'

const PopupMenu = ({popupDisplay, cansel, create, currentDir, popupName}) => {
    const [dirName, setDirName] = useState('');
    const { name, _id, staticPath } = useSelector(state => state.user.contextMenu)

    const user = useSelector(state => state.user.user)

    const dispatch = useDispatch()

    const onHandler = (e) => {
        setDirName(e.target.value)
    }
    
    const createDir = () => {
        console.log('create');
        // create(name, _id)
        dispatch(renameFile(dirName, _id, user.id))
        
        // create(dirName, currentDir)
        setDirName('')
        cansel()
    }
    let t = staticPath;
    t = t.substr(1, t.lastIndexOf("\\"));
    
    let res = staticPath.split("\\").pop()
    console.log(staticPath, '____', res);
    console.log(t, 'popupMenu');


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
                    onChange={onHandler}
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
