import React from 'react';
import style from './button.module.scss'

const Button = ({name, action}) => {
    return (
        <div 
        className={style.button}
        onClick={action}
        >
            {name}
        </div>
    );
}

export default Button;
