import {React, useState} from 'react';
import ButtonWhite from '../../UI/button-white/ButtonWhite';
import Button from '../../UI/button/Button';
import style from './popup.module.scss'

const Popup = ({popupDisplay, cansel, create, currentDir, popupName}) => {
    const [dirName, setDirName] = useState('');
    const inputName = (e) => {
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
                <h2>{popupName}</h2>
                <input type="text" 
                    placeholder='name' 
                    value={dirName}
                    onChange={inputName}
                    />
                <div className={style.btn__block}>
                    <ButtonWhite name={'cansel'} action={cansel}/>
                    <Button name={'Create'} action={createDir}/>
                </div>
            </div>
        </div>
    );
}

export default Popup;
