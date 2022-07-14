import React from 'react';
import style from './userfiles.module.scss'

const UserFiles = ({file, text, size, img}) => {

    return (
        <div className={style.userfiles}>
            <div className={style.item}>
                <div className={style.img}>
                    <img src={img} alt={file.name} />
                </div>
                <div className={style.info}>
                    <h2>{text}</h2>
                    <span className={style.length}>
                        {file.length === 1 
                        ? file.length + ' file'
                        : file.length + ' files'} 
                    </span>
                </div>
                <span className={style.size}>{size}</span>
            </div>
        </div>
    );
}

export default UserFiles;
