import {React, useState} from 'react';
import style from './popup.module.scss'

const Popup = ({popupDisplay, cansel, create, currentDir}) => {
    const [dirName, setDirName] = useState('');
    const onHandler = (e) => {
        setDirName(e.target.value)
    }
    
    const createDir = () => {
        create(dirName, currentDir)
        setDirName('')
        cansel()
    }

    return (
        <div 
            className={!popupDisplay ? style.popup__wrap : style.active}
            onClick={cansel}
        >
            <div className={style.popup} onClick={e => e.stopPropagation()}>
                <h2>New folder</h2>
                <input type="text" 
                    placeholder='name' 
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

export default Popup;
