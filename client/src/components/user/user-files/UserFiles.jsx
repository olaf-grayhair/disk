import React from 'react';
import style from './userfiles.module.scss'
import { uploads } from '../../../utils/uploads';
import pdf from '../../../assets/images/pdf.png'

const UserFiles = ({}) => {
    return (
        <div className={style.userfiles}>
            <div className={style.item}>
                <img src={pdf} alt="" />
                <div className={style.info}>
                    <h2>images</h2>
                    <span>files</span>
                </div>
                <span>10GB</span>
            </div>
        </div>
    );
}

export default UserFiles;
