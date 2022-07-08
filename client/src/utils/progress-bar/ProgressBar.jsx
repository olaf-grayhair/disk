import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import style from './progressbar.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setClose, setHide } from '../../reducers/uploadSlice';

import { AiFillCloseCircle } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';

const ProgressBar = () => {
    const dispatch = useDispatch()
    const {isHide, isClose} = useSelector(state => state.upload)

    const arr = [
        { name: "file.css", img: "http://localhost:3000/static/media/mp3.513706fbb76fa001cd87.png" },
        { name: "file.css", img: "http://localhost:3000/static/media/mp3.513706fbb76fa001cd87.png" },
        { name: "file.css", img: "http://localhost:3000/static/media/mp3.513706fbb76fa001cd87.png" },
    ]

    const close = () => {
        dispatch(setClose(false))
    }

    const hide = () => {
        dispatch(setHide(!isHide))
    }

    const result = arr.map(el => (
        <div className={style.item}>
            <img src={el.img} className={style.icon} alt="" />
            <span>{el.name}</span>
            <div className={style.circul}>
                <CircularProgressbar value={100} text={`${100}%`} />
            </div>
        </div>
    ))

    return (
        isClose &&
        <div className={style.progressbar}>
            <div className={style.header}>
                <h2>upload 1 file</h2>
                <div className={style.close}  onClick={close}>
                    <AiFillCloseCircle color='white' size={"1.2em"}/>
                </div>
                <div className={!isHide ? style.hideActive : style.hide} onClick={hide}>
                    <IoIosArrowDown color='white' size={"1.4em"}/>
                </div>
            </div>
            {isHide &&
            <div className={style.block}>
                {result}
            </div>}

        </div>
    );
}

export default ProgressBar;
