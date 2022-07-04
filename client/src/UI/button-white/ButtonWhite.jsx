import React from 'react';
import style from './buttonwhite.module.scss'

const ButtonWhite = ({name, action}) => {
    return (
        <div className={style.buttonwhite} onClick={action}>
            {name}
        </div>
    );
}

export default ButtonWhite;
