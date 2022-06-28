import React from 'react';
import style from './contextmenu.module.scss'

const ContextMenu = ({top, left, action, files}) => {
    const a = files.map(el => el._id)
    console.log(a);

    const styleSetting = {
        top: top - 165,
        left
    }
    return (
        <div className={style.contextmenu} 
        style={styleSetting}
        >
            <span onClick={action}>Download</span>
            <span>two</span>
            <span>three</span>
        </div>
    );
}

export default ContextMenu;
