import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import style from './progressbar.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setClose, setDeletUploadFiles, setHide } from '../../reducers/uploadSlice';

import { AiFillCloseCircle } from 'react-icons/ai';
import { AiFillCheckCircle } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { splitFile, uploads } from '../uploads';

const ProgressBar = () => {
    const dispatch = useDispatch()
    const {isHide, isClose, files} = useSelector(state => state.upload)

    const arr = [
        { name: "file.css", img: "http://localhost:3000/static/media/mp3.513706fbb76fa001cd87.png" },
        { name: "file.css", img: "http://localhost:3000/static/media/mp3.513706fbb76fa001cd87.png" },
        { name: "file.css", img: "http://localhost:3000/static/media/mp3.513706fbb76fa001cd87.png" },
    ]

    const close = () => {
        dispatch(setDeletUploadFiles())
        dispatch(setClose(false))
    }

    const hide = () => {
        dispatch(setHide(!isHide))
    }

    const result = files.map((el, index) => (
        <div className={style.item} key={Date.now()+index}>
            <img src={uploads(splitFile(el.name))} className={style.icon} alt="" />
            <span>{el.name}</span>
            <div className={style.circul}>
                {el.progress === 100 
                ? <AiFillCheckCircle size={'1.6em'} color={"green"}/>
                : <CircularProgressbar value={el.progress} text={`${el.progress}%`} />
                }
            </div>
        </div>
    ))

    return (
        isClose &&
        <div className={style.progressbar}>
            <div className={style.header}>
                <h2>upload {files.length} files</h2>
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
