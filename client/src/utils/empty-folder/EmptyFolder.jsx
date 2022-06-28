import React from 'react';
import style from './emptyfolder.module.scss'
import folder from '../../assets/images/empty-folder.png'

const EmptyFolder = () => {
    return (
        <div className={style.emptyfolder}>
            <img src={folder} alt="" />
            <h3>This folder is empty...</h3>
            <span>Drop file or create directory</span>
        </div>
    );
}

export default EmptyFolder;
