import {React, useState} from 'react';
import { useDispatch } from 'react-redux';
import { remNav, setCurrentDir } from '../../reducers/fileSlice';
import style from './navbutton.module.scss'

const NavButton = ({name, _id, action, dirCount, id}) => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(setCurrentDir(_id))
        dispatch(remNav())
        
    }
    console.log(dirCount, 'dirCount', id);
    return (
        <div className={style.navbutton} onClick={handleClick}>
            <div className={style.navigate}>
                {name}
            </div>
            <div  
            className={dirCount !== id ? style.arrow : style.active}></div>
        </div>
        // <div className={dirCount !== 0 ? style.navbutton : style.active} 
        // onClick={handleClick}>{name}</div>
    );
}

export default NavButton;
