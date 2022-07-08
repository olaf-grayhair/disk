import React from 'react';
import style from './audio.module.scss'
import ReactAudioPlayer from 'react-audio-player';
import { AiFillCloseCircle } from 'react-icons/ai';

const Audio = ({ file, setTxtFile }) => {
    const hide = () => {
        setTxtFile(false)
    }

    console.log(file);
    return (
        <div className={style.audio}>
            <div className={style.file} onClick={e => e.stopPropagation()}>
                <ReactAudioPlayer
                    src={file}
                    autoPlay
                    controls
                />
                <div className={style.hide} onClick={hide}><AiFillCloseCircle/></div>
            </div>
        </div>
    );
}

export default Audio;
