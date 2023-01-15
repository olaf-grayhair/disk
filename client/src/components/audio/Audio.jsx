import React from 'react';
import style from './audio.module.scss'
import ReactAudioPlayer from 'react-audio-player';

const Audio = ({ file }) => {

    return (
        <div className={style.audio}>
            <div className={style.file} onClick={e => e.stopPropagation()}>
            <ReactAudioPlayer
                    src={file}
                    autoPlay
                    controls
                />
            </div>
        </div>
    );
}

export default Audio;
