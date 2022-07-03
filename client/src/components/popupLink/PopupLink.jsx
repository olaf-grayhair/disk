import {React, useState} from 'react';
import { useSelector } from 'react-redux';
import style from './popuplink.module.scss'

const PopupLink = ({popupDisplay, cansel, create, currentDir, popupName}) => {
    const link = useSelector(state => state.settings.popupLink)
    const [dirName, setDirName] = useState(link);
    const inputName = (e) => {
        setDirName(e.target.value)
    }

    function myFunction() {
        dirName.select();
        // dirName.indexOf('.')
        dirName.setSelectionRange(0, 9999);
        navigator.clipboard.writeText(dirName.value);
    }
    const copy = async () => {
        await navigator.clipboard.writeText(link);
        console.log(link, 'dirName');
        alert('Text copied');
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
                    value={link}
                    onChange={inputName}
                    />
                <div className={style.btn__block}>
                    <button onClick={cansel}>Cancel</button>
                    <button onClick={copy}>Copy</button>
                </div>
            </div>
        </div>
    );
}

export default PopupLink;
