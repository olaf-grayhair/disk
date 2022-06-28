import React from 'react';
import style from './input.module.scss'

const Input = ({type, placeholder, action, value}) => {
    const onAction = (e) => {
        action(e.target.value)
    }
    return (
        <input className={style.input} 
        value={value}
        onChange={onAction}
        type="text" placeholder={placeholder}/>
    );
}

export default Input;
