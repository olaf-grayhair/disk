import { React, useState } from 'react';
import style from './image.module.scss'

const Image = ({file}) => {
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(750);

    const scrollPlus = () => {
        if (width < 1400 && height < 1300) {
            setWidth(width + 100)
            setHeight(height + 100)
        }
    }

    const scrollMinus = () => {
        if (width > 800 && height > 750) {
            setWidth(width - 100)
            setHeight(height - 100)
        }
    }

    return (
        <div
            className={style.img}
            style={{ width: `${width}px`, height: `${height}px` }}

            onClick={e => e.stopPropagation()} >

            <img src={file} alt={file}
            />
            <div className={style.btn__block}>
                <button onClick={scrollPlus}>+</button>
                <button onClick={scrollMinus}>-</button>
            </div>
        </div>
    );
}

export default Image;
