import React from 'react';
import style from './circle.module.scss'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Circle = ({value, size, text}) => {
    return (
        <div className={style.circle__block}>
            <div className={style.circle}>
                <CircularProgressbar value={value} text={`${value}%`} />
            </div>
            <div className={style.block}>
                <span>{text}</span>
                <b className={style.bold}>{size}</b>
            </div>
        </div>
    );
}

export default Circle;
