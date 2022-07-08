import {React, useState} from 'react';
import { API_URL } from '../../../../../utils/urls';
import style from './fileopen.module.scss'

const FileOpen = ({img, setstate}) => {

    const hide = () => {
        setstate(false)
    }
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(750);

    const scrollPlus = () => {
        if(width < 1400 && height < 1300) {
            setWidth(width + 100)
            setHeight(height + 100)
        }
    }

    const scrollMinus= () => {
        if(width > 800 && height > 750) {
            setWidth(width - 100)
            setHeight(height - 100)
        }
    }

    return (
        <div className={style.inactive}  
            onClick={hide}>
            <div 
                className={style.img} 
                style={{width: `${width}px`, height: `${height}px`}} onClick={e => e.stopPropagation()} >
                <img src={API_URL + img} alt={API_URL + img}
                />
                <div className={style.btn__block}>
                    <button onClick={scrollPlus}>+</button>
                    <button onClick={scrollMinus}>-</button>
                </div>
            </div>

        </div>
    );
}

export default FileOpen;
